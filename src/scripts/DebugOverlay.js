// src/DebugOverlay.js
import Phaser from 'phaser';

export default class DebugOverlay {
    /**
     * Creates a toggleable debug overlay component with interactive elements.
     * @param {Phaser.Scene & { third?: any, someDebugVariable?: any }} scene The Phaser Scene this overlay belongs to. Type hinted for Enable3D and example variable.
     * @param {string|number} [toggleKey='BACKTICK'] Optional Phaser KeyCode string or KeyCode number to toggle the overlay. Defaults to backtick (`).
     */
    constructor(scene, toggleKey = 'BACK_SLASH') {
        this.scene = scene;
        this.isVisible = false;
        this.container = null; // Will hold all UI elements
        this.toggleKey = toggleKey;

        // --- Style Definitions ---
        this.panelStyle = {
            fillColor: 0x000000, // Black background
            alpha: 0.8,        // Semi-transparent
        };

        this.textStyle = {
            font: "14px Arial",
            fill: "#00ff00", // Green text for debug feel
            align: "left",
        };

        this.buttonStyle = {
            font: "14px Arial",
            fill: "#00ff00",
            backgroundColor: "#333333", // Dark grey background for buttons
            padding: { x: 8, y: 4 },
        };

        this.buttonHoverStyle = {
            fill: "#ffffff",
            backgroundColor: "#555555", // Lighter grey on hover
        };
        // --- End Style Definitions ---

        this.debugInfoText = null; // To update scene variable display
        this.physicsDebugButton = null; // To update physics debug button text

        this.createDebugContainer();
        this.setupInputListener();

        // Initial update in case it's toggled immediately
        this.updateDebugInfo();
    }

    /**
     * Creates the Phaser Container and populates it with debug elements.
     * @private
     */
    createDebugContainer() {
        const padding = 15;
        let currentY = padding;

        // Create the container
        this.container = this.scene.add.container(
            this.scene.cameras.main.centerX,
            -300 // Start off-screen top
        )
        .setDepth(1100) // Higher depth than help overlay
        .setScrollFactor(0)
        .setVisible(false);

        // --- Create UI Elements ---

        // 1. Display Scene Variable (Example)
        // Make sure your scene actually *has* a property named 'someDebugVariable'
        // or change this line accordingly.
        const sceneVarValue = this.scene.someDebugVariable ?? 'N/A'; // Use nullish coalescing
        this.debugInfoText = this.scene.add.text(
            padding,
            currentY,
            `Scene Var: ${sceneVarValue}`,
            this.textStyle
        ).setOrigin(0, 0);
        currentY += this.debugInfoText.height + padding / 2;

        // 2. Placeholder Button 1
        const placeholderButton1 = this.createButton(
            padding,
            currentY,
            'Placeholder 1',
            () => {
                console.log("Placeholder Button 1 Clicked!");
                // Add desired action here
            }
        );
        currentY += placeholderButton1.height + padding / 2;


        // 4. Toggle Physics Debug Button
        const physicsDebugStatus = this.scene.third?.physics?.debug?.active ? 'ON' : 'OFF';
        this.physicsDebugButton = this.createButton(
            padding,
            currentY,
            `Toggle Physics Debug (${physicsDebugStatus})`,
            () => this.togglePhysicsDebug()
        );
        currentY += this.physicsDebugButton.height + padding;

        // 5. Load Scene Buttons
        const sceneKeysLabel = this.scene.add.text(
            padding,
            currentY,
            "Load Scene:",
            this.textStyle
        ).setOrigin(0, 0);
        currentY += sceneKeysLabel.height + padding / 2;

        const sceneButtons = [];
        const availableScenes = Object.keys(this.scene.game.scene.keys);
        // Filter out the current scene and potentially internal Phaser scenes if needed
        const filteredScenes = availableScenes.filter(key =>
            key !== this.scene.scene.key && key !== 'default' && key !== '__BASE' /* add others if necessary */
        );

        let currentX = padding;
        filteredScenes.forEach(sceneKey => {
            const sceneButton = this.createButton(
                currentX,
                currentY,
                sceneKey,
                () => {
                    console.log(`Attempting to load scene: ${sceneKey}`);
                    // Optionally hide the debug overlay before switching scenes
                    if (this.isVisible) {
                        this.toggle(false); // Force hide without animation
                    }
                    this.scene.scene.start(sceneKey);
                }
            );
            sceneButtons.push(sceneButton);
            currentX += sceneButton.width + padding / 2;
             // Basic wrapping logic - adjust max width as needed
            if (currentX > this.scene.cameras.main.width * 0.6) {
                 currentX = padding;
                 currentY += sceneButton.height + padding / 2;
                 sceneButton.setPosition(currentX, currentY); // Reposition the button that caused the wrap
                 currentX += sceneButton.width + padding / 2;
            }
        });
        // Find the max Y position of the last row of scene buttons
        if (sceneButtons.length > 0) {
            const lastButtonY = Math.max(...sceneButtons.map(b => b.y + b.height));
             currentY = Math.max(currentY, lastButtonY); // Ensure currentY is below the buttons
        }
        currentY += padding / 2; // Add final padding below buttons


        // --- Add Background and Elements to Container ---
        const allElements = [
            this.debugInfoText,
            placeholderButton1,
            this.physicsDebugButton,
            sceneKeysLabel,
            ...sceneButtons
        ];

        // Calculate bounds AFTER creating elements
        let maxWidth = 0;
        allElements.forEach(el => {
            // For buttons added later for wrapping, their x might reset, so consider x + width
            const elementWidth = (el.x - padding) + el.width; // Relative width from container edge
            maxWidth = Math.max(maxWidth, elementWidth);
        });
        const totalWidth = maxWidth + padding * 2; // padding on both sides
        const totalHeight = currentY + padding; // currentY is already at the bottom edge + padding

        // Create background panel
        const background = this.scene.add.graphics()
            .fillStyle(this.panelStyle.fillColor, this.panelStyle.alpha)
            .fillRect(0, 0, totalWidth, totalHeight);

        // Add background first (drawn behind)
        this.container.add(background);
        // Add all other elements
        this.container.add(allElements);

        // Center the container horizontally based on its calculated width
        // Container origin is 0,0 by default, so adjust position accordingly
        this.container.x = this.scene.cameras.main.centerX - totalWidth / 2;

        // Set the size for hit area detection if needed (optional)
        this.container.setSize(totalWidth, totalHeight);
         // Optional: Make the container itself interactive if you want to drag it, etc.
        // this.container.setInteractive();
        // this.scene.input.setDraggable(this.container);
        // this.container.on('drag', (pointer, dragX, dragY) => {
        //     this.container.setPosition(dragX, dragY);
        // });
    }

     /**
     * Helper to create a standard styled button.
     * @private
     */
    createButton(x, y, text, onClick) {
        const buttonText = this.scene.add.text(x, y, text, this.buttonStyle)
            .setOrigin(0, 0)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => onClick())
            .on('pointerover', () => buttonText.setStyle(this.buttonHoverStyle))
            .on('pointerout', () => buttonText.setStyle(this.buttonStyle));
        return buttonText;
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
     * Toggles the visibility and position of the debug overlay with animation.
     * @param {boolean} [forceState] - Optional. If true, shows; if false, hides, bypassing toggle logic.
     */
    toggle(forceState = null) {
        console.log("yo")
        const shouldBeVisible = forceState !== null ? forceState : !this.isVisible;

        if (shouldBeVisible === this.isVisible && forceState === null) {
             return; // Already in the desired state or mid-transition
        }

        this.isVisible = shouldBeVisible;

        // Stop any previous tweens on the container
        this.scene.tweens.killTweensOf(this.container);

        if (this.isVisible) {
            // Update dynamic info *before* showing
            this.updateDebugInfo();

            // Make visible immediately before tweening position
            this.container.setVisible(true);
            this.scene.tweens.add({
                targets: this.container,
                y: 10, // Target Y position near the top
                duration: 300,
                ease: 'Power2'
            });
            // console.log("Debug overlay shown.");
        } else {
            // Tween out, then set invisible on complete
            this.scene.tweens.add({
                targets: this.container,
                // Adjust target Y based on container origin (0,0) and height
                y: -this.container.height - 50, // Ensure it's well off-screen
                duration: 200,
                ease: 'Power1',
                onComplete: () => {
                    // Only set invisible if the state hasn't changed again during the tween
                    if (!this.isVisible) {
                        this.container.setVisible(false);
                    }
                }
            });
            // console.log("Debug overlay hidden.");
        }
    }

    /**
     * Updates dynamic information displayed in the overlay.
     * Call this method when the data changes or before showing the overlay.
     */
    updateDebugInfo() {
        if (!this.container || !this.debugInfoText) return; // Not created yet

        // Update Scene Variable Text
        const sceneVarValue = this.scene.someDebugVariable ?? 'N/A';
        this.debugInfoText.setText(`Scene Var: ${sceneVarValue}`);

        // Update Physics Debug Button Text
        if (this.physicsDebugButton && this.scene.third?.physics?.debug) {
             const physicsDebugStatus = this.scene.third.physics.debug.active ? 'ON' : 'OFF';
             this.physicsDebugButton.setText(`Toggle Physics Debug (${physicsDebugStatus})`);
        }

        // Add updates for any other dynamic elements here
    }

    /**
     * Toggles the Enable3D physics debug visualization.
     * @private
     */
    togglePhysicsDebug() {
        const debug = this.scene.third?.physics?.debug;
        if (debug) {
            const newState = !debug.active;
            debug.enable(newState);
            console.log(`Physics debug set to: ${newState}`);
            // Update button text immediately
            this.physicsDebugButton?.setText(`Toggle Physics Debug (${newState ? 'ON' : 'OFF'})`);
        } else {
            console.warn("Enable3D physics or debug drawer not found (scene.third.physics.debug)");
        }
    }

    /**
     * Cleans up listeners and destroys the container. Call this when the scene shuts down.
     */
    destroy() {
        // Stop any running tweens
        this.scene.tweens.killTweensOf(this.container);

        // Destroy the container and all its children
        if (this.container) {
            this.container.destroy(true); // Pass true to destroy children
            this.container = null;
        }

        // console.log("Debug overlay destroyed.");
    }
}