import Phaser from 'phaser';

/**
 * Manages and displays a recipe sequence using ingredient images.
 * Handles checking received items against the recipe and triggers callbacks.
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
     * @param {function(string):void} onCompleteCallback Function to call when the recipe is successfully completed. Receives uiId.
     * @param {function(string, string, string):void} onFailureCallback Function to call when the wrong item is received. Receives uiId, needed itemType, received itemType.
     */
    constructor(
        scene,
        uiId,
        x, y,
        availableItemTypes,
        itemTextures, // These are likely THREE textures, need adaptation for Phaser Images
        config = {},
        onCompleteCallback,
        onFailureCallback
    ) {
        this.scene = scene;
        this.uiId = uiId;
        this.x = x;
        this.y = y;
        this.availableItemTypes = availableItemTypes;
        this.itemTextures = itemTextures; // Store textures
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
        };
        this.config = { ...defaults, ...config };

        // --- State ---
        this.currentRecipe = []; // Array of item type strings
        this.neededIngredientIndex = 0;
        this.uiElements = []; // Array of { image: Phaser.GameObjects.Image, border: Phaser.GameObjects.Graphics }

        // --- Phaser Texture Adaptation ---
        // We need Phaser Textures for Phaser Images. Let's assume we have registered
        // the THREE textures with Phaser's texture manager using the itemType as the key.
        // If not, this needs to be done in MainScene's preload/create.
        // Example (in MainScene):
        // this.itemTypes.forEach(type => {
        //    const threeTexture = this.itemTextures[type];
        //    if (threeTexture && threeTexture.image) {
        //       this.textures.addImage(type, threeTexture.image);
        //    }
        // });

        this._generateNewRecipe();
    }

    /**
     * Generates a new random recipe and updates the UI display.
     * @private
     */
    _generateNewRecipe() {
        // Clear existing UI elements
        this.uiElements.forEach(element => {
            element.image.destroy();
            if (element.border) element.border.destroy();
        });
        this.uiElements = [];

        // Generate recipe
        const numItems = Phaser.Math.Between(this.config.minItems, this.config.maxItems);
        this.currentRecipe = [];
        for (let i = 0; i < numItems; i++) {
            const randomType = Phaser.Math.RND.pick(this.availableItemTypes);
            this.currentRecipe.push(randomType);
        }
        this.neededIngredientIndex = 0;
        console.log(`RecipeUI (${this.uiId}) new recipe: [${this.currentRecipe.join(', ')}]`);

        // Create new UI elements (Images and Borders)
        let currentX = this.x;
        this.currentRecipe.forEach((itemType, index) => {
            // --- Create Image ---
            // Use the itemType as the key for the Phaser texture
            const img = this.scene.add.image(currentX, this.y, itemType)
                .setOrigin(0, 0) // Top-left origin
                .setDisplaySize(this.config.imageSize, this.config.imageSize)
                .setScrollFactor(0); // Make UI fixed on screen

            // --- Create Border (initially hidden) ---
            const border = this.scene.add.graphics({ x: currentX, y: this.y })
                .lineStyle(this.config.borderThickness, 0x00FF00, 1) // Green border
                .strokeRect(0, 0, this.config.imageSize, this.config.imageSize)
                .setScrollFactor(0)
                .setVisible(false); // Start hidden

            this.uiElements.push({ image: img, border: border });

            currentX += this.config.imageSize + this.config.spacing; // Move X for next image
        });

        this._updateUiDisplay(); // Set initial border visibility
    }

    /**
     * Updates the visibility of the green borders based on collected items.
     * @private
     */
    _updateUiDisplay() {
        this.uiElements.forEach((element, index) => {
            if (element.border) {
                // Show border if the item at this index has been collected
                element.border.setVisible(index < this.neededIngredientIndex);
            }
        });
    }

    /**
     * Processes an item received by the associated Wok.
     * Checks if it matches the current recipe requirement.
     * @param {string} receivedItemType The type of the item received.
     * @param {ExtendedObject3D} itemObject The physics object of the item (for destruction).
     */
    handleItem(receivedItemType, itemObject) {
        console.log(`RecipeUI (${this.uiId}) handling item: ${receivedItemType}`);

        // Ignore if recipe already complete (during completion delay)
        if (this.neededIngredientIndex >= this.currentRecipe.length) {
            console.log(`RecipeUI (${this.uiId}): Recipe already complete or pending reset.`);
            this._destroyItem(itemObject); // Still destroy the item
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
                    this.onComplete(this.uiId); // Trigger callback
                }
                // Schedule regeneration
                this.scene.time.delayedCall(this.config.completionDelay, this._generateNewRecipe, [], this);
            } else {
                 // --- More items needed ---
                 // Optional: Play a success sound feedback
            }

        } else {
            // --- Incorrect Item ---
            console.log(`RecipeUI (${this.uiId}): WRONG item! Needed ${neededItem}, got ${receivedItemType}. Resetting.`);
            this.neededIngredientIndex = 0; // Reset progress
            this._updateUiDisplay(); // Hide all borders
            if (typeof this.onFailure === 'function') {
                this.onFailure(this.uiId, neededItem, receivedItemType); // Trigger callback
            }
            // Optional: Play a failure sound feedback
            // Optional: Regenerate recipe immediately on failure?
            // this._generateNewRecipe();
        }

        // Destroy the item regardless of correct/incorrect
        this._destroyItem(itemObject);
    }

     /**
     * Safely destroys the item using the scene's item manager.
     * @param {ExtendedObject3D} itemObject
     * @private
     */
    _destroyItem(itemObject) {
        if (this.scene.itemManager && typeof this.scene.itemManager.handleCollision === 'function') {
            this.scene.itemManager.handleCollision(itemObject);
        } else {
            console.warn(`RecipeUI (${this.uiId}): Cannot destroy item. Scene.itemManager or handleCollision method not found.`);
            // Fallback attempt (might cause issues if manager tracks it)
            // this.scene.third.destroy(itemObject);
        }
    }


    /**
     * Cleans up UI elements associated with this recipe display.
     */
    destroy() {
        console.log(`Destroying RecipeUI (${this.uiId})...`);
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
