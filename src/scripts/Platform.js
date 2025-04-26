import { THREE, ExtendedObject3D } from '@enable3d/phaser-extension';
import { MathUtils } from 'three';

export default class Platform {
    /**
     * Creates a tilting platform object.
     * @param {Phaser.Scene} scene The Phaser 3D scene instance.
     * @param {object} platformGltf The loaded GLTF data for the platform model.
     * @param {THREE.Vector3} [position=new THREE.Vector3(0, 5, 0)] Initial position.
     * @param {object} [config={}] Configuration for physics and tilt.
     * @param {number} [config.damping=0.95] Damping factor for tilt velocity.
     * @param {number} [config.playerInfluence=0.0006] How much player position affects tilt.
     * @param {number} [config.cannonballInfluence=0.001] How much cannonball impacts affect tilt.
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
        this.platformObject = null;
        this.physicsBody = null;

        // --- State ---
        this.tilt = { x: 0, z: 0 };
        this.tiltVelocity = { x: 0, z: 0 };
        this.initialPosition = position.clone();

        // --- Configuration ---
        const defaults = {
            damping: 0.95,
            playerInfluence: 0.0006,
            cannonballInfluence: 0.0009, // Default influence for cannonballs
            returnForce: 0.003,
            maxTilt: Math.PI / 11,
            maxVelocity: 0.05
        };
        this.config = { ...defaults, ...config }; // Merge provided config with defaults

        // --- Initialization ---
        this._createPlatformModel(platformGltf);
        if (this.platformObject) {
            this._createPhysicsBody();
            this.platformObject.rotation.set(0, 0, 0);
            this.tilt = { x: 0, z: 0 };
            this.tiltVelocity = { x: 0, z: 0 };
        }
    }

    /** Creates the platform mesh. @private */
    _createPlatformModel(platformGltf) {
        if (!platformGltf?.scene?.children?.[0]) {
            console.error("Platform model data invalid, using fallback.");
            this.platformObject = this.scene.third.add.box({ name: 'platform_fallback', width: 10, height: 0.5, depth: 10 }, { lambert: { color: 'grey' } });
        } else {
            this.platformObject = platformGltf.scene.children[0].clone();
            this.platformObject.name = 'platform_disc'; // Assign consistent name
        }

        this.scene.third.add.existing(this.platformObject);
        this.platformObject.position.copy(this.initialPosition);
        this.platformObject.receiveShadow = true;
        this.platformObject.castShadow = false;

        this.platformObject.traverse(child => {
            if (child.isMesh) {
                child.receiveShadow = true;
            }
        });
        console.log(`Platform model created with name: ${this.platformObject.name}`);
    }

    /** Creates the physics body. @private */
    _createPhysicsBody() {
        if (!this.platformObject) return;
        // Use the exact physics settings from your original code
        this.scene.third.physics.add.existing(this.platformObject, {
            shape: 'hull',
            mesh: this.platformObject,
            mass: 0,
            collisionFlags: 2, // KINEMATIC_OBJECT
            friction: 0.8,     // Original value
            restitution: 0.2   // Original value
        });
        this.physicsBody = this.platformObject.body;
        this.physicsBody.userData = { isPlatform: true };
        console.log("Platform physics body created (KINEMATIC hull).");
    }

    /**
     * Applies a tilt effect based on cannonball impact using simplified impulse data.
     * @param {THREE.Vector3} worldCollisionPoint Point of impact in world coordinates (cannonball position).
     * @param {THREE.Vector3} worldImpulseVector Simplified impulse vector (only Y component) in world coordinates.
     */
    applyTiltImpulse(worldCollisionPoint, worldImpulseVector) {
        if (!this.platformObject || !this.physicsBody) return;

        // --- Calculate Torque (Simplified using Y-Impulse) ---
        // 1. Lever Arm (r): Vector from platform center to collision point (in local space)
        const localCollisionPoint = this.platformObject.worldToLocal(worldCollisionPoint.clone());

        // 2. Force (F): Simplified impulse vector (only Y component)
        // We only need the magnitude of the Y-impulse for this simplified calculation
        const impulseMagnitudeY = worldImpulseVector.y; // This will likely be negative (downward)

        // 3. Torque Approximation:
        //    - Impulse at local +X causes negative Z rotation (torque around Z)
        //    - Impulse at local +Z causes positive X rotation (torque around X)
        //    The magnitude of torque is roughly |Force * Lever Arm Component|
        const torqueZ = -localCollisionPoint.x * impulseMagnitudeY; // Torque around Z axis
        const torqueX = localCollisionPoint.z * impulseMagnitudeY;  // Torque around X axis

        // --- Apply Torque to Tilt Velocity ---
        const influence = this.config.cannonballInfluence;

        // Apply the calculated torque components scaled by influence
        const deltaTiltVelX = torqueX * influence; // Tilt around X caused by torque around X
        const deltaTiltVelZ = torqueZ * influence; // Tilt around Z caused by torque around Z

        this.tiltVelocity.x += deltaTiltVelX;
        this.tiltVelocity.z += deltaTiltVelZ;

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

        if (player && player.userData) {
             playerIsOnPlatform = player.userData.isGrounded;
        }

        // --- Player Influence ---
        if (playerIsOnPlatform) {
            const localPlayerPos = this.platformObject.worldToLocal(player.position.clone());
            targetTiltX = localPlayerPos.z;
            targetTiltZ = -localPlayerPos.x;
        }

        // --- Calculate Forces on Tilt ---
        const forceX = (targetTiltX * this.config.playerInfluence) - (this.tilt.x * this.config.returnForce);
        const forceZ = (targetTiltZ * this.config.playerInfluence) - (this.tilt.z * this.config.returnForce);

        // --- Update Tilt Velocity ---
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
        this.platformObject.rotation.set(this.tilt.x, 0, this.tilt.z);

        // --- Update Physics Body ---
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
                 this.scene.third.physics.destroy(this.platformObject);
                 this.physicsBody = null;
             }
             if (this.platformObject.parent) {
                 this.scene.third.destroy(this.platformObject);
             }
        }
        this.platformObject = null;
        this.scene = null;
    }
}
