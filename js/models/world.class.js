/**
 * Class representing the game world.
 */
class World {
    /**
     * The main character in the game.
     * @type {Character}
     */
    character = new Character();

    /**
     * The end boss in the game.
     * @type {EndBoss}
     */
    endBoss = new EndBoss(this);

    /**
     * The current level in the game.
     * @type {Level}
     */
    level = level1;

    /**
     * Array of enemies in the level.
     * @type {Enemy[]}
     */
    enemies = this.level.enemies;

    /**
     * Array of background objects in the level.
     * @type {BackgroundObject[]}
     */
    backgroundObjects = level1.backgroundObjects;

    /**
     * Array of coins in the game.
     * @type {Coin[]}
     */
    coins = [];

    /**
     * Array of poison bubbles in the game.
     * @type {PoisonBubble[]}
     */
    poisonBubbles = [];

    /**
     * The canvas element.
     * @type {HTMLCanvasElement}
     */
    canvas;

    /**
     * The canvas rendering context.
     * @type {CanvasRenderingContext2D}
     */
    ctx;

    /**
     * The keyboard input handler.
     * @type {Keyboard}
     */
    keyboard;

    /**
     * The x-coordinate of the camera.
     * @type {number}
     */
    cameraX = 0;

    /**
     * The status bar for the character's energy.
     * @type {StatusBar}
     */
    statusBarEnergy;

    /**
     * The status bar for the character's poison bubbles.
     * @type {StatusBar}
     */
    statusBarPB;

    /**
     * The status bar for the character's coins.
     * @type {StatusBar}
     */
    statusBarCoins;

    /**
     * Array of bubbles in the game.
     * @type {Bubble[]}
     */
    bubbles = [];

    /**
     * Indicates whether an encounter with an object is done.
     * @type {boolean}
     */
    encounterWithObjectDone = false;

    /**
     * Indicates whether a poison bubble is used.
     * @type {boolean}
     */
    isPoisonBubbleUsed = false;

    /**
     * Indicates whether the game is over.
     * @type {boolean}
     */
    gameOver = false;

    /**
     * Indicates whether all sounds are paused.
     * @type {boolean}
     */
    areAllSoundsPause = false;

    /**
     * Creates an instance of World.
     * @param {HTMLCanvasElement} canvas - The canvas element.
     */
    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.statusBarEnergy = new StatusBar(ImageArray.STATUSBAR_IMAGES);
        this.statusBarPB = new StatusBar(ImageArray.STATUS_PB_IMAGES);
        this.statusBarCoins = new StatusBar(ImageArray.STATUSBAR_COIN_IMAGES);
        this.statusBarEndboss = new StatusBar(ImageArray.STATUSBAR_IMAGES);
        this.statusBarPB.y = 25;
        this.statusBarPB.setPercentage(0);
        this.statusBarCoins.setPercentage(0);
        this.statusBarCoins.y = 60;
        this.statusBarEndboss.x = 500;
        this.draw();
        this.setWorld();
        this.collisions();
        this.addCollectableItems(10);
        this.run();
    }

    /**
     * Sets the world for the character.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Runs the game loop.
     */
    run() {
        setInterval(() => {
            this.collisions();
            this.checkAttackBubbles();
        }, 200);
    }

    /**
     * Checks if the character can attack with poison bubbles.
     */
    checkAttackBubbles() {
        if (this.keyboard.D && !this.keyboard.D_SOLVED && this.character.poisonBubblesLevel > 0 && !this.isPoisonBubbleUsed) {
            this.isPoisonBubbleUsed = true;
            this.keyboard.D_SOLVED = true;
            let bubble = new Bubble(this.character.x + 100, this.character.y + 100, this.character.otherDirection);
            this.bubbles.push(bubble);
            this.character.useItem('poisonBubblesLevel');
            this.statusBarPB.setPercentage(this.character.poisonBubblesLevel);
        }
        this.isPoisonBubbleUsed = false;
    }

    /**
     * Checks for collisions in the game.
     */
    collisions() {
        this.checkCollisionsEnemyChar();
        this.checkCollisionCoins();
        this.checkCollisionPB();
        this.checkCollisionBubbles();
        this.checkCollisionBubbleEndBoss();
        this.checkCollisionEndBossChar();
    }

    /**
     * Checks for collisions between the character and enemies.
     */
    checkCollisionsEnemyChar() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy) && this.keyboard.SPACE && this.character.isAttacking) {
                this.enemies[index].energy = 0;
                setTimeout(() => {
                    this.enemies.splice(index, 1);
                }, 1000);
            } else if (this.character.isColliding(enemy)) {
                this.character.hit(5);
                this.statusBarEnergy.setPercentage(this.character.energy);
            }
        });
    }

    /**
     * Checks for collisions between the character and coins.
     */
    checkCollisionCoins() {
        this.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.character.collectItem('coinLevel');
                this.statusBarCoins.setPercentage(this.character.coinLevel);
                this.coins.splice(index, 1);
            }
        });
    }

    /**
     * Checks for collisions between the character and poison bubbles.
     */
    checkCollisionPB() {
        this.poisonBubbles.forEach((pb, index) => {
            if (this.character.isColliding(pb)) {
                this.character.collectItem('poisonBubblesLevel');
                this.statusBarPB.setPercentage(this.character.poisonBubblesLevel);
                this.poisonBubbles.splice(index, 1);
            }
        });
    }

    /**
     * Checks for collisions between bubbles and enemies.
     */
    checkCollisionBubbles() {
        this.bubbles.forEach(bubble => {
            this.enemies.forEach((enemy, index) => {
                if (enemy.isColliding(bubble)) {
                    this.bubbles.splice(bubble, 1);
                    this.enemies[index].energy = 0;
                    setTimeout(() => {
                        this.enemies.splice(index, 1);
                    }, 1000);
                }
            });
        });
    }

    /**
     * Checks for collisions between bubbles and the end boss.
     */
    checkCollisionBubbleEndBoss() {
        this.bubbles.forEach(bubble => {
            if (this.endBoss.isColliding(bubble)) {
                this.bubbles.splice(bubble, 1);
                this.endBoss.hit(20);
                this.statusBarEndboss.setPercentage(this.endBoss.energy);
            }
        });
    }

    /**
     * Checks for collisions between the character and the end boss.
     */
    checkCollisionEndBossChar() {
        if (this.endBoss.isColliding(this.character)) {
            this.character.hit(20);
            this.statusBarEnergy.setPercentage(this.character.energy);
        }
    }

    /**
     * Checks if the game is over.
     */
    checkGameOver() {
        if (this.character.isDead()) {
            this.endBossWon();
        } else if (this.endBoss.isDead()) {
            this.characterWon();
        }
    }

    /**
     * Handles the end boss winning the game.
     */
    endBossWon() {
        let winner = "Endboss";
        AudioLibrary.GAMEOVER_SOUND.play();
        setTimeout(() => {
            this.renderGameOver(winner);
        }, 1000);
    }

    /**
     * Handles the character winning the game.
     */
    characterWon() {
        let winner = "Character";
        AudioLibrary.VICTORY.play();
        setTimeout(() => {
            this.renderGameOver(winner);
        }, 2000);
    }

    /**
     * Renders the game over screen.
     * @param {string} winner - The winner of the game.
     */
    renderGameOver(winner) {
        this.gameOver = true;
        AudioLibrary.SOUNDTRACK.pause();
        canvas = document.getElementById("canvas");
        let titleRef = document.getElementById("gameTitle");
        dialogBox = document.getElementById("dialog-container");
        canvas.classList.add("d-none");
        titleRef.classList.add("d-none");
        this.renderFinalTemplate(winner, dialogBox);
        AudioLibrary.stopAll();
    }

    /**
     * Renders the final template based on the winner.
     * @param {string} winner - The winner of the game.
     * @param {HTMLElement} dialogBox - The dialog box element.
     */
    renderFinalTemplate(winner, dialogBox) {
        if (winner == "Endboss") {
            dialogBox.innerHTML = gameLostTemplate();
        } else if (winner == "Character") {
            dialogBox.innerHTML = gameWonTemplate();
        }
    }

    /**
     * Adds collectable items to the game.
     * @param {number} amountOfItems - The number of items to add.
     */
    addCollectableItems(amountOfItems) {
        for (let index = 0; index < amountOfItems; index++) {
            this.coins.push(new Coin());
            this.poisonBubbles.push(new PoisonBubble());
        }
    }

    /**
     * Draws the game elements on the canvas.
     */
    draw() {
        if (this.gameOver) {
            return;
        }
        this.clearCanvas();
        this.moveCamera();
        this.drawBackgroundObjects();
        this.drawGameObjects();
        this.resetCamera();
        this.drawStatusBars();
        this.checkGameOver();
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Clears the canvas.
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Moves the camera.
     */
    moveCamera() {
        this.ctx.translate(this.cameraX, 0);
    }

    /**
     * Resets the camera position.
     */
    resetCamera() {
        this.ctx.translate(-this.cameraX, 0);
    }

    /**
     * Draws the background objects on the canvas.
     */
    drawBackgroundObjects() {
        this.addObjectToMap(this.level.backgroundObjects);
    }

    /**
     * Draws the game objects on the canvas.
     */
    drawGameObjects() {
        this.addObjectToMap(this.coins);
        this.addObjectToMap(this.poisonBubbles);
        this.addObjectToMap(this.level.enemies);
        this.addObjectToMap(this.bubbles);
        this.addToMap(this.character);
        this.addToMap(this.endBoss);
    }

    /**
     * Draws the status bars on the canvas.
     */
    drawStatusBars() {
        this.addToMap(this.statusBarPB);
        this.addToMap(this.statusBarEnergy);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarEndboss);
    }

    /**
     * Adds an array of objects to the map.
     * @param {Object[]} objects - The array of objects to add.
     */
    addObjectToMap(objects) {
        objects.forEach((object) => {
            this.addToMap(object);
        });
    }

    /**
     * Adds a single object to the map.
     * @param {MovableObject} mo - The movable object to add.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips the image of the object horizontally.
     * @param {MovableObject} mo - The movable object to flip.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Flips the image of the object back to its original orientation.
     * @param {MovableObject} mo - The movable object to flip back.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}