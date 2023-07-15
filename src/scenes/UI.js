class UI extends Phaser.Scene {
    constructor() {
        super({ key: 'uiScene' })
    }

    create() {
        uiESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        uiI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);

        // Create Pause and Inventory Buttons
        createOptionsButton(this);
        createInventoryButton(this);
    }

    update() {
        if (uiESC.isDown) {
            this.scene.pause(currScene);
            this.scene.pause().launch(options);
        }

        if (uiI.isDown) {
            this.scene.pause(currScene);
            this.scene.pause().launch(inv);
        }

        if (currScene == mus && this.backButton == null) createBackButton(this, currScene, prevScene);

        if (currScene == play && this.backButton != null) {
            this.backButton.destroy();
            this.backButton = null;
        }
    }
}
