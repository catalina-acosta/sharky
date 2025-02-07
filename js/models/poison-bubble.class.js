/**
 * Class representing a poison bubble in the game.
 * @extends MovableObject
 */
class PoisonBubble extends MovableObject {
    /**
     * The width of the poison bubble.
     * @type {number}
     */
    width = 40;

    /**
     * The height of the poison bubble.
     * @type {number}
     */
    height = 40;

    /**
     * Creates an instance of PoisonBubble.
     */
    constructor() {
        super().loadImg('img/4. Marcadores/Posión/Dark - Left.png');
        this.x = Math.random() * 1700;
        this.y = Math.random() * 400;
        this.loadImages(ImageArray.POISON_BUBBLE_IMAGES);
        this.animate();
    }

    /**
     * Animates the poison bubble by playing its animation.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(ImageArray.POISON_BUBBLE_IMAGES);
        }, 100);
    }
}