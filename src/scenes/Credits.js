class Credits extends Phaser.Scene {
    constructor() {
        super('creditScene');
    }

    create() {
        dimBG(this, 0.8);

        let creditsY = centerY - 45*rescale;
        let ySpacing = 16*rescale;

        this.add.text(centerX, creditsY - 3*rescale, 'Credits', titleConfig).setOrigin(0.5).setFontSize(10*rescale);

        this.add.text(centerX, creditsY + ySpacing/2, 'Game Engine: Phaser 3.60', creditsConfig).setColor('#F1EA2B').setFontSize(4*rescale).setOrigin(0.5);

        // People involved

        this.add.text(centerX, creditsY + ySpacing, 'Albert Rivas: Initial Concept, Design, Lead Art/Animation, SFX', creditsConfig).setColor('#EAAD2B').setOrigin(0.5);

        new TextButton(this, centerX, centerY + 50*rescale, 'Back to Main Menu', Object.assign({}, textConfig, {fontSize: 6*rescale}), () => {
            this.scene.resume('titleScene').stop();
        })

        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.scene.start('titleScene');    
        }
    }

}