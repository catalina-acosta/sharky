class World {
    character = new Character();
    level = level1;
    enemies = level1.enemies;
    backgroundObjects = level1.backgroundObjects;
    canvas;
    ctx;
    keyboard;
    cameraX = 0;

    constructor(canvas){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard
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
                    console.log("collision with charcarcter", this.character.energy )
                }

            })
        }, 200);
    }

    draw() {
        // clear canavs
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.cameraX, 0);

        this.addObjectToMap(this.level.backgroundObjects);
        this.addObjectToMap(this.level.enemies);
        this.addToMap(this.character);
        // this.addObjectToMap(this.lights);
        
        this.ctx.translate(-this.cameraX, 0);
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