let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas);
}

window.addEventListener('keydown', (event) => {
    if (event.code == 39) {
        keyboard.RIGHT = true;
    }

    if (event.code == 37) {
        keyboard.LEFT = true;
    }

    if (event.code == 38) {
        keyboard.UP = true;
    }

    if(event.code == 32) {
        keyboard.SPACE = true;
    }

    if (event.code == 40) {
        keyboard.DOWN = true;
    }
    console.log(event);
});     