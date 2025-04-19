import {
  Scene3D,
  THREE, // Keep for THREE.MathUtils
  MathUtils // Explicitly import MathUtils if using modular THREE
} from '@enable3d/phaser-extension';
import { Vector3, Quaternion } from 'three'; // Keep Vector3, Quaternion might be needed later
import CreatePlayer from '../CreatePlayer.js';


/**
 * MainScene Class
 */
export default class MainScene extends Scene3D {
  constructor() {
    super({ key: 'MainScene' });
  }

  init() {
    this.accessThirdDimension();
    this.spheres = []; // Array to keep track of spawned spheres
    this.player = null; // Reference to the player object
    this.playerController = null; // Reference to the player controller instance
    this.joystick = null; // Reference to joystick if used
    this.toggledbg = true; // Start with debug disabled visually
  }

  create() {
    // Initialize the 3D environment
    this.third.warpSpeed('camera', 'sky', 'grid', 'light');

    // Adjust default light
    this.third.lights.directionalLight({ intensity: 0.8 });
    this.third.lights.hemisphereLight({ intensity: 0.6 });

    // **Setup Fixed Camera**
    this.third.camera.position.set(0, 18, 20);
    // Use lookAt for simplicity if the target is fixed (0, approx platform height, 0)
    this.third.camera.lookAt(new Vector3(0, 5, 0));
    // Or keep your quaternion approach if preferred:
    // this.third.camera.quaternion.setFromAxisAngle(new Vector3(-1, 0, 0), 0.5);

    // **Debug Toggle UI**
    this.scoreText = this.add.text(32, this.cameras.main.height - 32, 'Toggle Debug', {
      fontSize: '24px', // Slightly smaller
      fill: '#ffffff', // White text
      backgroundColor: '#00000080' // Semi-transparent black background
    })
      .setPadding(10, 5) // Add padding
      .setOrigin(0, 1)
      .setDepth(1)
      .setInteractive();

    this.scoreText.on('pointerdown', () => {
      this.toggledbg = !this.toggledbg; // Toggle the flag
      if (this.toggledbg) {
        this.third.physics.debug?.disable(); // Use optional chaining
        console.log("Physics Debug Disabled");
      } else {
        this.third.physics.debug?.enable(); // Use optional chaining
        console.log("Physics Debug Enabled");
      }
    });
    // Initially disable debug view based on the flag
    if (this.toggledbg) {
        this.third.physics.debug?.disable();
    } else {
        this.third.physics.debug?.enable();
    }


    // **Create the Platform**
    this.platform = this.third.add.box({ name: 'platform', width: 10, height: 0.5, depth: 10 }, { lambert: { color: 'gray' } });
    this.platform.position.set(0, 5, 0);
    this.platform.receiveShadow = true;
    this.third.physics.add.existing(this.platform, {
      shape: 'box',
      mass: 0, // Kinematic
      width: 10, height: 0.5, depth: 10,
      collisionFlags: 2, // Kinematic Object
      // collisionMask: -1, // Default is usually fine, collides with everything (-1)
      // collisionGroup: 2 // Default is usually fine (group 1) unless specific filtering needed
    });
    // Set friction for the platform - affects how spheres roll
    this.platform.body.setFriction(0.8);


    // **Create Player** (Assuming this function sets `this.player` and `this.playerController`)
    CreatePlayer(this);

    // **Spawn Spheres Periodically**
    this.time.addEvent({
      delay: 2000, // Every 2 seconds
      callback: this.spawnSphere,
      callbackScope: this,
      loop: true
    });
  }

  /**
   * Spawn a Sphere
   */
  spawnSphere() {
    const ballcount = this.spheres.length;
    if (this.spheres.length >= 50) return; // Limit number of spheres for performance

    const radius = 0.3;
    const sphere = this.third.add.sphere(
      { name: `sphere_${ballcount+1}`, radius: radius }, // Use a potentially more unique name source
      { lambert: { color: 0x2989d8 } }
    );
    sphere.castShadow = true;
    sphere.receiveShadow = false; // Small objects often don't need to receive shadows

    const spawnArea = 4.5; // platform width/2 - buffer
    const x = (Math.random() - 0.5) * 2 * spawnArea;
    const z = (Math.random() - 0.5) * 2 * spawnArea;
    sphere.position.set(x, 10, z);

    this.third.physics.add.existing(sphere, {
      shape: 'sphere',
      radius: radius,
      mass: 0.5, // Give spheres some mass
      restitution: 0.5, // Bounciness
      friction: 0.5    // Rolling friction
    });
    // sphere.body.setCollisionFlags(0); // Default is 0 (Dynamic), no need to set explicitly

    // Enable CCD for spheres - GOOD PRACTICE
    sphere.body.setCcdMotionThreshold(1e-7); // Use a small threshold
    sphere.body.setCcdSweptSphereRadius(radius * 0.5); // Use slightly smaller than radius often recommended

    this.spheres.push(sphere);

    // No specific collision callbacks needed here for basic physics interaction.
  }

  /**
   * Grab a Sphere (Called by PlayerController's check)
   */
  grabSphere(player, sphere) {
    console.log(`Attempting to grab sphere: ${sphere?.name}`); // Use optional chaining for safety

    if (!sphere || !sphere.body) { // Check if sphere or its body still exists
        console.warn("Attempted to grab an invalid sphere.");
        return;
    }

    // Placeholder: Destroy the sphere
    console.log(`Grabbing and removing ${sphere.name}`);
    const index = this.spheres.findIndex(s => s === sphere);
    if (index > -1) this.spheres.splice(index, 1);

    // IMPORTANT: Use this.third.destroy, it handles removing the physics body AND the mesh
    this.third.destroy(sphere);
  }


  update(time, delta) {
    // Update player controls
    this.playerController?.update(time, delta); // Optional chaining

    // **Tilt the Platform**
    if (this.platform && this.player) { // Ensure platform and player exist
      // Convert player's world position to the platform's local coordinate system
      const localPlayerPos = this.platform.worldToLocal(this.player.position.clone());

      const k = 0.05; // Tilt sensitivity factor
      const maxTilt = Math.PI / 12; // Max tilt approx 15 degrees

      // Calculate tilt angles based on player's local position
      // Tilt around X-axis based on player's Z position
      // Tilt around Z-axis based on player's X position (negated to feel natural)
      const tiltX = THREE.MathUtils.clamp(-k * localPlayerPos.z, -maxTilt, maxTilt);
      const tiltZ = THREE.MathUtils.clamp( k * localPlayerPos.x, -maxTilt, maxTilt); // Note: Sign depends on desired tilt direction

      // Apply rotation to the THREE.Object3D (the visual mesh)
      this.platform.rotation.set(-tiltX, 0, -tiltZ);

      // *** FIX: Signal the physics engine to update the kinematic body's transform ***
      // This synchronizes the physics body's rotation with the visual mesh's rotation.
      this.platform.body.needUpdate = true;

    }

    // **Sphere Management**
    // Filter out destroyed or fallen spheres
    this.spheres = this.spheres.filter(sphere => {
        if (!sphere.body.hasBody) {
           // sphere.body.activate();
           console.log(`what the frick ${sphere.name}`)
        }


        // Check if the sphere object or its body still exists (might have been grabbed/destroyed)
        if (!sphere || !sphere.body) {
            if (sphere)
            return false; // Remove from array if destroyed
        }

        // Check if sphere fell far below
        if (sphere.position.y < -10) {
          console.log(`Cleaning up fallen sphere: ${sphere.name}`);
          // Ensure destroy happens cleanly
          this.third.destroy(sphere); // Use this.third.destroy
          return false; // Remove from array
        }

        // *** ATTEMPT TO MITIGATE DESYNC: Ensure active bodies stay active ***
        // While Enable3D should handle sync, explicitly activating bodies *might*
        // help in edge cases where they go to sleep unexpectedly.
        // However, this might have performance implications if done excessively.
        // Only activate if you strongly suspect sleeping issues are the cause of desync.



        // If the sphere is still valid and above the cleanup threshold, keep it.
        return true;
    });

    // Physics engine handles sphere rolling based on platform tilt, gravity, friction etc.
  }
}