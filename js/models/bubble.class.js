class Bubble extends MovableObject {
    width = 20;
    height = 20;

    constructor() {
        super().loadImg('img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png');
        this.x =  Math.random() * 1700;
        this.y = Math.random() * 400;
        this.animate();
    }

    animate() {
        this.moveRight();
    }
}