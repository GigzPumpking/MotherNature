class Button extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, texture2, scale, callback) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        this.scene = scene;
        this.callback = callback;
        this.scale = scale;
        this.texture1 = texture;
        this.texture2 = texture2;
        this.setOrigin(0, 0.5);

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
        this.arrow;
        if (this.scene == title) this.arrow = this.scene.add.sprite(this.x - 4*rescale, this.y, 'arrow').setScale(rescale);
        else if (this.scene == options) {
            this.arrow = this.scene.add.sprite(this.x - 4*rescale, this.y, 'arrowP').setScale(rescale);
        }
    }

    pointerOut() {
        this.setTexture(this.texture1);
        this.arrow.destroy();
    }
}
