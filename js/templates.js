function instructionsTemplate() {
    return `<div id="dialog-box">
                <div class="button-wrapper">
                    <button id="closeButton" onclick="restartGame()">X</button>
                </div>
                <h2>HOW TO PLAY</h2>
                <div class="key-container">
                    <div class="single-key-container">
                        <h3>move around</h3>
                        <img width="150px" src="img/6.Botones/Key/arrow keys.png" alt="">
                    </div>
                    <div class="single-key-container">
                        <h3>attack poison bubble</h3>
                        <img width="60px" src="img/6.Botones/Key/D key.png" alt="">
                    </div>
                    <div class="single-key-container">
                        <h3>attack - finslap</h3>
                        <img class="instruction-key" src="img/6.Botones/Key/Space Bar key.png" alt="">
                    </div>
                </div>
                <button id="startGameButton" onclick="startGame()">Start</button>
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
                <button id="startGameButton" onclick="restartGame()">Start</button>
            <div>
        </div>`
}

function landingPageTemplate() {
    return `
            <div id="dialog-box">
            <div class="title-box">
                <div class="title-container">
                    <h1>Welcome!</h1>
                    <h2>Help <span>sharky</span> defet enemies under the sea!</h2>
                </div>
                <img src="img/sharkie-homepage.png" alt="sharky">
            </div>
            <div class="main-buttons">
                <button onclick="renderInstructions()">how to play</button>
                <button id="startGameButton" onclick="startGame()">Start</button>
                <button id="impressumButton"onclick="showImpressum()">Impressum</button>
            </div>
        </div>
        `
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

function errorTemplate(){
    return `
    <div class="error-template">
        <h2>Please turn your phone for landscape mode</h2>
        <button id="startGameButton" onclick="startGame()">Start</button>
    </div>
    `
}

function impressumTemplate() {
    return `
        <div class="button-wrapper-impressum">
            <button id="closeButton" onclick="restartGame()">X</button>
        </div>
        <div id="impressum" class="impressum-template">
            <div class="impressum-content">
                <h1 class="adsimple-322944536">Impressum</h1>
                <p class="adsimple-322944536">Informationen über den Diensteanbieter.</p>
                <p class="adsimple-322944536">Catalina Acosta Rivera</p>
                <p class="adsimple-322944536">Fichtelgebirgstr. 29, <br />93057 Regensburg, <br />Deutschland</p>
                <p>
                <strong>Tel.:</strong> 015165685658<br />
                <strong>E-Mail:</strong> <a href="mailto:catalina.acosta.rivera@gmail.com">catalina.acosta.rivera@gmail.com</a>
                </p>
                <div style="display:none">
                </div>
                <div style="display:none">
                </div>
                <div style="display:none">
                </div>
                <h2 id="eu-streitschlichtung" class="adsimple-322944536 fusion-responsive-typography-calculated" data-fontsize="24" style="--fontSize: 24;line-height: 1.5;--minFontSize: 24" data-lineheight="36px">EU-Streitschlichtung</h2>
                <p class="adsimple-322944536">Gemäß Verordnung über Online-Streitbeilegung in Verbraucherangelegenheiten (ODR-Verordnung) möchten wir Sie über die Online-Streitbeilegungsplattform (OS-Plattform) informieren.<br />
                Verbraucher haben die Möglichkeit, Beschwerden an die Online Streitbeilegungsplattform der Europäischen Kommission unter <a class="adsimple-322944536" href="https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home2.show&amp;lng=DE" target="_blank" rel="follow noopener">https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home2.show&amp;lng=DE</a> zu richten. Die dafür notwendigen Kontaktdaten finden Sie oberhalb in unserem Impressum.</p>
                <p class="adsimple-322944536">Wir möchten Sie jedoch darauf hinweisen, dass wir nicht bereit oder verpflichtet sind, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
                <h2 id="bildernachweis" class="adsimple-322944536 fusion-responsive-typography-calculated" data-fontsize="24" style="--fontSize: 24;line-height: 1.5;--minFontSize: 24" data-lineheight="36px">Bildernachweis</h2>
                <p class="adsimple-322944536">Die Bilder, Fotos und Grafiken auf dieser Webseite sind urheberrechtlich geschützt.</p>
                <p>
                <strong>Die Bilderrechte liegen bei:</strong>
                <br />Developer Akademie</p>
                <div style="display:none">
                </div>
                <div style="display:none">
                </div>
                <p>Alle Texte sind urheberrechtlich geschützt.</p>
                <p style="margin-top:15px">Quelle: Erstellt mit dem <a href="https://www.adsimple.de/impressum-generator/" title="Impressum Generator Deutschland von AdSimple">Impressum Generator</a> von AdSimple</p>

            </div>
        </div>
        `
}