class UI extends Phaser.Scene {
    constructor() {
        super({ key: 'uiScene' })
    }

    create() {
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        // Create Pause and Inventory Buttons
        createOptionsButton(this);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.scene.pause(currScene);
            this.scene.pause().launch(options);
        }
    }
}
