class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 50;
    y = 150;
    height = 200;
    width = 200;
    
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
    
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Enemy || this instanceof EndBoss || this instanceof Coin || this instanceof PoisonBubble) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x - this.offset.right, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
}