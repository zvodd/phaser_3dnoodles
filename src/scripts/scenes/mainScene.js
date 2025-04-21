import {
  Scene3D,
  THREE,
  MathUtils,
  ExtendedObject3D // Import ExtendedObject3D
} from '@enable3d/phaser-extension';
import { Vector3 } from 'three';
import CreatePlayer from '../CreatePlayer.js';


export default class MainScene extends Scene3D {
  constructor() {
    super({ key: 'MainScene' });
  }

  init() {
    this.accessThirdDimension();
    // REMOVED: this.spheres = [];
    this.activeSphereCount = 0;
    this.maxSpheres = 50;
    this.spawnCount = 0;

    this.player = null;
    this.playerController = null;
    this.joystick = null;
    this.toggledbg = true;
    this.objects = {}
    
  }

  create() {
    // Basic Setup
    this.third.warpSpeed('camera', 'sky', 'grid', 'light');
    this.third.lights.directionalLight({ intensity: 0.8 });
    this.third.lights.hemisphereLight({ intensity: 0.6 });
    this.third.camera.position.set(0, 18, 20);
    this.third.camera.lookAt(new Vector3(0, 5, 0));

    // Debug Toggle UI (same as before)
    this.dbg_button = this.add.text(32, this.cameras.main.height - 32, 'Toggle Debug', {
        fontSize: '24px', fill: '#ffffff', backgroundColor: '#00000080'
      })
      .setPadding(10, 5).setOrigin(0, 1).setDepth(1).setInteractive();
    this.dbg_button.on('pointerdown', () => {
      this.toggledbg = !this.toggledbg;
      if (this.toggledbg) this.third.physics.debug?.disable();
      else this.third.physics.debug?.enable();
      console.log(`Physics Debug ${this.toggledbg ? 'Disabled' : 'Enabled'}`);
    });
    if (this.toggledbg) this.third.physics.debug?.disable();
    else this.third.physics.debug?.enable();


    // Create the Platform (same as before)
    this.platform = this.third.add.box({ name: 'platform', width: 10, height: 0.5, depth: 10 }, { lambert: { color: 'gray' } });
    this.platform.position.set(0, 5, 0);
    this.platform.receiveShadow = true;
    this.third.physics.add.existing(this.platform, {
      shape: 'box', width: 10, height: 0.5, depth: 10, mass: 0, collisionFlags: 2, // Kinematic
    });
    this.platform.body.setFriction(0.8);

    // Create Player
    CreatePlayer(this); // Assuming this sets up player physics

    // ADDED: Create the Death Plane for cleanup
    this.createDeathPlane();

    // Spawn Spheres Periodically
    this.time.addEvent({
      delay: 2000,
      callback: this.spawnSphere,
      callbackScope: this,
      loop: true
    });

    // ADDED: Setup Collision Listener for Death Plane
    // We listen for collisions on the death plane's body
    this.deathPlane.body.on.collision((otherObject, event) => {
        // Check if the colliding object is a sphere using userData
        if (otherObject.userData?.isSphere && !otherObject.userData.isBeingDestroyed) {
            this.handleSphereDeathPlaneCollision(otherObject);
        }
    });

    console.log("Scene Created. Death plane and collision listener active.");
  }

  /**
   * Creates a static trigger volume below the platform to catch falling spheres.
   */
  createDeathPlane() {
    const deathPlaneY = -10; // Position below the platform
    const deathPlaneSize = 100; // Make it large enough
    
    // Use ExtendedObject3D which simplifies accessing body later
    this.deathPlane = new ExtendedObject3D();
    this.deathPlane.position.set(0, deathPlaneY, 0);
    this.third.add.existing(this.deathPlane); // Add the container to the scene

    // Add physics body to the ExtendedObject3D
    this.third.physics.add.existing(this.deathPlane, {
        shape: 'box',
        width: deathPlaneSize,
        height: 0.1, // Thin box
        depth: deathPlaneSize,
        mass: 0, // Static
        collisionFlags: 4, // Static object
        // ** Important: Mark as Sensor/Trigger **
        // In Ammo.js (via Enable3D), setting collisionFlag 4 (CF_NO_CONTACT_RESPONSE) makes it a sensor
    });
    // Add userData for identification in collision callbacks
    this.deathPlane.userData.isDeathPlane = true;
    console.log("Death Plane created at y=", deathPlaneY);
  }


  /**
   * Spawn a Sphere - No longer adds to this.spheres
   */
  spawnSphere() {
    // Check spawn limit using the counter
    if (this.activeSphereCount >= this.maxSpheres) {
      // console.log("Max spheres reached, skipping spawn.");
      return;
    }

    const radius = 0.3;
    // Use ExtendedObject3D for easier access to body/mesh properties if needed later
    const sphere = new ExtendedObject3D();
    sphere.name = `sphere_${this.spawnCount++}`; // Or use a UUID
    sphere.add(new THREE.Mesh(
        new THREE.SphereGeometry(radius),
        new THREE.MeshLambertMaterial({ color: 0x2989d8 })
    ));
    this.third.add.existing(sphere); // Add the container to the scene

    sphere.castShadow = true;
    sphere.receiveShadow = false; // Usually false for small dynamic objects

    const spawnArea = 4.5;
    const x = (Math.random() - 0.5) * 2 * spawnArea;
    const z = (Math.random() - 0.5) * 2 * spawnArea;
    sphere.position.set(x, 10, z); // Spawn position

    // Add userData BEFORE adding physics - sometimes crucial
    sphere.userData.isSphere = true; // Identify this object as a sphere
    sphere.userData.isBeingDestroyed = false; // Flag to prevent double destruction

    this.third.physics.add.existing(sphere, {
      shape: 'sphere', radius: radius, mass: 0.5, restitution: 0.5, friction: 0.5
    });

    sphere.body.setCcdMotionThreshold(1e-7);
    sphere.body.setCcdSweptSphereRadius(radius * 0.5);

    // Increment the counter
    this.activeSphereCount++;
    // REMOVED: this.spheres.push(sphere);
    // console.log(`Spawned ${sphere.name}. Active spheres: ${this.activeSphereCount}`);
  }


  /**
   * Handles collision between a sphere and the death plane.
   * This function is called by the collision listener.
   */
  handleSphereDeathPlaneCollision(sphereObject) {
     console.log(`Collision detected between death plane and ${sphereObject.name}`);

     // Double-check it's a sphere and not already being destroyed
     if (!sphereObject.userData?.isSphere || sphereObject.userData.isBeingDestroyed) {
         console.warn(`Collision with non-sphere or already destroying object: ${sphereObject.name}`);
         return;
     }

     // Mark for destruction to prevent potential duplicate calls in the same frame
     sphereObject.userData.isBeingDestroyed = true;
     this.third.destroy(sphereObject);

     // Decrement the counter
     this.activeSphereCount--;
  }


  /**
   * Grab a Sphere - Called by PlayerController/Interaction Logic
   * Now only needs the specific sphere reference from the interaction (raycast/overlap).
   * No array manipulation needed.
   */
  grabSphere(player, sphereToGrab) {
    // Ensure the sphere object passed is valid and hasn't been destroyed already
    if (!sphereToGrab || !sphereToGrab.body || sphereToGrab.userData?.isBeingDestroyed) {
      console.warn(`Attempted to grab invalid or already destroying sphere: ${sphereToGrab?.name}`);
      return;
    }

    console.log(`Grabbing and removing ${sphereToGrab.name}`);

    // Mark it to prevent death plane collision firing simultaneously maybe
    sphereToGrab.userData.isBeingDestroyed = true;

    // Use this.third.destroy
    this.third.destroy(sphereToGrab);

    // Decrement the counter
    this.activeSphereCount--;
    console.log(`Active spheres (after grab): ${this.activeSphereCount}`);

  }


  update(time, delta) {
    // Update player controls
    this.playerController?.update(time, delta);

    // Tilt the Platform (same logic)
    if (this.platform && this.player) {
        const localPlayerPos = this.platform.worldToLocal(this.player.position.clone());
        const k = 0.05;
        const maxTilt = Math.PI / 12;
        const tiltX = - THREE.MathUtils.clamp(-k * localPlayerPos.z, -maxTilt, maxTilt);
        const tiltZ = - THREE.MathUtils.clamp( k * localPlayerPos.x, -maxTilt, maxTilt);
        this.platform.rotation.set(tiltX, 0, tiltZ);
        this.platform.body.needUpdate = true;
    }


  }
} // End class