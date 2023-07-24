class Button extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, texture2, scale, callback) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        this.scene = scene;
        this.callback = callback;
        this.scale = scale;
        this.texture1 = texture;
        this.texture2 = texture2;
        this.initialScale = scale;

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
        this.setTexture(this.texture2);
        this.setScale(this.initialScale * 1.1);
    }

    pointerOut() {
        this.setTexture(this.texture1);
        this.setScale(this.initialScale);
    }
}
