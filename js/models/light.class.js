class Light extends MovableObject {
    height = 420;
    y = 0;

    constructor(){
        super().loadImg('img/3. Background/Layers/1. Light/1.png');
        this.x = Math.random() * 500;
    }
}