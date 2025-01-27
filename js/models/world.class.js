class World {
    character = new Character();
    level = level1;
    enemies = level1.enemies;
    backgroundObjects = level1.backgroundObjects;
    canvas;
    ctx;
    keyboard;
    cameraX = 0;
    statusBarEnergy;
    statusBarPB;

    constructor(canvas){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard
        this.statusBarEnergy = new StatusBar(ImageArray.STATUSBAR_IMAGES);
        this.statusBarPB = new StatusBar(ImageArray.STATUS_PB_IMAGES);
        this.statusBarPB.y = 60;
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }

    setWorld() {  
        this.character.world = this;
    }

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach( enemy => {
                if (this.character.isColliding(enemy)) {
                    this.character.hit();
                    this.statusBarEnergy.setPercentage(this.character.energy);
                }

            })
        }, 200);
    }

    draw() {
        // clear canavs
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.cameraX, 0);
        this.addObjectToMap(this.level.backgroundObjects);
        
        this.ctx.translate(-this.cameraX, 0); // back
        this.addToMap(this.statusBarPB);
        this.addToMap(this.statusBarEnergy);
        this.ctx.translate(this.cameraX, 0); // forwards
        
        this.addObjectToMap(this.level.enemies);
        this.addToMap(this.character);
        this.ctx.translate(-this.cameraX, 0); // back

        
        // draw() wird immer wieder aufgerufen
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