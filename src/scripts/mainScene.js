// src/MainScene.js
import { Scene3D, ExtendedObject3D } from '@enable3d/phaser-extension';
import { Vector3, MathUtils, PCFSoftShadowMap } from 'three';
import CreateDebugButton from './DebugButton.js';
import BillboardItemManager from './BillboardItemManager.js';
import HelpOverlay from './HelpOverlay.js';
import Cannon from './Cannon.js';
import Platform from './Platform.js';
import Player from './Player.js';

export default class MainScene extends Scene3D {
    constructor() {
        super({ key: 'MainScene' });
    }

    init() {
        this.accessThirdDimension();
        this.isPlaying = false;

        // Game Objects & Components
        this.playerComponent = null;   // Instance of the new Player component
        this.player = null;            // Reference to the player's ExtendedObject3D
        this.platformComponent = null;
        this.platform = null;
        this.deathPlane = null;
        this.itemManager = null;
        this.helpOverlay = null;
        this.cannon = null;

        // Assets
        this.itemTypes = ['noodles', 'leek', 'garlic', 'prawn'];
        this.itemTextures = {};
        this.modelNames = ["smooth_flat_disc", "boxboard", "box_man", "cannon", "wok"];
        this.models = {};

    }

    preload() {
        console.log("Preloading assets...");
        // Preload models
        const modelPromises = this.modelNames.map(name => {
            return this.third.load.gltf(`assets/${name}.glb`).then(gltf => {
                this.models[name] = gltf;
            }).catch(error => console.error(`Failed to load ${name} GLB:`, error));
        });

        // Preload item images
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
        CreateDebugButton(this);
        this.helpOverlay = new HelpOverlay(this);

        // Instantiate Platform Component
        this.platformComponent = new Platform(
            this,
            this.models['smooth_flat_disc']
        );
        this.platform = this.platformComponent.getObject3D();
        if (!this.platform) {
             console.error("Failed to create platform object. Aborting.");
             return;
        }

        // Create Other Game Objects
        this.cannon = new Cannon(this);
        this.createDeathPlane();

        // --- Instantiate Player Component ---
        // Pass the scene and the loaded player model data
        this.playerComponent = new Player(this, this.models['box_man']);
        this.player = this.playerComponent.getObject3D(); // Get reference to the player's Object3D
        if (!this.player) {
             console.error("Failed to create player object. Aborting.");
             return; // Handle error
        }
        // REMOVE: await CreatePlayer(this);

        // Initialize Item Manager (needs to be after player potentially)
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
            // Optional: Add check for player collision with death plane if needed
            // else if (otherObject.userData?.isPlayer) { /* Handle player falling */ }
        });

        this.isPlaying = true;
        console.log("Scene Created.");

        // Scene Shutdown Listener
        this.events.on('shutdown', this.shutdown, this);
    }

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
            collisionFlags: 4, // Sensor
        });
    }

    // REMOVE attemptToGrabItem - this logic is now inside Player._checkForGrab
    // attemptToGrabItem() { ... }

    update(time, delta) {
        if (!this.isPlaying) return;

        // --- Update Player Component ---
        this.playerComponent?.update(time, delta);

        // --- Update Platform Component ---
        // Pass the player's Object3D to the platform's update method
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
        this.platformComponent?.destroy();
        this.playerComponent?.destroy(); // <-- Destroy the player component
        this.helpOverlay = null;
        this.cannon = null;
        this.platformComponent = null;
        this.platform = null;
        this.playerComponent = null;
        this.player = null;

        // Add any other scene-specific cleanup
        this.itemManager = null;
        this.deathPlane = null;
    }
}
