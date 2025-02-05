class AudioLibrary {
    static DAMAGE = new Audio('audio/damage.mp3');
    static SOUNDTRACK = new Audio('audio/game-soundtrack.mp3');
    static SWIMMING = new Audio('audio/swiming.mp3');
    static VICTORY = new Audio('audio/victory.mp3');

    static allSounds = [AudioLibrary.DAMAGE, AudioLibrary.SOUNDTRACK, AudioLibrary.SWIMMING, AudioLibrary.VICTORY];

    static stopAll() {
        AudioLibrary.allSounds.forEach(sound => {
            sound.pause();  
        });
    }
}