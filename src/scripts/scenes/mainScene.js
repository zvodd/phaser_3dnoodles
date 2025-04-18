import {
  Scene3D,
  Canvas,
  THREE,
  JoyStick,
  ExtendedObject3D,

} from '@enable3d/phaser-extension';
import  { Vector3, Quaternion} from 'three'
import PlayerController from './PlayerController.js'; // Import the new controller

/**
 * Check if it's a touch device
 */
const isTouchDevice = 'ontouchstart' in window;

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
  }

  create() {
    // Initialize the 3D environment with basic components
    this.third.warpSpeed('camera', 'sky', 'grid', 'light'); // Removed ground as platform serves as main surface
    this.third.physics.debug.enable()
    
    // Adjust default light
    this.third.lights.directionalLight({ intensity: 0.8 });
    this.third.lights.hemisphereLight({ intensity: 0.6 });

    // **Setup Fixed Camera**
    this.third.camera.position.set( 0, 18, 20 ); // Position the camera higher and back
    this.third.camera.quaternion.setFromAxisAngle(new Vector3( -1, 0, 0 ), 0.5 )
    //this.cameras.main.lookAt(0, 5, 0);      // Make it look at the center of the platform

    // debugger;

    // **Create the Platform**
    this.platform = this.third.add.box({ name: 'platform', width: 1, height: 1, depth: 1 }, { lambert: { color: 'gray' } });
    this.platform.scale.set(10, 0.5, 10); // Positioned at y=5
    this.platform.position.set(0, 5, 0); // Positioned at y=5
    this.platform.receiveShadow = true;
    // Use 'box' shape for simpler platform physics, HACD might be overkill and slower
    this.third.physics.add.existing(this.platform, { shape: 'box', mass: 0, collisionFlags: 2, collisionMask: -1, collisionGroup: 1 }); // Kinematic body

    // **Create the Player**
    this.third.load.gltf('/assets/box_man.glb').then(object => {
      const man = object.scene.children[0];
      this.player = new ExtendedObject3D(); // Assign to scene property
      this.player.name = 'man';
      // this.player.rotateY(Math.PI); // Start facing positive Z
      this.player.add(man);
      this.player.castShadow = true; // Apply shadow casting to the main object

      this.player.traverse(child => {
        if (child.isMesh) {
          child.castShadow = child.receiveShadow = true;
          // Improve appearance slightly
          if (child.material) {
             child.material.metalness = 0.1;
             child.material.roughness = 0.8;
          }
        }
      });

      // Animations
      this.third.animationMixers.add(this.player.anims.mixer);
      object.animations.forEach(animation => {
        if (animation.name) {
          this.player.anims.add(animation.name, animation);
        }
      });
      this.player.anims.play('idle');

      this.player.position.set(0, 5.5, 0); // Start on top of the platform
      this.third.add.existing(this.player);

      // Physics
      this.third.physics.add.existing(this.player, {
        shape: 'capsule', // Use a capsule for better character movement
        radius: 0.25,
        height: 0.8, // Adjust height/radius as needed
        offset: { y: -0.4 } // Adjust offset to center the capsule
      });
      this.player.body.setFriction(0.8);
      this.player.body.setAngularFactor(0, 0, 0); // Prevent capsule from falling over
      this.player.body.setCcdMotionThreshold(1e-7); // Enable CCD
      this.player.body.setCcdSweptSphereRadius(0.25);

      // Ensure player collides with platform and spheres
      this.player.body.setCollisionFlags(0); // Dynamic body
      //this.player.body.setCollisionMask(-1); // Collide with everything
      //this.player.body.setCollisionGroup(1);


      // **Initialize Player Controller** (after player is created)
       if (isTouchDevice) {
         this.joystick = new JoyStick(); // Create joystick instance
       }
      this.playerController = new PlayerController(this, this.player, this.joystick);

    }); // End of GLTF loading


    // **Input Controls (delegated to PlayerController)**
    // Remove keyboard/joystick setup from here, it's now in PlayerController

    // **Remove Pointer Lock/Drag**
    // PointerLock/Drag are not needed for fixed camera and axis controls

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
    const radius = 0.3; // Smaller spheres
    const sphere = this.third.add.sphere(
        { name: `sphere_${this.spheres.length}`, radius: radius },
        { lambert: { color: 0xff0000 } } // Use hex color
    );
    sphere.castShadow = true;
    sphere.receiveShadow = true;

    // Random position above the platform, slightly inset
    const spawnArea = 4.5; // platform width/2 - buffer
    const x = (Math.random() - 0.5) * 2 * spawnArea;
    const z = (Math.random() - 0.5) * 2 * spawnArea;
    sphere.position.set(x, 10, z); // Spawn higher above platform

    this.third.physics.add.existing(sphere, {
        shape: 'sphere',
        radius: radius,
        mass: 0.5 // Give spheres some mass
    });
    sphere.body.setCollisionFlags(0); // Dynamic
    sphere.body.setRestitution(0.5); // Make them a bit bouncy
    sphere.body.setFriction(0.5);
    sphere.body.setCcdMotionThreshold(1e-7); // Enable CCD for spheres too
    sphere.body.setCcdSweptSphereRadius(radius);

    this.spheres.push(sphere);

    // Collision between sphere and platform (just let physics handle it)
    // No specific callback needed here unless you want bounce sounds etc.
    this.third.physics.add.collider(sphere, this.platform, (objA, objB, event) => {
         // console.log("Sphere hit platform");
    });

    // Collision between sphere and player (handled by grab logic now)
    // Remove the old pickup logic based on collision
    // sphere.body.on.collision((otherObject, event) => {
    //   if (otherObject.name === 'man'){
    //     // this.pickUpSphere(sphere); // Old logic
    //     console.log(`sphere collided with ${otherObject.name}`);
    //   }
    // });

  }

  /**
   * Grab a Sphere (Called by PlayerController's check)
   * Implement the actual grabbing mechanic here.
   */
  grabSphere(player, sphere) {
     console.log(`Attempting to grab sphere: ${sphere.name}`);
     // TODO: Implement grab logic:
     // 1. Check if player is already holding something (if applicable).
     // 2. Make the sphere kinematic or attach it to the player (e.g., using a constraint or parenting).
     // 3. Disable sphere's collision response temporarily or adjust collision groups.
     // 4. Remove sphere from the active 'this.spheres' list (or move to a 'heldSpheres' list).
     // 5. Play a sound/animation.

     // For now, just destroy it as a placeholder:
     console.log(`Grabbing and removing ${sphere.name}`);
     this.third.physics.destroy(sphere); // Remove physics body
     this.third.scene.remove(sphere); // Remove from three.js scene
     const index = this.spheres.findIndex(s => s === sphere);
     if (index > -1) this.spheres.splice(index, 1);
  }


  update(time, delta) {
    // Update player controls if the controller exists
    this.playerController?.update(time, delta);

    // **Tilt the Platform** (Keep this logic here)
    if (this.player?.body && this.platform?.body) {
        const localPlayerPos = this.platform.worldToLocal(this.player.position.clone());
        const k = 0.05; // Tilt sensitivity
        // Clamp tilt values to prevent extreme angles
        const maxTilt = Math.PI / 12; // Max tilt approx 15 degrees
        const tiltX = THREE.MathUtils.clamp(-k * localPlayerPos.z, -maxTilt, maxTilt);
        const tiltZ = THREE.MathUtils.clamp(k * localPlayerPos.x, -maxTilt, maxTilt);

        // Apply rotation smoothly using quaternions might be better, but direct rotation is simpler for now
        // Ensure we are setting rotation on the THREE.Object3D, not the physics body directly
        this.platform.rotation.set(tiltX, 0, tiltZ);

        // Update the kinematic platform's physics body transform
        // Note: Directly setting rotation might fight with physics updates for kinematic bodies.
        // A potentially more stable way is to set the physics body's transform.
        // However, Enable3D often handles syncing THREE object transform TO kinematic body state.
        // If tilting becomes unstable, investigate setting body.setWorldTransform directly.
        // this.platform.body.needUpdate = true; // May be needed if direct rotation doesn't sync
    }

    // **Handle Spheres Rolling Off (Optional Cleanup)**
    this.spheres = this.spheres.filter(sphere => {
        if (sphere.position.y < -10) { // Check if sphere fell far below
            console.log(`Cleaning up fallen sphere: ${sphere.name}`);
            this.third.physics.destroy(sphere);
            this.third.scene.remove(sphere);
            return false; // Remove from array
        }
        return true; // Keep in array
    });

     // **Sphere Rolling Physics (Handled by physics engine + tilt)**
     // The previous manual sphere rolling code is removed.
     // The physics engine will handle how spheres react to the tilted platform.
     // Adjust sphere mass, friction, restitution, and platform friction for desired rolling behavior.
  }
}