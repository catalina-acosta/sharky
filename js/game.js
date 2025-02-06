let canvas;
let world;
let isGameStarted = false;
let keyboard = new Keyboard();
let musicIconRef = document.getElementById("musicIncons");
AudioLibrary.SOUNDTRACK.volume = 0.1;

function restartGame() {
    clearAllIntervals();
    init();
}

function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

function startGame() {
        if (window.matchMedia("(pointer: coarse)").matches) {
            if (window.matchMedia("(orientation: landscape)").matches || window.innerWidth > 768) {
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
                addTouchEventListeners();
            } else {
                dialogBox = document.getElementById("dialog-container");
                dialogBox.innerHTML = errorTemplate();
            }
        } else {
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
            addTouchEventListeners();
        }
}


function init() {
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

function stopSound() {
    AudioLibrary.stopAll();
    AudioLibrary.isSoundOn = false;
    let musicIconRef = document.getElementById("musicIncons");
    musicIconRef.innerHTML = musicOffTemplate();
}

function playSound() {
    AudioLibrary.SOUNDTRACK.play();
    let musicIconRef = document.getElementById("musicIncons");
    musicIconRef.innerHTML = musicOnTemplate();
    AudioLibrary.isSoundOn = true;
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

function addTouchEventListeners() {
    console.log(isGameStarted);
    
    if (isGameStarted && window.matchMedia("(hover: none)").matches) {
        document.getElementById('up').addEventListener('touchstart', (event) => {
            event.preventDefault();
            console.log("key up");
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

function handleOrientationChange() {
    if (window.matchMedia("(orientation: portrait)").matches) {
        console.log("Portrait mode");
    } else if (window.matchMedia("(orientation: landscape)").matches) {
        console.log("Landscape mode");
    }
    addTouchEventListeners();
}

window.addEventListener('orientationchange', handleOrientationChange);
window.addEventListener('resize', handleOrientationChange);

handleOrientationChange();

function showImpressum() {
    let dialogRef = document.getElementById('dialog-container');
    dialogRef.innerHTML = impressumTemplate(); 
}

function hideImpressum() {
    document.getElementById('impressum').classList.add('d-none');
}