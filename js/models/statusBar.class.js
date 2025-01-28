class StatusBar extends DrawableObject {
    IMAGES = [];
    percentage = 100;

    constructor(images) {
        super();
        this.IMAGES = images;
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
        this.y = -10;
        this.x = 0;
        this.width = 200;
        this.height = 50;
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let imagePath = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[imagePath];
        
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}