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
    speed = 8;
    hadFirstContact = false;

    constructor(world) {
        super();
        this.world = world;
        this.loadImg(ImageArray.ENDBOSS_IMAGES_FLOATING[0]);
        this.loadImages(ImageArray.ENDBOSS_IMAGES_FLOATING);
        this.loadImages(ImageArray.ENDBOSS_IMAGES_HURT);
        this.loadImages(ImageArray.ENDBOSS_IMAGES_ATTACK);
        this.loadImages(ImageArray.ENDBOSS_IMAGES_DEAD);
        this.loadImages(ImageArray.ENDBOSS_IMAGES_INTRODUCE);
        this.x = 1500;
        this.animate();
    }

    animate(){
        let i = 0;
        setInterval(() => {
            const distanceToCharacter = Math.abs(this.x - this.world.character.x);
            if(i < 8 && distanceToCharacter <= 500 ) {
                this.playAnimation(ImageArray.ENDBOSS_IMAGES_INTRODUCE);
            } else if (distanceToCharacter > 500){

            }

            else {
                if (distanceToCharacter <= 350) {
                    this.playAnimation(ImageArray.ENDBOSS_IMAGES_ATTACK);
                    this.followCharacter();
                } else if (this.isDead()) {
                    this.playAnimation(ImageArray.ENDBOSS_IMAGES_DEAD);
                } 
                else if (this.isHurt()) {
                        this.playAnimation(ImageArray.ENDBOSS_IMAGES_HURT); 
                    } 
                else {
                    this.playAnimation(ImageArray.ENDBOSS_IMAGES_FLOATING);
                }
            }
            i++;

            if(this.world.character.x > 1500 && !this.hadFirstContact) {
                i = 0;
                this.hadFirstContact = true;
            }
        }, 150);
    }
    
    followCharacter() {
        if (this.x > this.world.character.x) { // moving rigth
            this.otherDirection = false;
            this.x -= this.speed; 
        } else if (this.x < this.world.character.x) { // moving left
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