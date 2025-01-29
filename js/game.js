let canvas;
let world;
let keyboard = new Keyboard();

function startGame() {
    instructionsBox = document.getElementById("instructions");
    instructionsBox.classList.add("d-none");
    canvas = document.getElementById("canvas");
    canvas.classList.remove("d-none");
    world = new World(canvas, keyboard);
}

function init() {
    canvas = document.getElementById("canvas");
    canvas.classList.add("d-none");
}

window.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowRight') {
        keyboard.RIGHT = true;
    }

    if (event.code === 'ArrowLeft') {
        keyboard.LEFT = true;
    }

    if (event.code === 'ArrowUp') {
        keyboard.UP = true;
    }

    if (event.code === 'Space') {
        keyboard.SPACE = true;
        console.log("space key pressed");

    }

    if (event.code === 'ArrowDown') {
        keyboard.DOWN = true;
    }

    if (event.code === 'KeyQ') {
        keyboard.Q = true;
    }
});

window.addEventListener('keyup', (event) => {
    if (event.code === 'ArrowRight') {
        keyboard.RIGHT = false;
    }

    if (event.code === 'ArrowLeft') {
        keyboard.LEFT = false;
    }

    if (event.code === 'ArrowUp') {
        keyboard.UP = false;
    }

    if (event.code === 'Space') {
        keyboard.SPACE = false;
        keyboard.SPACE_SOLVED = false;
    }

    if (event.code === 'ArrowDown') {
        keyboard.DOWN = false;
    }

    if (event.code === 'KeyQ') {
        keyboard.Q = false;
    }
});