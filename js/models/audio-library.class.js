class AudioLibrary {
    static DAMAGE = new Audio('audio/damage.mp3');
    static SOUNDTRACK = new Audio('audio/game-soundtrack.mp3');
    static SWIMMING = new Audio('audio/swiming.mp3');
    static VICTORY = new Audio('audio/victory.mp3');
    static BUBBLE_SOUND = new Audio('audio/bubble.mp3');
    static FINSLAP_SOUND = new Audio('audio/finslap.mp3');
    static HURT_SOUND = new Audio('audio/hurt.mp3');
    static SNOARING_SOUND = new Audio('audio/snoaring.mp3');
    static GAMEOVER_SOUND = new Audio('audio/gameOver.mp3');
    static ENDBOSS_ATTACK = new Audio('audio/endbossAttack.mp3');

    static isSoundOn = false;

    static allSounds = [AudioLibrary.DAMAGE, AudioLibrary.SOUNDTRACK, 
                        AudioLibrary.SWIMMING, AudioLibrary.VICTORY, 
                        AudioLibrary.BUBBLE_SOUND, AudioLibrary.FINSLAP_SOUND, 
                        AudioLibrary.HURT_SOUND, AudioLibrary.SNOARING_SOUND, 
                        AudioLibrary.ENDBOSS_ATTACK
                    ];

    static stopAll() {
        AudioLibrary.allSounds.forEach(sound => {
            sound.pause();  
            sound.currentTime = 0; 
        });
        AudioLibrary.isSoundOn = false;
    }

    static setVolume(volume) {
        AudioLibrary.allSounds.forEach(sound => {
            sound.volume = volume;
        });
    }

    static playSound(sound) {
        if (AudioLibrary.isSoundOn) {
            sound.play();
        }
    }
}

AudioLibrary.setVolume(0.2);