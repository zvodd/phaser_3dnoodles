/// <reference types="./phaser.d.ts" />

import { enable3d, Canvas } from '@enable3d/phaser-extension'
import { WEBGL, Game, Scale, Types } from "phaser";

import {
  Boot,
  GameOver,
  MainGame,
  MainMenu,
  Preloader,
} from "./scenes/index.ts";

const gameConfig: Types.Core.GameConfig = {
  type: WEBGL,
  width: 1024,
  height: 768,
  parent: "game-container", // The ID of the DOM element to which the game canvas will be appended
  backgroundColor: "#FFDE94",
  scale: {
    mode: Scale.FIT,
    autoCenter: Scale.CENTER_BOTH,
  },
  scene: [
    Boot,
    Preloader,
    MainMenu,
    MainGame,
    GameOver,
  ],
};

export default enable3d(() => new Game(gameConfig)).withPhysics('assets/ammo')
