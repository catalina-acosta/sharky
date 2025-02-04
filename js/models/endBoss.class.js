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
        this.i = 0;
    }

    animate(){
        setInterval(() => {
            const distanceToCharacter = Math.abs(this.x - this.world.character.x);   
            console.log(distanceToCharacter);
            if (distanceToCharacter > 500 && !this.hadFirstContact) { // endboss should not be seen before introduce
                return;
            }    
            if(distanceToCharacter <= 500 && this.i < 8 && !this.hadFirstContact) {
                this.playAnimation(ImageArray.ENDBOSS_IMAGES_INTRODUCE);
                this.i ++;
            } else if ( this.i == 8 && distanceToCharacter < 500 && distanceToCharacter > 350 ){
                this.hadFirstContact = true;
                this.playAnimation(ImageArray.ENDBOSS_IMAGES_FLOATING);
            } else if (distanceToCharacter <= 350) {
                this.playAnimation(ImageArray.ENDBOSS_IMAGES_ATTACK);
                this.followCharacter();
            }
            else if (this.isDead()) {
                this.playAnimation(ImageArray.ENDBOSS_IMAGES_DEAD);
            } 
            else if (this.isHurt()) {
                    this.playAnimation(ImageArray.ENDBOSS_IMAGES_HURT); 
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