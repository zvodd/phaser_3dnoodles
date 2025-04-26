// src/MainScene.js
import { Scene3D, ExtendedObject3D } from '@enable3d/phaser-extension';
import { Vector3, MathUtils, PCFSoftShadowMap } from 'three';
import CreatePlayer from './CreatePlayer.js';
import CreateDebugButton from './DebugButton.js';
import BillboardItemManager from './BillboardItemManager.js';
import HelpOverlay from './HelpOverlay.js';
import Cannon from './Cannon.js';


export default class MainScene extends Scene3D {
    constructor() {
        super({ key: 'MainScene' });
    }

    init() {
        this.accessThirdDimension();
        this.isPlaying = false;

        this.player = null;
        this.playerController = null;
        this.joystick = null;
        this.platform = null;
        this.deathPlane = null;
        this.itemManager = null;

        // Assets
        this.itemTypes = ['noodles', 'leek', 'garlic', 'prawn'];
        this.itemTextures = {};
        this.modelNames = ["smooth_flat_disc", "boxboard", "box_man", "cannon", "wok"];
        this.models = {};

        // Platform Physics (Manual)
        this.platformTilt = { x: 0, z: 0 };
        this.platformTiltVelocity = { x: 0, z: 0 };
        this.platformTiltDamping = 0.95;     // Friction/drag on tilt speed
        this.platformPlayerInfluence = 0.0006; // How much player position affects velocity
        this.platformReturnForce = 0.003;    // How strongly it returns to level
        this.platformMaxTilt = Math.PI / 11; // Max angle
        this.platformMaxTiltVelocity = 0.05; // Max speed of tilting
    }

    preload() {
        console.log("Preloading assets...");

        const modelPromises = this.modelNames.map(name => {
            return this.third.load.gltf(`assets/${name}.glb`).then(gltf => {
                this.models[name] = gltf; // Store in this.models
                // console.log(`Loaded model: ${name}`);
            }).catch(error => console.error(`Failed to load ${name} GLB:`, error));
        });

        const texturePromises = this.itemTypes.map(type => {
            const texturePath = `assets/img/${type}.png`;
            return this.third.load.texture(texturePath).then(texture => {
                this.itemTextures[type] = texture;
                // console.log(`Loaded texture for ${type}`);
            }).catch(error => console.error(`Failed to load texture ${texturePath}:`, error));
        });

        this.assetLoadPromises = Promise.all([...modelPromises, ...texturePromises]);
    }

    async create() {
        console.log("Waiting for assets...");
        try {
            await this.assetLoadPromises;

            // Check counts
            const loadedModels = Object.keys(this.models).length;
            const loadedTextures = Object.keys(this.itemTextures).length;

            if (loadedModels < this.modelNames.length || loadedTextures < this.itemTypes.length) {
                 throw new Error(`Asset loading incomplete. Models: ${loadedModels}/${this.modelNames.length}, Textures: ${loadedTextures}/${this.itemTypes.length}`);
            }
            console.log("Assets loaded successfully.");

        } catch (error) {
            console.error("Error during asset loading:", error);
            // Optional: Switch to an error scene or display a message
            return;
        }

        console.log("Proceeding with scene creation...");

        // Setup Scene
        this.third.warpSpeed('camera', 'sky', 'grid', 'light');
        this.third.renderer.setPixelRatio(window.devicePixelRatio);
        this.third.renderer.setSize(window.innerWidth, window.innerHeight);
        this.third.camera.aspect = window.innerWidth / window.innerHeight;
        this.third.camera.updateProjectionMatrix();

        this.third.lights.directionalLight({ intensity: 0.8, castShadow: true });
        this.third.lights.hemisphereLight({ intensity: 0.6 });
        this.third.camera.position.set(0, 18, 20);
        this.third.camera.lookAt(new Vector3(0, 5, 0));

        // Shadows
        this.third.renderer.shadowMap.enabled = true;
        this.third.renderer.shadowMap.type = PCFSoftShadowMap;

        // CreateDebugButton(this);
        this.helpOverlay = new HelpOverlay(this);

        // Create Game Objects
        this.cannon = new Cannon(this);
        this.createPlatform();
        this.createDeathPlane();

        try {
            await CreatePlayer(this);
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
    }

    createPlatform() {
        const platformGltf = this.models["smooth_flat_disc"]; // Use this.models
        if (!platformGltf?.scene?.children?.[0]) {
            console.error("Platform model not found, using fallback.");
            this.platform = this.third.add.box({ name: 'platform_fallback', width: 10, height: 0.5, depth: 10 }, { lambert: { color: 'grey' } });
        } else {
            this.platform = platformGltf.scene.children[0].clone();
            this.platform.name = 'platform_disc';
        }

        this.third.add.existing(this.platform);
        this.platform.position.set(0, 5, 0);
        this.platform.receiveShadow = true;
        this.platform.castShadow = false;

        this.platform.traverse(child => {
            if (child.isMesh) {
                child.receiveShadow = true;
            }
        });

        // Add STATIC physics body for collision
        this.third.physics.add.existing(this.platform, {
            shape: 'hull',
            mesh: this.platform,
            mass: 0,             // Static
            collisionFlags: 2,   // CF_STATIC_OBJECT
            friction: 0.8,
            restitution: 0.2
        });
        // Reset initial visual rotation
        this.platform.rotation.set(0, 0, 0);
        this.platformTilt = { x: 0, z: 0 }; // Ensure tilt state matches
        this.platformTiltVelocity = { x: 0, z: 0 };
        console.log("Platform created with STATIC hull shape.");
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
            collisionFlags: 4, // CF_NO_CONTACT_RESPONSE (Sensor)
        });
    }

    attemptToGrabItem() {
        const grabRadiusSq = 1.5 * 1.5;
        const playerPos = this.player.position;
        let closestItem = null;
        let minDistanceSq = grabRadiusSq;

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


    /**
     * Updates the platform's tilt based on player position and simple physics.
     */
    updatePlatformTilt() {
        let targetTiltX = 0;
        let targetTiltZ = 0;
        let playerIsOnPlatform = this.player.isGrounded;

        // Check if player is roughly on the platform
        if (this.player) {
            const playerPos = this.player.position;
            const platformPos = this.platform.position;
            const platformRadiusSq = 5.5 * 5.5; // Slightly larger than visual radius
        }

        if (playerIsOnPlatform) {
            // Calculate target tilt angles based on player's local position
            const localPlayerPos = this.platform.worldToLocal(this.player.position.clone());
            // Use player position directly to influence velocity change direction
            targetTiltX = localPlayerPos.z;
            targetTiltZ = -localPlayerPos.x; // Sign change intentional based on axis
        }
        // If player is not on platform, targetTilt remains 0,0, causing it to return to level

        // Calculate force towards target (influenced by player) and return force (always active)
        // Note: targetTiltX/Z represent *direction* here, influence scales it
        const forceX = (targetTiltX * this.platformPlayerInfluence) - (this.platformTilt.x * this.platformReturnForce);
        const forceZ = (targetTiltZ * this.platformPlayerInfluence) - (this.platformTilt.z * this.platformReturnForce);

        // Apply force to velocity
        this.platformTiltVelocity.x += forceX;
        this.platformTiltVelocity.z += forceZ;

        // Apply damping (friction)
        this.platformTiltVelocity.x *= this.platformTiltDamping;
        this.platformTiltVelocity.z *= this.platformTiltDamping;

        // Clamp velocity
        this.platformTiltVelocity.x = MathUtils.clamp(this.platformTiltVelocity.x, -this.platformMaxTiltVelocity, this.platformMaxTiltVelocity);
        this.platformTiltVelocity.z = MathUtils.clamp(this.platformTiltVelocity.z, -this.platformMaxTiltVelocity, this.platformMaxTiltVelocity);

        // Update tilt angle based on velocity
        this.platformTilt.x += this.platformTiltVelocity.x;
        this.platformTilt.z += this.platformTiltVelocity.z;

        // Clamp final tilt angle
        this.platformTilt.x = MathUtils.clamp(this.platformTilt.x, -this.platformMaxTilt, this.platformMaxTilt);
        this.platformTilt.z = MathUtils.clamp(this.platformTilt.z, -this.platformMaxTilt, this.platformMaxTilt);

        // Apply the calculated tilt to the visual object
        this.platform.rotation.set(this.platformTilt.x, 0, this.platformTilt.z);

        this.platform.body.needUpdate = true; // IMPORTANT for kinematic physics
    }


    update(time, delta) {
        if (!this.isPlaying) return;

        // Update Player (needs player object)
        if (this.playerController) {
             this.playerController.update(time, delta);
        } else if (this.player) {
             // Basic failsafe if controller missing but player exists
             // console.warn("Player controller missing in update loop");
        }


        // Update Platform Tilt (needs platform object)
        if (this.platform) {
            this.updatePlatformTilt(); // Call the dedicated tilt update function
        }

        // Update Item Manager (optional, if manager needs updates)
        // this.itemManager?.update(time, delta);

    }
}