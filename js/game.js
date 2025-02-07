/**
 * The canvas element.
 * @type {HTMLCanvasElement}
 */
let canvas;

/**
 * The game world instance.
 * @type {World}
 */
let world;

/**
 * Indicates whether the game has started.
 * @type {boolean}
 */
let isGameStarted = false;

/**
 * The keyboard input handler.
 * @type {Keyboard}
 */
let keyboard = new Keyboard();

/**
 * The reference to the music icon element.
 * @type {HTMLElement}
 */
let musicIconRef = document.getElementById("musicIncons");

/**
 * Initializes the game soundtrack volume.
 */
AudioLibrary.SOUNDTRACK.volume = 0.1;

/**
 * Restarts the game by clearing all intervals and reinitializing the game.
 */
function restartGame() {
    clearAllIntervals();
    init();
}

/**
 * Clears all active intervals.
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * Starts the game based on the device's orientation and screen type.
 */
function startGame() {
    if (window.matchMedia("(hover: none)").matches) {
        if (window.matchMedia("(orientation: landscape)").matches) {
            startGameLandscapeMode();
            addTouchEventListeners();
        } else {
            dialogBox = document.getElementById("dialog-container");
            dialogBox.innerHTML = errorTemplate();
        }
    } else {
        startGameNormalScreen();
        addTouchEventListeners();
    }
}

/**
 * Starts the game in landscape mode.
 */
function startGameLandscapeMode() {
    dialogBox = document.getElementById("dialog-container");
    dialogBox.innerHTML = "";
    initLevel();
    canvas = document.getElementById("canvas");
    canvas.classList.remove("d-none");
    world = new World(canvas, keyboard);
    AudioLibrary.SOUNDTRACK.play();
    AudioLibrary.isSoundOn = true;
    isGameStarted = true;
    let buttonsMobile = document.getElementById("buttonsMobile");
    buttonsMobile.classList.add("visible");
}

/**
 * Starts the game in normal screen mode.
 */
function startGameNormalScreen() {
    dialogBox = document.getElementById("dialog-container");
    dialogBox.innerHTML = "";
    initLevel();
    canvas = document.getElementById("canvas");
    canvas.classList.remove("d-none");
    world = new World(canvas, keyboard);
    AudioLibrary.SOUNDTRACK.play();
    AudioLibrary.isSoundOn = true;
    isGameStarted = true;
    let buttonsMobile = document.getElementById("buttonsMobile");
    buttonsMobile.classList.add("visible");
}

/**
 * Initializes the game by stopping the sound, hiding the canvas, and displaying the landing page.
 */
function init() {
    stopSound();
    canvas = document.getElementById("canvas");
    canvas.classList.add("d-none");
    dialogBox = document.getElementById("dialog-container");
    dialogBox.innerHTML = landingPageTemplate();
    let musicIconRef = document.getElementById("musicIncons");
    musicIconRef.innerHTML = musicOnTemplate();
    let buttonsMobile = document.getElementById("buttonsMobile");
    buttonsMobile.classList.remove("visible");
    isGameStarted = false;
}

/**
 * Stops all sounds and updates the music icon.
 */
function stopSound() {
    AudioLibrary.stopAll();
    AudioLibrary.isSoundOn = false;
    let musicIconRef = document.getElementById("musicIncons");
    musicIconRef.innerHTML = musicOffTemplate();
}

/**
 * Plays the game soundtrack and updates the music icon.
 */
function playSound() {
    AudioLibrary.SOUNDTRACK.play();
    let musicIconRef = document.getElementById("musicIncons");
    musicIconRef.innerHTML = musicOnTemplate();
    AudioLibrary.isSoundOn = true;
}

/**
 * Renders the instructions template in the dialog container.
 */
function renderInstructions() {
    dialogBox = document.getElementById("dialog-container");
    dialogBox.innerHTML = instructionsTemplate();
}

/**
 * Handles keydown events to update the keyboard object.
 */
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

/**
 * Handles keyup events to update the keyboard object.
 */
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
    }

    if (event.code === 'ArrowDown') {
        keyboard.DOWN = false;
    }

    if (event.code === 'KeyD') {
        keyboard.D = false;
        keyboard.D_SOLVED = false;
    }
});

/**
 * Adds touch event listeners for game controls.
 */
function addTouchEventListeners() {
    if (isGameStarted && window.matchMedia("(hover: none)").matches) {
        document.getElementById('up').addEventListener('touchstart', (event) => {
            event.preventDefault();
            keyboard.UP = true;
        });

        document.getElementById('up').addEventListener('touchend', (event) => {
            event.preventDefault();
            keyboard.UP = false;
        });

        document.getElementById('left').addEventListener('touchstart', (event) => {
            event.preventDefault();
            keyboard.LEFT = true;
        });

        document.getElementById('left').addEventListener('touchend', (event) => {
            event.preventDefault();
            keyboard.LEFT = false;
        });

        document.getElementById('right').addEventListener('touchstart', (event) => {
            event.preventDefault();
            keyboard.RIGHT = true;
        });

        document.getElementById('right').addEventListener('touchend', (event) => {
            event.preventDefault();
            keyboard.RIGHT = false;
        });

        document.getElementById('down').addEventListener('touchstart', (event) => {
            event.preventDefault();
            keyboard.DOWN = true;
        });

        document.getElementById('down').addEventListener('touchend', (event) => {
            event.preventDefault();
            keyboard.DOWN = false;
        });

        document.getElementById('dKey').addEventListener('touchstart', (event) => {
            event.preventDefault();
            keyboard.D = true;
        });

        document.getElementById('dKey').addEventListener('touchend', (event) => {
            event.preventDefault();
            keyboard.D = false;
            keyboard.D_SOLVED = false;
        });

        document.getElementById('spaceKey').addEventListener('touchstart', (event) => {
            event.preventDefault();
            keyboard.SPACE = true;
        });

        document.getElementById('spaceKey').addEventListener('touchend', (event) => {
            event.preventDefault();
            keyboard.SPACE = false;
        });
    }
}

/**
 * Displays the impressum template in the dialog container.
 */
function showImpressum() {
    let dialogRef = document.getElementById('dialog-container');
    dialogRef.innerHTML = impressumTemplate(); 
}

/**
 * Hides the impressum by adding the 'd-none' class.
 */
function hideImpressum() {
    document.getElementById('impressum').classList.add('d-none');
}