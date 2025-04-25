import {
  JoyStick,
  ExtendedObject3D,
} from '@enable3d/phaser-extension';
import PlayerController from './PlayerController.js'; // Import the new controller

/**
 * Check if it's a touch device
 */
const isTouchDevice = 'ontouchstart' in window;


/**
 * Move player creation logic here
 */
export default function CreatePlayer(scene){
    // **Create the Player**
      const object = scene.modelGltf['box_man']
      const man = object.scene.children[0];
      scene.player = new ExtendedObject3D(); // Assign to scene property
      scene.player.name = 'man';
      // scene.player.rotateY(Math.PI); // Start facing positive Z
      scene.player.add(man);
      scene.player.castShadow = true; // Apply shadow casting to the main object

      scene.player.rayJump = scene.third.physics.add.raycaster('allHit')

      scene.player.traverse(child => {
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
      scene.third.animationMixers.add(scene.player.anims.mixer);
      object.animations.forEach(animation => {
        if (animation.name) {
          scene.player.anims.add(animation.name, animation);
        }
      });
      scene.player.anims.play('idle');

      scene.player.position.set(0, 5.5, 0); // Start on top of the platform
      scene.third.add.existing(scene.player);

      // Physics
      scene.third.physics.add.existing(scene.player, {
        shape: 'capsule', // Use a capsule for better character movement
        radius: 0.25,
        height: 0.6, // Adjust height/radius as needed
        offset: { y: -0.7 } // Adjust offset to center the capsule
      });
      scene.player.body.setFriction(0.8);
      scene.player.body.setAngularFactor(0, 0, 0); // Prevent capsule from falling over
      scene.player.body.setCcdMotionThreshold(1e-7); // Enable CCD
      scene.player.body.setCcdSweptSphereRadius(0.25);

      // Ensure player collides with platform and spheres
      scene.player.body.setCollisionFlags(0); // Dynamic body
      //scene.player.body.setCollisionMask(-1); // Collide with everything
      //scene.player.body.setCollisionGroup(1);


      // **Initialize Player Controller** (after player is created)
      if (isTouchDevice) {
         scene.joystick = new JoyStick(); // Create joystick instance
       }
       scene.playerController = new PlayerController(scene, scene.player, scene.joystick);

    
}