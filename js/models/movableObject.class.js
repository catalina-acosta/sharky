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

    moveRight() {
        console.log('moing right');
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
            }, 1000 / 60);
    }
}
