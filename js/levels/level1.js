let level1;
function initLevel() {
    level1 = new Level(
        [
            new Enemy("pufferfish", ImageArray.PUFFERFISH_IMAGES_TRANSITION, ImageArray.PUFFERFISH_IMAGES_DEAD),
            new Enemy("jellyfish", ImageArray.JELLYFISH_IMAGES_REGULAR, ImageArray.JELLYFISH_IMAGES_DEAD),
            new Enemy("pufferfish", ImageArray.PUFFERFISH_IMAGES_TRANSITION, ImageArray.PUFFERFISH_IMAGES_DEAD),
            new Enemy("jellyfish", ImageArray.JELLYFISH_IMAGES_REGULAR, ImageArray.JELLYFISH_IMAGES_DEAD),
            new Enemy("pufferfish", ImageArray.PUFFERFISH_IMAGES_TRANSITION, ImageArray.PUFFERFISH_IMAGES_DEAD),
            new Enemy("jellyfish", ImageArray.JELLYFISH_IMAGES_REGULAR, ImageArray.JELLYFISH_IMAGES_DEAD),

        ],
    
        [
            new BackgroundObject('img/3. Background/Layers/5. Water/D2.png', -720, 0),
            new BackgroundObject('img/3. Background/Layers/1. Light/2.png', -720, 0),
            new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D2.png', -720, 0),
            new BackgroundObject('img/3. Background/Layers/2. Floor/D2.png', -720, 0 ),
            new BackgroundObject('img/3. Background/Layers/5. Water/D1.png', 0, 0),
            new BackgroundObject('img/3. Background/Layers/1. Light/1.png', 0, 0),
            new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D1.png', 0, 0),
            new BackgroundObject('img/3. Background/Layers/2. Floor/D1.png', 0, 0),
            new BackgroundObject('img/3. Background/Layers/5. Water/D2.png', 720, 0),
            new BackgroundObject('img/3. Background/Layers/1. Light/2.png', 720, 0),
            new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D2.png', 720, 0),
            new BackgroundObject('img/3. Background/Layers/2. Floor/D2.png', 720, 0 ),
            new BackgroundObject('img/3. Background/Layers/5. Water/D1.png', 720*2, 0),
            new BackgroundObject('img/3. Background/Layers/1. Light/1.png', 720*2, 0),
            new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D1.png', 720*2, 0),
            new BackgroundObject('img/3. Background/Layers/2. Floor/D1.png', 720*2, 0),
            new BackgroundObject('img/3. Background/Layers/5. Water/D2.png', 720 *3, 0),
            new BackgroundObject('img/3. Background/Layers/1. Light/2.png', 720*3, 0),
            new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D2.png', 720*3, 0),
            new BackgroundObject('img/3. Background/Layers/2. Floor/D2.png', 720*3, 0 ),
        ]
    )
}


