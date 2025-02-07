/**
 * Class representing a level in the game.
 */
class Level {
    /**
     * Array of enemies in the level.
     * @type {Enemy[]}
     */
    enemies;

    /**
     * Array of background objects in the level.
     * @type {BackgroundObject[]}
     */
    backgroundObjects;

    /**
     * The x-coordinate where the level ends.
     * @type {number}
     */
    levelEndX = 1700;

    /**
     * The x-coordinate where the level begins.
     * @type {number}
     */
    levelBeginX = -100;

    /**
     * Creates an instance of Level.
     * @param {Enemy[]} enemies - An array of enemies in the level.
     * @param {BackgroundObject[]} backgroundObjects - An array of background objects in the level.
     */
    constructor(enemies, backgroundObjects) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
    }
}