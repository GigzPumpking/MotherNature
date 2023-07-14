class Title extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBounds(0, 0, w, h);
        this.camera.setZoom(1);
        this.camera.centerOn(centerX, centerY);
        this.camera.setAlpha(brightness);
        
        currScene = title;

        // Temporary Text Title, replace with commented out sprite below when assets available

        this.title = this.add.text(centerX, centerY - 25*rescale, 'MOTHER NATURE', titleConfig).setOrigin(0.5).setFontSize(10*rescale);
        /* = this.add.sprite(centerX, centerY - 25*rescale, 'TITLE').setScale(rescale) */;

        jiggle(this, this.title);

        // Temporary Text Buttons, replace with commented out sprites when assets available

        this.creditsButton = new TextButton(this, centerX - 50*rescale, centerY + 35*rescale, 'CREDITS', Object.assign({}, textConfig, {fontSize: 6*rescale}), () => {
            this.scene.pause().launch(credits);
        });
        
        /* new ButtonR(this, centerX - 50*rescale, centerY + 35*rescale, 'CREDITS', rescale/1.5, () => {
            this.scene.pause().launch('creditScene');
        }); */

        this.optionsButton = new TextButton(this, centerX + 50*rescale, centerY + 35*rescale, 'OPTIONS', Object.assign({}, textConfig, {fontSize: 6*rescale}), () => {
            this.scene.pause().launch(options);
        });
        
        /* new ButtonR(this, centerX + 50*rescale, centerY + 35*rescale, 'OPTIONS', rescale/1.5, () => {
            this.scene.pause().launch('optionsScene');
        }); */

        this.startButton = new TextButton(this, centerX, centerY + 18*rescale, 'START', Object.assign({}, textConfig, {fontSize: 6*rescale}), () => {
            this.scene.start(play);
        });

        /* new ButtonR(this, centerX, centerY + 18*rescale, 'START', rescale/1.25, () => {

        }); */

        this.sound.stopAll();

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        keyO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyC)) {
            this.scene.pause().launch(credits);
        }

        if (Phaser.Input.Keyboard.JustDown(keyO)) {
            this.scene.pause().launch(options);
        }

        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start(play);
        }
    }
}
