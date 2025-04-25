// src/MainScene.js
import {
    Scene3D,
    ExtendedObject3D
} from '@enable3d/phaser-extension';
import { Vector3, MathUtils, PCFSoftShadowMap} from 'three';
import CreatePlayer from './CreatePlayer.js';
import CreateDebugButton from './DebugButton.js';
// No longer need CreateBillboardMaterial here, it's used by the manager
import BillboardItemManager from './BillboardItemManager.js'; // Import the new manager

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

        // --- Item Management Handled by BillboardItemManager ---
        this.itemManager = null;
        // Store asset loading info
        this.itemTypes = ['noodles', 'leek', 'garlic', 'prawn']; // Still needed for loading path
        this.itemTextures = {}; // To store loaded textures
        this.modelNames = ["smooth_flat_disc", "boxboard", "box_man", "cannon", "wok"]; // Include "boxboard"
        this.modelGltf = {};
    }

    preload() {
        // --- Load Models ---
        let modelsToLoad = this.modelNames

        let modelPromises = modelsToLoad.map(name => {
            return this.third.load.gltf(`assets/${name}.glb`).then(gltf => {
                this.modelGltf[name] = gltf;
                console.log(`Loaded model: ${name}`);
            }).catch(error => console.error(`Failed to load ${name} GLB:`, error));
        });

        // --- Load Item Textures ---
        let texturePromises = this.itemTypes.map(type => {
            const texturePath = `assets/img/${type}.png`;
            return this.third.load.texture(texturePath).then(texture => {
                this.itemTextures[type] = texture;
                console.log(`Loaded texture for ${type}`);
            }).catch(error => console.error(`Failed to load texture ${texturePath}:`, error));
        });

        // Store promises for checking in create
        this.assetLoadPromises = Promise.all([...modelPromises, ...texturePromises]);

        console.log("Preloading essential assets...");
        // Optionally preload non-essential models asynchronously without blocking 'create'
        this.modelNames.filter(name => !modelsToLoad.includes(name)).forEach(name => {
             this.third.load.gltf(`assets/${name}.glb`).then(gltf => {
                 this.modelGltf[name] = gltf;
                 console.log(`Loaded non-essential model: ${name}`);
             }).catch(error => console.error(`Failed to load ${name} GLB:`, error));
        });
    }

    async create() {
        console.log("Waiting for essential assets...");
        try {
            await this.assetLoadPromises; // Wait for models and textures defined in preload promises
            console.log("Essential assets loaded.");
            // Check if critical assets are actually present after waiting
             if (Object.keys(this.modelGltf.length < this.modelNames.length) || Object.keys(this.itemTextures).length < this.itemTypes.length) {
                console.error("One or more essential assets failed to load properly. Aborting scene creation.");
                return;
            }

        } catch (error) {
            console.error("Error during asset loading:", error);
            // Handle error
            return;
        }

        console.log("Proceeding with create...");

        // Basic Setup
        this.third.warpSpeed('camera', 'sky', 'grid', 'light');
        this.third.renderer.setPixelRatio(window.devicePixelRatio); // Optional: improve sharpness on high DPI
        this.third.renderer.setSize(window.innerWidth, window.innerHeight);
        this.third.camera.aspect = window.innerWidth / window.innerHeight;
        this.third.camera.updateProjectionMatrix();

        this.third.lights.directionalLight({ intensity: 0.8, castShadow: true }); // Enable shadow casting
        this.third.lights.hemisphereLight({ intensity: 0.6 });
        this.third.camera.position.set(0, 18, 20);
        this.third.camera.lookAt(new Vector3(0, 5, 0));
        CreateDebugButton(this);

         // Enable shadows in the renderer
        this.third.renderer.shadowMap.enabled = true;
        this.third.renderer.shadowMap.type = PCFSoftShadowMap; // Softer shadows

        // --- Create Platform ---
        this.createPlatform(); // Encapsulated platform creation

        // --- Create Player ---
        try {
            await CreatePlayer(this); // Assuming this sets this.player and this.playerController
            if (!this.player) throw new Error("CreatePlayer did not set scene.player");
        } catch (error) {
            console.error("Failed to create player:", error);
            // Handle error
            return;
        }


        // --- Create Death Plane ---
        this.createDeathPlane();

        // --- Initialize Billboard Item Manager ---
        this.itemManager = new BillboardItemManager(
            this, // Pass scene reference
            { maxItems: 50, itemTypes: this.itemTypes }, // Pass config
            this.modelGltf,  // Pass loaded models (including 'boxboard')
            this.itemTextures // Pass loaded item textures
        );

        // --- Spawn Items Periodically ---
        this.time.addEvent({
            delay: 2000,
            // Use the item manager's spawn method
            callback: this.itemManager.spawnItem,
            callbackScope: this.itemManager, // ***** SET SCOPE TO THE MANAGER *****
            loop: true
        });

        // --- Setup Collision Listener for Death Plane ---
        this.deathPlane.body.on.collision((otherObject, event) => {
            // Check if the colliding object is an item managed by our manager
            if (otherObject.userData?.isItem) {
                 // Delegate handling to the item manager
                this.itemManager.handleCollision(otherObject);
            }
            // Handle player collision separately if needed
            // else if (otherObject === this.player) { /* handle player death */ }
        });

        this.isPlaying = true;
        console.log("Scene Created. Item Manager active.");
    }

    /**
     * Creates the tilting platform.
     */
    createPlatform() {
        const platformGltf = this.modelGltf["smooth_flat_disc"];
        if (!platformGltf || !platformGltf.scene || !platformGltf.scene.children[0]) {
            console.error("Could not find mesh inside smooth_flat_disc.glb scene. Creating fallback.");
            this.platform = this.third.add.box({ name: 'platform_fallback', width: 10, height: 0.5, depth: 10 }, { lambert: { color: 'grey' } });
        } else {
            this.platform = platformGltf.scene.children[0].clone();
            this.platform.name = 'platform_disc';
        }

        this.third.add.existing(this.platform);
        this.platform.position.set(0, 5, 0);
        this.platform.receiveShadow = true; // Allow platform to receive shadows
        this.platform.castShadow = false;   // Platform itself likely doesn't need to cast shadows

        // Ensure materials on the platform can receive shadows
        this.platform.traverse(child => {
            if (child.isMesh) {
                child.receiveShadow = true;
            }
        });


        this.third.physics.add.existing(this.platform, {
            shape: 'hull',
            mesh: this.platform, // Pass the mesh object for hull generation
            mass: 0,
            collisionFlags: 2, // Kinematic object
            friction: 0.8,
            restitution: 0.2
        });
        console.log("Platform created with hull shape.");
    }

    /**
     * Creates a static trigger volume below the platform.
     */
    createDeathPlane() {
        const deathPlaneY = -10;
        const deathPlaneSize = 100;

        // ExtendedObject3D for the container
        this.deathPlane = new ExtendedObject3D(); 
        this.deathPlane.name = "DeathPlaneTrigger";
        this.deathPlane.position.set(0, deathPlaneY, 0);

        this.third.physics.add.existing(this.deathPlane, {
            shape: 'box',
            width: deathPlaneSize,
            height: 0.1,
            depth: deathPlaneSize,
            mass: 0,
            collisionFlags: 4, // Static sensor (CF_NO_CONTACT_RESPONSE)
            // Give it a group/mask if you want fine-grained collision control
            // collisionGroup: 2, // Example group
            // collisionMask: 1 // Example: Only collide with group 1 (e.g., items/player)
        });
        // No need for userData here, the collision callback identifies it
        console.log("Death Plane physics body created at y=", deathPlaneY);
    }


    /**
     * Method for player interaction (e.g., button press) to grab an item.
     * This would be called from your player controller or input handler.
     * Example: Finds the closest item and tells the manager to grab it.
     */
    attemptToGrabItem() {
        if (!this.player || !this.itemManager) return;

        const grabRadius = 1.5; // How close the player needs to be
        const playerPos = this.player.position;
        let closestItem = null;
        let minDistanceSq = grabRadius * grabRadius;

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
                console.log("Successfully grabbed:", grabbedItemInfo);
                // TODO: Attach item representation to player, add to inventory, etc.
            }
        } else {
             console.log("No item within grab range.");
        }
    }


    update(time, delta) {
        if (!this.isPlaying || !this.player || !this.platform || !this.itemManager) return;

        // Update Player
        this.playerController?.update(time, delta);

        // Update Item Manager (if it needs an update loop, e.g., for manual billboarding)
        // this.itemManager.update(time, delta);

        // Tilt the Platform
        try {
            const localPlayerPos = this.platform.worldToLocal(this.player.position.clone());
            const k = 0.05; // Tilt sensitivity factor
            const maxTilt = Math.PI / 12; // Maximum tilt angle

            const tiltX = -MathUtils.clamp(-k * localPlayerPos.z, -maxTilt, maxTilt);
            const tiltZ = -MathUtils.clamp(k * localPlayerPos.x, -maxTilt, maxTilt);

            // Use quaternion for smoother rotation updates if needed, but set Euler is fine too
            this.platform.rotation.set(tiltX, 0, tiltZ);
            this.platform.body.needUpdate = true; // IMPORTANT for kinematic physics

        } catch (error) {
             // Catch errors if player/platform don't exist momentarily during scene transitions etc.
             // console.error("Error during platform tilt:", error);
        }
    }
}