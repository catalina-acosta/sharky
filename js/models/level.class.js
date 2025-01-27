class Level {
    enemies;
    backgroundObjects;
    levelEndX = 1700;
    levelBeginX = -100;

    constructor(enemies, backgroundObjects) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
    }
}