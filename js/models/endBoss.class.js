class EndBoss extends MovableObject {
    height = 400;
    width = 400;
    y = 0;
    offset = {
        top: 100,
        bottom: 30,
        left: 50,
        right: 50
    }
    IMAGES = [];
    speed = 5;

    constructor(world) {
        super();
        this.world = world;
        this.loadImg(ImageArray.ENDBOSS_IMAGES_FLOATING[0]);
        this.loadImages(ImageArray.ENDBOSS_IMAGES_FLOATING);
        this.loadImages(ImageArray.ENDBOSS_IMAGES_HURT);
        this.loadImages(ImageArray.ENDBOSS_IMAGES_ATTACK);
        this.loadImages(ImageArray.ENDBOSS_IMAGES_DEAD);
        this.loadImages(ImageArray.ENDBOSS_IMAGES_INTRODUCE);
        this.x = 1000;
        this.animate();
    }

    animate(){
        setInterval(() => {
            // if (this.attackAnimationDone == false && this.world.character.x >= 700) {
            //     this.playAnimation(ImageArray.ENDBOSS_IMAGES_INTRODUCE, true);
            // } 
            if (this.world.character.x <= 700 && !this.isDead() && !this.world.character.isDead()) {
                this.playAnimation(ImageArray.ENDBOSS_IMAGES_ATTACK);
                this.followCharacter();
            }
            else if (this.isDead()) {
                this.playAnimation(ImageArray.ENDBOSS_IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(ImageArray.ENDBOSS_IMAGES_HURT); 
            } else {

            }
        }, 100);
    }
    
    followCharacter() {
        if (this.x > this.world.character.x) { // moving right
            this.otherDirection = false;
            this.x -= this.speed; 
        } else if (this.x < this.world.character.x) { // moving right
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