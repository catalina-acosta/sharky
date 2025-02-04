/**
 * Class representing a bubble in the game.
 * @extends MovableObject
 */
class Bubble extends MovableObject {
    /**
     * The width of the bubble.
     * @type {number}
     */
    width = 20;

    /**
     * The height of the bubble.
     * @type {number}
     */
    height = 20;

    /**
     * The speed of the bubble.
     * @type {number}
     */
    speed = 20;

    /**
     * Create a bubble.
     * @param {number} x - The x-coordinate of the bubble.
     * @param {number} y - The y-coordinate of the bubble.
     * @param {boolean} direction - The direction of the bubble's movement.
     */
    constructor(x, y, direction) {
        super().loadImg('img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png');
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.bubbleAttack();
    }

    /**
     * Move the bubble in the specified direction.
     */
    bubbleAttack() {
        setInterval(() => {
            if (this.direction) {
                this.x -= 10;
                this.y += 1;
            } else {
                this.x += 10;
                this.y += 1;
            }
        }, 20);
    }
}