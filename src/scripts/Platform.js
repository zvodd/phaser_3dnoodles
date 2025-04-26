import { THREE, ExtendedObject3D } from '@enable3d/phaser-extension';
import { MathUtils } from 'three';

export default class Platform {
    /**
     * Creates a tilting platform object, mirroring the logic previously in MainScene.
     * @param {Phaser.Scene} scene The Phaser 3D scene instance.
     * @param {object} platformGltf The loaded GLTF data for the platform model.
     * @param {object} config Physics configuration taken directly from MainScene's init.
     * @param {number} config.damping Damping factor.
     * @param {number} config.playerInfluence Player influence factor.
     * @param {number} config.returnForce Return-to-level force factor.
     * @param {number} config.maxTilt Maximum tilt angle.
     * @param {number} config.maxVelocity Maximum tilt velocity.
     * @param {THREE.Vector3} [position=new THREE.Vector3(0, 5, 0)] Initial position.
     */
    constructor(scene, platformGltf, position = new THREE.Vector3(0, 5, 0)) {
        this.scene = scene;
        this.platformObject = null; // The visual THREE.Object3D
        this.physicsBody = null;    // The Ammo physics body wrapper

        // --- State ---
        // Initialize state exactly as it was in MainScene.init
        this.tilt = { x: 0, z: 0 };
        this.tiltVelocity = { x: 0, z: 0 };

        this.initialPosition = position.clone();

        this._createPlatformModel(platformGltf);
        if (this.platformObject) {
            this._createPhysicsBody();
            // Ensure visual rotation and state match initial values
            this.platformObject.rotation.set(0, 0, 0);
            this.tilt = { x: 0, z: 0 };
            this.tiltVelocity = { x: 0, z: 0 };
        }

        this.config = {
            damping: 0.95,
            playerInfluence: 0.0006,
            returnForce: 0.003,
            maxTilt: Math.PI / 11,
            maxVelocity: 0.05
        };
    }

    /**
     * Creates the platform mesh from the loaded GLTF or a fallback.
     * (Identical to the logic in MainScene's createPlatform)
     * @param {object} platformGltf The loaded GLTF data.
     * @private
     */
    _createPlatformModel(platformGltf) {
        if (!platformGltf?.scene?.children?.[0]) {
            console.error("Platform model data invalid, using fallback.");
            this.platformObject = this.scene.third.add.box({ name: 'platform_fallback', width: 10, height: 0.5, depth: 10 }, { lambert: { color: 'grey' } });
        } else {
            this.platformObject = platformGltf.scene.children[0].clone();
            this.platformObject.name = 'platform_disc';
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
    }

    /**
     * Creates the physics body for the platform, matching original settings.
     * (Identical to the physics setup in MainScene's createPlatform)
     * @private
     */
    _createPhysicsBody() {
        if (!this.platformObject) return;
        // possible complexShapes::  ['plane', 'hull', 'hacd', 'vhacd', 'convexMesh', 'concaveMesh'];
        this.scene.third.physics.add.existing(this.platformObject, {
            shape: 'hull', 
            mesh: this.platformObject,
            mass: 0,
            collisionFlags: 2,
            friction: 0.8,
            restitution: 0.2
        });
        this.physicsBody = this.platformObject.body;
        console.log("Platform created with KINEMATIC hull shape (original settings).");
    }

    /**
     * Updates the platform's tilt based on player position and simple physics.
     * (Logic copied directly from MainScene's updatePlatformTilt)
     * @param {ExtendedObject3D | null} player The player object, or null if not available.
     */
    update(player) {
        if (!this.platformObject || !this.physicsBody || !player) return; // Need player for this logic

        let targetTiltX = 0;
        let targetTiltZ = 0;
        // Use the exact check from the provided MainScene.js updatePlatformTilt
        let playerIsOnPlatform = player.isGrounded;

        // Original check for player position relative to platform (from MainScene.js) - kept for reference but not used by playerIsOnPlatform check
        // const playerPos = player.position;
        // const platformPos = this.platformObject.position;
        // const platformRadiusSq = 5.5 * 5.5;

        if (playerIsOnPlatform) {
            const localPlayerPos = this.platformObject.worldToLocal(player.position.clone());
            targetTiltX = localPlayerPos.z;
            targetTiltZ = -localPlayerPos.x;
        }

        // Use config values passed from MainScene
        const forceX = (targetTiltX * this.config.playerInfluence) - (this.tilt.x * this.config.returnForce);
        const forceZ = (targetTiltZ * this.config.playerInfluence) - (this.tilt.z * this.config.returnForce);

        this.tiltVelocity.x += forceX;
        this.tiltVelocity.z += forceZ;

        this.tiltVelocity.x *= this.config.damping;
        this.tiltVelocity.z *= this.config.damping;

        this.tiltVelocity.x = MathUtils.clamp(this.tiltVelocity.x, -this.config.maxVelocity, this.config.maxVelocity);
        this.tiltVelocity.z = MathUtils.clamp(this.tiltVelocity.z, -this.config.maxVelocity, this.config.maxVelocity);

        this.tilt.x += this.tiltVelocity.x;
        this.tilt.z += this.tiltVelocity.z;

        this.tilt.x = MathUtils.clamp(this.tilt.x, -this.config.maxTilt, this.config.maxTilt);
        this.tilt.z = MathUtils.clamp(this.tilt.z, -this.config.maxTilt, this.config.maxTilt);

        this.platformObject.rotation.set(this.tilt.x, 0, this.tilt.z);

        // IMPORTANT: Kinematic bodies require needUpdate = true
        this.physicsBody.needUpdate = true;
    }

    /**
     * Returns the main THREE.Object3D for the platform.
     * @returns {THREE.Object3D | null}
     */
    getObject3D() {
        return this.platformObject;
    }

    /**
     * Cleans up the platform object and physics body.
     */
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