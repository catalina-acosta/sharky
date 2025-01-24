class MovableObject {
    x = 50;
    y = 150;
    img;
    height = 200;
    width = 200;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;

    loadImg(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(array) {
        array.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    playAnimation(images) {
        let i = this.currentImage % this.IMAGES_SWIMING.length;
        let path =  images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
    moveRight() {
        console.log('moing right');
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
            }, 1000 / 60);
    }
}
