class Character extends MovableObject {
    height = 200;
    speed = 5;
    IMAGES = [];
    world;
    isAttacking = false;
    swimmingSound = new Audio('../audio/swiming.mp3');


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

        this.animate();
    }

    animate() {
        setInterval(()=>{
            this.swimmingSound.pause();

            if(this.world.keyboard.RIGHT && this.x <= this.world.level.levelEndX){
                this.moveRight();
                this.swimmingSound.play();
            } else if(this.world.keyboard.LEFT && this.x > this.world.level.levelBeginX){
                this.swimmingSound.play();
                this.moveLeft();
                this.otherDirection = true;
            }

            if(this.world.keyboard.UP && this.y > -90){
                this.moveUp();
                this.swimmingSound.play();
            }

            if(this.world.keyboard.DOWN && this.y < 320){
                this.moveDown();
                this.swimmingSound.play();
            }

            this.world.cameraX = -this.x + 50;
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(ImageArray.CHARACTER_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(ImageArray.CHARACTER_HURT); 
            } 
            else if (this.world.keyboard.SPACE && this.attackAnimationDone == false) {
                this.playAnimation(ImageArray.CHARACTER_ATTACK_FINSLAP, true);
                if(this.attackAnimationDone) {
                    this.attackAnimationDone = false;
                    this.world.keyboard.SPACE = false;
                }
                // setTimeout(() => {
                //     this.isAttacking = false;
                // }, 1000);
            } 
            else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) {
                // swim animation
                this.playAnimation(ImageArray.CHARACTER_SWIMING);
            } else if (this.world.keyboard.D && this.attackAnimationDone == false) {
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
}