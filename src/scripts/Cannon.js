import { Vector3 } from 'three'; 

export default class Cannon {
    /**
     * Creates a visually animated cannon object.
     * @param {Phaser.Scene} scene The Phaser 3D scene instance.
     * @param {THREE.Vector3} [position=new Vector3(0, 5, -20)] Initial position.
     * @param {object} [animationConfig] Configuration for the movement tween.
     * @param {number} [animationConfig.range=10] Total distance to move side-to-side (X-axis).
     * @param {number} [animationConfig.duration=3000] Duration of one full cycle (back and forth).
     * @param {string} [animationConfig.ease='Sine.easeInOut'] Easing function for movement.
     */
    constructor(
        scene,
        position = new Vector3(0, -5, -50),
        animationConfig = {}
    ) {
        this.scene = scene;
        this.cannonObject = null;
        this.tween = null;

        // Default animation settings
        const defaults = {
            range: 10,
            duration: 3000,
            ease: 'Sine.easeInOut'
        };
        this.animConfig = { ...defaults, ...animationConfig }; // Merge user config with defaults

        this.initialPosition = position.clone(); // Store initial position

        this.createCannonModel();
        if (this.cannonObject) {
            this.startAnimation();
        }
    }

    /**
     * Creates the cannon mesh from the preloaded model.
     * @private
     */
    createCannonModel() {
        const cannonGltf = this.scene.models['cannon']; // Access models from the scene

        if (!cannonGltf?.scene) {
            console.error("Cannon model ('cannon.glb') not found or loaded in scene.models.");
            return;
        }

        // Clone the main mesh/group from the loaded GLTF scene
        // Adjust children[0] if your GLB has a different structure
        this.cannonObject = cannonGltf.scene.children[0].clone();
        if (!this.cannonObject) {
             console.error("Could not extract mesh from cannon GLTF scene.");
             return;
        }

        this.cannonObject.name = 'scene_cannon';
        this.cannonObject.position.copy(this.initialPosition);
        this.cannonObject.rotation.set(0, 3.141, 0);

        // Optional: Ensure shadows are cast/received appropriately if needed
        this.cannonObject.traverse(child => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true; // Cannons might receive shadows
            }
        });

        // Add the cannon object to the scene
        this.scene.third.add.existing(this.cannonObject);
        console.log("Cannon object added to the scene at", this.initialPosition);
    }

    /**
     * Starts the back-and-forth X-axis animation.
     * @private
     */
    startAnimation() {
        if (!this.cannonObject) return;

        const halfRange = this.animConfig.range / 2;
        const targetX = this.initialPosition.x + halfRange;

        this.cannonObject.position.x = this.initialPosition.x - halfRange


        // Stop existing tween if any
        if (this.tween) {
            this.tween.stop();
        }

        // Create the tween using the scene's tween manager
        this.tween = this.scene.tweens.add({
            targets: this.cannonObject.position, // Target the position object directly
            x: targetX, // Move to one side
            duration: this.animConfig.duration / 2, // Half duration for one way
            ease: this.animConfig.ease,
            yoyo: true, // Go back automatically
            repeat: -1, // Repeat indefinitely
        });
        console.log("Cannon animation started.");
    }

    /**
     * Cleans up the cannon object and its animation.
     */
    destroy() {
        console.log("Destroying Cannon...");
        if (this.tween) {
            this.tween.stop();
            this.tween = null;
        }
        if (this.cannonObject) {
            // Make sure it's part of the scene graph before destroying
            if (this.cannonObject.parent) {
                 this.scene.third.destroy(this.cannonObject);
            }
            this.cannonObject = null;
        }
        this.scene = null; // Release scene reference
    }
}