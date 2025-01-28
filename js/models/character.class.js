class Character extends MovableObject {
    height = 200;
    speed = 5;
    IMAGES = [];
    world;

    swimmingSound = new Audio('../audio/swiming.mp3');

    offset = {
        top: 30,
        bottom: 30,
        left: 30,
        right: 30
    }

    constructor(){
        super().loadImg(ImageArray.CHARACTER_SWIMING[0]);
        this.loadImages(ImageArray.CHARACTER_SWIMING);
        this.loadImages(ImageArray.CHARACTER_ATTACK_BUBBLETRAP);
        this.loadImages(ImageArray.CHARACTER_ATTACK_FINSLAP);
        this.loadImages(ImageArray.CHARACTER_DEAD);
        this.loadImages(ImageArray.CHARACTER_HURT);

        this.animate();
    }

    animate() {
        setInterval(()=>{
            this.swimmingSound.pause();

            if(this.world.keyboard.RIGHT && this.x <= this.world.level.levelEndX){
                this.moveRight();
                this.swimmingSound.play();
            }

            if(this.world.keyboard.LEFT && this.x > this.world.level.levelBeginX){
                this.swimmingSound.play();
                this.moveLeft();
                this.otherDirection = true;
            }

            if(this.world.keyboard.UP && this.y > -90){
                this.y -= this.speed;
                this.swimmingSound.play();
            }

            if(this.world.keyboard.DOWN && this.y < 320){
                this.y += this.speed;
                this.swimmingSound.play();
            }

            this.world.cameraX = -this.x + 50;
        }, 1000 / 60);

        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) {
                // swim animation
                this.playAnimation(ImageArray.CHARACTER_SWIMING);
            } 
        }, 50);

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(ImageArray.CHARACTER_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(ImageArray.CHARACTER_HURT); 
            }
            
        }, 50);

        setInterval(() => {
            if (this.world.keyboard.SPACE) {
                // swim animation
                this.playAnimation(ImageArray.CHARACTER_ATTACK_FINSLAP);
            }
        }, 1000 / 60);

        setInterval(() => {
            if (this.world.keyboard.Q) {
                // swim animation
                this.playAnimation(ImageArray.CHARACTER_ATTACK_BUBBLETRAP);
            }
        }, 1000 / 60);
    }

    jump(){

    }
}