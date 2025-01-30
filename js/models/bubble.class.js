class Bubble extends MovableObject {
    width = 20;
    height = 20;
    speed = 20;

    constructor(x, y) {
        super().loadImg('img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png');
        this.x =  x;
        this.y = y;
        this.bubbleAttack();
        
    }

    bubbleAttack() {
        setInterval(() => {
            this.x += 10;
            this.y += 1; 
        }, 20);
    }
}