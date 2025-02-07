/**
 * Class representing the main character in the game.
 * @extends MovableObject
 */
class Character extends MovableObject {
    /**
     * The height of the character.
     * @type {number}
     */
    height = 200;

    /**
     * The speed of the character.
     * @type {number}
     */
    speed = 5;

    /**
     * Array of image paths for the character's animations.
     * @type {string[]}
     */
    IMAGES = [];

    /**
     * The world object that the character interacts with.
     * @type {Object}
     */
    world;

    /**
     * Indicates whether the character is attacking.
     * @type {boolean}
     */
    isAttacking = false;

    /**
     * Timer for detecting inactivity.
     * @type {number}
     */
    inactivityTimer;

    /**
     * Duration of inactivity before the character goes into long idle state.
     * @type {number}
     */
    inactivityDuration = 15000;

    /**
     * Indicates whether the character is in a long idle state.
     * @type {boolean}
     */
    isLongIdle = false;

    /**
     * Offset values for collision detection.
     * @type {Object}
     */
    offset = {
        top: 90,
        bottom: 40,
        left: 40,
        right: 40
    };

    /**
     * Creates an instance of Character.
     */
    constructor() {
        super().loadImg(ImageArray.CHARACTER_SWIMING[0]);
        this.loadImages(ImageArray.CHARACTER_SWIMING);
        this.loadImages(ImageArray.CHARACTER_ATTACK_BUBBLETRAP);
        this.loadImages(ImageArray.CHARACTER_ATTACK_FINSLAP);
        this.loadImages(ImageArray.CHARACTER_DEAD);
        this.loadImages(ImageArray.CHARACTER_HURT);
        this.loadImages(ImageArray.CHARACTER_IDLE);
        this.loadImages(ImageArray.CHARACTER_LONG_IDLE);

        this.animate();
        this.setupInactivityListener();
    }

    /**
     * Starts the animation and movement handling for the character.
     */
    animate() {
        this.handleMovement();
        this.handleAnimationStates();
    }

    /**
     * Handles the movement of the character based on keyboard input.
     */
    handleMovement() {
        setInterval(() => {
            AudioLibrary.SWIMMING.pause();
            AudioLibrary.DAMAGE.playbackRate = 0.5;
            this.checkKeyAndAnimation();
            this.world.cameraX = -this.x + 50;
        }, 1000 / 60);
    }

    /**
     * Checks the keyboard input and updates the character's movement and animation accordingly.
     */
    checkKeyAndAnimation() {
        if (this.canMoveRight()) {
            this.moveRight();
            AudioLibrary.playSound(AudioLibrary.SWIMMING);
        } else if (this.canMoveLeft()) {
            AudioLibrary.playSound(AudioLibrary.SWIMMING);
            this.moveLeft();
            this.otherDirection = true;
        }
        if (this.canMoveUp()) {
            this.moveUp();
            AudioLibrary.playSound(AudioLibrary.SWIMMING);
        }
        if (this.canMoveDown()) {
            this.moveDown();
            AudioLibrary.playSound(AudioLibrary.SWIMMING);
        }
    }

    /**
     * Checks if the character can move right.
     * @returns {boolean} - True if the character can move right, false otherwise.
     */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x <= this.world.level.levelEndX;
    }

    /**
     * Checks if the character can move left.
     * @returns {boolean} - True if the character can move left, false otherwise.
     */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > this.world.level.levelBeginX;
    }

    /**
     * Checks if the character can move up.
     * @returns {boolean} - True if the character can move up, false otherwise.
     */
    canMoveUp() {
        return this.world.keyboard.UP && this.y > -90;
    }

    /**
     * Checks if the character can move down.
     * @returns {boolean} - True if the character can move down, false otherwise.
     */
    canMoveDown() {
        return this.world.keyboard.DOWN && this.y < 320;
    }

    /**
     * Handles the animation states of the character.
     */
    handleAnimationStates() {
        setInterval(() => this.checkStateAndAnimation(), 100);
    }

    /**
     * Checks the state of the character and plays the corresponding animation.
     */
    checkStateAndAnimation() {
        if (this.isLongIdle) {
            this.playSleepAnimation();
            return;
        } else if (this.isDead()) {
            this.playDeadAnimation();
        } else if (this.isHurt()) {
            this.playHurtAnimation();
        } else if (this.world.keyboard.SPACE && !this.attackAnimationDone) {
            this.playFinslapAnimation();
        } else if (this.world.keyboard.D && !this.attackAnimationDone) {
            this.playBubbleAttack();
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) {
            this.playAnimation(ImageArray.CHARACTER_SWIMING);
        } else {
            this.playAnimation(ImageArray.CHARACTER_IDLE);
        }
    }

    /**
     * Plays the sleep animation for the character.
     */
    playSleepAnimation() {
        this.playAnimation(ImageArray.CHARACTER_LONG_IDLE);
        AudioLibrary.playSound(AudioLibrary.SNOARING_SOUND);
    }

    /**
     * Plays the dead animation for the character.
     */
    playDeadAnimation() {
        this.playAnimation(ImageArray.CHARACTER_DEAD);
        AudioLibrary.playSound(AudioLibrary.GAMEOVER_SOUND);
    }

    /**
     * Plays the hurt animation for the character.
     */
    playHurtAnimation() {
        this.playAnimation(ImageArray.CHARACTER_HURT);
        AudioLibrary.playSound(AudioLibrary.HURT_SOUND);
    }

    /**
     * Plays the finslap attack animation for the character.
     */
    playFinslapAnimation() {
        AudioLibrary.playSound(AudioLibrary.FINSLAP_SOUND);
        this.playAnimation(ImageArray.CHARACTER_ATTACK_FINSLAP, true);
        this.isAttacking = true;
        if (this.attackAnimationDone) {
            this.attackAnimationDone = false;
            this.world.keyboard.SPACE = false;
        }
    }

    /**
     * Plays the bubble attack animation for the character.
     */
    playBubbleAttack() {
        this.playAnimation(ImageArray.CHARACTER_ATTACK_BUBBLETRAP, true);
        AudioLibrary.playSound(AudioLibrary.BUBBLE_SOUND);
        if (this.attackAnimationDone) {
            this.attackAnimationDone = false;
            this.world.keyboard.D = false;
        }
    }

    /**
     * Sets up the inactivity listener to detect when the character is idle.
     */
    setupInactivityListener() {
        window.addEventListener('keydown', () => {
            this.resetInactivityTimer();
        });
        window.addEventListener('touchstart', () => {
            this.resetInactivityTimer();
        });
        this.resetInactivityTimer();
    }

    /**
     * Resets the inactivity timer and sets the character to long idle state after a duration.
     */
    resetInactivityTimer() {
        clearTimeout(this.inactivityTimer);
        this.isLongIdle = false;
        this.inactivityTimer = setTimeout(() => {
            this.isLongIdle = true;
        }, this.inactivityDuration);
    }
}