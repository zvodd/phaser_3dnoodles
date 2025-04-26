import { Vector3 } from 'three';
import * as THREE from 'three';
// No longer needs Phaser import directly
// Assumes RecipeUI class is imported in the main scene file

export default class Wok {
    /**
     * Creates a visually animated wok object that moves along the Z-axis
     * and delegates item collision handling to a RecipeUI instance.
     * @param {Phaser.Scene} scene The Phaser 3D scene instance (specifically, one using Enable3D).
     * @param {string} wokId A unique identifier for this wok (e.g., 'leftWok', 'rightWok').
     * @param {RecipeUI} recipeUIInstance The RecipeUI instance responsible for handling this wok's recipe logic and UI.
     * @param {THREE.Vector3} [position=new Vector3(0, 0, 0)] Initial position (X, Y). Z is the animation center.
     * @param {object} [animationConfig] Configuration for the movement tween.
     * @param {number} [animationConfig.range=10] Total distance to move back and forth (Z-axis).
     * @param {number} [animationConfig.duration=4000] Duration of one full cycle.
     * @param {string} [animationConfig.ease='Sine.easeInOut'] Easing function.
     */
    constructor(
        scene,
        wokId,
        recipeUIInstance, // Added: Instance of RecipeUI
        position = new Vector3(0, 0, 0),
        animationConfig = {}
    ) {
        this.scene = scene;
        this.wokId = wokId;
        this.recipeUI = recipeUIInstance; // Store the RecipeUI instance
        this.wokObject = null; // Will hold the THREE.Object3D
        this.physicsBody = null; // Will hold the AmmoJS physics body
        this.tween = null; // Will hold the Phaser Tween

        // --- Animation Config ---
        const animDefaults = { range: 10, duration: 4000, ease: 'Sine.easeInOut' };
        this.animConfig = { ...animDefaults, ...animationConfig };
        this.initialPosition = position.clone();

        // --- Initialization ---
        this.createWokModel();
        this._createPhysicsBody(); // Create physics body *after* model exists

        // Start animation if model creation was successful
        if (this.wokObject) {
            this.startAnimation();
        }

        // Add collision listener *after* physics body is created
        if (this.physicsBody) {
            // Listen for collisions on the physics body
            this.physicsBody.on.collision((otherObject, event) => {
                this._handleCollision(otherObject, event);
            });
        } else {
            console.warn(`Wok (${this.wokId}): Physics body not created, collision disabled.`);
        }
    }

    /**
     * Creates the wok mesh from the preloaded 'wok' GLTF model.
     * @private
     */
    createWokModel() {
        // Access the preloaded GLTF data
        const wokGltf = this.scene.models['wok'];
        if (!wokGltf?.scene) {
            console.error(`Wok (${this.wokId}): Model ('wok.glb') not found.`);
            return;
        }
        // Clone the model's mesh/group
        this.wokObject = wokGltf.scene.children[0].clone();
        if (!this.wokObject) {
            console.error(`Wok (${this.wokId}): Could not extract mesh from GLTF.`);
            return;
        }
        // Set properties
        this.wokObject.name = `scene_wok_${this.wokId}`;
        this.wokObject.position.copy(this.initialPosition);
        this.wokObject.rotation.set(0, 0, 0);
        this.wokObject.scale.set(5, 5, 5); // Keep the scale from your previous version

        // Enable shadows
        this.wokObject.traverse(child => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        // Add userData for potential identification later
        this.wokObject.userData.isWok = true;
        this.wokObject.userData.wokId = this.wokId;

        // Add to the scene
        this.scene.third.add.existing(this.wokObject);
        console.log(`Wok (${this.wokId}) object added at`, this.initialPosition);
    }

    /**
     * Creates the physics body for the wok using Enable3D/AmmoJS.
     * @private
     */
    _createPhysicsBody() {
        if (!this.wokObject) {
            console.error(`Wok (${this.wokId}): Cannot create physics body, wokObject is null.`);
            return;
        }
        // Add physics using the settings from your previous version
        this.scene.third.physics.add.existing(this.wokObject, {
            shape: 'hull',          // Use hull shape for potentially complex geometry
            mesh: this.wokObject,   // Base shape on the visual mesh
            mass: 0,                // Kinematic bodies have 0 mass
            collisionFlags: 2,      // 2 = KINEMATIC_OBJECT (moved by code/tween, not physics forces)
            friction: 0.8,
            restitution: 0.2
        });
        // Store reference to the physics body
        this.physicsBody = this.wokObject.body;

        if (this.physicsBody) {
            console.log(`Wok (${this.wokId}): Created KINEMATIC hull physics body.`);
        } else {
            console.error(`Wok (${this.wokId}): Failed to create physics body.`);
        }
    }

    /**
     * Starts the back-and-forth Z-axis animation using Phaser's Tween Manager.
     * @private
     */
    startAnimation() {
        if (!this.wokObject) return; // Don't animate if object doesn't exist

        // Calculate animation start/end points
        const halfRange = this.animConfig.range / 2;
        const startZ = this.initialPosition.z - halfRange;
        const targetZ = this.initialPosition.z + halfRange;

        // Set initial position for the tween
        this.wokObject.position.z = startZ;

        // Stop existing tween if any
        if (this.tween) this.tween.stop();

        // Create the tween
        this.tween = this.scene.tweens.add({
            targets: this.wokObject.position, // Target the position property
            z: targetZ,                       // Animate the z value
            duration: this.animConfig.duration / 2, // Duration for one way
            ease: this.animConfig.ease,       // Easing function
            yoyo: true,                       // Go back and forth
            repeat: -1                        // Repeat indefinitely
        });
        console.log(`Wok (${this.wokId}) animation started (Z: ${startZ.toFixed(2)} to ${targetZ.toFixed(2)}).`);
    }

    /**
     * Handles collision events detected by the physics body.
     * Delegates item collision logic to the associated RecipeUI instance.
     * @param {ExtendedObject3D} otherObject The object that collided with the wok.
     * @param {object} event The collision event data provided by AmmoJS.
     * @private
     */
    _handleCollision(otherObject, event) {
        // Check if the colliding object is marked as an item and has a type defined
        if (otherObject.userData?.isItem && typeof otherObject.userData?.itemType === 'string') {
            const itemType = otherObject.userData.itemType;
            console.log(`Wok (${this.wokId}) collided with item: ${itemType}. Delegating to RecipeUI...`);

            // Delegate the handling logic (checking recipe, updating UI, destroying item)
            // to the associated RecipeUI instance.
            if (this.recipeUI && typeof this.recipeUI.handleItem === 'function') {
                // Pass the item's type and the item's physics object itself
                this.recipeUI.handleItem(itemType, otherObject);
            } else {
                // Log a warning if the RecipeUI or its handler is missing
                console.warn(`Wok (${this.wokId}): RecipeUI handler not found or invalid.`);
                // As a fallback, you might want to destroy the item anyway,
                // but it's better handled within RecipeUI or ItemManager.
                // this.scene.itemManager?.handleCollision(otherObject);
            }
        }
        // If the collision is not with a valid item, ignore it.
    }

    /**
     * Update method called by the scene's update loop (typically every frame).
     */
    update() {
        // IMPORTANT: For kinematic bodies moved by tweens or code,
        // you MUST notify Ammo.js that its state needs updating each frame
        // so it can correctly calculate collisions with dynamic objects.
        if (this.physicsBody) {
            this.physicsBody.needUpdate = true;
        }
        // Add any other per-frame logic for the wok itself here if needed.
    }

    /**
     * Cleans up the wok object, its physics body, animation tween,
     * and triggers the destruction of the associated RecipeUI.
     */
    destroy() {
        console.log(`Destroying Wok (${this.wokId})...`);
        // Stop the animation tween
        if (this.tween) {
            this.tween.stop();
            this.tween = null;
        }
        // Destroy the physics body *before* the visual object
        // Use the Enable3D physics destroy method
        if (this.physicsBody) {
            this.scene.third.physics.destroy(this.wokObject); // This removes the body
            this.physicsBody = null;
        }
        // Destroy the visual THREE.Object3D
        if (this.wokObject) {
            this.scene.third.destroy(this.wokObject); // This cleans up geometry/material
            this.wokObject = null;
        }
        // Destroy the associated RecipeUI instance
        if (this.recipeUI) {
            this.recipeUI.destroy();
            this.recipeUI = null;
        }
        // Clear references to prevent memory leaks
        this.scene = null;
    }
}
