import Track from './Track.js';
import Player from './Player.js';
import Phaser from "phaser";
import { HELMET_ID, SWORD_ID } from '../blockchain/itemIds.ts';

export default class MainGame extends Phaser.Scene {
    constructor() {
        super('MainGame');

        this.player;
        this.tracks;

        this.score = 0;

        this.scoreTimer;
        this.scoreText;
        this.startText;

        this.atlasKey;
        this.receiveRewardText;
    }

    create() {     
        this.score = 0;

        this.add.image(512, 384, 'background');

        this.tracks = [
            new Track(this, 0, 196),
            new Track(this, 1, 376),
            new Track(this, 2, 536),
            new Track(this, 3, 700)
        ];

        this.player = new Player(this, this.tracks[0]);

        this.add.image(16, 0, 'sprites', 'panel-score').setOrigin(0);

        this.startText = this.add.text(400, 360, 'Space 눌러서 시작', { fontFamily: 'Arial', fontSize: 32, color: 'black' });
        this.scoreText = this.add.text(140, 2, this.score, { fontFamily: 'Arial', fontSize: 32, color: '#ffffff' });

        this.input.keyboard.once('keydown-SPACE', this.start, this);
    }

    start() {
        this.input.keyboard.removeAllListeners();
        this.startText.setVisible(false);

        this.tweens.add({
            targets: this.infoPanel,
            y: 700,
            alpha: 0,
            duration: 500,
            ease: 'Power2'
        });

        this.player.start();

        this.tracks[0].start(4000, 8000);
        this.tracks[1].start(500, 1000);
        this.tracks[2].start(5000, 9000);
        this.tracks[3].start(6000, 10000);

        this.scoreTimer = this.time.addEvent({
            delay: 1000, callback: () => {
                this.score++;
                this.scoreText.setText(this.score);
            }, callbackScope: this, repeat: -1
        });
    }

    gameOver() {
        this.tweens.add({
            targets: this.infoPanel,
            y: 384,
            alpha: 1,
            duration: 500,
            ease: 'Power2'
        });

        this.tracks.forEach((track) => {
            track.stop();
        });

        this.sound.stopAll();
        this.sound.play('gameover');

        this.player.stop();

        this.scoreTimer.destroy();
    }
}
