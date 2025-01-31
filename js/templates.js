function instructionsTemplate() {
    return `<div id="instructions" width="720px" height="480px">
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
            <button onclick="startGame()"><img src="img/6.Botones/Start/1.png" width="300px" alt=""></button>
        </div>`
}


function gameLostTemplate() {
    return `
    <div id="instructions">
            <h1>Congratulations!</h1>
            <p>You won! The Character defeated the Endboss.</p>
            <button onclick="startGame()">Play Again</button>
        </div>`
    
}

function gameWonTemplate() {
    console.log("you win");
}