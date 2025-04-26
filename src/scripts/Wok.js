import { Vector3 } from 'three';
import * as THREE from 'three';
// Note: No 'Item' class import needed yet, but might be added later

export default class Wok {
    /**
     * Creates a visually animated wok object that moves along the Z-axis.
     * @param {Phaser.Scene} scene The Phaser 3D scene instance (specifically, one using Enable3D).
     * @param {THREE.Vector3} [position=new Vector3(0, 0, 0)] Initial position (X, Y). The Z position will be the center of the animation.
     * @param {object} [animationConfig] Configuration for the movement tween.
     * @param {number} [animationConfig.range=10] Total distance to move back and forth (Z-axis).
     * @param {number} [animationConfig.duration=4000] Duration of one full cycle (back and forth).
     * @param {string} [animationConfig.ease='Sine.easeInOut'] Easing function for movement.
     */
    constructor(
        scene,
        position = new Vector3(0, 0, 0), // Default X=0, Y=0, Z=0 (center of animation)
        animationConfig = {}
    ) {
        this.scene = scene;
        this.wokObject = null; // Will hold the THREE.Object3D
        this.tween = null; // Will hold the Phaser Tween

        // Default animation settings for Z-axis movement
        const defaults = {
            range: 10,       // How far it moves along Z
            duration: 4000,  // Time for one full cycle
            ease: 'Sine.easeInOut'
        };
        // Merge user config with defaults
        this.animConfig = { ...defaults, ...animationConfig };

        // Store the intended center position of the animation
        this.initialPosition = position.clone();

        // Create the 3D model
        this.createWokModel();
        this._createPhysicsBody()

        // If the model was created successfully, start its animation
        if (this.wokObject) {
            this.startAnimation();
        }
    }

    /**
     * Creates the wok mesh from the preloaded 'wok' GLTF model.
     * @private
     */
    createWokModel() {
        // Access the preloaded GLTF data from the scene's model cache
        const wokGltf = this.scene.models['wok'];

        // Error handling if the model wasn't loaded
        if (!wokGltf?.scene) {
            console.error("Wok model ('wok.glb') not found or loaded in scene.models. Make sure it's preloaded.");
            return; // Stop if model is missing
        }

        // Clone the first child of the GLTF scene, assuming it's the main mesh/group
        // You might need to adjust this if your GLTF has a different structure
        this.wokObject = wokGltf.scene.children[0].clone();

        // Error handling if cloning failed
        if (!this.wokObject) {
            console.error("Could not extract mesh/object from wok GLTF scene.");
            return; // Stop if cloning failed
        }

        // Assign a name for easier debugging
        this.wokObject.name = 'scene_wok';

        // Set the initial position (center of animation)
        this.wokObject.position.copy(this.initialPosition);

        // Set initial rotation (optional, adjust if the model faces the wrong way)
        // Example: Rotate 90 degrees around Y if it's facing sideways
        // this.wokObject.rotation.set(0, Math.PI / 2, 0);
        this.wokObject.rotation.set(0, 0, 0); // Default: no initial rotation
        this.wokObject.scale.set(5,5,5);

        // Enable shadows for the wok and its children
        this.wokObject.traverse(child => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                // Optional: Add physics body here if needed later for catching
                // this.scene.third.physics.add.existing(child, { shape: 'concave' });
            }
        });

        // Add the wok object to the Enable3D scene
        this.scene.third.add.existing(this.wokObject);

        console.log("Wok object added to the scene at", this.initialPosition);
    }

    /**
     * Creates the physics body for the platform, matching original settings.
     * (Identical to the physics setup in MainScene's createPlatform)
     * @private
     */
    _createPhysicsBody() {
        if (!this.wokObject) return;
        // possible complexShapes::  ['plane', 'hull', 'hacd', 'vhacd', 'convexMesh', 'concaveMesh'];
        this.scene.third.physics.add.existing(this.wokObject, {
            shape: 'hull', 
            mesh: this.wokObject,
            mass: 0,
            collisionFlags: 2,
            friction: 0.8,
            restitution: 0.2
        });
        this.physicsBody = this.wokObject.body;
        console.log("Platform created with KINEMATIC hull shape (original settings).");
    }

    /**
     * Starts the back-and-forth Z-axis animation using Phaser's Tween Manager.
     * @private
     */
    startAnimation() {
        // Don't try to animate if the object doesn't exist
        if (!this.wokObject) return;

        // Calculate the start and end points of the Z animation
        const halfRange = this.animConfig.range / 2;
        const startZ = this.initialPosition.z - halfRange; // Starting Z position
        const targetZ = this.initialPosition.z + halfRange; // Ending Z position

        // Set the wok's initial Z position for the tween
        this.wokObject.position.z = startZ;

        // Stop any existing tween on this object to prevent conflicts
        if (this.tween) {
            this.tween.stop();
        }

        // Create the Phaser tween for the Z-axis
        this.tween = this.scene.tweens.add({
            targets: this.wokObject.position, // Target the position object
            z: targetZ,                       // Animate the 'z' property
            duration: this.animConfig.duration / 2, // Duration for one way
            ease: this.animConfig.ease,       // Easing function
            yoyo: true,                       // Go back and forth
            repeat: -1                        // Repeat indefinitely
        });

        console.log(`Wok animation started (Z-axis: ${startZ.toFixed(2)} to ${targetZ.toFixed(2)}).`);
    }

    /**
     * Placeholder for catching items. To be implemented later.
     * @param {any} item The item object that enters the wok's trigger area.
     */
    catchItem(item) {
        console.log("Wok caught an item:", item);
        // Add logic here: score points, destroy item, play sound, etc.
    }

    update(){
        this.physicsBody.needUpdate = true;
    }

    /**
     * Cleans up the wok object and its animation tween. Call this when the wok is no longer needed.
     */
    destroy() {
        console.log("Destroying Wok...");
        // Stop and remove the tween
        if (this.tween) {
            this.tween.stop();
            this.tween = null;
        }
        // Remove the 3D object from the scene and destroy it
        if (this.wokObject) {
            // Check if it has a physics body and remove that first if necessary
            // if (this.wokObject.body) {
            //     this.scene.third.physics.destroy(this.wokObject);
            // }
            // Remove from scene graph and dispose geometry/material
            this.scene.third.destroy(this.wokObject);
        }
        // Clear references
        this.wokObject = null;
        this.scene = null; // Release reference to the scene
    }
}
