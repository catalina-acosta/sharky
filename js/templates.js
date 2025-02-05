function instructionsTemplate() {
    return `<div id="dialog-box" width="760px" height="480px">
            <div><button onclick="init()">X</button></div>
            <h2>HOW TO PLAY</h2>
            <div class="key-container">
                <div class="single-key-container">
                    <h3>move around</h3>
                    <img width="200px" src="img/6.Botones/Key/arrow keys.png" alt="">
                </div>
                <div class="single-key-container">
                    <h3>attack poison bubble</h3>
                    <img width="80px" src="img/6.Botones/Key/D key.png" alt="">
                </div>
                <div class="single-key-container">
                    <h3>attack - finslap</h3>
                    <img class="instruction-key" src="img/6.Botones/Key/Space Bar key.png" alt="">
                </div>
            </div>
            <button id="img-button" onclick="startGame(), initLevel()"><img src="img/6.Botones/Start/1.png" width="300px" alt=""></button>
        </div>`
}


function gameLostTemplate() {
    return `
        <div class="game-over-box">
            <div class="game-over-content">
                <img id="gameOverImg" src="img/6.Botones/Tittles/Game Over/Recurso 9.png" alt="game over">   
                <button id="tryAgainButton" onclick="restartGame()"><img src="img/6.Botones/Try again/Recurso 16.png" alt="game over"></button>
            <div>
        </div>`
    
}

function gameWonTemplate() {
    return `
        <div class="game-over-box">
            <div class="game-won-content">
                <img id="winningImg"src="img/6.Botones/Try again/Mesa de trabajo 1.png" alt="game over">   
                <button id="imgButtonWinner" onclick="restartGame()"><img src="img/6.Botones/Start/1.png" alt="game over"></button>
            <div>
        </div>`
}

function landingPageTemplate() {
    return `
            <div id="dialog-box" width="720px" height="480px">
            <div class="title-box">
                <div class="title-container">
                    <h1>Welcome!</h1>
                    <h2>Help <span>sharky</span> defet enemies under the sea!</h2>
                </div>
                <div class="img-container">
                    <img src="img/1.Sharkie/1.IDLE/1.png" alt="sharky" width="200px">
                </div>
            </div>
            <button onclick="renderInstructions()">how to play</button>
            <button id="img-button" onclick="startGame()"><img src="img/6.Botones/Start/1.png" width="300px" alt=""></button>
        </div>`
}

function musicOnTemplate() {
    return `
            <i class="fa-solid fa-volume-high" id="musicOn" onclick="stopSound()"></i>`
}

function musicOffTemplate() {
    return `
    <i class="fa-solid fa-volume-off" id="musicOff" onclick="playSound()"></i>
    `
}