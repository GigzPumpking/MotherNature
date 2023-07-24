class Controls extends Phaser.Scene {
    constructor() {
        super('controlsScene');
    }

    create() {
        dimBG(this, 0.8);

        let creditsY = centerY - 45*rescale;
        let ySpacing = 16*rescale;

        this.add.text(centerX, creditsY - 3*rescale, 'Controls', titleConfig).setOrigin(0.5).setFontSize(10*rescale);

        // People involved

        this.add.text(centerX, creditsY + ySpacing, 'Press ESC in-game for OPTIONS', creditsConfig).setColor('#EAAD2B').setOrigin(0.5);

        new TextButton(this, centerX, centerY + 50*rescale, 'Back to Main Menu', Object.assign({}, textConfig, {fontSize: 6*rescale}), () => {
            this.scene.resume(title).stop();
        })

        this.keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.keyESC)) {
            this.scene.start(title);    
        }
    }

}