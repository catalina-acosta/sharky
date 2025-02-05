let canvas;
let world;
let keyboard = new Keyboard();
let musicIconRef = document.getElementById("musicIncons");
AudioLibrary.SOUNDTRACK.volume = 0.1;

function startGame() {
    dialogBox = document.getElementById("dialog-container");
    dialogBox.innerHTML = "";
    initLevel();
    canvas = document.getElementById("canvas");
    canvas.classList.remove("d-none");
    world = new World(canvas, keyboard);
    AudioLibrary.SOUNDTRACK.play();
    
}

function init() {
    if (world) {
        world.stopGame(); // Stop the game and set this.gameOver to true
    }
    canvas = document.getElementById("canvas");
    canvas.classList.add("d-none");
    dialogBox = document.getElementById("dialog-container");
    dialogBox.innerHTML = landingPageTemplate();
    let musicIconRef = document.getElementById("musicIncons");
    musicIconRef.innerHTML = musicOnTemplate();
}

function stopSound() {
    AudioLibrary.stopAll();
    let musicIconRef = document.getElementById("musicIncons");
    musicIconRef.innerHTML = musicOffTemplate();
}

function playSound() {
    AudioLibrary.SOUNDTRACK.play();
    let musicIconRef = document.getElementById("musicIncons");
    musicIconRef.innerHTML = musicOnTemplate();
}

function renderInstructions() {
    dialogBox = document.getElementById("dialog-container");
    dialogBox.innerHTML = instructionsTemplate();

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

    }

    if (event.code === 'ArrowDown') {
        keyboard.DOWN = true;
    }

    if (event.code === 'KeyD') {
        keyboard.D = true;

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

    }

    if (event.code === 'ArrowDown') {
        keyboard.DOWN = false;
    }

    if (event.code === 'KeyD') {
        keyboard.D = false;
        keyboard.D_SOLVED = false;
    }
});