/**
 * Class representing an enemy in the game.
 * @extends MovableObject
 */
class Enemy extends MovableObject {
    /**
     * The height of the enemy.
     * @type {number}
     */
    height = 100;

    /**
     * The width of the enemy.
     * @type {number}
     */
    width = 100;

    /**
     * Array of image paths for the enemy's animations.
     * @type {string[]}
     */
    IMAGES = [];

    /**
     * Array of image paths for the enemy's dead animations.
     * @type {string[]}
     */
    IMAGES_DEAD = [];

    /**
     * Index of the current image.
     * @type {number}
     */
    currentImage = 0;

    /**
     * Creates an instance of Enemy.
     * @param {string} name - The name of the enemy.
     * @param {string[]} images - An array of image paths for the enemy's animations.
     */
    constructor(name, images, imagesDead) {
        super();
        this.name = name;
        this.IMAGES = images;
        this.IMAGES_DEAD = imagesDead;
        this.loadImg(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        this.loadImages(this.IMAGES_DEAD)
        this.x = 300 + Math.random() * 1500;
        this.y = 200 + Math.random() * 200;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    /**
     * Animates the enemy by moving it left and playing its animations.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            if(this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else {
                this.playAnimation(this.IMAGES);
            }
        }, 200);
    }
}