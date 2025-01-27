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
    IMAGES_ATTACK_BUBBLETRAP = [
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png',
    ]
    IMAGES_ATTACK_FINSLAP = [
        'img/1.Sharkie/4.Attack/Fin slap/1.png',
        'img/1.Sharkie/4.Attack/Fin slap/2.png',
        'img/1.Sharkie/4.Attack/Fin slap/3.png',
        'img/1.Sharkie/4.Attack/Fin slap/4.png',
        'img/1.Sharkie/4.Attack/Fin slap/5.png',
        'img/1.Sharkie/4.Attack/Fin slap/6.png',
        'img/1.Sharkie/4.Attack/Fin slap/7.png',
        'img/1.Sharkie/4.Attack/Fin slap/8.png'
    ]
    IMAGES_DEAD = [
        'img/1.Sharkie/6.dead/1.Poisoned/1.png',
        'img/1.Sharkie/6.dead/1.Poisoned/2.png',
        'img/1.Sharkie/6.dead/1.Poisoned/3.png',
        'img/1.Sharkie/6.dead/1.Poisoned/4.png',
        'img/1.Sharkie/6.dead/1.Poisoned/5.png',
        'img/1.Sharkie/6.dead/1.Poisoned/6.png',
        'img/1.Sharkie/6.dead/1.Poisoned/7.png',
        'img/1.Sharkie/6.dead/1.Poisoned/8.png',
        'img/1.Sharkie/6.dead/1.Poisoned/9.png',
        'img/1.Sharkie/6.dead/1.Poisoned/10.png',
        'img/1.Sharkie/6.dead/1.Poisoned/11.png',
        'img/1.Sharkie/6.dead/1.Poisoned/12.png',
    ]
    IMAGES_HURT = [
        'img/1.Sharkie/5.Hurt/1.Poisoned/1.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/2.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/3.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/4.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/5.png',
    ]

    world;

    swimmingSound = new Audio('../audio/swiming.mp3');

    offset = {
        top: 30,
        bottom: 30,
        left: 30,
        right: 30
    }

    constructor(){
        super().loadImg('img/1.Sharkie/3.Swim/1.png');
        this.loadImages(this.IMAGES_SWIMING);
        this.loadImages(this.IMAGES_ATTACK_BUBBLETRAP);
        this.loadImages(this.IMAGES_ATTACK_FINSLAP);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);

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
            // } else if (this.world.keyboard.LEFT && this.x == this.world.level.levelBeginX) {
            //     this.otherDirection = false;
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
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                // swim animation
                this.playAnimation(this.IMAGES_SWIMING);
            } 
        }, 50);

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT); 
            }
            
        }, 50);

        setInterval(() => {
            if (this.world.keyboard.SPACE) {
                // swim animation
                this.playAnimation(this.IMAGES_ATTACK_FINSLAP);
            }
        }, 1000 / 60);

        setInterval(() => {
            if (this.world.keyboard.Q) {
                // swim animation
                this.playAnimation(this.IMAGES_ATTACK_BUBBLETRAP);
            }
        }, 1000 / 60);
    }

    jump(){

    }
}