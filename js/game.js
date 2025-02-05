let canvas;
let world;
let keyboard = new Keyboard();
let musicIconRef = document.getElementById("musicIncons");
AudioLibrary.SOUNDTRACK.volume = 0.1;

function restartGame() {
    console.log("staring game again");
    
    clearAllIntervals();
    init();
}

function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

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
    canvas = document.getElementById("canvas");
    canvas.classList.add("d-none");
    dialogBox = document.getElementById("dialog-container");
    dialogBox.innerHTML = landingPageTemplate();
    let musicIconRef = document.getElementById("musicIncons");
    musicIconRef.innerHTML = musicOnTemplate();
}

function stopSound() {
    AudioLibrary.stopAll();
    console.log("all sounds stopped");
    
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