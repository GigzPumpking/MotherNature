class UI extends Phaser.Scene {
    constructor() {
        super({ key: 'uiScene' })
    }

    create() {
        // Create a large black rectangle to dim the background
        brightnessBG = this.add.rectangle(0, 0, map.widthInPixels * rescale, h + 10*rescale, 0x000000, brightness).setOrigin(0, 0);

        this.keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

        // Add two black rectangles, one to the top of the screen and one to the bottom
        this.bottomRect = this.add.rectangle(centerX, h, w, 17.5*rescale, 0x000000, 1).setOrigin(0.5);
        this.topRect = this.add.rectangle(centerX, 0, w, 40*rescale, 0x000000, 1).setOrigin(0.5);
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

    cinematicViewEnter() {
        this.tweens.add({
            targets: this.bottomRect,
            y: h,
            duration: 1500,
            ease: 'Power2',
        })
        this.tweens.add({
            targets: this.topRect,
            y: 0,
            duration: 1500,
            ease: 'Power2',
        })
    }

    cinematicViewExit() {
        this.tweens.add({
            targets: this.bottomRect,
            y: h + 40*rescale,
            duration: 1500,
            ease: 'Power2',
        })
        this.tweens.add({
            targets: this.topRect,
            y: -50*rescale,
            duration: 1500,
            ease: 'Power2',
        })
    }
}
