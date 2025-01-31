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
            if (this.attackAnimationDone == false && this.world.character.x >= 700) {
                this.playAnimation(ImageArray.ENDBOSS_IMAGES_INTRODUCE, true);
            } else if (this.isDead()) {
                this.playAnimation(ImageArray.ENDBOSS_IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(ImageArray.ENDBOSS_IMAGES_HURT); 
            } else {
                this.playAnimation(ImageArray.ENDBOSS_IMAGES_FLOATING)
            }
        }, 100);
    }
}