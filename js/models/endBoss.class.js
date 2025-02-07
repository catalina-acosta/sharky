/**
 * Class representing the end boss in the game.
 * @extends MovableObject
 */
class EndBoss extends MovableObject {
    /**
     * The height of the end boss.
     * @type {number}
     */
    height = 400;

    /**
     * The width of the end boss.
     * @type {number}
     */
    width = 400;

    /**
     * The y-coordinate of the end boss.
     * @type {number}
     */
    y = -350;

    /**
     * Offset values for collision detection.
     * @type {Object}
     */
    offset = {
        top: 100,
        bottom: 30,
        left: 50,
        right: 50
    };

    /**
     * Array of image paths for the end boss's animations.
     * @type {string[]}
     */
    IMAGES = [];

    /**
     * The speed of the end boss.
     * @type {number}
     */
    speed = 8;

    /**
     * Indicates whether the end boss has had first contact with the character.
     * @type {boolean}
     */
    hadFirstContact = false;

    /**
     * Creates an instance of EndBoss.
     * @param {Object} world - The world object that the end boss interacts with.
     */
    constructor(world) {
        super();
        this.world = world;
        this.loadImg(ImageArray.ENDBOSS_IMAGES_FLOATING[0]);
        this.loadImages(ImageArray.ENDBOSS_IMAGES_FLOATING);
        this.loadImages(ImageArray.ENDBOSS_IMAGES_HURT);
        this.loadImages(ImageArray.ENDBOSS_IMAGES_ATTACK);
        this.loadImages(ImageArray.ENDBOSS_IMAGES_DEAD);
        this.loadImages(ImageArray.ENDBOSS_IMAGES_INTRODUCE);
        this.x = 1800;
        this.animate();
        this.i = 0;
    }

    /**
     * Starts the animation handling for the end boss.
     */
    animate() {
        setInterval(() => {
            const distanceToCharacter = Math.abs(this.x - this.world.character.x);   
            this.handleEndBossAnimations(distanceToCharacter);
        }, 150);
    }

    /**
     * Handles the animations of the end boss based on the distance to the character.
     * @param {number} distanceToCharacter - The distance to the character.
     */
    handleEndBossAnimations(distanceToCharacter) {
        if (distanceToCharacter <= 500 && this.i < 8 && !this.hadFirstContact) {
            this.playIntroAimation();
        } else if (this.isDead()) {
            this.playDeadAnimation();
        } else if (this.isHurt()) {
            this.playHurtAnimation();
        } else if (this.i == 8 && distanceToCharacter < 500 && distanceToCharacter > 350) {
            this.playIdleAnimation();
        } else if (distanceToCharacter <= 350) {
            this.playAttackAnimation();
        }
    }

    /**
     * Plays the introduction animation for the end boss.
     */
    playIntroAimation() {
        this.y = 0;
        this.playAnimation(ImageArray.ENDBOSS_IMAGES_INTRODUCE);
        this.i++;
    }

    /**
     * Plays the dead animation for the end boss.
     */
    playDeadAnimation() {
        this.playAnimation(ImageArray.ENDBOSS_IMAGES_DEAD);
    }

    /**
     * Plays the hurt animation for the end boss.
     */
    playHurtAnimation() {
        AudioLibrary.playSound(AudioLibrary.DAMAGE);
        this.playAnimation(ImageArray.ENDBOSS_IMAGES_HURT);
    }

    /**
     * Plays the idle animation for the end boss.
     */
    playIdleAnimation() {
        this.hadFirstContact = true;
        this.playAnimation(ImageArray.ENDBOSS_IMAGES_FLOATING);
    }

    /**
     * Plays the attack animation for the end boss and makes it follow the character.
     */
    playAttackAnimation() {
        this.playAnimation(ImageArray.ENDBOSS_IMAGES_ATTACK);
        this.followCharacter();
    }

    /**
     * Makes the end boss follow the character.
     */
    followCharacter() {
        if (this.x > this.world.character.x) {
            this.otherDirection = false;
            this.x -= this.speed;
        } else if (this.x < this.world.character.x) {
            this.otherDirection = true;
            this.x += this.speed;
        }
        if (this.y > this.world.character.y) {
            this.y -= this.speed;
        } else if (this.y < this.world.character.y) {
            this.y += this.speed;
        }
    }
}