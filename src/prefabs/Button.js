// Note: This is a BASE class for a GAME OBJECT button. Do NOT use this class directly.

// Modified from Button class code from Ferenc Almasi: https://webtips.dev/webtips/phaser/interactive-buttons-in-phaser3
class Button extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, scale, callback) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        this.scene = scene;
        this.callback = callback;
        this.scale = scale;
        this.texture = texture;
        this
            .setInteractive()
            .on('pointerdown', () => this.pointerDown())
            .on('pointerover', () => this.pointerOn())
            .on('pointerout',  () => this.pointerOut());
    }

    pointerDown() {
        this.callback();
    }

    pointerOn() {

    }

    pointerOut() {

    }
}
