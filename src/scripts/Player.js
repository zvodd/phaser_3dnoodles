import { THREE, ExtendedObject3D, JoyStick } from '@enable3d/phaser-extension';
import Phaser from 'phaser'; // For input checking

const isTouchDevice = 'ontouchstart' in window;

export default class Player {
    /**
     * Creates and controls the player character.
     * @param {Phaser.Scene} scene The Phaser 3D scene instance.
     * @param {object} playerGltf The loaded GLTF data for the player model ('box_man').
     * @param {object} [config] Optional configuration.
     * @param {number} [config.moveSpeed=4] Movement speed.
     * @param {number} [config.jumpForce=6] Jump impulse force.
     * @param {THREE.Vector3} [position=new THREE.Vector3(0, 5.5, 0)] Initial spawn position.
     */
    constructor(scene, playerGltf, config = {}, position = new THREE.Vector3(0, 5.5, 0)) {
        this.scene = scene;
        this.third = scene.third;
        this.playerObject = null; // The ExtendedObject3D representing the player
        this.physicsBody = null;  // The Ammo physics body wrapper
        this.rayJump = null;      // Raycaster for ground check

        // --- Config ---
        const defaults = {
            moveSpeed: 4,
            jumpForce: 6
        };
        this.config = { ...defaults, ...config };

        // --- State ---
        this.isGrounded = false;
        this.canJump = true;
        this.isJumping = false;
        this.moveDirection = new THREE.Vector3(0, 0, 0); // Input direction

        // --- Input ---
        this.keys = null;
        this.joystick = null;

        this.initialPosition = position.clone();

        if (!playerGltf) {
            console.error("Player model ('box_man') GLTF data not provided to Player constructor.");
            return; // Cannot create player without model data
        }

        this._createPlayerModel(playerGltf);

        if (this.playerObject) {
            this._createPhysicsBody();
            this._setupInput();
            this.playerObject.userData.isPlayer = true; // Add identifier
            this.playerObject.userData.isGrounded = false; // Initialize isGrounded on userData
        }
    }

    /**
     * Creates the player's visual model and ExtendedObject3D container.
     * @param {object} playerGltf The loaded GLTF data.
     * @private
     */
    _createPlayerModel(playerGltf) {
        if (!playerGltf.scene?.children?.[0]) {
            console.error("Could not extract mesh from player GLTF scene.");
            // Optionally create a fallback visual
            return;
        }
        const man = playerGltf.scene.children[0];

        this.playerObject = new ExtendedObject3D();
        this.playerObject.name = 'player_man';
        this.playerObject.add(man);
        this.playerObject.castShadow = true; // Apply shadow casting to the main container

        // Setup raycaster relative to the player object
        this.rayJump = this.third.physics.add.raycaster('allHit');

        const color = new THREE.Color().setHex( 0xFFE535 )

        this.playerObject.traverse(child => {
            if (child.isMesh) {
                child.castShadow = true;
                if (child.material) {
                    child.material.metalness = 0.1;
                    child.material.roughness = 0.8;
                    child.material.color = color;
                }
            }
        });

        // Animations
        this.third.animationMixers.add(this.playerObject.anims.mixer);
        playerGltf.animations.forEach(animation => {
            if (animation.name) {
                this.playerObject.anims.add(animation.name, animation);
            }
        });
        this.playerObject.anims.play('idle');

        this.playerObject.position.copy(this.initialPosition);
        this.third.add.existing(this.playerObject);
    }

    /**
     * Creates the player's physics body.
     * @private
     */
    _createPhysicsBody() {
        if (!this.playerObject) return;

        this.third.physics.add.existing(this.playerObject, {
            shape: 'capsule',
            radius: 0.25,
            height: 0.6,
            offset: { y: -0.7 } // Adjust offset based on model origin
        });
        this.physicsBody = this.playerObject.body; // Store reference

        this.physicsBody.setFriction(0.8);
        this.physicsBody.setAngularFactor(0, 0, 0); // Prevent falling over
        this.physicsBody.setCcdMotionThreshold(1e-7);
        this.physicsBody.setCcdSweptSphereRadius(0.25);
        this.physicsBody.setCollisionFlags(0); // Dynamic body

        console.log("Player physics body created.");
    }

    /**
     * Sets up keyboard and joystick listeners.
     * @private
     */
    _setupInput() {
        // Keyboard
        this.keys = this.scene.input.keyboard.addKeys({
            up: 'w', down: 's', left: 'a', right: 'd',
            space: 32, // Jump
            grab: 'e'  // Grab/Interact
        });

        // Touch / Joystick
        if (isTouchDevice) {
            this.joystick = new JoyStick();
            const axis = this.joystick.add.axis({ styles: { left: 35, bottom: 35, size: 100 } });
            axis.onMove(event => {
                const threshold = 0.4;
                const moveX = Math.abs(event.right) > threshold ? Math.sign(event.right) : 0;
                const moveZ = Math.abs(event.top) > threshold ? Math.sign(event.top) : 0;
                this.moveDirection.set(moveX, 0, moveZ).normalize();
            });

            const buttonA = this.joystick.add.button({ letter: 'A', styles: { right: 35, bottom: 110, size: 80 } });
            buttonA.onClick(() => this.jump());

            const buttonGrab = this.joystick.add.button({ letter: 'G', styles: { right: 110, bottom: 35, size: 80 } });
            buttonGrab.onClick(() => this._checkForGrab()); // Use internal grab check
        }
    }

    /**
     * Performs a jump if conditions are met.
     */
    jump() {
        if (!this.physicsBody || !this.canJump || !this.isGrounded) return;

        this.canJump = false;
        this.isJumping = true;
        this.playerObject.anims?.play('jump_running', 50, false);

        this.physicsBody.applyImpulse({ x: 0, y: this.config.jumpForce, z: 0 }, { x: 0, y: 0, z: 0 });

        // Reset jump flags after a delay
        this.scene.time.delayedCall(750, () => {
            this.canJump = true;
            this.isJumping = false;
            // Check if still jumping to avoid overriding run/idle after landing
            if (Math.abs(this.physicsBody.velocity.y) < 0.1 && this.playerObject.anims?.current !== 'run') {
                this.playerObject.anims?.play('idle');
            }
        });
    }

    /**
     * Checks for nearby grabbable items and initiates the grab via the ItemManager.
     * @private
     */
    _checkForGrab() {
        if (!this.playerObject || !this.scene.itemManager) return;

        const playerPos = this.playerObject.position;
        const playerForward = new THREE.Vector3();
        // Get direction from the visual mesh inside the player container
        const visualMesh = this.playerObject.children[0];
        if (!visualMesh) return; // Should not happen if model loaded
        visualMesh.getWorldDirection(playerForward);

        const grabRange = 1.5;
        const grabAngleCosine = Math.cos(THREE.MathUtils.degToRad(45)); // 90 degree cone

        let closestGrabbableItem = null;
        let minDistanceSq = grabRange * grabRange;

        // Access items directly from the itemManager instance on the scene
        for (const item of Object.values(this.scene.itemManager.items)) {
            const itemPos = item.position;
            const vectorToItem = itemPos.clone().sub(playerPos);
            const distanceSq = vectorToItem.lengthSq();

            if (distanceSq <= minDistanceSq) {
                const directionToItem = vectorToItem.normalize();
                const dotProduct = playerForward.dot(directionToItem);

                if (dotProduct > grabAngleCosine) { // Within range and angle
                    if (distanceSq < minDistanceSq) { // Is it the closest valid one?
                        minDistanceSq = distanceSq;
                        closestGrabbableItem = item;
                    }
                }
            }
        }

        // If a grabbable item was found, call the item manager's grab directly
        if (closestGrabbableItem) {
            // Pass the item object to the item manager's grab function
            const grabbedInfo = this.scene.itemManager.grabItem(closestGrabbableItem);
            if (grabbedInfo) {
                // console.log("Player initiated grab, success:", grabbedInfo);
                // Potential TODO: Add feedback to player (sound, animation)
            } else {
                // console.log("Player initiated grab, but itemManager failed.");
            }
        } else {
            // console.log("No item in range/view to grab.");
        }
    }

    /**
     * Main update loop for the player.
     * @param {number} time Current time.
     * @param {number} delta Time since last frame (ms).
     */
    update(time, delta) {
        if (!this.playerObject || !this.physicsBody) return;

        // --- Ground Check ---
        const pos = this.playerObject.position;
        this.rayJump.setRayFromWorld(pos.x, pos.y + 1, pos.z)
        this.rayJump.setRayToWorld(pos.x, pos.y -0.1, pos.z)
        this.rayJump.rayTest();
        this.isGrounded = this.rayJump.hasHit();
        this.playerObject.userData.isGrounded = this.isGrounded; // Update userData too

        // --- Read Input (Keyboard) ---
        if (!isTouchDevice) {
            const moveX = (this.keys.right.isDown ? 1 : 0) + (this.keys.left.isDown ? -1 : 0);
            const moveZ = (this.keys.up.isDown ? 1 : 0) + (this.keys.down.isDown ? -1 : 0);
            this.moveDirection.set(moveX, 0, moveZ).normalize();
        }
        // Note: Joystick input updates moveDirection via its own event listener

        // --- Calculate Velocity ---
        const speed = this.config.moveSpeed;
        const velocityX = this.moveDirection.x * speed;
        const velocityZ = -this.moveDirection.z * speed; // Invert Z for forward movement

        // Preserve Y velocity for gravity/jumping
        this.physicsBody.setVelocity(velocityX, this.physicsBody.velocity.y, velocityZ);

        // --- Handle Rotation ---
        if (this.moveDirection.lengthSq() > 0.01) { // If moving
            const targetAngle = Math.atan2(this.moveDirection.x, -this.moveDirection.z); // Target angle based on input
            // Apply rotation to the visual mesh container, not the physics body directly
            const visualMesh = this.playerObject.children[0];
             if (visualMesh) {
                 // Simple direct rotation (can be smoothed with lerp later if needed)
                 visualMesh.rotation.y = targetAngle;
             }
            // Lock physics body angular velocity to prevent wobble
            this.physicsBody.setAngularVelocityY(0);
        } else {
            // Lock angular velocity when idle
            this.physicsBody.setAngularVelocityY(0);
        }

    // --- Handle Animations ---
        const isMoving = this.moveDirection.lengthSq() > 0.01;
        const currentAnimName = this.playerObject.anims?.current; // Get current animation name string
        let targetAnimName = currentAnimName; // Start with current as default target

        // Determine the target animation based on state
        if (this.isJumping) {
            // jump() triggers 'jump_running' once. Let's assume this covers the initial jump phase.
            // We might want a specific looping 'in_air' animation if jump_running doesn't loop or look right.
            // For now, let's assume jump_running might still be playing or we transition below.
            // If jump_running is short, the 'else' block below (falling) will likely take over quickly.
            targetAnimName = 'jump_running'; // Keep jump anim playing while isJumping flag is true
                                             // OR assign a specific looping jump/fall anim here if needed.
        } else if (this.isGrounded) {
            // --- On the ground ---
            if (isMoving) {
                targetAnimName = 'run';
            } else {
                targetAnimName = 'idle';
            }
        } else {
            // --- In the air (Falling or after jump ended but before landing) ---
            // Choose your desired falling animation name here.
            // Options: 'fall', reuse 'jump_running' (if it loops well), 'idle' (can look static).
            targetAnimName = 'jump_running'; // *** ADJUST THIS *** to your actual falling animation name.
                                             // e.g., 'fall', or keep 'jump_running'
        }

        // Play the animation only if the target is different from the current one
        // AND the target animation exists.
        if (targetAnimName && targetAnimName !== currentAnimName) {
            this.playerObject.anims.play(targetAnimName);
        }
        // --- End Handle Animations ---

        // --- Handle Actions (Keyboard) ---
        if (Phaser.Input.Keyboard.JustDown(this.keys.space)) {
            this.jump();
        }
        if (Phaser.Input.Keyboard.JustDown(this.keys.grab)) {
            this._checkForGrab();
        }

        // --- Reset Jump Ability ---
        // Allow jumping again shortly after landing
        if (this.isGrounded && !this.canJump && !this.isJumping) {
           this.scene.time.delayedCall(50, () => { // Shorter delay after landing
               this.canJump = true;
           });
        }
    }

    /**
     * Returns the main ExtendedObject3D for the player.
     * @returns {ExtendedObject3D | null}
     */
    getObject3D() {
        return this.playerObject;
    }

    /**
     * Cleans up resources used by the player.
     */
    destroy() {
        console.log("Destroying Player...");
        if (this.playerObject) {
            if (this.physicsBody) {
                this.third.physics.destroy(this.playerObject); // Destroy physics body via object
                this.physicsBody = null;
            }
            if (this.playerObject.parent) {
                this.third.destroy(this.playerObject); // Destroy visual object
            }
        }
        this.playerObject = null;
        this.rayJump = null; // Raycaster is managed by physics engine, just clear ref

        // Clean up joystick if it exists
        if (this.joystick) {
            this.joystick.destroy();
            this.joystick = null;
        }

        // Remove keyboard listeners? (Phaser might handle this on scene shutdown)
        this.keys = null;
        this.scene = null; // Release scene reference
    }
}