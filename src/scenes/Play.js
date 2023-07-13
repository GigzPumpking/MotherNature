class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create() {
        // Add white rectangle to cover screen
        this.add.rectangle(centerX, centerY, w, h, 0xFFFFFF).setAlpha(0.5);
        // Add a camera 

        this.camera = this.cameras.main;
        this.camera.setBounds(0, 0, w, h);
        this.camera.setZoom(1);
        this.camera.centerOn(centerX, centerY);
        this.camera.setAlpha(brightness);
        //this.camera.postFX.addVignette(0.5, 0.5, 0.7);

        // Play Music

        // Current and Previous Scene
        currScene = 'playScene';
        prevScene = 'titleScene';

        // Create Pause and Inventory Buttons
        createOptionsButton(this);

        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        keyO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyC)) {
            if (brightness > 0) brightness -= 0.1;
            console.log(brightness);
            this.camera.setAlpha(brightness);
        }

        if (Phaser.Input.Keyboard.JustDown(keyO)) {
            if (brightness < 1) brightness += 0.1;
            console.log(brightness);
            this.camera.setAlpha(brightness);
        }

        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.scene.pause().launch('optionsScene');
        }

        updateCurrPrev('playScene', 'titleScene');
    }

}