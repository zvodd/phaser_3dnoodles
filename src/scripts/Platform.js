import { THREE, ExtendedObject3D } from '@enable3d/phaser-extension';
import { MathUtils } from 'three';

export default class Platform {
    /**
     * Creates a tilting platform object, mirroring the logic previously in MainScene.
     * @param {Phaser.Scene} scene The Phaser 3D scene instance.
     * @param {object} platformGltf The loaded GLTF data for the platform model.
     * @param {THREE.Vector3} [position=new THREE.Vector3(0, 5, 0)] Initial position.
     * @param {object} [config={}] Configuration for physics and tilt.
     * @param {number} [config.damping=0.95] Damping factor for tilt velocity.
     * @param {number} [config.playerInfluence=0.0006] How much player position affects tilt.
     * @param {number} [config.cannonballInfluence=0.001] How much cannonball impacts affect tilt. NEW!
     * @param {number} [config.returnForce=0.003] How strongly platform returns to level.
     * @param {number} [config.maxTilt=Math.PI / 11] Maximum tilt angle in radians.
     * @param {number} [config.maxVelocity=0.05] Maximum tilt velocity.
     */
    constructor(
        scene,
        platformGltf,
        position = new THREE.Vector3(0, 5, 0),
        config = {} // Accept config object
    ) {
        this.scene = scene;
        this.platformObject = null; // The visual THREE.Object3D
        this.physicsBody = null;    // The Ammo physics body wrapper

        // --- State ---
        this.tilt = { x: 0, z: 0 };
        this.tiltVelocity = { x: 0, z: 0 };
        this.initialPosition = position.clone();

        // --- Configuration ---
        const defaults = {
            damping: 0.95,
            playerInfluence: 0.0006,
            cannonballInfluence: 0.001, // Default influence for cannonballs
            returnForce: 0.003,
            maxTilt: Math.PI / 11, // Approx 16 degrees
            maxVelocity: 0.05
        };
        this.config = { ...defaults, ...config }; // Merge provided config with defaults

        // --- Initialization ---
        this._createPlatformModel(platformGltf);
        if (this.platformObject) {
            this._createPhysicsBody();
            // Ensure visual rotation and state match initial values
            this.platformObject.rotation.set(0, 0, 0);
            this.tilt = { x: 0, z: 0 };
            this.tiltVelocity = { x: 0, z: 0 };
        }
    }

    /** Creates the platform mesh. @private */
    _createPlatformModel(platformGltf) {
        if (!platformGltf?.scene?.children?.[0]) {
            console.error("Platform model data invalid, using fallback.");
            // Ensure fallback has a name for collision detection
            this.platformObject = this.scene.third.add.box({ name: 'platform_fallback', width: 10, height: 0.5, depth: 10 }, { lambert: { color: 'grey' } });
        } else {
            this.platformObject = platformGltf.scene.children[0].clone();
            this.platformObject.name = 'platform_disc'; // Assign name here
        }

        this.scene.third.add.existing(this.platformObject);
        this.platformObject.position.copy(this.initialPosition);
        this.platformObject.receiveShadow = true;
        this.platformObject.castShadow = false; // Platform itself shouldn't cast shadow

        this.platformObject.traverse(child => {
            if (child.isMesh) {
                child.receiveShadow = true; // Ensure all parts receive shadows
            }
        });
        console.log(`Platform model created with name: ${this.platformObject.name}`);
    }

    /** Creates the physics body. @private */
    _createPhysicsBody() {
        if (!this.platformObject) return;
        this.scene.third.physics.add.existing(this.platformObject, {
            shape: 'hull', // Use 'hull' for non-box shapes
            mesh: this.platformObject, // Base shape on visual mesh
            mass: 0,           // Kinematic
            collisionFlags: 2, // KINEMATIC_OBJECT
            friction: 0.8,
            restitution: 0.2
        });
        this.physicsBody = this.platformObject.body;
        // Add userData to the body as well for potential identification
        this.physicsBody.userData = { isPlatform: true };
        console.log("Platform physics body created (KINEMATIC hull).");
    }

    /**
     * Applies a tilt effect based on cannonball impact.
     * @param {THREE.Vector3} worldCollisionPoint Point of impact in world coordinates.
     * @param {THREE.Vector3} worldImpulseVector Impulse vector (approximated by velocity) in world coordinates.
     */
    applyTiltImpulse(worldCollisionPoint, worldImpulseVector) {
        if (!this.platformObject || !this.physicsBody) return;

        // --- Calculate Torque ---
        // 1. Lever Arm (r): Vector from platform center to collision point (in local space)
        const localCollisionPoint = this.platformObject.worldToLocal(worldCollisionPoint.clone());
        const leverArm = localCollisionPoint; // Since local origin is center

        // 2. Force (F): Impulse vector (in local space)
        // We need to rotate the world impulse into the platform's local orientation
        const localImpulse = worldImpulseVector.clone().applyQuaternion(
            this.platformObject.quaternion.clone().invert()
        );

        // 3. Torque (T = r x F): Cross product in local space
        const torque = new THREE.Vector3().crossVectors(leverArm, localImpulse);

        // --- Apply Torque to Tilt Velocity ---
        // Apply influence factor
        const influence = this.config.cannonballInfluence;

        // Torque around local Z affects tilt around world X
        // Torque around local X affects tilt around world Z (with inversion)
        const deltaTiltVelX = torque.z * influence;
        const deltaTiltVelZ = -torque.x * influence; // Note the minus sign

        // Add the calculated change to the current tilt velocity
        this.tiltVelocity.x += deltaTiltVelX;
        this.tiltVelocity.z += deltaTiltVelZ;

        // Clamping will be handled in the main update loop
        // console.log(`Applied Impulse: dVelX=${deltaTiltVelX.toFixed(4)}, dVelZ=${deltaTiltVelZ.toFixed(4)}`); // Debug log
    }


    /**
     * Updates the platform's tilt based on player position, cannonball impacts (via tiltVelocity), and physics.
     * @param {ExtendedObject3D | null} player The player object, or null if not available.
     */
    update(player) {
        if (!this.platformObject || !this.physicsBody) return;

        let targetTiltX = 0;
        let targetTiltZ = 0;
        let playerIsOnPlatform = false;

        // Check if player exists and has userData before accessing properties
        if (player && player.userData) {
             playerIsOnPlatform = player.userData.isGrounded; // Assumes isGrounded is accurately set
        }

        // --- Player Influence ---
        if (playerIsOnPlatform) {
            // Calculate player position relative to the platform center
            const localPlayerPos = this.platformObject.worldToLocal(player.position.clone());
            // Player's Z position influences X tilt
            targetTiltX = localPlayerPos.z;
            // Player's X position influences Z tilt (inverted)
            targetTiltZ = -localPlayerPos.x;
        }
        // else: targetTilt remains 0, platform returns to level based on returnForce

        // --- Calculate Forces on Tilt ---
        // Force from player position + Force returning to level
        const forceX = (targetTiltX * this.config.playerInfluence) - (this.tilt.x * this.config.returnForce);
        const forceZ = (targetTiltZ * this.config.playerInfluence) - (this.tilt.z * this.config.returnForce);

        // --- Update Tilt Velocity ---
        // Apply forces calculated above
        this.tiltVelocity.x += forceX;
        this.tiltVelocity.z += forceZ;
        // Cannonball impacts are added directly via applyTiltImpulse

        // Apply damping
        this.tiltVelocity.x *= this.config.damping;
        this.tiltVelocity.z *= this.config.damping;

        // Clamp velocity
        this.tiltVelocity.x = MathUtils.clamp(this.tiltVelocity.x, -this.config.maxVelocity, this.config.maxVelocity);
        this.tiltVelocity.z = MathUtils.clamp(this.tiltVelocity.z, -this.config.maxVelocity, this.config.maxVelocity);

        // --- Update Tilt Angle ---
        this.tilt.x += this.tiltVelocity.x;
        this.tilt.z += this.tiltVelocity.z;

        // Clamp tilt angle
        this.tilt.x = MathUtils.clamp(this.tilt.x, -this.config.maxTilt, this.config.maxTilt);
        this.tilt.z = MathUtils.clamp(this.tilt.z, -this.config.maxTilt, this.config.maxTilt);

        // --- Apply Rotation ---
        // Set the platform's visual rotation based on the calculated tilt
        this.platformObject.rotation.set(this.tilt.x, 0, this.tilt.z);

        // --- Update Physics Body ---
        // IMPORTANT: Tell AmmoJS the kinematic body's state has changed
        this.physicsBody.needUpdate = true;
    }

    /** Returns the main THREE.Object3D for the platform. @returns {THREE.Object3D | null} */
    getObject3D() {
        return this.platformObject;
    }

    /** Cleans up the platform object and physics body. */
    destroy() {
        console.log("Destroying Platform...");
        if (this.platformObject) {
             if (this.physicsBody) {
                 // Destroy physics body via Enable3D
                 this.scene.third.physics.destroy(this.platformObject);
                 this.physicsBody = null;
             }
             // Destroy the visual object via Enable3D
             if (this.platformObject.parent) { // Check if it's still in the scene graph
                 this.scene.third.destroy(this.platformObject);
             }
        }
        this.platformObject = null;
        this.scene = null; // Release scene reference
    }
}
