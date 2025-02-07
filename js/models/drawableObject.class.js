/**
 * Class representing a drawable object in the game.
 */
class DrawableObject {
    /**
     * The image object to be drawn.
     * @type {HTMLImageElement}
     */
    img;

    /**
     * Cache for storing loaded images.
     * @type {Object.<string, HTMLImageElement>}
     */
    imageCache = {};

    /**
     * Index of the current image.
     * @type {number}
     */
    currentImage = 0;

    /**
     * The x-coordinate of the object.
     * @type {number}
     */
    x = 50;

    /**
     * The y-coordinate of the object.
     * @type {number}
     */
    y = 150;

    /**
     * The height of the object.
     * @type {number}
     */
    height = 200;

    /**
     * The width of the object.
     * @type {number}
     */
    width = 200;

    /**
     * Loads an image from the specified path.
     * @param {string} path - The path to the image file.
     */
    loadImg(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads multiple images from the specified array of paths.
     * @param {string[]} array - An array of paths to the image files.
     */
    loadImages(array) {
        array.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws the image on the specified canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}