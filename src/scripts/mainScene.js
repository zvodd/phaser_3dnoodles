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
        this.gameOverText = null; // Reference to game over text object
        this.restartDelayTimer = null; // Timer for restart delay
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
        this.gameOverText = null;
        this.restartDelayTimer = null;

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
                this.handleGameOver("Wok Failure"); // Pass reason if desired
            }
        }
        // TODO: Add failure sound/animation
    }

    // --- Player Death Handler ---
    handlePlayerDeath(reason = "Fell off") {
        if (this.isGameOver) return; // Already game over
        console.log(`SCENE: Player died! Reason: ${reason}`);

        if (this.scoreUI) {
            const gameOver = this.scoreUI.decrementLives();
            if (gameOver) {
                this.handleGameOver(reason); // Trigger game over sequence
            } else {
                // Reset player position if not game over
                if (this.playerComponent && typeof this.playerComponent.resetPosition === 'function') {
                    // Reset to slightly above the center of the platform
                    // Use platform's initial position as a base, or a default fallback
                    const resetPosBase = this.platformComponent?.initialPosition || new Vector3(0, 5, 0);
                    const resetPos = resetPosBase.clone().add(new Vector3(0, 2, 0)); // Add offset
                    this.playerComponent.resetPosition(resetPos);

                    console.log("Player position reset.");
                    // TODO: Play respawn sound/effect
                } else {
                     console.error("Player component or resetPosition method not found!");
                }
            }
        }
    }


    // --- Game Over Handler ---
    handleGameOver(reason = "Unknown") {
        if (this.isGameOver) return; // Prevent multiple calls

        this.isGameOver = true;
        this.isPlaying = false; // Stop gameplay logic
        console.log(`GAME OVER! Reason: ${reason}`);

        // Stop timers
        if (this.cannonTimer) this.cannonTimer.remove();
        if (this.itemSpawnTimer) this.itemSpawnTimer.remove();
        console.log("Stopped game timers.");

        // Display Game Over Text centered
        const gameOverTextStyle = {
            font: 'bold 48px Arial', // Slightly smaller font
            fill: '#ff0000', // Red text
            backgroundColor: 'rgba(0,0,0,0.8)', // Dark semi-transparent background
            padding: { x: 20, y: 10 },
            align: 'center' // Center align text if multiline
        };
        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;
        // Store reference to text object for cleanup
        this.gameOverText = this.add.text(centerX, centerY,
            `GAME OVER!\nFinal Score: ${this.scoreUI?.getScore() || 0}`,
            gameOverTextStyle)
            .setOrigin(0.5, 0.5) // Center text block
            .setScrollFactor(0); // Keep fixed on screen

        // Schedule scene restart after a delay
        const restartDelay = 3000; // 3 seconds
        console.log(`Scheduling restart in ${restartDelay / 1000} seconds...`);
        // Store timer reference for cleanup
        this.restartDelayTimer = this.time.delayedCall(restartDelay, () => {
            console.log("Restarting scene now.");
            // Clear the timer reference before restarting
            this.restartDelayTimer = null;
            // this.scene.restart(); // Restart the current scene
        }, [], this);

        // TODO: Add other game over logic (disable input etc.)
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
                }
            } else {
                console.warn(`Could not register texture for type: ${type}. Invalid texture data.`);
            }
        });
        //CreateDebugButton(this)
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
        this.helpOverlay = new HelpOverlay(this);

        // --- Instantiate Score UI ---
        const scoreUiConfig = {
             initialLives: 3,
             textStyle: { font: 'bold 20px Arial', fill: '#ffff00' }
        };
        const scoreUiX = this.scale.width / 2;
        const scoreUiY = 30;
        this.scoreUI = new ScoreUI(this, scoreUiX, scoreUiY, scoreUiConfig);
        this.scoreUI.scoreText.setOrigin(0.5, 0);
        this.scoreUI.livesText.setOrigin(0.5, 0);

        // --- Instantiate Platform Component ---
        const platformConfig = { cannonballInfluence: 0.0015 };
        this.platformComponent = new Platform(
            this, this.models['smooth_flat_disc'], new Vector3(0, 5, 0), platformConfig
        );
        this.platform = this.platformComponent.getObject3D();
        if (!this.platform) { console.error("Failed to create platform object."); return; }

        // --- Setup Cannonball Hit Listener ---
        this.events.on('cannonball_hit_platform', (data) => {
            if (this.isGameOver) return;
            if (this.platformComponent && typeof this.platformComponent.applyTiltImpulse === 'function') {
                this.platformComponent.applyTiltImpulse(data.collisionPoint, data.impulseVector);
            } else {
                console.warn("Platform component or applyTiltImpulse method not available.");
            }
        }, this);

        // --- Create Other Game Objects ---
        this.cannon = new Cannon(this);
        this.createDeathPlane(); // Create death plane BEFORE setting up its collision listener

        // --- Create Recipe UIs ---
        const recipeUiConfig = {
            minItems: 2, maxItems: 3, imageSize: 40, spacing: 8, borderThickness: 2
        };
        const leftUiX = 50;
        const leftUiY = 50;
        const rightUiX = this.scale.width - (recipeUiConfig.maxItems * (recipeUiConfig.imageSize + recipeUiConfig.spacing)) - 50;
        const rightUiY = 50;
        this.leftRecipeUI = new RecipeUI(this, 'leftWokUI', leftUiX, leftUiY, this.itemTypes, this.itemTextures, recipeUiConfig, this.handleRecipeComplete.bind(this), this.handleRecipeFailure.bind(this));
        this.rightRecipeUI = new RecipeUI(this, 'rightWokUI', rightUiX, rightUiY, this.itemTypes, this.itemTextures, recipeUiConfig, this.handleRecipeComplete.bind(this), this.handleRecipeFailure.bind(this));

        // --- Create Woks ---
        const wokAnimation = { range: 6, duration: 5000 };
        this.wokL = new Wok(this, 'leftWok', this.leftRecipeUI, new Vector3(-15, 0, 0), wokAnimation);
        this.wokR = new Wok(this, 'rightWok', this.rightRecipeUI, new Vector3(15, 0, 0), wokAnimation);

        // --- Instantiate Player Component ---
        this.playerComponent = new Player(this, this.models['box_man']); // Assumes Player adds userData.isPlayer
        this.player = this.playerComponent.getObject3D();
        if (!this.player) { console.error("Failed to create player object."); return; }

        // --- Initialize Item Manager ---
        this.itemManager = new BillboardItemManager(this, { maxItems: 50, itemTypes: this.itemTypes }, this.models, this.itemTextures);

        // --- Spawn Items Timer ---
        this.itemSpawnTimer = this.time.addEvent({
            delay: 2000,
            callback: () => { if (!this.isGameOver && this.isPlaying) this.itemManager.spawnItem(); }, // Check flags
            callbackScope: this.itemManager,
            loop: true
        });

        // --- Death Plane Collision ---
        if (this.deathPlane && this.deathPlane.body) {
            this.deathPlane.body.on.collision((otherObject, event) => {
                if (this.isGameOver || event !== 'start') return; // Ignore if game over or not start event

                // Check if it's an item
                if (otherObject.userData?.isItem) {
                    this.itemManager.handleCollision(otherObject);
                }
                // Check if it's the player's physics body
                else if (otherObject.name == "player_man") {
                     this.handlePlayerDeath("Fell onto death plane");
                }
            });
        } else {
            console.error("Death plane or its physics body not found for collision setup.");
        }

        // --- Start Cannon Firing ---
        this.scheduleNextCannonFire();

        // --- Set Initial Game State ---
        this.isPlaying = !this.isGameOver;
        console.log("Scene Created.");

        // --- Scene Shutdown Listener ---
        this.events.on('shutdown', this.shutdown, this);
    } // End of create()


    scheduleNextCannonFire() {
        if (this.isGameOver) return;
        if (!this.isPlaying || !this.cannon) {
            this.cannonTimer = this.time.delayedCall(1000, this.scheduleNextCannonFire, [], this);
            return;
        }
        const minDelay = 2500;
        const maxDelay = 4500;
        const nextDelay = Phaser.Math.Between(minDelay, maxDelay);
        this.cannon.fire();
        this.cannonTimer = this.time.delayedCall(nextDelay, this.scheduleNextCannonFire, [], this);
    }

    createDeathPlane() {
        const deathPlaneY = -10;
        const deathPlaneSize = 100;
        this.deathPlane = new ExtendedObject3D();
        this.deathPlane.name = "DeathPlaneTrigger";
        this.deathPlane.position.set(0, deathPlaneY, 0);
        this.third.physics.add.existing(this.deathPlane, {
            shape: 'box', width: deathPlaneSize, height: 0.1, depth: deathPlaneSize,
            mass: 0, collisionFlags: 4, // Sensor flag
        });
    }

    update(time, delta) {
        if (this.isGameOver || !this.isPlaying) return; // Check both flags

        // Update Player
        this.playerComponent?.update(time, delta);
        // Update Platform
        this.platformComponent?.update(this.player);
        // Update Woks
        this.wokL?.update();
        this.wokR?.update();
    } // End of update()


    shutdown() {
        console.log("MainScene shutting down...");

        // --- Remove Event Listeners ---
        console.log("Removing event listeners...");
        this.events.off('cannonball_hit_platform');

        // --- Stop Timers ---
        if (this.cannonTimer) this.cannonTimer.remove();
        if (this.itemSpawnTimer) this.itemSpawnTimer.remove();
        if (this.restartDelayTimer) this.restartDelayTimer.remove(); // Stop restart timer

        // --- Clean up Components & Game Objects ---
        this.scoreUI?.destroy();
        if (this.gameOverText) this.gameOverText.destroy(); // Destroy game over text
        this.helpOverlay?.destroy();
        this.cannon?.destroy();
        this.platformComponent?.destroy();
        this.playerComponent?.destroy();
        this.wokL?.destroy();
        this.wokR?.destroy();

        // --- Nullify references ---
        this.scoreUI = null;
        this.gameOverText = null;
        this.helpOverlay = null;
        this.cannon = null;
        this.platformComponent = null;
        this.platform = null;
        this.playerComponent = null;
        this.player = null;
        this.wokL = null;
        this.wokR = null;
        this.itemManager = null;
        this.deathPlane = null;
        this.cannonTimer = null;
        this.itemSpawnTimer = null;
        this.restartDelayTimer = null;

        // Reset game state flags
        this.isPlaying = false;
        this.isGameOver = false;

        console.log("MainScene shutdown complete.");
    } // End of shutdown()

} // End of MainScene class
