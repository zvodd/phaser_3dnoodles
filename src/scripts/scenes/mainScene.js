import {
  Scene3D,
  Canvas,
  THREE,
} from '@enable3d/phaser-extension';
import  { Vector3, Quaternion} from 'three'
import CreatePlayer from '../CreatePlayer.js'




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
    this.spheresToSpawnNextFrame = 0;
  }

  create() {
    // Initialize the 3D environment with basic components
    this.third.warpSpeed('camera', 'sky', 'grid', 'light'); // Removed ground as platform serves as main surface
    


    // Adjust default light
    this.third.lights.directionalLight({ intensity: 0.8 });
    this.third.lights.hemisphereLight({ intensity: 0.6 });

    // **Setup Fixed Camera**
    this.third.camera.position.set( 0, 18, 20 ); // Position the camera higher and back
    this.third.camera.quaternion.setFromAxisAngle(new Vector3( -1, 0, 0 ), 0.5 ) // Make it look at the center of the platform


    this.scoreText = this.add.text(32, this.cameras.main.height - 32, 'tgl dbg', {
      fontSize: '32px',
      fill: '#000'
    })
    this.scoreText.setOrigin(0, 1)
    this.scoreText.depth = 1
    this.scoreText.setInteractive();
    this.scoreText.on('pointerdown', () => { 
            this.toggledbg = this.toggledbg || false
      if (this.toggledbg){
        this.toggledbg = false
        this.third.physics.debug.enable()
      }else{
        this.toggledbg = true
        this.third.physics.debug.disable()
      }
    });
    

    // **Create the Platform**
    this.platform = this.third.add.box({ name: 'platform', width: 10, height: 0.5, depth: 10 }, { lambert: { color: 'gray' } });
    this.platform.position.set(0, 5, 0); // Positioned at y=5
    this.platform.receiveShadow = true;
    this.third.physics.add.existing(this.platform, { shape: 'box', mass: 0, width: 10, height: 0.5, depth: 10, collisionFlags: 2, collisionMask: -1, collisionGroup: 1 }); // Kinematic body

    CreatePlayer(this);

    // **Spawn Spheres Periodically**
    this.time.addEvent({
      delay: 2000, // Every 2 seconds
      callback: ()=>{ this.spheresToSpawnNextFrame += 1},
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
        { lambert: { color: 0x2989d8 } } // Use hex color
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
    // this.third.physics.add.collider(sphere, this.platform, (objA, objB, event) => {
    //      // console.log("Sphere hit platform");
    // });

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
    if (this.player) {
      const localPlayerPos = this.platform.worldToLocal(this.player.position.clone());
        const k = 0.05; // Tilt sensitivity
        // Clamp tilt values to prevent extreme angles
        const maxTilt = Math.PI / 12; // Max tilt approx 15 degrees
        const tiltX = THREE.MathUtils.clamp(-k * localPlayerPos.z, -maxTilt, maxTilt);
        const tiltZ = THREE.MathUtils.clamp(k * localPlayerPos.x, -maxTilt, maxTilt);

        // Apply rotation smoothly using quaternions might be better, but direct rotation is simpler for now
        // Ensure we are setting rotation on the THREE.Object3D, not the physics body directly
        this.platform.rotation.set(tiltX, 0, tiltZ);
        // debugger
        // Update the kinematic platform's physics body transform
        // Note: Directly setting rotation might fight with physics updates for kinematic bodies.
        // A potentially more stable way is to set the physics body's transform.
        // However, Enable3D often handles syncing THREE object transform TO kinematic body state.
        // If tilting becomes unstable, investigate setting body.setWorldTransform directly.
        // this.platform.body.needUpdate = true; // May be needed if direct rotation doesn't sync
      }
      if (this.spheresToSpawnNextFrame > 0 ){
        this.spheresToSpawnNextFrame--;
        this.spawnSphere();
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