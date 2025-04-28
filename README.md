# Cannon Ball Wok

Cannon Ball Wok is a fast-paced 3D physics game created in about 5 days for the **Gamedev.js Jam 2025** (April 13th - 26th). The theme for the jam was **Balance**.

Play [Cannon Ball Wok on itch.io](https://o0ddity.itch.io/cannon-ball-wok)!

## Gameplay

In Cannon Ball Wok, you control a character desperately trying to cook while standing on a large, tilting disc. A cannon periodically fires heavy cannonballs at the disc, and each impact sends it rocking!

Ingredients rain down from above. Your objective is to run around the unstable platform, using its ever-shifting **balance** to slide the falling ingredients into one of the two woks positioned nearby.

Each wok requires a specific sequence of ingredients for its current recipe. Successfully adding the correct ingredient scores points. However, if the wrong ingredient falls into a wok, you lose a heart, and that wok gets a new, random recipe. Stay balanced and cook quickly before you run out of lives!

## Technology Stack

This game was built using:

* **Phaser 3:** A popular and feature-rich HTML5 game framework. Chosen specifically to participate in the "Build it with Phaser" challenge.
* **Enable3D:** A plugin for Phaser that simplifies integrating 3D graphics and physics. It acts as a wrapper around:
    * **Three.js:** For 3D rendering.
    * **Ammo.js:** A JavaScript port of the Bullet physics engine, used here to simulate the tilting platform, cannonball impacts, and sliding ingredients, directly tying into the jam's **Balance** theme.

Initially cloned from the Enable3D [phaser-project-template](https://github.com/yandeu/phaser-project-template), which includes the latest enable3d.io version.

This stack allowed for rapid 3D development within the Phaser ecosystem, ideal for the game jam's timeframe.

## Gamedev.js Jam 2025 Participation

This project was created for and submitted to the Gamedev.js Jam 2025, participating in the following challenges:

* **Build it with Phaser:** Developed using the Phaser 3 framework.
* **Open Source Challenge by GitHub:** The source code is publicly available in this repository.
* **$NOODS Challenge by OP Games:** Embraces a chaotic, "vibe code" cooking theme with ingredients flying into woks, fitting the spirit of the challenge.

## Getting Started

This project uses [Bun](https://bun.sh/) as the package manager and runtime but should work with Node.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/zvodd/phaser_3dnoodles.git cannon-ball-wok
    ```
2.  **Navigate into the directory:**
    ```bash
    cd cannon-ball-wok
    ```
3.  **Install dependencies:**
    ```bash
    bun install
    ```
4.  **Start the local development server (usually on port 8080):**
    ```bash
    bun run start
    ```
5.  **Build for production (outputs to `/dist`):**
    ```bash
    bun run build
    ```