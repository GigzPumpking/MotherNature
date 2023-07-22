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

        this.add.text(centerX, creditsY + ySpacing * 1.5, 'Abel Goy: Producer / Recruiter / Design / Programming / Writer', creditsConfig).setColor('#EAAD2B').setOrigin(0.5);

        this.add.text(centerX, creditsY + ySpacing * 2, 'Hung Nguyen: Lead Programmer', creditsConfig).setColor('#EAAD2B').setOrigin(0.5);

        this.add.text(centerX, creditsY + ySpacing * 2.5, 'Likha P.: Background Artist', creditsConfig).setColor('#EAAD2B').setOrigin(0.5);

        this.add.text(centerX, creditsY + ySpacing * 3, 'Michael Shaten: Music / Composer / SFX Artist', creditsConfig).setColor('#EAAD2B').setOrigin(0.5);

        this.add.text(centerX, creditsY + ySpacing * 3.5, 'Evan Pompa: Pixel Art Animation', creditsConfig).setColor('#EAAD2B').setOrigin(0.5);

        this.add.text(centerX, creditsY + ySpacing * 4, 'NOX: Pixel Art Sprites', creditsConfig).setColor('#EAAD2B').setOrigin(0.5);

        this.add.text(centerX, creditsY + ySpacing * 4.5, 'Azibela: Character Design Help', creditsConfig).setColor('#EAAD2B').setOrigin(0.5);

        /* (Planned contributors):
        @Jacob Pixel Art Character Sprite Animations
        @Ben "Halfcourt Yeet" Daly Music
        @tokoyobayashi Substitute Composer
        @Daphne "bluoctopus"  Menu Art
        Luke Gil: Storyboard Artist, Intial Idea */
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