import * as THREE from 'three';
import { ExtendedObject3D } from '@enable3d/phaser-extension'; // Needed for type hints

export default class Cannonball {
    /**
     * Creates a black sphere cannonball with a physics body.
     * @param {Phaser.Scene} scene The Phaser 3D scene instance (specifically, one using Enable3D).
     * @param {THREE.Vector3} position Initial position of the cannonball.
     * @param {THREE.Vector3} velocity Initial velocity of the cannonball.
     */
    constructor(scene, position, velocity) {
        this.scene = scene;
        this.sphere = null; // Initialize sphere property
        this.isDestroyed = false; // Flag to prevent multiple destroy calls

        // --- Create Mesh ---
        const radius = 0.5;
        const geometry = new THREE.SphereGeometry(radius, 16, 16);
        const material = new THREE.MeshLambertMaterial({ color: 0x111111 }); // Dark grey/black
        this.sphere = new THREE.Mesh(geometry, material);
        this.sphere.position.copy(position);
        this.sphere.castShadow = true;
        this.sphere.name = 'cannonball';
        this.sphere.userData = { isCannonball: true };

        // Add to the scene
        this.scene.third.add.existing(this.sphere);

        // --- Add Physics ---
        this.scene.third.physics.add.existing(this.sphere, {
            shape: 'sphere',
            radius: radius,
            mass: 1,
            restitution: 0.5,
            friction: 0.5
        });

        // --- Set Initial Velocity & Collision Listener ---
        if (this.sphere.body) {
             this.sphere.body.setVelocity(velocity.x, velocity.y, velocity.z);
             // Enable collision listener - event is expected to be a string like 'start'
             this.sphere.body.on.collision((otherObject, event) => {
                 // Pass the event string to the handler
                 this._handleCollision(otherObject, event);
             });
        } else {
            console.error("Cannonball physics body not created!");
        }

        // REMOVED: Auto-destroy timer - destruction now happens on impact
        // this.scene.time.delayedCall(10000, this.destroy, [], this);
    }

    /**
     * Handles collision events for the cannonball based on event string.
     * @param {ExtendedObject3D} otherObject The object the cannonball collided with.
     * @param {string} event The collision event type string (e.g., 'start', 'end').
     * @private
     */
    _handleCollision(otherObject, event) {
        // Prevent processing if already destroyed or not the start of a collision
        if (this.isDestroyed || event !== 'start') {
            return;
        }

        // Check if the collision is with the platform
        const isPlatform = otherObject.name === 'platform_disc' || otherObject.name === 'platform_fallback';

        if (isPlatform) {
            // console.log('Cannonball hit platform (start event)!'); // Debug log

            // --- Calculate Impact Details (Simplified) ---
            // Use the cannonball's current position as the collision point
            const collisionPoint = this.sphere.position.clone();

            // Use only the Y-velocity for the impulse vector (simplified approach)
            const yVelocity = this.sphere.body.velocity.y;
            const impulseVector = new THREE.Vector3(0, yVelocity, 0); // Simplified impulse

            // --- Emit Scene Event ---
            this.scene.events.emit('cannonball_hit_platform', {
                collisionPoint: collisionPoint,   // World coordinates (cannonball position)
                impulseVector: impulseVector      // Simplified impulse vector (Y component only)
            });

            // --- Trigger Destruction ---
            this._destroyAndExplode();
        }
    }

    /**
     * Handles the destruction sequence, including placeholder for effects.
     * @private
     */
    _destroyAndExplode() {
        if (this.isDestroyed) return; // Prevent multiple calls

        // TODO: Spawn explosion effect here at this.sphere.position

        this.destroy(); // Call the cleanup method
    }


    /**
     * Cleans up the cannonball mesh and physics body.
     */
    destroy() {
        // Prevent multiple destroy calls and check if already cleaned up
        if (this.isDestroyed || !this.scene || !this.sphere) {
            return;
        }
        this.isDestroyed = true; // Set flag immediately
        // console.log("Destroying cannonball"); // Debug log

        const currentSphere = this.sphere; // Capture reference

        // Destroy physics body using Enable3D method
        if (currentSphere.body) {
             // DO NOT remove listener callback here: currentSphere.body.on.collision(null);
             this.scene.third.physics.destroy(currentSphere);
        }
        // Destroy mesh using Enable3D method
        if (currentSphere.parent) {
             this.scene.third.destroy(currentSphere);
        }

        // Nullify references
        this.sphere = null;
        this.scene = null;
    }
}
