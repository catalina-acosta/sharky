class Enemy extends MovableObject {
    height = 100;
    width = 100;
    IMAGES_SWIMING = [];
    currentImage = 0;
    constructor(){
        super().loadImg('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.loadImages(ImageArray.PUFFERFISH_IMAGES_TRANSITION);
        this.x = 200 + Math.random() * 500;
        this.y = 200 + Math.random() * 200;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(ImageArray.PUFFERFISH_IMAGES_TRANSITION);
        }, 200);
    }

}