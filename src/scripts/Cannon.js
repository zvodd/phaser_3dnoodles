import { Vector3 } from 'three';
import * as THREE from 'three';
import Cannonball from './Cannonball'; // Adjust path based on your project structure

export default class Cannon {
    /**
     * Creates a visually animated cannon object.
     * @param {Phaser.Scene} scene The Phaser 3D scene instance.
     * @param {THREE.Vector3} [position=new Vector3(0, -5, -50)] Initial position.
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
        this.animConfig = { ...defaults, ...animationConfig };

        this.initialPosition = position.clone();

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
        const cannonGltf = this.scene.models['cannon'];

        if (!cannonGltf?.scene) {
            console.error("Cannon model ('cannon.glb') not found or loaded in scene.models.");
            return;
        }

        this.cannonObject = cannonGltf.scene.children[0].clone();
        if (!this.cannonObject) {
            console.error("Could not extract mesh from cannon GLTF scene.");
            return;
        }

        this.cannonObject.name = 'scene_cannon';
        this.cannonObject.position.copy(this.initialPosition);
        this.cannonObject.rotation.set(0, 3.141, 0); // 180 degrees around Y-axis

        this.cannonObject.traverse(child => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

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

        this.cannonObject.position.x = this.initialPosition.x - halfRange;

        if (this.tween) {
            this.tween.stop();
        }

        this.tween = this.scene.tweens.add({
            targets: this.cannonObject.position,
            x: targetX,
            duration: this.animConfig.duration / 2,
            ease: this.animConfig.ease,
            yoyo: true,
            repeat: -1
        });
        console.log("Cannon animation started.");
    }

    /**
     * Fires a cannonball from the cannon’s barrel.
     */
    fire() {
        // Define the offset from the cannon’s origin to the barrel tip (adjust as needed)
        const offset = 5; // Distance in units, tweak based on cannon model size
        const localDirection = (new THREE.Vector3(0, 6, -1)).normalize(); // Barrel along local +Z

        // Calculate the firing direction in world space
        const worldDirection = localDirection.clone().applyQuaternion(this.cannonObject.quaternion);

        // Calculate spawn position: current position + offset along firing direction
        const spawnPosition = this.cannonObject.position.clone().add(
            worldDirection.clone().multiplyScalar(offset)
        );

        // Define cannonball speed
        const speed = 35.5 + (Math.random() * 2.0); // Units per second, adjust as desired
        const velocity = worldDirection.clone().multiplyScalar(speed);

        // Create and fire the cannonball
        const cannonball = new Cannonball(this.scene, spawnPosition, velocity);
    }

    /**
     * There is RARELY a reason to implement cleanup in javascript.
     */
    destroy() { }
}