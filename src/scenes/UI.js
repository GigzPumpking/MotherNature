class UI extends Phaser.Scene {
    constructor() {
        super({ key: 'uiScene' })
    }

    create() {
        // Create a large black rectangle to dim the background
        brightnessBG = this.add.rectangle(0, 0, map.widthInPixels * rescale, h + 10*rescale, 0x000000, brightness).setOrigin(0, 0);

        uiESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        uiI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
        uiM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

        // Create Pause and Inventory Buttons
        createOptionsButton(this);
        createInventoryButton(this);
    }

    update() {
        brightnessBG.setAlpha(1 - brightness);

        if (uiESC.isDown) {
            this.scene.pause(currScene);
            this.scene.pause().launch(options);
        }

        if (uiI.isDown) {
            this.scene.pause(currScene);
            this.scene.pause().launch(inv);
        }

        if (uiM.isDown) {
            this.scene.pause(currScene);
            this.scene.launch(mus);
        }

        if (currScene == mus && this.backButton == null) createBackButton(this, currScene, prevScene);

        if (currScene == play && this.backButton != null) {
            this.backButton.destroy();
            this.backButton = null;
        }
    }
}
