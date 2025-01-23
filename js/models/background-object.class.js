class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;

    constructor(imgPath, x, y) {
        super().loadImg(imgPath);
        this.x = x;
        this.y = y;
    }
}