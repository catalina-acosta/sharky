/**
 * Class representing an audio library for the game.
 */
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

    /**
     * Indicates whether the sound is on or off.
     * @type {boolean}
     */
    static isSoundOn = false;

    /**
     * Array containing all the audio objects.
     * @type {Audio[]}
     */
    static allSounds = [
        AudioLibrary.DAMAGE, 
        AudioLibrary.SOUNDTRACK, 
        AudioLibrary.SWIMMING, 
        AudioLibrary.VICTORY, 
        AudioLibrary.BUBBLE_SOUND, 
        AudioLibrary.FINSLAP_SOUND, 
        AudioLibrary.HURT_SOUND, 
        AudioLibrary.SNOARING_SOUND, 
        AudioLibrary.GAMEOVER_SOUND,
        AudioLibrary.ENDBOSS_ATTACK
    ];

    /**
     * Stops all sounds and resets their playback position.
     */
    static stopAll() {
        AudioLibrary.allSounds.forEach(sound => {
            sound.pause();  
            sound.currentTime = 0; 
        });
        AudioLibrary.isSoundOn = false;
    }

    /**
     * Sets the volume for all sounds.
     * @param {number} volume - The volume level to set (0.0 to 1.0).
     */
    static setVolume(volume) {
        AudioLibrary.allSounds.forEach(sound => {
            sound.volume = volume;
        });
    }

    /**
     * Plays a given sound if the sound is on.
     * @param {Audio} sound - The sound to play.
     */
    static playSound(sound) {
        if (AudioLibrary.isSoundOn) {
            sound.play();
        }
    }
}

// Set the initial volume for all sounds.
AudioLibrary.setVolume(0.2);