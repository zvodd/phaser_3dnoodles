import {
    Scene3D,
    THREE,
    MathUtils, // Keep MathUtils if used elsewhere, otherwise THREE.MathUtils
    ExtendedObject3D // Import ExtendedObject3D
} from '@enable3d/phaser-extension';
import { Vector3 } from 'three';
import CreatePlayer from './CreatePlayer.js'; // Assuming this exists and works
import CreateDebugButton from './DebugButton.js'; // Assuming this exists
import CreateBillboardMaterial from './billboard_material.js'

export default class MainScene extends Scene3D {
    constructor() {
        super({ key: 'MainScene' });
    }

    init() {
        this.accessThirdDimension();
        this.maxItems = 50; // Renamed from maxSpheres
        this.spawnCount = 0;
        this.isPlaying = false;

        this.player = null;
        this.playerController = null;
        this.joystick = null;


        // *** Use a dictionary for item tracking ***
        this.items = {}; // Renamed from spheres

        // Store item types and texture references
        this.itemTypes = ['noodles', 'leek', 'garlic', 'prawn'];
        this.itemTextures = {}; // To store loaded textures
        this.modelNames = ["smooth_flat_disc","boxboard", "box_man", "cannon", "wok"];
        this.modelGltf = {};
    }

    preload() {
        this.modelNames.forEach(name => {
          this.third.load.gltf(`assets/${name}.glb`).then(gltf => {
            this.modelGltf[name] = gltf
            this.modelNames = ["smooth_flat_disc","boxboard"]
          }).catch(error => console.error(`Failed to load ${name} GLB:`, error));
        });

        // Load Item Textures
        this.itemTypes.forEach(type => {
            const texturePath = `assets/img/${type}.png`; // Adjust path as needed
            this.third.load.texture(texturePath).then(texture => {
                this.itemTextures[type] = texture; // Store loaded texture
                console.log(`Loaded texture for ${type}`);
            }).catch(error => console.error(`Failed to load texture ${texturePath}:`, error));
        });

        console.log("Preloading assets...");
    }


    async create() {
        const check_loaded = () => { return (
            Object.keys(this.itemTextures).length < this.itemTypes.length
            || Object.keys(this.modelGltf).length < this.modelNames.length
          )};
        // Wait for models and textures needed immediately (optional, better check they exist)
        // A more robust approach involves checking if resources are loaded before using them.
        
        if (check_loaded()) {
             console.warn("Assets might not be fully loaded yet. Waiting briefly...");
             // Basic wait, consider a more robust loading state manager
             await new Promise(resolve => setTimeout(resolve, 500));
             if (check_loaded()) {
                console.error("Essential assets failed to load. Aborting scene creation.");
                // Handle error appropriately - show message, switch scene, etc.
                return;
             }
        }
        console.log("Assets loaded, proceeding with create...");


        // Basic Setup
        this.third.warpSpeed('camera', 'sky', 'grid', 'light');
        this.third.lights.directionalLight({ intensity: 0.8 });
        this.third.lights.hemisphereLight({ intensity: 0.6 });
        this.third.camera.position.set(0, 18, 20);
        this.third.camera.lookAt(new Vector3(0, 5, 0));
        CreateDebugButton(this);

        // --- Create the Platform using flatdisc.glb ---
        // Clone the scene from the loaded GLTF data
        const platformMesh = this.modelGltf["smooth_flat_disc"].scene.children[0].clone();

        // Find the mesh within the cloned scene (adjust if your GLB has a different structure)
        this.platform = platformMesh;
        if (!this.platform) {
             console.error("Could not find mesh inside flatdisc.glb scene");
             // Fallback or error handling
             this.platform = this.third.add.box({ name: 'platform_fallback', width: 10, height: 0.5, depth: 10 }, { lambert: { color: 'red' } });
        } else {
            this.platform.name = 'platform_disc';
        }


        this.third.add.existing(this.platform); // Add the mesh to the scene
        this.platform.position.set(0, 5, 0); // Set desired position
        this.platform.receiveShadow = true; // Allow platform to receive shadows
        this.platform.castShadow = false; // Platform itself likely doesn't need to cast shadows

        // Add physics using a HULL shape
        this.third.physics.add.existing(this.platform, {
            shape: 'hull',    // Use hull shape
            mesh: this.platform, // Pass the mesh object for hull generation
            mass: 0,          // Static object
            collisionFlags: 2, // Kinematic object (allows movement via rotation)
            // Add friction/restitution if desired
            friction: 0.8,
            restitution: 0.2
        });
        console.log("Platform created using flatdisc.glb with hull shape.");
        // --- End Platform Creation ---


        // Create Player (ensure CreatePlayer waits for assets if needed)
        await CreatePlayer(this); // Assuming this sets up player physics correctly

        // Create the Death Plane for cleanup (no changes needed here)
        this.createDeathPlane();

        // Spawn Items Periodically
        this.time.addEvent({
            delay: 2000,       // Interval for spawning items
            callback: this.spawnItem, // Use the new item spawning function
            callbackScope: this,
            loop: true
        });

        // Setup Collision Listener for Death Plane
        this.deathPlane.body.on.collision((otherObject, event) => {
            // Check if the colliding object is an item using userData
            if (otherObject.userData?.isItem) { // Check for 'isItem'
                this.handleItemDeathPlaneCollision(otherObject); // Use the item handler
            }
             // You might also want to check for player collision here if needed
             // else if (otherObject === this.player) { /* handle player death */ }
        });

        this.isPlaying = true

        console.log("Scene Created. Death plane and collision listener active for items.");
    }

    /**
     * Creates a static trigger volume below the platform to catch falling items.
     */
    createDeathPlane() {
        const deathPlaneY = -10;
        const deathPlaneSize = 100;

        this.deathPlane = new ExtendedObject3D();
        this.deathPlane.position.set(0, deathPlaneY, 0);
        this.third.add.existing(this.deathPlane);

        this.third.physics.add.existing(this.deathPlane, {
            shape: 'box',
            width: deathPlaneSize,
            height: 0.1,
            depth: deathPlaneSize,
            mass: 0,
            collisionFlags: 4, // Static sensor (CF_NO_CONTACT_RESPONSE)
        });
        this.deathPlane.userData.isDeathPlane = true; // Identify the death plane
        console.log("Death Plane created at y=", deathPlaneY);
    }


    /**
     * Spawn an Item (Noodles, Leek, Onion, Prawn) with a Billboard Mesh
     */
    spawnItem() {
        // Don't spawn if maximum count reached or billboard model not loaded
        if (Object.keys(this.items).length >= this.maxItems) {
            console.warn("Max items reached or billboard model not ready. Skipping spawn.");
            return;
        }

        const spawnId = this.spawnCount++; // Unique ID for this item

        // --- Create Item Object ---
        const itemContainer = new ExtendedObject3D(); // Use ExtendedObject3D for easy access
        itemContainer.name = `item_${spawnId}`;
        itemContainer.spawnid = spawnId; // Store the spawn ID



        // Select a random item type
        const itemType = this.itemTypes[Math.floor(Math.random() * this.itemTypes.length)];
        itemContainer.userData.itemType = itemType; // Store type in userData

        // Find the mesh and apply the correct texture
        const mesh = this.modelGltf["boxboard"].scene.children[0].clone();
        if (mesh && mesh.material) {
            const texture = this.itemTextures[itemType];
            if (texture) {
                // Clone the material to avoid changing all instances, then set the map
                mesh.material = CreateBillboardMaterial(texture) 
                // mesh.material.map = texture;
                mesh.material.transparent = true;
                mesh.material.alphaTest = 0.5; // Adjust as needed
                mesh.material.needsUpdate = true; // Important!
                 // Optional: Make transparent if texture has alpha
            } else {
                console.warn(`Texture for ${itemType} not found!`);
                 // Optional: Apply a default/error texture or color
                mesh.material = new THREE.MeshBasicMaterial({ color: 0xff00ff });
            }
            //mesh.castShadow = true; // Billboard mesh can cast shadow
        }
        itemContainer.add 

        itemContainer.add(mesh); // Add the textured model to the container

        // Set initial position
        const spawnArea = 4.5; // Half-width of the platform's spawn zone
        const x = (Math.random() - 0.5) * 2 * spawnArea;
        const z = (Math.random() - 0.5) * 2 * spawnArea;
        itemContainer.position.set(x, 10, z); // Spawn above the platform

        this.third.add.existing(itemContainer); // Add the item container to the scene

        // --- Add Physics (Sphere Collider) ---
        const radius = 0.3; // Physical radius of the item collider
        itemContainer.userData.isItem = true; // Identify this object as an item

        this.third.physics.add.existing(itemContainer, {
            shape: 'sphere', // Use a sphere shape for collision
            radius: radius,
            mass: 0.5,
            restitution: 0.5,
            friction: 0.5
        });

        // CCD settings (optional but good for small fast objects)
        itemContainer.body.setCcdMotionThreshold(1e-7);
        itemContainer.body.setCcdSweptSphereRadius(radius * 0.5);

        // *** Add to the item tracking dictionary ***
        this.items[spawnId] = itemContainer;
        // console.log(`Spawned item: ${itemType} with ID ${spawnId}`);
    }


    /**
     * Handles collision between an item and the death plane.
     */
    handleItemDeathPlaneCollision(itemObject) {
        // Double check if the item still exists in our dictionary
        if (this.items[itemObject.spawnid]) {
            // console.log(`Collision detected: ${itemObject.name} hit death plane. Removing.`);
            const spawnId = itemObject.spawnid;

            // Remove from physics and scene
            this.third.destroy(itemObject);

            // *** Remove from the item tracking dictionary ***
            delete this.items[spawnId];
            // console.log(`Item ${spawnId} removed from dictionary.`);
        } else {
            // console.log(`Collision detected for ${itemObject.name}, but it was already removed or being removed.`);
        }
    }


    /**
     * Grab an Item - Placeholder for removing item upon interaction
     * The actual logic for attaching to player/throwing goes elsewhere.
     */
    grabItem(player, itemToGrab) {
        // Ensure the item object is valid and exists in our tracking
        if (!itemToGrab || !itemToGrab.body || !this.items[itemToGrab?.spawnid]) {
            // console.warn(`Attempted to grab invalid or already removed item: ${itemToGrab?.name}`);
            return null; // Indicate failure or return nothing
        }

        const spawnId = itemToGrab.spawnid;
        const itemType = itemToGrab.userData.itemType;
        console.log(`Grabbing and removing ${itemToGrab.name} (Type: ${itemType}, ID: ${spawnId})`);

        // Remove from physics and scene
        this.third.destroy(itemToGrab);
        // *** Remove from the item tracking dictionary ***
        delete this.items[spawnId];

        return { type: itemType, id: spawnId };
    }


    update(time, delta) {
        if (!this.isPlaying) return

        this.playerController?.update(time, delta)
        
        // Tilt the Platform based on player position
        try {
            const localPlayerPos = this.platform.worldToLocal(this.player.position.clone());
            const k = 0.05; // Tilt sensitivity factor
            const maxTilt = Math.PI / 12; // Maximum tilt angle

            // Calculate tilt angles based on player's local position on the platform
            // Clamp the values to prevent excessive tilting
            const tiltX = -THREE.MathUtils.clamp(-k * localPlayerPos.z, -maxTilt, maxTilt);
            const tiltZ = -THREE.MathUtils.clamp(k * localPlayerPos.x, -maxTilt, maxTilt);
            this.platform.rotation.set(tiltX, 0, tiltZ);

            // **Crucially, signal the physics body needs updating** because we moved a kinematic object
            this.platform.body.needUpdate = true;
        } catch (error) {
             console.error("Error during platform tilt calculation:", error);
             // This might happen briefly if player/platform are destroyed mid-update
        }

        
    }
}