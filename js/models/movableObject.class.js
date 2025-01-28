class MovableObject extends DrawableObject {

    speed = 0.15;
    otherDirection = false;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }
    energy = 100;
    lastHit = 0;
    coinLevel = 0;
    poisonBubblesLevel = 0;

    
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left && 
        this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
        this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
        this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.8;
    }

    isDead() {
        return this.energy == 0;
    }

    collectItem(itemLevel) {
        this[itemLevel] += 5;
        if (this[itemLevel] > 100) {
            this[itemLevel] = 100;
        }
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path =  images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    moveLeft() {
        this.x -= this.speed;
    }
}
