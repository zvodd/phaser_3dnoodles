// src/BillboardItemManager.js
import { THREE, ExtendedObject3D } from '@enable3d/phaser-extension';
import { SphereGeometry, ShadowMaterial, MeshBasicMaterial, Mesh } from 'three';
import CreateBillboardMaterial from './billboard_material.js'; // Assuming this path is correct

export default class BillboardItemManager {
    /**
     * Manages billboard items in the scene.
     * @param {Scene3D} scene The main Phaser 3D scene instance.
     * @param {object} config Configuration options.
     * @param {number} config.maxItems Maximum number of items allowed.
     * @param {string[]} config.itemTypes Array of item type names.
     * @param {object} models Dictionary of loaded GLTF models (keyed by name).
     * @param {object} textures Dictionary of loaded textures (keyed by item type).
     */
    constructor(scene, config, models, textures) {
        this.scene = scene;
        this.config = config;
        this.models = models; // Store reference to loaded models
        this.textures = textures; // Store reference to loaded textures

        this.items = {}; // Dictionary to track active items { spawnId: itemObject }
        this.spawnCount = 0;

        // Pre-create shadow geometry/material for efficiency
        this.shadowSphereGeometry = new SphereGeometry(0.3, 16, 8); // Match physics radius ideally
        this.shadowMaterial = new ShadowMaterial({ opacity: 0.7 }); // Specific material for shadows
    }

    /**
     * Spawns a new random billboard item.
     */
    spawnItem() {
        if (Object.keys(this.items).length >= this.config.maxItems) {
            // console.warn("Max items reached. Skipping spawn.");
            return;
        }

        // Ensure the necessary model is loaded
        if (!this.models["boxboard"]) {
            console.warn("Billboard model 'boxboard' not loaded yet. Skipping spawn.");
            return;
        }

        const spawnId = this.spawnCount++;
        const itemType = this.config.itemTypes[Math.floor(Math.random() * this.config.itemTypes.length)];
        const texture = this.textures[itemType];

        if (!texture) {
             console.warn(`Texture for ${itemType} not found! Skipping spawn.`);
             return; // Don't spawn if texture is missing
        }

        // --- Create Item Container ---
        const itemContainer = new ExtendedObject3D();
        itemContainer.name = `item_${itemType}_${spawnId}`;
        itemContainer.spawnid = spawnId; // Store the spawn ID for tracking
        itemContainer.userData.isItem = true; // Identify this object as an item
        itemContainer.userData.itemType = itemType; // Store type in userData

        // --- Create Billboard Visual Mesh ---
        const billboardMesh = this.models["boxboard"].scene.children[0].clone();
        if (billboardMesh && billboardMesh.material) {
            // Clone the material to avoid affecting other instances, then set the map
            billboardMesh.material = CreateBillboardMaterial(texture);
            billboardMesh.material.transparent = true; // Ensure transparency is enabled
            billboardMesh.material.alphaTest = 0.5; // Adjust for texture transparency cutoff
            billboardMesh.material.needsUpdate = true;
            billboardMesh.castShadow = false; // The visual billboard does NOT cast shadow
            billboardMesh.receiveShadow = false; // Usually doesn't need to receive shadows itself
        } else {
             console.error("Could not find mesh or material in boxboard model");
             // Fallback or skip adding mesh
             billboardMesh.material = new MeshBasicMaterial({ color: 0xff00ff, wireframe: true }); // Error indicator
        }
        itemContainer.add(billboardMesh);

        // --- Create Shadow Sphere ---
        const shadowSphere = new Mesh(this.shadowSphereGeometry, this.shadowMaterial);
        shadowSphere.name = `item_shadow_${spawnId}`;
        shadowSphere.castShadow = true;      // This sphere casts the shadow
        shadowSphere.receiveShadow = false; // Doesn't need to receive shadows
        // shadowSphere.visible = false; // ShadowMaterial makes it effectively invisible except for shadow
        itemContainer.add(shadowSphere); // Add shadow sphere to the container

        // --- Position and Add to Scene ---
        const spawnArea = 4.5; // Half-width of the platform's spawn zone
        const x = (Math.random() - 0.5) * 2 * spawnArea;
        const z = (Math.random() - 0.5) * 2 * spawnArea;
        itemContainer.position.set(x, 10, z); // Spawn above the platform

        this.scene.third.add.existing(itemContainer);

        // --- Add Physics (Sphere Collider for the container) ---
        const radius = 0.3; // Physical radius of the item collider
        this.scene.third.physics.add.existing(itemContainer, {
            shape: 'sphere',
            radius: radius,
            mass: 0.5,
            restitution: 0.5,
            friction: 0.5
        });

        // Optional CCD settings
        itemContainer.body.setCcdMotionThreshold(1e-7);
        itemContainer.body.setCcdSweptSphereRadius(radius * 0.5);

        // --- Track the Item ---
        this.items[spawnId] = itemContainer;
        // console.log(`Spawned item: ${itemType} with ID ${spawnId}`);
    }

    /**
     * Removes an item from the scene, physics, and tracking.
     * @param {number} spawnId The ID of the item to remove.
     * @returns {ExtendedObject3D | null} The removed item object or null if not found.
     */
    removeItem(spawnId) {
        const itemObject = this.items[spawnId];
        if (itemObject) {
            // console.log(`Removing item ${itemObject.name} (ID: ${spawnId})`);
            this.scene.third.destroy(itemObject); // Removes from scene and physics
            delete this.items[spawnId]; // Remove from tracking
            return itemObject;
        } else {
            // console.warn(`Attempted to remove non-existent item with ID ${spawnId}`);
            return null;
        }
    }

    /**
     * Handles collision logic, typically when an item hits the death plane.
     * @param {ExtendedObject3D} itemObject The item object that collided.
     */
    handleCollision(itemObject) {
        // Double check if the item still exists in our tracking (collision events can be delayed)
        if (itemObject && typeof itemObject.spawnid !== 'undefined' && this.items[itemObject.spawnid]) {
            // console.log(`Collision detected for ${itemObject.name}. Removing.`);
            this.removeItem(itemObject.spawnid);
        } else {
             // console.log(`Collision detected for ${itemObject?.name}, but it was already removed or invalid.`);
        }
    }

    /**
     * Handles the action of "grabbing" an item (removes it and returns its info).
     * @param {ExtendedObject3D} itemToGrab The item object being grabbed.
     * @returns {{type: string, id: number} | null} Item info or null if invalid.
     */
    grabItem(itemToGrab) {
        if (!itemToGrab || !itemToGrab.body || typeof itemToGrab.spawnid === 'undefined' || !this.items[itemToGrab.spawnid]) {
             // console.warn(`Attempted to grab invalid or non-tracked item: ${itemToGrab?.name}`);
            return null;
        }

        const spawnId = itemToGrab.spawnid;
        const itemType = itemToGrab.userData.itemType;
        console.log(`Grabbing ${itemToGrab.name} (Type: ${itemType}, ID: ${spawnId})`);

        this.removeItem(spawnId);

        return { type: itemType, id: spawnId };
    }

    /**
     * Update loop for the item manager (e.g., for custom animations or logic).
     * Currently not used for billboarding as CreateBillboardMaterial handles it.
     * @param {number} time The current time.
     * @param {number} delta The delta time in ms.
     */
    // update(time, delta) {}
}