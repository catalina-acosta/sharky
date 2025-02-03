class Bubble extends MovableObject {
    width = 20;
    height = 20;
    speed = 20;

    constructor(x, y, direction) {
        super().loadImg('img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png');
        this.x =  x;
        this.y = y;
        this.direction = direction;
        this.bubbleAttack();
        
    }

    bubbleAttack() {
        setInterval(() => {
            if (this.direction) {
                this.x -= 10;
            this.y += 1; 
            } else {
                this.x += 10;
                this.y += 1; 
            }
        }, 20);
    }
}