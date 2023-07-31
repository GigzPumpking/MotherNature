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

        this.controlsButton = new Button(this, centerX - 16*rescale, centerY + 10*rescale, 'controls', 'controlsHover', rescale, () => {
            menuSelect.play();
            this.scene.pause().launch(controls);
        });

        this.optionsButton = new Button(this, centerX - 13*rescale, centerY, 'options', 'optionsHover', rescale, () => {
            menuSelect.play();
            this.scene.pause().launch(options);
        });

        this.startButton = new Button(this, centerX - 9.5*rescale, centerY - 10*rescale, 'start', 'startHover', rescale, () => {
            menuSelect.play();
            this.scene.start(play);
        }); 

        this.sound.stopAll();

        this.keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        this.keyO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);

        music[0].play();
        // on completion of music, play loop
        music[0].on('complete', () => {
            music[1].play();
        })
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.keyC)) {
            menuSelect.play();
            this.scene.pause().launch(controls);
        }

        if (Phaser.Input.Keyboard.JustDown(this.keyO)) {
            menuSelect.play();
            this.scene.pause().launch(options);
        }

        if (Phaser.Input.Keyboard.JustDown(this.keySPACE)) {
            menuSelect.play();
            this.scene.start(play);
        }
    }
}
