class Character extends MovableObject {
    height = 200;
    speed = 5;
    IMAGES_SWIMING = [
        'img/1.Sharkie/3.Swim/1.png',
        'img/1.Sharkie/3.Swim/2.png',
        'img/1.Sharkie/3.Swim/3.png',
        'img/1.Sharkie/3.Swim/4.png',
        'img/1.Sharkie/3.Swim/5.png',
        'img/1.Sharkie/3.Swim/6.png'
    ];
    world;

    swimmingSound = new Audio('../audio/swiming.mp3');

    constructor(){
        super().loadImg('img/1.Sharkie/3.Swim/1.png');
        this.loadImages(this.IMAGES_SWIMING);

        this.animate();
    }

    animate() {
        setInterval(()=>{
            this.swimmingSound.pause();
            if(this.world.keyboard.RIGHT && this.x > 0 && this.x < this.world.level.levelEndX){
                this.x += this.speed;
                this.otherDirection = false;
                this.swimmingSound.play();
                console.log(this.otherDirection);
            }
            if(this.world.keyboard.LEFT){
                this.x -= this.speed;
                this.otherDirection = true;
                this.swimmingSound.play();
                console.log(this.otherDirection);
                
            }
            this.world.cameraX = -this.x + 50;
        }, 1000 / 60);

        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                // swim animation
                this.playAnimation(this.IMAGES_SWIMING);
            }
        }, 50);
    }

    jump(){

    }
}