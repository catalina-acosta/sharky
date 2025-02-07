/**
 * Class representing a status bar in the game.
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {
    /**
     * Array of image paths for the status bar.
     * @type {string[]}
     */
    IMAGES = [];

    /**
     * The percentage value of the status bar.
     * @type {number}
     */
    percentage = 100;

    /**
     * Creates an instance of StatusBar.
     * @param {string[]} images - An array of image paths for the status bar.
     */
    constructor(images) {
        super();
        this.IMAGES = images;
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
        this.y = -10;
        this.x = 0;
        this.width = 200;
        this.height = 50;
    }

    /**
     * Sets the percentage value of the status bar and updates the image.
     * @param {number} percentage - The percentage value to set.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let imagePath = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[imagePath];
    }

    /**
     * Resolves the image index based on the percentage value.
     * @returns {number} - The index of the image to display.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}