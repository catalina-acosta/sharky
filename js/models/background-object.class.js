/**
 * Class representing a background object in the game.
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
    /**
     * The width of the background object.
     * @type {number}
     */
    width = 720;

    /**
     * The height of the background object.
     * @type {number}
     */
    height = 480;

    /**
     * Create a background object.
     * @param {string} imgPath - The path to the image file.
     * @param {number} x - The x-coordinate of the background object.
     * @param {number} y - The y-coordinate of the background object.
     */
    constructor(imgPath, x, y) {
        super().loadImg(imgPath);
        this.x = x;
        this.y = y;
    }
}