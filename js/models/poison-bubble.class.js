class PoisonBubble extends MovableObject {
    width = 40;
    height = 40;

    constructor() {
        super().loadImg('img/4. Marcadores/Posión/Dark - Left.png');
        this.x =  Math.random() * 1700;
        this.y = Math.random() * 400;
        this.loadImages(ImageArray.POISON_BUBBLE_IMAGES);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(ImageArray.POISON_BUBBLE_IMAGES);
        }, 100);
    }
}