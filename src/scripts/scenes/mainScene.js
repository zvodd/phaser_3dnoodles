import {
  Scene3D,
  Canvas,
  THREE,
  JoyStick,
  PointerLock,
  PointerDrag,
  ExtendedObject3D,
  ThirdPersonControls
} from '@enable3d/phaser-extension'

/**
 * Check if it's a touch device
 */
const isTouchDevice = 'ontouchstart' in window

/**
 * MainScene Class
 */
export default class MainScene extends Scene3D {
  constructor() {
    super({ key: 'MainScene' })
  }


  init() {
    this.accessThirdDimension()
    this.canJump = true
    this.isJumping = false
    this.move = false
    this.moveTop = 0
    this.moveRight = 0
    this.spheres = [] // Array to keep track of spawned spheres
  }

  create() {
    // Initialize the 3D environment with basic components
    this.third.warpSpeed('camera', 'sky', 'grid', 'ground', 'light')

    // **Create the Platform**
    this.platform = this.third.add.box({ name: 'platform', width: 10, height: 0.5, depth: 10 }, { lambert: { color: 'gray' } })
    this.platform.position.set(0, 5, 0) // Positioned above the ground at y=5
    this.third.physics.add.existing(this.platform, { shape: 'hacd', mass: 0, collisionFlags: 2 }) // Kinematic body

    // **Create the Player**
    this.third.load.gltf('/assets/box_man.glb').then(object => {
      const man = object.scene.children[0]
      this.man = new ExtendedObject3D()
      this.man.name = 'man'
      this.man.rotateY(Math.PI + 0.1) // Adjust initial rotation
      this.man.add(man)
      this.man.traverse(child => {
        if (child.isMesh) {
          child.castShadow = child.receiveShadow = true
          child.material.roughness = 1
          child.material.metalness = 0
        }
      })
      this.third.animationMixers.add(this.man.anims.mixer)
      object.animations.forEach(animation => {
        if (animation.name) {
          this.man.anims.add(animation.name, animation)
        }
      })
      this.man.anims.play('idle')
      this.man.position.set(0, 5.5, 0) // Start on top of the platform
      this.third.add.existing(this.man)
      this.third.physics.add.existing(this.man, {
        shape: 'capsule',
        radius: 0.2,
        height: 0.6,
        offset: { y: -0.55 }
      })
      this.man.body.setFriction(0.8)
      this.man.body.setAngularFactor(0, 0, 0)
      this.controls = new ThirdPersonControls(this.third.camera, this.man, {
        offset: new THREE.Vector3(0, 1, 0),
        targetRadius: 3
      })
    })

    // **Input Controls**
    this.keys = {
      a: this.input.keyboard.addKey('a'),
      w: this.input.keyboard.addKey('w'),
      d: this.input.keyboard.addKey('d'),
      s: this.input.keyboard.addKey('s'),
      shift: this.input.keyboard.addKey(16),
      space: this.input.keyboard.addKey(32)
    }

    // **Pointer Lock and Drag for Mouse**
    if (!isTouchDevice) {
      const pointerLock = new PointerLock(this.game.canvas)
      const pointerDrag = new PointerDrag(this.game.canvas)
      pointerDrag.onMove(delta => {
        if (!pointerLock.isLocked()) return
        this.moveTop = -delta.y
        this.moveRight = delta.x
      })
    }

    // **Joystick for Touch Devices**
    if (isTouchDevice) {
      const joystick = new JoyStick()
      const axis = joystick.add.axis({ styles: { left: 35, bottom: 35, size: 100 } })
      axis.onMove(event => {
        this.moveTop = event.top * 3
        this.moveRight = event.right * 3
      })
      const buttonA = joystick.add.button({ letter: 'A', styles: { right: 35, bottom: 110, size: 80 } })
      buttonA.onClick(() => this.jump())
      const buttonB = joystick.add.button({ letter: 'B', styles: { right: 110, bottom: 35, size: 80 } })
      buttonB.onClick(() => (this.move = true))
      buttonB.onRelease(() => (this.move = false))
    }

    // **Spawn Spheres Periodically**
    this.time.addEvent({
      delay: 2000, // Every 2 seconds
      callback: this.spawnSphere,
      callbackScope: this,
      loop: true
    })
  }

  /**
   * Spawn a Sphere
   */
  spawnSphere() {
    //Guard for before playerspawn
    //if (!((this.man ?? false))) {return};

    const sphere = this.third.add.sphere({ radius: 1 }, { lambert: { color: 'red' } })
    sphere.scale.set(0.5,0.5,0.5);
    const x = (Math.random() - 0.5) * 10 // Random x within platform bounds
    const z = (Math.random() - 0.5) * 10 // Random z within platform bounds
    sphere.position.set(x, 10, z) // Spawn above platform
    this.third.physics.add.existing(sphere, { shape: 'sphere', mass: 1 })
    this.spheres.push(sphere)

    // Collision with player to pick up sphere
    this.third.physics.add.collider(this.platform, sphere, () => {})
    sphere.body.on.collision((otherObject, event) => {
      if (otherObject.name === 'man'){
        this.pickUpSphere(sphere)
        console.log(`sphere and ${otherObject.name}: ${event}`)
      }
    })
          
  }

  /**
   * Pick Up a Sphere
   */
  pickUpSphere(sphere) {
    if (!this.keys.shift.isDown) return
    this.third.scene.remove(sphere)
    this.third.physics.destroy(sphere)
    const index = this.spheres.indexOf(sphere)
    if (index > -1) this.spheres.splice(index, 1)
  }

  /**
   * Handle Player Jump
   */
  jump() {
    if (!this.man || !this.canJump) return
    this.canJump = false
    this.isJumping = true
    this.man.anims.play('jump_running')
    this.time.addEvent({ delay: 750, callback: () => (this.canJump = true) })
    this.time.addEvent({
      delay: 750,
      callback: () => {
        this.man.anims.play('idle')
        this.isJumping = false
      }
    })
    this.man.body.applyForceY(4)
  }

  update(time, delta) {
    if (this.man && this.man.body && this.controls && this.controls.update) {
      // Update third-person controls
      this.controls.update(this.moveRight * 3, -this.moveTop * 3)
      if (!isTouchDevice) this.moveRight = this.moveTop = 0

      // Player movement and rotation
      const speed = 4
      const v3 = new THREE.Vector3()
      const rotation = this.third.camera.getWorldDirection(v3)
      const theta = Math.atan2(rotation.x, rotation.z)
      const rotationMan = this.man.getWorldDirection(v3)
      const thetaMan = Math.atan2(rotationMan.x, rotationMan.z)
      this.man.body.setAngularVelocityY(0)
      const l = Math.abs(theta - thetaMan)
      let rotationSpeed = isTouchDevice ? 2 : 4
      const d = Math.PI / 24
      if (l > d) {
        if (l > Math.PI - d) rotationSpeed *= -1
        if (theta < thetaMan) rotationSpeed *= -1
        this.man.body.setAngularVelocityY(rotationSpeed)
      }

      if (this.keys.w.isDown || this.move) {
        if (this.man.anims.current === 'idle' && !this.isJumping) this.man.anims.play('run')
        const x = Math.sin(theta) * speed
        const y = this.man.body.velocity.y
        const z = Math.cos(theta) * speed
        this.man.body.setVelocity(x, y, z)
      } else if (this.man.anims.current === 'run' && !this.isJumping) {
        this.man.anims.play('idle')
      }

      if (this.keys.space.isDown && this.canJump) this.jump()

      // **Tilt the Platform**
      const localPlayerPos = this.platform.worldToLocal(this.man.position.clone())
      const k = 0.05 // Tilt sensitivity
      const tiltX = -k * localPlayerPos.z // Tilt around X-axis based on Z-position
      const tiltZ = k * localPlayerPos.x // Tilt around Z-axis based on X-position
      this.platform.rotation.set(tiltX, 0, tiltZ)

      // **Handle Spheres**
      // this.spheres.forEach(sphere => {
      //   // Check if sphere is on the platform
      //   const raycaster = new THREE.Raycaster(sphere.position, new THREE.Vector3(0, -1, 0), 0, 1)
      //   const intersects = this.third.physics.raycast(raycaster)
      //   sphere.isOnPlatform = intersects.length > 0 && intersects[0].body === this.platform.body

      //   if (sphere.isOnPlatform) {
      //     // Apply force away from center based on tilt
      //     const center = this.platform.position
      //     const spherePosXZ = new THREE.Vector3(sphere.position.x, center.y, sphere.position.z)
      //     const direction = spherePosXZ.sub(center).normalize()
      //     const upWorld = new THREE.Vector3(0, 1, 0).applyQuaternion(this.platform.quaternion)
      //     const tiltAngle = Math.acos(upWorld.y)
      //     const forceMagnitude = 0.5 * tiltAngle // Adjust force strength
      //     const force = direction.multiplyScalar(forceMagnitude)
      //     sphere.body.applyForce(force.x, 0, force.z) // Horizontal force in XZ plane
      //   }
      // })
    }
  }
}
