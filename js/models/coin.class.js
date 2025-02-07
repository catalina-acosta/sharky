/**
 * Creates a new coin
 * @class
 */
class Coin extends MovableObject {
    width = 30;
    height = 30;
    iscollected = false;

    /**
     * set x y for 
     */
    constructor() {
        super().loadImg('img/4. Marcadores/1. Coins/3.png');
        this.x =  Math.random() * 1700;
        this.y = Math.random() * 400;
        this.loadImages(ImageArray.COIN_IMAGES);
        this.animate();
    }

    /**
     * returns the animation of the Coin.
     * @returns {animation} - uses the playAnimation method.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(ImageArray.COIN_IMAGES);
        }, 200);
    }
}