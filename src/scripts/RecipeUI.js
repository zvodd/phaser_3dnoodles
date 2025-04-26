import Phaser from 'phaser';

/**
 * Manages and displays a recipe sequence using ingredient images.
 * Handles checking received items against the recipe, triggers callbacks,
 * and implements a failure animation state.
 */
export default class RecipeUI {
    /**
     * Creates a RecipeUI instance.
     * @param {Phaser.Scene} scene The Phaser scene instance.
     * @param {string} uiId A unique identifier for this UI (e.g., 'leftWokUI', 'rightWokUI').
     * @param {number} x The x coordinate for the top-left corner of the UI display.
     * @param {number} y The y coordinate for the top-left corner of the UI display.
     * @param {string[]} availableItemTypes Array of all possible item type strings.
     * @param {Object.<string, THREE.Texture>} itemTextures Object mapping item type strings to their preloaded THREE.Textures (or Phaser Textures if adapted).
     * @param {object} [config] Configuration options.
     * @param {number} [config.minItems=2] Minimum items in a recipe.
     * @param {number} [config.maxItems=4] Maximum items in a recipe.
     * @param {number} [config.imageSize=48] Size (width/height) of the ingredient images.
     * @param {number} [config.spacing=10] Spacing between ingredient images.
     * @param {number} [config.borderThickness=3] Thickness of the green border.
     * @param {number} [config.completionDelay=1000] Delay in ms before generating a new recipe after completion.
     * @param {number} [config.failureDuration=1000] Duration in ms for the failure animation (red tint).
     * @param {function(string):void} onCompleteCallback Function to call when the recipe is successfully completed. Receives uiId.
     * @param {function(string, string, string):void} onFailureCallback Function to call when the wrong item is received. Receives uiId, needed itemType, received itemType.
     */
    constructor(
        scene,
        uiId,
        x, y,
        availableItemTypes,
        itemTextures, // Assumes these are registered as Phaser textures
        config = {},
        onCompleteCallback,
        onFailureCallback
    ) {
        this.scene = scene;
        this.uiId = uiId;
        this.x = x;
        this.y = y;
        this.availableItemTypes = availableItemTypes;
        this.itemTextures = itemTextures;
        this.onComplete = onCompleteCallback;
        this.onFailure = onFailureCallback;

        // --- Configuration ---
        const defaults = {
            minItems: 2,
            maxItems: 4,
            imageSize: 48,
            spacing: 10,
            borderThickness: 3,
            completionDelay: 1000,
            failureDuration: 1000, // Added: Duration for failure state
        };
        this.config = { ...defaults, ...config };

        // --- State ---
        this.currentRecipe = [];
        this.neededIngredientIndex = 0;
        this.uiElements = []; // Array of { image: Phaser.GameObjects.Image, border: Phaser.GameObjects.Graphics }
        this.isFailing = false; // Added: State to track failure animation
        this.failureTimer = null; // Added: Timer event for failure state duration

        // --- Phaser Texture Adaptation Check ---
        // Ensure textures are registered in the scene before use.
        // Example registration logic should be in MainScene.

        this._generateNewRecipe();
    }

    /**
     * Generates a new random recipe and updates the UI display.
     * Ensures any failure state visuals are cleared.
     * @private
     */
    _generateNewRecipe() {
        // Clear existing UI elements
        this.uiElements.forEach(element => {
            element.image.destroy();
            if (element.border) element.border.destroy();
        });
        this.uiElements = [];

        // Ensure failure state is reset visually and logically
        this.isFailing = false;
        if (this.failureTimer) {
            this.failureTimer.remove();
            this.failureTimer = null;
        }

        // Generate recipe
        const numItems = Phaser.Math.Between(this.config.minItems, this.config.maxItems);
        this.currentRecipe = [];
        for (let i = 0; i < numItems; i++) {
            const randomType = Phaser.Math.RND.pick(this.availableItemTypes);
            this.currentRecipe.push(randomType);
        }
        this.neededIngredientIndex = 0;
        console.log(`RecipeUI (${this.uiId}) new recipe: [${this.currentRecipe.join(', ')}]`);

        // Create new UI elements
        let currentX = this.x;
        this.currentRecipe.forEach((itemType) => {
            const img = this.scene.add.image(currentX, this.y, itemType)
                .setOrigin(0, 0)
                .setDisplaySize(this.config.imageSize, this.config.imageSize)
                .setScrollFactor(0)
                .setTint(0xffffff); // Ensure default tint

            const border = this.scene.add.graphics({ x: currentX, y: this.y })
                .lineStyle(this.config.borderThickness, 0x00FF00, 1) // Green border
                .strokeRect(0, 0, this.config.imageSize, this.config.imageSize)
                .setScrollFactor(0)
                .setVisible(false); // Start hidden

            this.uiElements.push({ image: img, border: border });
            currentX += this.config.imageSize + this.config.spacing;
        });

        this._updateUiDisplay();
    }

    /**
     * Updates the visibility of the green borders based on collected items.
     * @private
     */
    _updateUiDisplay() {
        // Don't update borders if in failure state (they should be red)
        if (this.isFailing) return;

        this.uiElements.forEach((element, index) => {
            // Reset tint to default white
            element.image.setTint(0xffffff);
            if (element.border) {
                element.border.setVisible(index < this.neededIngredientIndex);
            }
        });
    }

    /**
     * Processes an item received by the associated Wok.
     * @param {string} receivedItemType The type of the item received.
     * @param {ExtendedObject3D} itemObject The physics object of the item (for destruction).
     */
    handleItem(receivedItemType, itemObject) {
        console.log(`RecipeUI (${this.uiId}) handling item: ${receivedItemType}`);

        // --- Check if currently in failure state ---
        if (this.isFailing) {
            console.log(`RecipeUI (${this.uiId}): Currently in failure state, ignoring item.`);
            this._destroyItem(itemObject); // Still destroy the item
            return;
        }

        // Ignore if recipe already complete (during completion delay)
        if (this.neededIngredientIndex >= this.currentRecipe.length) {
            console.log(`RecipeUI (${this.uiId}): Recipe already complete or pending reset.`);
            this._destroyItem(itemObject);
            return;
        }

        const neededItem = this.currentRecipe[this.neededIngredientIndex];

        if (receivedItemType === neededItem) {
            // --- Correct Item ---
            console.log(`RecipeUI (${this.uiId}): Correct item! (${receivedItemType})`);
            this.neededIngredientIndex++;
            this._updateUiDisplay(); // Show green border

            if (this.neededIngredientIndex >= this.currentRecipe.length) {
                // --- Recipe Complete ---
                console.log(`RecipeUI (${this.uiId}): Recipe Complete!`);
                if (typeof this.onComplete === 'function') {
                    this.onComplete(this.uiId);
                }
                // Schedule regeneration after delay
                this.scene.time.delayedCall(this.config.completionDelay, this._generateNewRecipe, [], this);
            }
            // else: More items needed

        } else {
            // --- Incorrect Item ---
            console.log(`RecipeUI (${this.uiId}): WRONG item! Needed ${neededItem}, got ${receivedItemType}. Starting failure state.`);
            this.isFailing = true; // Enter failure state
            this.neededIngredientIndex = 0; // Reset progress logically

            // Trigger failure callback immediately
            if (typeof this.onFailure === 'function') {
                this.onFailure(this.uiId, neededItem, receivedItemType);
            }

            // Apply red tint and hide borders
            this.uiElements.forEach(element => {
                element.image.setTint(0xff0000); // Red tint
                if (element.border) element.border.setVisible(false);
            });

            // Schedule end of failure state and recipe reroll
            this.failureTimer = this.scene.time.delayedCall(
                this.config.failureDuration,
                () => {
                    this.isFailing = false; // Exit failure state
                    this.failureTimer = null;
                    console.log(`RecipeUI (${this.uiId}): Failure state ended. Rerolling recipe.`);
                    this._generateNewRecipe(); // Generate a new recipe
                },
                [],
                this
            );
        }

        // Destroy the item regardless of correct/incorrect (unless handled by failure state)
        this._destroyItem(itemObject);
    }

    /**
     * Safely destroys the item using the scene's item manager.
     * @param {ExtendedObject3D} itemObject
     * @private
     */
    _destroyItem(itemObject) {
        // Check if the item still exists before trying to destroy
        if (!itemObject || !itemObject.body || itemObject.body.isDisposed) {
             console.log(`RecipeUI (${this.uiId}): Item already destroyed or invalid.`);
             return;
        }

        if (this.scene.itemManager && typeof this.scene.itemManager.handleCollision === 'function') {
            this.scene.itemManager.handleCollision(itemObject);
        } else {
            console.warn(`RecipeUI (${this.uiId}): Cannot destroy item. Scene.itemManager or handleCollision method not found.`);
            // Fallback attempt (might cause issues if manager tracks it)
            // this.scene.third.destroy(itemObject);
        }
    }


    /**
     * Cleans up UI elements and any pending timers.
     */
    destroy() {
        console.log(`Destroying RecipeUI (${this.uiId})...`);
        // Clear any pending timers
        if (this.failureTimer) {
            this.failureTimer.remove();
            this.failureTimer = null;
        }
         // Clear completion timer if wok is destroyed mid-delay (less common)
        // This requires tracking the completion timer if you implement it.

        // Destroy UI elements
        this.uiElements.forEach(element => {
            element.image.destroy();
            if (element.border) element.border.destroy();
        });
        this.uiElements = [];
        this.currentRecipe = [];

        // Clear references
        this.scene = null;
        this.itemTextures = null;
        this.onComplete = null;
        this.onFailure = null;
    }
}
