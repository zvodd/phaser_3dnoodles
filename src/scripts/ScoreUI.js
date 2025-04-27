import Phaser from 'phaser';

/**
 * Manages and displays the game score and player lives (hearts).
 */
export default class ScoreUI {
    /**
     * Creates a ScoreUI instance.
     * @param {Phaser.Scene} scene The Phaser scene instance.
     * @param {number} x The x coordinate for the top-left corner of the UI display.
     * @param {number} y The y coordinate for the top-left corner of the UI display.
     * @param {object} [config={}] Configuration options.
     * @param {number} [config.initialLives=3] Starting number of lives.
     * @param {number} [config.initialScore=0] Starting score.
     * @param {object} [config.textStyle] Style options for the Phaser Text objects.
     * @param {string} [config.textStyle.font='bold 24px Arial'] Font style.
     * @param {string} [config.textStyle.fill='#ffffff'] Text color.
     * @param {object} [config.textStyle.padding={ x: 10, y: 5 }] Padding.
     * @param {string} [config.heartIcon='<3'] Character(s) used to represent a heart.
     * @param {string} [config.heartColor='#ff0000'] Color for the heart icons.
     * @param {number} [config.lineSpacing=10] Vertical spacing between score and lives lines.
     */
    constructor(scene, x, y, config = {}) {
        this.scene = scene;
        this.x = x;
        this.y = y;

        // --- Configuration ---
        const defaults = {
            initialLives: 3,
            initialScore: 0,
            textStyle: {
                font: 'bold 24px Arial',
                fill: '#ffffff', // White text default
                backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent black background
                padding: { x: 10, y: 5 }
            },
            heartIcon: '<3', // Default heart representation
            heartColor: '#ff0000', // Red color for hearts
            lineSpacing: 10 // Space between score and lives lines
        };
        // Deep merge for textStyle
        const mergedConfig = Phaser.Utils.Objects.MergeRight(defaults, config);
        mergedConfig.textStyle = Phaser.Utils.Objects.MergeRight(defaults.textStyle, config.textStyle || {});
        this.config = mergedConfig;


        // --- State ---
        this.lives = this.config.initialLives;
        this.score = this.config.initialScore;

        // --- UI Elements ---
        // Score Text - Positioned at the provided x, y
        this.scoreText = this.scene.add.text(
            this.x,
            this.y,
            '', // Initial text set in updateDisplay
            this.config.textStyle
        ).setOrigin(0, 0).setScrollFactor(0); // Fixed UI position

        // Lives Text - Positioned below the score text
        const livesY = this.y + this.scoreText.height + this.config.lineSpacing;
        this.livesText = this.scene.add.text(
            this.x,
            livesY,
            '', // Initial text set in updateDisplay
            this.config.textStyle
        ).setOrigin(0, 0).setScrollFactor(0); // Fixed UI position

        // Set initial display
        this.updateDisplay();
    }

    /**
     * Updates the text elements to reflect the current score and lives.
     * @private
     */
    updateDisplay() {
        if (!this.scoreText || !this.livesText) return; // Exit if text objects destroyed

        // Update Score Text
        this.scoreText.setText(`Score: ${this.score}`);

        // Update Lives Text (Hearts)
        let hearts = '';
        for (let i = 0; i < this.lives; i++) {
            hearts += this.config.heartIcon + ' ';
        }
        this.livesText.setText(`${hearts.trim()}`);
        // Optionally set heart color (might need more complex text object if mixing colors)
        // For simplicity, we'll keep the whole line the default fill color for now.
        // To color hearts specifically, you might need separate text objects or advanced text features.
        // this.livesText.setColor(this.config.heartColor); // This colors the whole line
    }

    /**
     * Increases the score by a specified amount.
     * @param {number} [amount=1] The amount to add to the score.
     */
    incrementScore(amount = 1) {
        this.score += amount;
        this.updateDisplay();
        console.log(`Score increased to: ${this.score}`);
    }

    /**
     * Decreases the number of lives by one.
     * @returns {boolean} True if the game is over (lives reached 0), false otherwise.
     */
    decrementLives() {
        if (this.lives > 0) {
            this.lives--;
            this.updateDisplay();
            console.log(`Lives decreased to: ${this.lives}`);
        }
        return this.isGameOver();
    }

    /**
     * Checks if the player has run out of lives.
     * @returns {boolean} True if lives are 0 or less, false otherwise.
     */
    isGameOver() {
        return this.lives <= 0;
    }

    /**
     * Gets the current score.
     * @returns {number} The current score.
     */
    getScore() {
        return this.score;
    }

    /**
     * Gets the current number of lives.
     * @returns {number} The current lives.
     */
    getLives() {
        return this.lives;
    }

    /**
     * There is RARELY a reason to implement cleanup in javascript.
     */
    destroy() { }
}
