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
    attackAnimationDone = false;
    attackCounter = 0;

    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left && 
        this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
        this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
        this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    hit(energyLoss) {
        this.energy -= energyLoss;
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
        this[itemLevel] += 10;
        if (this[itemLevel] > 100) {
            this[itemLevel] = 100;
        }
    }

    useItem(itemLevel) {
        this[itemLevel] -= 10;
        if (this[itemLevel] <= 0) {
            this[itemLevel] = 0;
        }
    }

    playAnimation(images, attack = false) {
        let i = this.currentImage % images.length;
        let path =  images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
        if (attack) {
            if(this.attackCounter <= images.length && this.attackAnimationDone == false) {
                this.attackCounter++;
                if (this.attackCounter == images.length) {
                    this.attackAnimationDone = true;
                    this.attackCounter = 0;
                }
            }
        }
    }

    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    moveUp() {
        this.y -= this.speed;
    }

    moveDown() {
        this.y += this.speed;
    }
}
