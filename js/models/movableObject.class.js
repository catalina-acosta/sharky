/**
 * Class representing a movable object in the game.
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
    /**
     * The speed of the object.
     * @type {number}
     */
    speed = 0.15;

    /**
     * Indicates whether the object is facing the other direction.
     * @type {boolean}
     */
    otherDirection = false;

    /**
     * The offset for collision detection.
     * @type {Object}
     */
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };

    /**
     * The energy level of the object.
     * @type {number}
     */
    energy = 100;

    /**
     * The timestamp of the last hit.
     * @type {number}
     */
    lastHit = 0;

    /**
     * The coin level of the object.
     * @type {number}
     */
    coinLevel = 0;

    /**
     * The poison bubbles level of the object.
     * @type {number}
     */
    poisonBubblesLevel = 0;

    /**
     * Indicates whether the attack animation is done.
     * @type {boolean}
     */
    attackAnimationDone = false;

    /**
     * The counter for the attack animation.
     * @type {number}
     */
    attackCounter = 0;

    /**
     * Checks if the object is colliding with another object.
     * @param {MovableObject} mo - The other movable object.
     * @returns {boolean} - True if colliding, false otherwise.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left && 
        this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
        this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
        this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * Reduces the energy of the object when hit.
     * @param {number} energyLoss - The amount of energy to lose.
     */
    hit(energyLoss) {
        this.energy -= energyLoss;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object is hurt.
     * @returns {boolean} - True if hurt, false otherwise.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.8;
    }

    /**
     * Checks if the object is dead.
     * @returns {boolean} - True if dead, false otherwise.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Collects an item and increases the corresponding level.
     * @param {string} itemLevel - The level of the item to increase.
     */
    collectItem(itemLevel) {
        this[itemLevel] += 10;
        if (this[itemLevel] > 100) {
            this[itemLevel] = 100;
        }
    }

    /**
     * Uses an item and decreases the corresponding level.
     * @param {string} itemLevel - The level of the item to decrease.
     */
    useItem(itemLevel) {
        this[itemLevel] -= 10;
        if (this[itemLevel] <= 0) {
            this[itemLevel] = 0;
        }
    }

    /**
     * Plays the animation for the object.
     * @param {string[]} images - An array of image paths for the animation.
     * @param {boolean} [attack=false] - Indicates if the animation is an attack animation.
     */
    playAnimation(images, attack = false) {
        this.updateImages(images);
        if (attack) {
            this.handleAnimationImages(images);
        } 
    }

    /**
     * Updates the current image for the animation.
     * @param {string[]} images - An array of image paths for the animation.
     */
    updateImages(images) {
        let i = this.currentImage % images.length;
        let path =  images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Handles the attack animation images.
     * @param {string[]} images - An array of image paths for the attack animation.
     */
    handleAnimationImages(images) {
        if(this.attackCounter <= images.length && this.attackAnimationDone == false) {
            this.attackCounter++;
            if (this.attackCounter == images.length) {
                this.attackAnimationDone = true;
                this.attackCounter = 0;
            }
        }
    }

    /**
     * Moves the object to the right.
     */
    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    /**
     * Moves the object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Moves the object up.
     */
    moveUp() {
        this.y -= this.speed;
    }

    /**
     * Moves the object down.
     */
    moveDown() {
        this.y += this.speed;
    }
}