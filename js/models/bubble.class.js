class Bubble extends MovableObject {
    width = 20;
    height = 20;
    speed = 20;

    constructor() {
        super().loadImg('img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png');
        this.x =  200;
        this.y = 200;
        this.bubbleAttack(200, 100);
        
    }

    bubbleAttack(x, y) {
        this.x = x;
        this.y = y;
        setInterval(() => {
            this.moveRight();
        }, 100);
    }
}