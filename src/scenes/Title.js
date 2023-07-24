class Title extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }

    create() {

        this.camera = this.cameras.main;
        cameraSettings(this.camera);
        
        currScene = title;

        // Create background
        this.background = this.add.tileSprite(0, 0, w, h, 'menuBG').setOrigin(0, 0);

        // Temporary Text Title, replace with commented out sprite below when assets available

        this.title = this.add.text(centerX, centerY - 25*rescale, 'MOTHER NATURE', titleConfig).setOrigin(0.5).setFontSize(18*rescale);
        /* = this.add.sprite(centerX, centerY - 25*rescale, 'TITLE').setScale(rescale) */;

        jiggle(this, this.title);

        // Temporary Text Buttons, replace with commented out sprites when assets available

        this.controlsButton = new Button(this, centerX - 50*rescale, centerY + 35*rescale, 'controls', 'controlsHover', rescale, () => {
            this.scene.pause().launch(controls);
        });

        this.optionsButton = new Button(this, centerX + 50*rescale, centerY + 35*rescale, 'options', 'optionsHover', rescale, () => {
            this.scene.pause().launch(options);
        });

        this.startButton = new Button(this, centerX, centerY + 18*rescale, 'start', 'startHover', rescale, () => {
            this.scene.start(play);
        }); 

        this.sound.stopAll();

        this.keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        this.keyO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.keyC)) {
            this.scene.pause().launch(controls);
        }

        if (Phaser.Input.Keyboard.JustDown(this.keyO)) {
            this.scene.pause().launch(options);
        }

        if (Phaser.Input.Keyboard.JustDown(this.keySPACE)) {
            this.scene.start(play);
        }
    }
}
