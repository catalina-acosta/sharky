class Enemy extends MovableObject {
    height = 100;
    width = 100;
    IMAGES = [];
    currentImage = 0;
    constructor(name, images){
        super();
        this.name = name
        this.IMAGES = images;
        this.loadImg(this.IMAGES[0])
        this.loadImages(this.IMAGES);
        this.x = 300 + Math.random() * 800;
        this.y = 200 + Math.random() * 200;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 200);
    }
}