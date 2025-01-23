class Enemy extends MovableObject {
    height = 100;
    width = 100;
    constructor(){
        super().loadImg('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.x = 200 + Math.random() * 500;
        this.animate();
    }

    moveLeft() {

    }

    animate() {
        setInterval(() => {
            this.x -= 1;
        }, 1000 / 60);
    }
}