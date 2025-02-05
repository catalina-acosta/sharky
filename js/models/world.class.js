class World {
    character = new Character();
    endBoss = new EndBoss(this);
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
    bubbles = [];
    encounterWithObjectDone = false;
    isPoisonBubbleUsed = false;
    gameOver = false;
    areAllSoundsPause = false;

    constructor(canvas){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.statusBarEnergy = new StatusBar(ImageArray.STATUSBAR_IMAGES);
        this.statusBarPB = new StatusBar(ImageArray.STATUS_PB_IMAGES);
        this.statusBarCoins = new StatusBar(ImageArray.STATUSBAR_COIN_IMAGES);
        this.statusBarEndboss = new StatusBar(ImageArray.STATUSBAR_IMAGES);
        this.statusBarPB.y = 25;
        this.statusBarPB.setPercentage(0);
        this.statusBarCoins.setPercentage(0);
        this.statusBarCoins.y = 60;
        this.statusBarEndboss.x = 500;
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
        if(this.keyboard.D && this.keyboard.D_SOLVED == false && this.character.poisonBubblesLevel > 0 && this.isPoisonBubbleUsed == false ) {
            this.isPoisonBubbleUsed = true;
            this.keyboard.D_SOLVED = true;
            let bubble = new Bubble(this.character.x + 100, this.character.y + 100, this.character.otherDirection);
            this.bubbles.push(bubble);
            this.character.useItem('poisonBubblesLevel');
            this.statusBarPB.setPercentage(this.character.poisonBubblesLevel);
        }
        this.isPoisonBubbleUsed = false;
    }

    checkCollisions() {
        this.level.enemies.forEach( (enemy, index) => {
            if (this.character.isColliding(enemy) && this.keyboard.SPACE && this.character.isAttacking == true ) {
                setTimeout(() => {
                }, 1000);
                this.enemies.splice(index, 1);
            } else if(this.character.isColliding(enemy)) {
                this.character.hit(5);
                this.statusBarEnergy.setPercentage(this.character.energy);
            }
        });
        this.coins.forEach( (coin, index) => {
            if (this.character.isColliding(coin)) {
                this.character.collectItem('coinLevel');
                this.statusBarCoins.setPercentage(this.character.coinLevel);
                this.coins.splice(index, 1);
            }
        });
        this.poisonBubbles.forEach( (pb, index) => {
            if (this.character.isColliding(pb)) {
                this.character.collectItem('poisonBubblesLevel');
                this.statusBarPB.setPercentage(this.character.poisonBubblesLevel);
                this.poisonBubbles.splice(index, 1);
            }
        });
        this.bubbles.forEach(bubble => {
            this.enemies.forEach((enemy, index) => {
                if (enemy.isColliding(bubble)) {
                    this.enemies.splice(index, 1);
                } 
            })
        });
        this.bubbles.forEach(bubble => {
            if(this.endBoss.isColliding(bubble)) {
                this.bubbles.splice(bubble, 1);
                this.endBoss.hit(20);
                this.statusBarEndboss.setPercentage(this.endBoss.energy);
            }
        })
        if (this.endBoss.isColliding(this.character)) {
            this.character.hit(20);
            this.statusBarEnergy.setPercentage(this.character.energy);
        }
    }

    checkGameOver() {
        if (this.character.isDead()) {
            let winner = "Endboss";
            setTimeout(() => {
                this.renderGameOver(winner);
            }, 1000);
            
        } else if(this.endBoss.isDead()) {
            let winner ="Character";
            setTimeout(() => {
                this.renderGameOver(winner);
            }, 1000);
        }
    }
    
    renderGameOver(winner) {
        AudioLibrary.SOUNDTRACK.pause();
        canvas = document.getElementById("canvas");
        canvas.classList.add("d-none");
        let titleRef = document.getElementById("gameTitle");
        titleRef.classList.add("d-none");
        dialogBox = document.getElementById("dialog-container");
        if (winner == "Endboss") {
            AudioLibrary.GAMEOVER_SOUND.play();
            dialogBox.innerHTML = gameLostTemplate();
        } else {
            AudioLibrary.VICTORY.play();
            dialogBox.innerHTML = gameWonTemplate();
        }
        AudioLibrary.stopAll();
    }

    addCollectableItems(amountOfItems) {
        for (let index = 0; index < amountOfItems; index++) {
            this.coins.push(new Coin());
            this.poisonBubbles.push(new PoisonBubble());
        }
    }

    draw() {
        if(this.gameOver) {
            console.log("game over");
            
            return;
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.cameraX, 0);
        this.addObjectToMap(this.level.backgroundObjects);
        
        this.ctx.translate(-this.cameraX, 0); // back
        this.addToMap(this.statusBarPB);
        this.addToMap(this.statusBarEnergy);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarEndboss);
        this.ctx.translate(this.cameraX, 0); // forwards
        
        this.addObjectToMap(this.coins);
        this.addObjectToMap(this.poisonBubbles);
        this.addObjectToMap(this.level.enemies);
        this.addObjectToMap(this.bubbles);
        this.addToMap(this.character);

        this.addToMap(this.endBoss);

        this.ctx.translate(-this.cameraX, 0); // back
        
        this.checkGameOver();
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
        mo.drawFrameOffset(this.ctx);
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