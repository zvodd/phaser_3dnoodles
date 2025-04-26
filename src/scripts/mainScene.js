// src/MainScene.js
import { Scene3D, ExtendedObject3D } from '@enable3d/phaser-extension';
import { Vector3, MathUtils, PCFSoftShadowMap } from 'three'; // Keep MathUtils if used elsewhere
import CreatePlayer from './CreatePlayer.js';
import CreateDebugButton from './DebugButton.js'; // Removed/Commented out in previous version
import BillboardItemManager from './BillboardItemManager.js';
import HelpOverlay from './HelpOverlay.js';
import Cannon from './Cannon.js';
import Platform from './Platform.js'; // <-- Import the Platform class

export default class MainScene extends Scene3D {
    constructor() {
        super({ key: 'MainScene' });
    }

    init() {
        this.accessThirdDimension();
        this.isPlaying = false;

        // Game Objects & Components
        this.player = null;
        this.playerController = null;
        this.joystick = null;
        this.platformComponent = null; // Instance of the Platform component
        this.platform = null;          // Reference to the actual THREE.Object3D from the component
        this.deathPlane = null;
        this.itemManager = null;
        this.helpOverlay = null;
        this.cannon = null;

        // Assets
        this.itemTypes = ['noodles', 'leek', 'garlic', 'prawn'];
        this.itemTextures = {};
        this.modelNames = ["smooth_curved_disc", "boxboard", "box_man", "cannon", "wok"];
        this.models = {};

        // --- Store original platform physics config to pass to the component ---
        this.platformPhysicsConfig = {
            damping: 0.95,
            playerInfluence: 0.0006,
            returnForce: 0.003,
            maxTilt: Math.PI / 11,
            maxVelocity: 0.05
        };
    }

    preload() {
        console.log("Preloading assets...");
        // Ensure 'smooth_curved_disc' is loaded
        const modelPromises = this.modelNames.map(name => {
            return this.third.load.gltf(`assets/${name}.glb`).then(gltf => {
                this.models[name] = gltf;
            }).catch(error => console.error(`Failed to load ${name} GLB:`, error));
        });

        const texturePromises = this.itemTypes.map(type => {
            const texturePath = `assets/img/${type}.png`;
            return this.third.load.texture(texturePath).then(texture => {
                this.itemTextures[type] = texture;
            }).catch(error => console.error(`Failed to load texture ${texturePath}:`, error));
        });

        this.assetLoadPromises = Promise.all([...modelPromises, ...texturePromises]);
    }

    async create() {
        console.log("Waiting for assets...");
        try {
            await this.assetLoadPromises;
            const loadedModels = Object.keys(this.models).length;
            const loadedTextures = Object.keys(this.itemTextures).length;
            if (loadedModels < this.modelNames.length || loadedTextures < this.itemTypes.length) {
                 throw new Error(`Asset loading incomplete. Models: ${loadedModels}/${this.modelNames.length}, Textures: ${loadedTextures}/${this.itemTypes.length}`);
            }
            // Specifically check platform model
            if (!this.models['smooth_curved_disc']) {
                console.warn("Platform model ('smooth_curved_disc') failed to load. Platform may use fallback.");
            }
            console.log("Assets loaded successfully.");
        } catch (error) {
            console.error("Error during asset loading:", error);
            return;
        }

        console.log("Proceeding with scene creation...");

        // Setup Scene, Lights, Camera, Shadows...
        this.third.warpSpeed('camera', 'sky', 'grid', 'light');
        this.third.renderer.setPixelRatio(window.devicePixelRatio);
        this.third.renderer.setSize(window.innerWidth, window.innerHeight);
        this.third.camera.aspect = window.innerWidth / window.innerHeight;
        this.third.camera.updateProjectionMatrix();
        this.third.lights.directionalLight({ intensity: 0.8, castShadow: true });
        this.third.lights.hemisphereLight({ intensity: 0.6 });
        this.third.camera.position.set(0, 18, 20);
        this.third.camera.lookAt(new Vector3(0, 5, 0));
        this.third.renderer.shadowMap.enabled = true;
        this.third.renderer.shadowMap.type = PCFSoftShadowMap;

        // Instantiate UI Components
        CreateDebugButton(this); // Removed/Commented out
        this.helpOverlay = new HelpOverlay(this);

        // --- Instantiate Platform Component ---
        this.platformComponent = new Platform(
            this,
            this.models['smooth_curved_disc'],
            this.platformPhysicsConfig
        );
        this.platform = this.platformComponent.getObject3D(); // Get reference to the Object3D
        if (!this.platform) {
             console.error("Failed to create platform object. Aborting.");
             return;
        }

        // Create Other Game Objects
        this.cannon = new Cannon(this); // Assumes cannon model loaded
        this.createDeathPlane();

        // Create Player (needs platform to exist for positioning/collision checks)
        try {
            await CreatePlayer(this); // CreatePlayer might need this.platform reference
            if (!this.player) throw new Error("CreatePlayer did not set scene.player");
        } catch (error) {
            console.error("Failed to create player:", error);
            return;
        }

        // Initialize Item Manager
        this.itemManager = new BillboardItemManager(
            this,
            { maxItems: 50, itemTypes: this.itemTypes },
            this.models,
            this.itemTextures
        );

        // Spawn Items Timer
        this.time.addEvent({
            delay: 2000,
            callback: this.itemManager.spawnItem,
            callbackScope: this.itemManager,
            loop: true
        });

        // Death Plane Collision
        this.deathPlane.body.on.collision((otherObject, event) => {
            if (otherObject.userData?.isItem) {
                this.itemManager.handleCollision(otherObject);
            }
        });

        this.isPlaying = true;
        console.log("Scene Created.");

        // Scene Shutdown Listener
        this.events.on('shutdown', this.shutdown, this);
    }

    // createPlatform() method is removed as it's handled by the Platform component

    createDeathPlane() {
        const deathPlaneY = -10;
        const deathPlaneSize = 100;
        this.deathPlane = new ExtendedObject3D();
        this.deathPlane.name = "DeathPlaneTrigger";
        this.deathPlane.position.set(0, deathPlaneY, 0);

        this.third.physics.add.existing(this.deathPlane, {
            shape: 'box',
            width: deathPlaneSize, height: 0.1, depth: deathPlaneSize,
            mass: 0,
            collisionFlags: 4, // CF_NO_CONTACT_RESPONSE (Sensor)
        });
    }

    attemptToGrabItem() {
         // This logic remains the same, using this.player and this.itemManager
          const grabRadiusSq = 1.5 * 1.5;
          const playerPos = this.player.position;
          let closestItem = null;
          let minDistanceSq = grabRadiusSq;

          if (!this.player || !this.itemManager) return; // Guard clause

          for (const spawnId in this.itemManager.items) {
              const item = this.itemManager.items[spawnId];
              const distanceSq = playerPos.distanceToSquared(item.position);
              if (distanceSq < minDistanceSq) {
                  minDistanceSq = distanceSq;
                  closestItem = item;
              }
          }

          if (closestItem) {
              const grabbedItemInfo = this.itemManager.grabItem(closestItem);
              if (grabbedItemInfo) {
                  console.log("Grabbed:", grabbedItemInfo);
                  // TODO: Player inventory logic
              }
          } else {
              // console.log("No item in range.");
          }
    }

    // updatePlatformTilt() method is removed as it's handled by the Platform component

    update(time, delta) {
        if (!this.isPlaying) return;

        // Update Player
        this.playerController?.update(time, delta);

        // --- Update Platform Component ---
        // Pass the player object to the platform's update method
        this.platformComponent?.update(this.player);

        // Update Item Manager (optional)
        // this.itemManager?.update(time, delta);

        // Cannon update is handled by its internal tween
    }

    /**
     * Scene shutdown handler.
     */
    shutdown() {
        console.log("MainScene shutting down...");
        // Clean up components
        this.helpOverlay?.destroy();
        this.cannon?.destroy();
        this.platformComponent?.destroy(); // Destroy the platform component
        this.helpOverlay = null;
        this.cannon = null;
        this.platformComponent = null;
        this.platform = null; // Clear reference to the object3D

        // Add any other scene-specific cleanup
        this.itemManager = null;
        this.player = null;
        this.playerController = null;
        this.deathPlane = null; // Assuming death plane doesn't need explicit destroy
    }
}
