class Options extends Phaser.Scene {
    constructor() {
        super({ key: 'optionsScene' })
    }

    create() {
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

        dimBG(this, 0.6);

        this.menu = this.add.sprite(centerX, centerY, 'optionsMenu').setScale(rescale);

        // Temporary Text Buttons, replace with commented out sprites when assets available

        let Resume = new TextButton(this, centerX, centerY - 11.5*rescale, 'Resume', Object.assign({}, textConfig, {fontSize: 6*rescale}), () => {
            music = [];
            music.forEach(song => {
                if (song.isPaused) song.resume();
            })
            this.scene.resume(currScene).stop();
        })

        /* new ButtonR(this, centerX - 1.5*rescale, centerY - 11.5*rescale, 'resumeButton', rescale, () => {
            music = [];
            music.forEach(song => {
                if (song.isPaused) song.resume();
            })
            this.scene.resume(currScene).stop();
        }) */

        if (currScene != 'titleScene') {
            let Restart = new TextButton(this, centerX, centerY + 4.5*rescale, 'Restart', Object.assign({}, textConfig, {fontSize: 6*rescale}), () => {
                music = [];
                music.forEach(song => {
                    if (song.isPlaying || song.isPaused) song.stop();
                })

                this.scene.resume(currScene).stop();
                this.scene.restart(currScene);
            })

            /* new ButtonR(this, centerX - 1.5*rescale, centerY + 4.5*rescale, 'restartButton', rescale, () => {
                music = [];
                music.forEach(song => {
                    if (song.isPlaying || song.isPaused) song.stop();
                })

                this.scene.resume(currScene).stop();
                this.scene.restart(currScene);
            }) */

            let MainMenu = new TextButton(this, centerX, centerY + 19.5*rescale, 'Main Menu', Object.assign({}, textConfig, {fontSize: 6*rescale}), () => {
                if (currScene == 'titleScene') this.scene.resume('titleScene').stop();
                
                music = [];
                music.forEach(song => {
                    if (song.isPlaying || song.isPaused) song.stop();
                })

                this.scene.stop(currScene);
                this.scene.start('titleScene');
            })
            
            /* new ButtonR(this, centerX - rescale/2, centerY + 19.5*rescale, 'mainMenuButton', rescale, () => {
                if (currScene == 'titleScene') this.scene.resume('titleScene').stop();

                music = [];
                music.forEach(song => {
                    if (song.isPlaying || song.isPaused) song.stop();
                })

                this.scene.stop(currScene);
                this.scene.start('titleScene');
            }) */
        }
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            music = [];
            music.forEach(song => {
                if (song.isPaused) song.resume();
            })
            this.scene.resume(currScene).stop();
        }

        if (currScene != 'titleScene') {
            if (Phaser.Input.Keyboard.JustDown(keyR)) {
                music = [];
                music.forEach(song => {
                    if (song.isPlaying || song.isPaused) song.stop();
                })
    
                this.scene.resume(currScene).stop();
                this.scene.restart(currScene);
            }
    
            if (Phaser.Input.Keyboard.JustDown(keyM)) {
                if (currScene == 'titleScene') this.scene.resume('titleScene').stop();
    
                music = [];
                music.forEach(song => {
                    if (song.isPlaying || song.isPaused) song.stop();
                })
    
                this.scene.stop(currScene);
                this.scene.start('titleScene');
            }
        }
    }
    
}
