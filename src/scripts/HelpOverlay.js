// src/HelpOverlay.js
import Phaser from 'phaser'; // Import Phaser if you need types or constants

export default class HelpOverlay {
    /**
     * Creates a toggleable help overlay component.
     * @param {Phaser.Scene} scene The Phaser Scene this overlay belongs to.
     * @param {string[]} [controls] Optional array of control strings. Defaults provided if omitted.
     * @param {object} [style] Optional Phaser text style configuration. Defaults provided if omitted.
     * @param {string|number} [toggleKey='FORWARD_SLASH'] Optional Phaser KeyCode string to toggle the overlay.
     */
    constructor(scene, controls = null, style = null, toggleKey = 'FORWARD_SLASH') {
        this.scene = scene;
        this.isVisible = false;
        this.textObject = null;
        this.toggleKey = toggleKey;

        // Define default controls if none provided
        this.controls = controls || [
            "Controls:",
            "WASD / Arrow Keys: Move Player",
            "Spacebar: Jump",
            "E / Left Click: Grab Item (when near)",
            "Q / Right Click: Throw Item",
            "/ or ?: Toggle Help",
        ];

        // Define default style if none provided
        this.style = style || {
            font: "16px Arial",
            fill: "#ffffff",
            backgroundColor: "rgba(0, 0, 0, 0.75)", // Slightly less transparent default
            padding: { x: 15, y: 10 },
            align: "left",
            wordWrap: { width: this.scene.cameras.main.width * 0.8 } // Wrap based on screen width
        };

        this.createHelpTextObject();
        this.setupInputListener();
    }

    /**
     * Creates the Phaser 2D text object.
     * @private
     */
    createHelpTextObject() {
        this.textObject = this.scene.add.text(
            this.scene.cameras.main.centerX,
            -200, // Start off-screen top
            this.controls.join('\n'),
            this.style
        )
        .setOrigin(0.5, 0.5) // Center origin
        .setDepth(1000)      // High depth value to ensure it's on top
        .setScrollFactor(0) // Fixed position relative to camera
        .setVisible(false); // Start hidden
    }

    /**
     * Sets up the keyboard listener for toggling.
     * @private
     */
    setupInputListener() {
        this.keyListener = (event) => {
            // Prevent toggling if an input field has focus (optional but good practice)
            if (event.target.nodeName === 'INPUT' || event.target.nodeName === 'TEXTAREA') {
                 return;
            }
            this.toggle();
        };
        this.scene.input.keyboard.on(`keydown-${this.toggleKey}`, this.keyListener);
    }

    /**
     * Toggles the visibility and position of the help overlay with animation.
     */
    toggle() {
        this.isVisible = !this.isVisible;

        // Stop any previous tweens on the text object to prevent conflicts
        this.scene.tweens.killTweensOf(this.textObject);

        if (this.isVisible) {
             // Make visible immediately before tweening position
            this.textObject.setVisible(true);
            this.scene.tweens.add({
                targets: this.textObject,
                y: this.scene.cameras.main.centerY, // Target center Y
                duration: 300,
                ease: 'Power2'
            });
            // console.log("Help overlay shown.");
        } else {
            // Tween out, then set invisible on complete
            this.scene.tweens.add({
                targets: this.textObject,
                y: -this.textObject.height, // Target off-screen top (adjust if origin isn't 0.5, 0.5)
                duration: 200,
                ease: 'Power1',
                onComplete: () => {
                    // Only set invisible if the state hasn't changed again during the tween
                    if (!this.isVisible) {
                        this.textObject.setVisible(false);
                    }
                }
            });
            // console.log("Help overlay hidden.");
        }
    }

    /**
     * There is RARELY a reason to implement cleanup in javascript.
     */
    destroy() {
        if (this.keyListener) {
            this.scene.input.keyboard.off(`keydown-${this.toggleKey}`, this.keyListener);
        }
    }
}