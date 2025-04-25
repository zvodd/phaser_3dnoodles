import { THREE } from '@enable3d/phaser-extension';

const isTouchDevice = 'ontouchstart' in window;

/**
 * PlayerController Class
 * Handles input and controls the player character's movement and actions.
 */
export default class PlayerController {
  constructor(scene, player, joystick) {
    this.scene = scene;
    this.third = scene.third;
    this.player = player;
    this.joystick = joystick; // Pass joystick if available

    this.canJump = true;
    this.isJumping = false;
    this.moveSpeed = 4;
    this.jumpForce = 6; // Increased jump force a bit

    // Target movement direction based on input
    this.moveDirection = new THREE.Vector3(0, 0, 0);

    // Setup input listeners
    this.keys = this.scene.input.keyboard.addKeys({
      up: 'w',
      down: 's',
      left: 'a',
      right: 'd',
      space: 32, // Jump
      grab: 'e' // Use 'e' for grab/interact
      // shift: 16 // No longer used for pickup
    });

    this._setupJoystickControls();
  }

  /**
   * Set up joystick listeners if a joystick object is provided.
   * @private
   */
  _setupJoystickControls() {
    if (isTouchDevice && this.joystick) {
      const axis = this.joystick.add.axis({ styles: { left: 35, bottom: 35, size: 100 } });
      axis.onMove(event => {
        // Map joystick movements to axis-aligned directions
        // Use a threshold to avoid slight movements triggering diagonal moves
        const threshold = 0.4;
        const moveX = Math.abs(event.right) > threshold ? Math.sign(event.right) : 0;
        const moveZ = Math.abs(event.top) > threshold ? -Math.sign(event.top) : 0; // Inverted Z

        this.moveDirection.set(moveX, 0, moveZ).normalize(); // Normalize for consistent speed
      });

      const buttonA = this.joystick.add.button({ letter: 'A', styles: { right: 35, bottom: 110, size: 80 } });
      buttonA.onClick(() => this.jump());

      // Consider adding a grab button for touch if needed
      // const buttonGrab = this.joystick.add.button({ letter: 'G', styles: { right: 110, bottom: 35, size: 80 } });
      // buttonGrab.onClick(() => this.checkForGrab());
    }
  }

  /**
   * Handle Player Jump
   */
  jump() {
    if (!this.player?.body || !this.canJump) return;

    // Simple ground check (replace with raycast later if needed for slopes/uneven ground)
    // Check if vertical velocity is near zero, indicating potential ground contact
    const raycaster = this.player.rayJump
    const pos = this.player.position

    raycaster.setRayFromWorld(pos.x, pos.y + 1, pos.z)
    raycaster.setRayToWorld(pos.x, pos.y -0.1, pos.z)
    raycaster.rayTest()

    // if (raycaster.hasHit()) {
    //     const [points, objects] = [raycaster.getHitPointsWorld(), raycaster.getCollisionObjects()]
    //     for (let i = 0 ; i < points.length; i++){
    //         const { x, y, z } = points[i]
    //         const { name } = objects[i]
    //         console.log('rayhit:', `${name}:`, `x:${x.toFixed(2)}`, `y:${x.toFixed(2)}`, `z:${x.toFixed(2)}`)
    //     }
    // }

    if (raycaster.hasHit()) {
        this.canJump = false;
        this.isJumping = true;
        this.player.anims?.play('jump_running', 50, false); // Play jump anim once

        // Apply impulse for a snappier jump
        this.player.body.applyImpulse({ x: 0, y: this.jumpForce, z: 0 }, { x: 0, y: 0, z: 0 });

        // Reset jump flag after a delay
        this.scene.time.delayedCall(750, () => {
            this.canJump = true;
            this.isJumping = false;
            // Check if still jumping to avoid overriding run/idle
            if (Math.abs(this.player.body.velocity.y) < 0.1 && this.player.anims?.current !== 'run') {
               this.player.anims?.play('idle');
            }
        });
    }
  }

  /**
   * Check for nearby spheres and initiate grab if conditions are met.
   * (This is the foundation for the grab mechanic)
   */
  checkForGrab() {
    if (!this.player ) return;

    const playerPos = this.player.position;
    const playerForward = new THREE.Vector3();
    this.player.children[0].getWorldDirection(playerForward); // Gets the Z-axis direction in world space

    const grabRange = 1.5; // How close the player needs to be
    const grabAngleCosine = Math.cos(THREE.MathUtils.degToRad(45)); // Angle range (90 degrees total cone)

    let closestGrabbableSphere = null;
    let minDistanceSq = grabRange * grabRange;

    for (const sphere of Object.values(this.itemManager.items)) {
        const spherePos = sphere.position;
        const vectorToSphere = spherePos.clone().sub(playerPos);
        const distanceSq = vectorToSphere.lengthSq();

        if (distanceSq <= minDistanceSq) {
            const directionToSphere = vectorToSphere.normalize();
            const dotProduct = playerForward.dot(directionToSphere);

            // Check if sphere is within range and within the forward-facing cone
            if (dotProduct > grabAngleCosine) {
                // Found a potential candidate, check if it's the closest so far
                if (distanceSq < minDistanceSq) {
                    minDistanceSq = distanceSq;
                    closestGrabbableSphere = sphere;
                }
            }
        }
    }

    // If a grabbable sphere was found, trigger the grab action
    if (closestGrabbableSphere) {
        this.scene.grabItem(this.player, closestGrabbableSphere);
    } else {
      console.log("No sphere in range/view to grab.");
    }
  }


  /**
   * Update player state based on input and physics.
   * Called every frame from the MainScene's update method.
   * @param {number} time - The current time.
   * @param {number} delta - The delta time in ms since the last frame.
   */
  update(time, delta) {
    if (!this.player?.body) return; // Player not fully loaded yet

    // --- Read Keyboard Input ---
    if (!isTouchDevice) {
        const moveX = (this.keys.right.isDown ? 1 : 0) + (this.keys.left.isDown ? -1 : 0);
        const moveZ = (this.keys.up.isDown ? 1 : 0) + (this.keys.down.isDown ? -1 : 0); // W is positive Z (forward)
        this.moveDirection.set(moveX, 0, moveZ).normalize();
    }

    // --- Calculate Velocity ---
    const speed = this.moveSpeed;
    const velocityX = this.moveDirection.x * speed;
    const velocityZ = -this.moveDirection.z * speed;

    // Preserve Y velocity for gravity/jumping
    this.player.body.setVelocity(velocityX, this.player.body.velocity.y, velocityZ);

    // --- Handle Rotation ---
    if (this.moveDirection.lengthSq() > 0.01) { // If there is movement input
        // Calculate the target angle based on the world-space move direction
        const targetAngle = Math.atan2(this.moveDirection.x, -this.moveDirection.z);

        // Directly set rotation - can be smoothed later if desired
        this.player.children[0].rotation.y = targetAngle;
        
        //this.player.body.setRotation(0.0, targetAngle, 0.0);
        // debugger

        // Lock angular velocity to prevent physics wobble
        this.player.body.setAngularVelocityY(0);

    } else {
         // If no input, lock angular velocity
         this.player.body.setAngularVelocityY(0);
    }


    // --- Handle Animations ---
    const isMoving = this.moveDirection.lengthSq() > 0.01;
    if (this.isJumping) {
        // Jump animation is handled in jump()
    } else if (isMoving) {
        if (this.player.anims?.current !== 'run') {
            this.player.anims?.play('run');
        }
    } else {
        if (this.player.anims?.current !== 'idle') {
            this.player.anims?.play('idle');
        }
    }

    // --- Handle Actions ---
    if (Phaser.Input.Keyboard.JustDown(this.keys.space)) {
        this.jump();
    }
    if (Phaser.Input.Keyboard.JustDown(this.keys.grab)) {
      this.checkForGrab();
    }


    // --- Ground Check (Simple) ---
    // Allow jumping again if falling and near zero Y velocity
    if (!this.canJump && !this.isJumping && Math.abs(this.player.body.velocity.y) < 0.1) {
       // Small delay before allowing jump again after landing
       this.scene.time.delayedCall(100, () => {
          this.canJump = true;
       });
    }
  }
}