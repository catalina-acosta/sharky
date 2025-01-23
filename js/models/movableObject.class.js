class MovableObject {
    x = 50;
    y = 150;
    img;
    height = 200;
    width = 200;

    loadImg(path) {
        this.img = new Image();
        this.img.src = path;
    }
    moveRight() {
        console.log('moing right');
    }
}
