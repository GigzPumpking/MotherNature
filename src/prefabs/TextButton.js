// Note: NOT a subclass of Button.js

// Hopefully a temporary class, will be replaced with a sprite

class TextButton {
    constructor(scene, x, y, label, style, callback) {
        console.log(style);
        this.scene = scene;
        this.callback = callback;
        this.color = style.color;
        this.initialSize = parseInt(style.fontSize);
        this.button = scene.add.text(x, y, label)
            .setOrigin(0.5)
            .setPadding(10)
            .setInteractive({ useHandCursor: true })
            .setStyle(style)
            .on('pointerdown', () => this.pointerDown())
            .on('pointerover', () => this.hoverOver())
            .on('pointerout',  () => this.pointerOut())
    }

    pointerDown() {
        this.pointerOut();
        this.callback();
    }

    pointerOut() {
        this.button.setStyle({ fill: this.color })
        this.button.setFontSize(this.initialSize);
    }

    hoverOver() {
        this.button.setStyle({ fill: '#F39C12' });
        this.button.setFontSize(this.initialSize * 1.1);
    }

    updateText(text) {
        this.button.setText(text);
    }

    destroy() {
        this.button.destroy();
    }
}
