class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create() {
        // Add a camera 
        this.cameras.main.setBounds(0, 0, w, h);
        this.cameras.main.setZoom(1);
        this.cameras.main.centerOn(centerX, centerY);

        // Play Music

        // Current and Previous Scene
        currScene = 'playScene';
        prevScene = 'titleScene';

        // Create Pause and Inventory Buttons
        createOptionsButton(this);

        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.scene.pause().launch('optionsScene');
        }

        updateCurrPrev('playScene', 'titleScene');
    }

}