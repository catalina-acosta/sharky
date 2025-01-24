class EndBoss extends MovableObject {
    height = 400;
    width = 400;
    y = 0;
    IMAGES_SWIMING = [
        'img/2.Enemy/3 Final Enemy/2.floating/1.png',
        'img/2.Enemy/3 Final Enemy/2.floating/2.png',
        'img/2.Enemy/3 Final Enemy/2.floating/3.png',
        'img/2.Enemy/3 Final Enemy/2.floating/4.png',
        'img/2.Enemy/3 Final Enemy/2.floating/5.png',
        'img/2.Enemy/3 Final Enemy/2.floating/6.png',
        'img/2.Enemy/3 Final Enemy/2.floating/7.png',
        'img/2.Enemy/3 Final Enemy/2.floating/8.png',
        'img/2.Enemy/3 Final Enemy/2.floating/9.png',
        'img/2.Enemy/3 Final Enemy/2.floating/10.png',
    ];

    constructor() {
        super().loadImg(this.IMAGES_SWIMING[0]);
        this.loadImages(this.IMAGES_SWIMING);
        this.x = 1700;
        this.animate();
    }

    animate(){
        setInterval(() => {
            this.playAnimation(this.IMAGES_SWIMING);
        }, 100);
    }
}