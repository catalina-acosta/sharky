class Character extends MovableObject {
    height = 200;
    speed = 5;
    IMAGES = [];
    world;
    isAttacking = false;
    inactivityTimer;
    inactivityDuration = 15000;
    isLongIdle = false; // attribute to check if lonIdle should be played

    offset = {
        top: 90,
        bottom: 40,
        left: 40,
        right: 40
    }

    constructor(){
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

    animate() {
        setInterval(()=>{
            AudioLibrary.SWIMMING.pause();
            AudioLibrary.SWIMMING.volume = 0.2;
            AudioLibrary.DAMAGE.playbackRate = 0.5;
            AudioLibrary.DAMAGE.volume = 0.2;

            if(this.world.keyboard.RIGHT && this.x <= this.world.level.levelEndX){
                this.moveRight();
                AudioLibrary.SWIMMING.play();
            } else if(this.world.keyboard.LEFT && this.x > this.world.level.levelBeginX){
                AudioLibrary.SWIMMING.play();
                this.moveLeft();
                this.otherDirection = true;
            }

            if(this.world.keyboard.UP && this.y > -90){
                this.moveUp();
                AudioLibrary.SWIMMING.play();
            }

            if(this.world.keyboard.DOWN && this.y < 320){
                this.moveDown();
                AudioLibrary.SWIMMING.play();
            }

            this.world.cameraX = -this.x + 50;
        }, 1000 / 60);

        setInterval(() => {
            if (this.isLongIdle) {
                this.playAnimation(ImageArray.CHARACTER_LONG_IDLE);
                return; // if longIdle is true, break and do go to other animations
            }

            if (this.isDead()) {
                this.playAnimation(ImageArray.CHARACTER_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(ImageArray.CHARACTER_HURT); 
                AudioLibrary.DAMAGE.play();
            } 
            else if (this.world.keyboard.SPACE && this.attackAnimationDone == false) {
                this.playAnimation(ImageArray.CHARACTER_ATTACK_FINSLAP, true);
                this.isAttacking = true;
                if(this.attackAnimationDone) {
                    this.attackAnimationDone = false;
                    this.world.keyboard.SPACE = false;
                }
            } 
            else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) {
                this.playAnimation(ImageArray.CHARACTER_SWIMING);
            } 
            else if (this.world.keyboard.D && this.attackAnimationDone == false) {
                this.playAnimation(ImageArray.CHARACTER_ATTACK_BUBBLETRAP, true);
                if(this.attackAnimationDone) {
                    this.attackAnimationDone = false;
                    this.world.keyboard.D = false;
                }
            } else {
                this.playAnimation(ImageArray.CHARACTER_IDLE);
            }
            
        }, 100);
    }

    setupInactivityListener() {
        window.addEventListener('keydown', () => { // listens when there is a keydown
            this.resetInactivityTimer(); // resets the timer when a key is pressed 
        });

        this.resetInactivityTimer(); // initial reset of the timer
    }

    resetInactivityTimer() {
        clearTimeout(this.inactivityTimer); // stops the timeout
        this.isLongIdle = false; // set to false, so that other animations can take place
        this.inactivityTimer = setTimeout(() => {
            this.isLongIdle = true; 
        }, this.inactivityDuration); // if the inactivity lasts 5 seconds, isLongIdle ist set to true
    }

}