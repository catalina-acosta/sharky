class Enemy extends MovableObject {
    height = 100;
    width = 100;
    IMAGES_SWIMING = [
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png',
    ];
    currentImage = 0;
    constructor(){
        super().loadImg('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.loadImages(this.IMAGES_SWIMING);
        this.x = 200 + Math.random() * 500;
        this.y = 200 + Math.random() * 200;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    animate() {
        this.moveLeft();

        setInterval(() => {
            this.x -= 1;
            let i = this.currentImage % this.IMAGES_SWIMING.length;
            let path =  this.IMAGES_SWIMING[i];
            this.img = this.imageCache[path];
            this.currentImage++;

        }, 100);
    }

}