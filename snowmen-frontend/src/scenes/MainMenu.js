import Phaser from "phaser";

export default class MainMenu extends Phaser.Scene {
    constructor() {
        super('MainMenu');
    }

    create() {
        this.sound.play('music', { loop: true, delay: 0 });
        this.add.image(512, 384, 'background');
        let logo = this.add.image(1700, 384, 'title');

        this.tweens.add({
            targets: logo,
            x: 512,
            ease: 'back.out',
            delay: 0,
            duration: 600,
        });
    }
}
