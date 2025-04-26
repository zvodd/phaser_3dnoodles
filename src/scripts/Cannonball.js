import * as THREE from 'three';

export default class Cannonball {
    /**
     * Creates a black sphere cannonball with a physics body.
     * @param {Phaser.Scene} scene The Phaser 3D scene instance.
     * @param {THREE.Vector3} position Initial position of the cannonball.
     * @param {THREE.Vector3} velocity Initial velocity of the cannonball.
     */
    constructor(scene, position, velocity) {
        this.scene = scene;

        // Create the black sphere mesh
        const radius = 0.5;
        const geometry = new THREE.SphereGeometry(radius, 16, 16);
        const material = new THREE.MeshLambertMaterial({ color: 0x000000 });
        this.sphere = new THREE.Mesh(geometry, material);
        this.sphere.position.copy(position);
        this.sphere.castShadow = true; // Enable shadow casting

        // Add the sphere to the scene
        this.scene.third.add.existing(this.sphere);

        // Add physics properties using Enable3D
        this.scene.third.physics.add.existing(this.sphere, {
            shape: 'sphere',
            radius: radius,
            mass: 1,
            restitution: 0.5,
            friction: 0.5
        });

        // Set initial velocity
        this.sphere.body.setVelocity(velocity.x, velocity.y, velocity.z);
    }

    /**
     * Optional: Clean up the cannonball when no longer needed.
     */
    destroy() {
        if (this.sphere && this.sphere.parent) {
            this.scene.third.destroy(this.sphere);
        }
        this.scene = null;
    }
}