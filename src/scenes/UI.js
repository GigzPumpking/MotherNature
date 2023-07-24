class UI extends Phaser.Scene {
    constructor() {
        super({ key: 'uiScene' })
    }

    create() {
        // Create a large black rectangle to dim the background
        brightnessBG = this.add.rectangle(0, 0, map.widthInPixels * rescale, h + 10*rescale, 0x000000, brightness).setOrigin(0, 0);

        this.keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    }

    update() {
        brightnessBG.setAlpha(1 - brightness);

        if (this.keyESC.isDown) {
            this.scene.pause(currScene);
            this.scene.pause().launch(options);
        }

        if (this.keyM.isDown && currScene != mus) {
            this.scene.pause(currScene);
            this.scene.launch(mus);
        }
    }
}
