// src/MainScene.js
import { Scene3D, ExtendedObject3D } from '@enable3d/phaser-extension';
import { Vector3, MathUtils, PCFSoftShadowMap } from 'three';
import CreateDebugButton from './DebugButton.js';
import BillboardItemManager from './BillboardItemManager.js';
import HelpOverlay from './HelpOverlay.js';
import Cannon from './Cannon.js';
import Platform from './Platform.js';
import Player from './Player.js';
import Wok from './Wok.js';
import RecipeUI from './RecipeUI.js';
import ScoreUI from './ScoreUI.js'; // Import the ScoreUI class

export default class MainScene extends Scene3D {
    constructor() {
        super({ key: 'MainScene' });
        // Add properties for score UI and game state
        this.scoreUI = null;
        this.isGameOver = false; // Track game over state
        this.cannonTimer = null; // Timer for cannon firing
        this.itemSpawnTimer = null; // Timer for item spawning
    }

    init() {
        this.accessThirdDimension();
        this.isPlaying = false;
        this.isGameOver = false; // Reset game over state on init

        // Game Objects & Components
        this.playerComponent = null;
        this.player = null;
        this.platformComponent = null;
        this.platform = null;
        this.deathPlane = null;
        this.itemManager = null;
        this.helpOverlay = null;
        this.cannon = null;
        this.scoreUI = null; // Ensure it's null initially
        this.cannonTimer = null;
        this.itemSpawnTimer = null;

        // Assets
        this.itemTypes = ['noodles', 'leek', 'garlic', 'prawn'];
        this.itemTextures = {};
        this.modelNames = ["smooth_flat_disc", "boxboard", "box_man", "cannon", "wok"];
        this.models = {};
    }

    preload() {
        console.log("Preloading assets...");
        // Preload models
        const modelPromises = this.modelNames.map(name => {
            return this.third.load.gltf(`assets/${name}.glb`).then(gltf => {
                this.models[name] = gltf;
            }).catch(error => console.error(`Failed to load ${name} GLB:`, error));
        });

        // Preload item images
        const texturePromises = this.itemTypes.map(type => {
            const texturePath = `assets/img/${type}.png`;
            return this.third.load.texture(texturePath).then(texture => {
                this.itemTextures[type] = texture;
            }).catch(error => console.error(`Failed to load texture ${texturePath}:`, error));
        });

        this.assetLoadPromises = Promise.all([...modelPromises, ...texturePromises]);
    }

    // --- Callback Handlers for RecipeUI ---
    handleRecipeComplete(uiId) {
        if (this.isGameOver) return; // Don't process if game over

        console.log(`SCENE: Recipe Complete for ${uiId}!`);
        if (this.scoreUI) {
            this.scoreUI.incrementScore(100); // Example: Add 100 points per recipe
        }
        // TODO: Add success sound/animation
    }

    handleRecipeFailure(uiId, neededItem, receivedItem) {
        if (this.isGameOver) return; // Don't process if game over

        console.log(`SCENE: Recipe Failure for ${uiId}! Needed ${neededItem}, got ${receivedItem}`);
        if (this.scoreUI) {
            const gameOver = this.scoreUI.decrementLives(); // Decrement and check if game over
            if (gameOver) {
                this.handleGameOver(); // Call game over logic
            }
        }
        // TODO: Add failure sound/animation
    }

    // --- Game Over Handler ---
    handleGameOver() {
        if (this.isGameOver) return; // Prevent multiple calls

        this.isGameOver = true;
        this.isPlaying = false; // Stop main updates potentially
        console.log("GAME OVER!");

        // Stop timers
        if (this.cannonTimer) {
            this.cannonTimer.remove();
            console.log("Stopped cannon firing timer.");
        }
        if (this.itemSpawnTimer) {
            this.itemSpawnTimer.remove();
            console.log("Stopped item spawning timer.");
        }

        // Display Game Over Text centered
        const gameOverTextStyle = {
            font: 'bold 64px Arial',
            fill: '#ff0000', // Red text
            backgroundColor: 'rgba(0,0,0,0.7)', // Dark semi-transparent background
            padding: { x: 20, y: 10 },
            align: 'center' // Center align text if multiline
        };
        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;
        this.add.text(centerX, centerY, `GAME OVER!\nFinal Score: ${this.scoreUI?.getScore() || 0}`, gameOverTextStyle)
            .setOrigin(0.5, 0.5) // Center text block
            .setScrollFactor(0); // Keep fixed on screen

        // TODO: Add other game over logic (disable input, show restart button etc.)
    }


    async create() {
        console.log("Waiting for assets...");
        try {
            await this.assetLoadPromises;
            const loadedModels = Object.keys(this.models).length;
            const loadedTextures = Object.keys(this.itemTextures).length;
            if (loadedModels < this.modelNames.length || loadedTextures < this.itemTypes.length) {
                 throw new Error(`Asset loading incomplete. Models: ${loadedModels}/${this.modelNames.length}, Textures: ${loadedTextures}/${this.itemTypes.length}`);
            }
            console.log("Assets loaded successfully.");
        } catch (error) {
            console.error("Error during asset loading:", error);
            return;
        }

        // --- Register Textures with Phaser ---
        console.log("Registering item textures with Phaser...");
        this.itemTypes.forEach(type => {
            const threeTexture = this.itemTextures[type];
            if (threeTexture && threeTexture.image && threeTexture.image.src) {
                if (!this.textures.exists(type)) {
                     this.textures.addImage(type, threeTexture.image);
                     // console.log(`Registered Phaser texture: ${type}`); // Optional log
                }
            } else {
                console.warn(`Could not register texture for type: ${type}. Invalid texture data.`);
            }
        });

        console.log("Proceeding with scene creation...");

        // --- Setup Scene, Lights, Camera, Shadows... ---
        this.third.warpSpeed('camera', 'sky', 'grid', 'light');
        this.third.renderer.setPixelRatio(window.devicePixelRatio);
        this.third.renderer.setSize(window.innerWidth, window.innerHeight);
        this.third.camera.aspect = window.innerWidth / window.innerHeight;
        this.third.camera.updateProjectionMatrix();
        this.third.lights.directionalLight({ intensity: 0.8, castShadow: true });
        this.third.lights.hemisphereLight({ intensity: 0.6 });
        this.third.camera.position.set(0, 18, 20);
        this.third.camera.lookAt(new Vector3(0, 5, 0));
        this.third.renderer.shadowMap.enabled = true;
        this.third.renderer.shadowMap.type = PCFSoftShadowMap;

        // --- Instantiate UI Components ---
        // CreateDebugButton(this); // Uncomment if needed
        this.helpOverlay = new HelpOverlay(this);

        // --- Instantiate Score UI ---
        const scoreUiConfig = {
             initialLives: 3,
             textStyle: { font: 'bold 20px Arial', fill: '#ffff00' } // Example style override
        };
        const scoreUiX = this.scale.width / 2; // Center X
        const scoreUiY = 30; // Position near top
        this.scoreUI = new ScoreUI(this, scoreUiX, scoreUiY, scoreUiConfig);
        this.scoreUI.scoreText.setOrigin(0.5, 0); // Center score text
        this.scoreUI.livesText.setOrigin(0.5, 0); // Center lives text

        // --- Instantiate Platform Component ---
        const platformConfig = { cannonballInfluence: 0.0015 }; // Example config
        this.platformComponent = new Platform(
            this,
            this.models['smooth_flat_disc'],
            new Vector3(0, 5, 0), // Position
            platformConfig // Pass config
        );
        this.platform = this.platformComponent.getObject3D();
        if (!this.platform) {
             console.error("Failed to create platform object. Aborting.");
             return;
        }

        // --- Setup Cannonball Hit Listener ---
        console.log("Setting up cannonball hit listener...");
        this.events.on('cannonball_hit_platform', (data) => {
            if (this.isGameOver) return; // Ignore if game over
            if (this.platformComponent && typeof this.platformComponent.applyTiltImpulse === 'function') {
                this.platformComponent.applyTiltImpulse(data.collisionPoint, data.impulseVector);
            } else {
                console.warn("Platform component or applyTiltImpulse method not available when event received.");
            }
        }, this);

        // --- Create Other Game Objects ---
        this.cannon = new Cannon(this);
        this.createDeathPlane();

        // --- Create Recipe UIs ---
        const recipeUiConfig = {
            minItems: 2, maxItems: 3, imageSize: 40, spacing: 8, borderThickness: 2
        };
        const leftUiX = 50;
        const leftUiY = 50;
        const rightUiX = this.scale.width - (recipeUiConfig.maxItems * (recipeUiConfig.imageSize + recipeUiConfig.spacing)) - 50;
        const rightUiY = 50;

        this.leftRecipeUI = new RecipeUI(
            this, 'leftWokUI', leftUiX, leftUiY, this.itemTypes, this.itemTextures, recipeUiConfig,
            this.handleRecipeComplete.bind(this), this.handleRecipeFailure.bind(this) // Pass bound methods
        );
        this.rightRecipeUI = new RecipeUI(
            this, 'rightWokUI', rightUiX, rightUiY, this.itemTypes, this.itemTextures, recipeUiConfig,
            this.handleRecipeComplete.bind(this), this.handleRecipeFailure.bind(this) // Pass bound methods
        );

        // --- Create Woks (linking to RecipeUIs) ---
        const wokAnimation = { range: 6, duration: 5000 }; // Use range 6
        this.wokL = new Wok(this, 'leftWok', this.leftRecipeUI, new Vector3(-15, 0, 0), wokAnimation);
        this.wokR = new Wok(this, 'rightWok', this.rightRecipeUI, new Vector3(15, 0, 0), wokAnimation);

        // --- Instantiate Player Component ---
        this.playerComponent = new Player(this, this.models['box_man']);
        this.player = this.playerComponent.getObject3D();
        if (!this.player) {
             console.error("Failed to create player object. Aborting.");
             return;
        }

        // --- Initialize Item Manager ---
        this.itemManager = new BillboardItemManager(
            this, { maxItems: 50, itemTypes: this.itemTypes }, this.models, this.itemTextures
        );

        // --- Spawn Items Timer ---
        this.itemSpawnTimer = this.time.addEvent({
            delay: 2000,
            callback: () => { if (!this.isGameOver) this.itemManager.spawnItem(); }, // Check game over
            callbackScope: this.itemManager,
            loop: true
        });

        // --- Death Plane Collision ---
        this.deathPlane.body.on.collision((otherObject, event) => {
            if (this.isGameOver) return; // Ignore if game over
            if (otherObject.userData?.isItem) {
                this.itemManager.handleCollision(otherObject);
            }
        });

        // --- Start Cannon Firing ---
        this.scheduleNextCannonFire();

        // --- Set Initial Game State ---
        this.isPlaying = !this.isGameOver; // Start playing if not game over
        console.log("Scene Created.");

        // --- Scene Shutdown Listener ---
        this.events.on('shutdown', this.shutdown, this);
    } // End of create()

    /**
     * Fires the cannon and schedules the next fire event with a random delay.
     */
    scheduleNextCannonFire() {
        // Stop scheduling if game is over
        if (this.isGameOver) {
             console.log("Game over, stopping cannon fire scheduling.");
             return;
        }

        // Delay if scene isn't playing or cannon is missing
        if (!this.isPlaying || !this.cannon) {
            this.cannonTimer = this.time.delayedCall(1000, this.scheduleNextCannonFire, [], this);
            return; // Return to avoid firing immediately after delay
        }

        const minDelay = 2500;
        const maxDelay = 4500;
        const nextDelay = Phaser.Math.Between(minDelay, maxDelay);

        // Fire the cannon
        this.cannon.fire();

        // Schedule the next call recursively and store timer reference
        this.cannonTimer = this.time.delayedCall(nextDelay, this.scheduleNextCannonFire, [], this);
    }

    createDeathPlane() {
        const deathPlaneY = -10;
        const deathPlaneSize = 100;
        this.deathPlane = new ExtendedObject3D();
        this.deathPlane.name = "DeathPlaneTrigger";
        this.deathPlane.position.set(0, deathPlaneY, 0);

        this.third.physics.add.existing(this.deathPlane, {
            shape: 'box',
            width: deathPlaneSize, height: 0.1, depth: deathPlaneSize,
            mass: 0,
            collisionFlags: 4, // Sensor flag
        });
    }

    update(time, delta) {
        // Stop updates if game is over or not playing
        if (this.isGameOver || !this.isPlaying) return;

        // Update Player
        this.playerComponent?.update(time, delta);

        // Update Platform
        this.platformComponent?.update(this.player);

        // Update Woks
        this.wokL?.update();
        this.wokR?.update();

        // Update Item Manager (if it has an update loop)
        // this.itemManager?.update(time, delta);
    } // End of update()

    /**
     * Scene shutdown handler.
     */
    shutdown() {
        console.log("MainScene shutting down...");

        // --- Remove Event Listeners ---
        console.log("Removing event listeners...");
        this.events.off('cannonball_hit_platform');
        // No need to remove 'shutdown' listener itself

        // --- Stop Timers ---
        if (this.cannonTimer) this.cannonTimer.remove();
        if (this.itemSpawnTimer) this.itemSpawnTimer.remove();

        // --- Clean up Components ---
        this.scoreUI?.destroy(); // Destroy Score UI first
        this.helpOverlay?.destroy();
        this.cannon?.destroy();
        this.platformComponent?.destroy();
        this.playerComponent?.destroy();
        this.wokL?.destroy(); // Wok destroy calls RecipeUI destroy
        this.wokR?.destroy();

        // --- Nullify references ---
        this.scoreUI = null;
        this.helpOverlay = null;
        this.cannon = null;
        this.platformComponent = null;
        this.platform = null;
        this.playerComponent = null;
        this.player = null;
        this.wokL = null;
        this.wokR = null;
        this.itemManager = null;
        this.deathPlane = null; // Assuming it doesn't need explicit destroy
        this.cannonTimer = null;
        this.itemSpawnTimer = null;

        // Reset game state flags
        this.isPlaying = false;
        this.isGameOver = false;

        console.log("MainScene shutdown complete.");
    } // End of shutdown()

} // End of MainScene class
