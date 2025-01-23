class World {
    character = new Character();
    enemies = [
        new Enemy(),
        new Enemy(),
        new Enemy()
    ];
    lights = [new Light()];
    backgroundObjects = [
        new BackgroundObject('img/3. Background/Layers/5. Water/D1.png', 0, 0),
        // new BackgroundObject('img/3. Background/Barrier/1.png', 0, 0),
        new BackgroundObject('img/3. Background/Layers/1. Light/1.png', 0, 0),
        new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D1.png', 0, 0),
        new BackgroundObject('img/3. Background/Layers/2. Floor/D1.png', 0, 0),

    ]
    canvas;
    ctx;

    constructor(canvas){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }


    draw() {
        // clear canavs
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.addObjectToMap(this.backgroundObjects);
        this.addObjectToMap(this.enemies);
        this.addToMap(this.character);
        // this.addObjectToMap(this.lights);
        
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
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }
}