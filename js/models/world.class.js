class World {
    character = new Character();
    level = level1;
    enemies = this.level.enemies;
    backgroundObjects = level1.backgroundObjects;
    coins = [];
    poisonBubbles = [];
    canvas;
    ctx;
    keyboard;
    cameraX = 0;
    statusBarEnergy;
    statusBarPB;
    statusBarCoins;
    bubbles = []

    constructor(canvas){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.statusBarEnergy = new StatusBar(ImageArray.STATUSBAR_IMAGES);
        console.log(this.statusBarEnergy);
        this.statusBarPB = new StatusBar(ImageArray.STATUS_PB_IMAGES);
        console.log(this.statusBarPB);
        this.statusBarCoins = new StatusBar(ImageArray.STATUSBAR_COIN_IMAGES);
        this.statusBarPB.y = 25;
        this.statusBarPB.setPercentage(0);
        this.statusBarCoins.setPercentage(0);
        this.statusBarCoins.y = 60;
        this.draw();
        this.setWorld();
        this.checkCollisions();
        this.addCollectableItems(10);
        this.run();
    }

    setWorld() {  
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkAttackBubbles();
        }, 200);
    }

    checkAttackBubbles() {
        if(this.keyboard.D) {
            let bubble = new Bubble(this.character.x + 100, this.character.y + 100);
            this.bubbles.push(bubble);
        }
    }

    checkCollisions() {
        this.level.enemies.forEach( enemy => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBarEnergy.setPercentage(this.character.energy);
            }
        });
        this.coins.forEach( coin => {
            if (this.character.isColliding(coin)) {
                this.character.collectItem('coinLevel');
                this.statusBarCoins.setPercentage(this.character.coinLevel);
                this.coins.splice(coin, 1);
            }
        });
        this.poisonBubbles.forEach( pb => {
            if (this.character.isColliding(pb)) {
                this.character.collectItem('poisonBubblesLevel');
                this.statusBarPB.setPercentage(this.character.poisonBubblesLevel);
                this.poisonBubbles.splice(pb, 1);
            }
        })
    }

    addCollectableItems(amountOfItems) {
        for (let index = 0; index < amountOfItems; index++) {
            this.coins.push(new Coin());
            this.poisonBubbles.push(new PoisonBubble());
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.cameraX, 0);
        this.addObjectToMap(this.level.backgroundObjects);
        
        this.ctx.translate(-this.cameraX, 0); // back
        this.addToMap(this.statusBarPB);
        this.addToMap(this.statusBarEnergy);
        this.addToMap(this.statusBarCoins);
        this.ctx.translate(this.cameraX, 0); // forwards
        
        this.addObjectToMap(this.coins);
        this.addObjectToMap(this.poisonBubbles);
        this.addObjectToMap(this.level.enemies);
        this.addObjectToMap(this.bubbles);
        this.addToMap(this.character);
        this.ctx.translate(-this.cameraX, 0); // back
        
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    addObjectToMap(objects) {
        objects.forEach((object) => {
            this.addToMap(object);
        })
    }
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo)
        }
        mo.drawFrame(this.ctx);
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    };

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}