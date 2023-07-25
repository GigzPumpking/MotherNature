class Options extends Phaser.Scene {
    constructor() {
        super({ key: 'optionsScene' })
    }

    create() {

        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

        this.menu = this.add.rectangle(centerX, centerY + 5*rescale, 100*rescale, 65*rescale, 0x000000, 0.7);

        // Temporary Text Buttons, replace with commented out sprites when assets available

        let Resume = new TextButton(this, centerX, centerY - 16.5*rescale, 'Resume', Object.assign({}, textConfig, {fontSize: 6*rescale}), () => {
            music = [];
            music.forEach(song => {
                if (song.isPaused) song.resume();
            })
            this.scene.resume(currScene).resume(ui).stop();
        })

        /* new ButtonR(this, centerX - 1.5*rescale, centerY - 11.5*rescale, 'resumeButton', rescale, () => {
            music = [];
            music.forEach(song => {
                if (song.isPaused) song.resume();
            })
            this.scene.resume(currScene).resume(ui).stop();
        }) */

        if (currScene != title) {
            let Restart = new TextButton(this, centerX, centerY - 0.5*rescale, 'Restart', Object.assign({}, textConfig, {fontSize: 6*rescale}), () => {
                music = [];
                music.forEach(song => {
                    if (song.isPlaying || song.isPaused) song.stop();
                })

                this.scene.stop(currScene).stop(ui).start(play).stop();
            })

            /* new ButtonR(this, centerX - 1.5*rescale, centerY + 4.5*rescale, 'restartButton', rescale, () => {
                music = [];
                music.forEach(song => {
                    if (song.isPlaying || song.isPaused) song.stop();
                })

                this.scene.stop(currScene).stop(ui).start(currScene).stop();
            }) */

            let MainMenu = new TextButton(this, centerX, centerY + 14.5*rescale, 'Main Menu', Object.assign({}, textConfig, {fontSize: 6*rescale}), () => {
                if (currScene == title) this.scene.resume(title).stop();
                
                music = [];
                music.forEach(song => {
                    if (song.isPlaying || song.isPaused) song.stop();
                })

                if (currScene != play) this.scene.stop(play);

                this.scene.stop(currScene).stop(ui).start(title);
            })
            
            /* new ButtonR(this, centerX - rescale/2, centerY + 19.5*rescale, 'mainMenuButton', rescale, () => {
                if (currScene == title) this.scene.resume(title).stop();

                music = [];
                music.forEach(song => {
                    if (song.isPlaying || song.isPaused) song.stop();
                })

                this.scene.stop(currScene).stop(ui).start(title);
            }) */

            if (currScene != play) {
                createBackButton(this, currScene, prevScene);
            }
        }
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.keyESC)) {
            music = [];
            music.forEach(song => {
                if (song.isPaused) song.resume();
            })
            this.scene.resume(currScene).resume(ui).stop();
        }

        if (currScene != title) {
            if (Phaser.Input.Keyboard.JustDown(this.keyR)) {
                music = [];
                music.forEach(song => {
                    if (song.isPlaying || song.isPaused) song.stop();
                })
    
                this.scene.stop(currScene).stop(ui).start(play).stop();
            }
    
            if (Phaser.Input.Keyboard.JustDown(this.keyM)) {
                if (currScene == title) this.scene.resume(title).stop();
    
                music = [];
                music.forEach(song => {
                    if (song.isPlaying || song.isPaused) song.stop();
                })

                if (currScene != play) this.scene.stop(play);
    
                this.scene.stop(currScene).stop(ui).start(title);
            }
        }
    }

    brightnessBar() {
        this.brightnessBarText = this.add.text(centerX, centerY + 25*rescale, 'Brightness', textConfig).setOrigin(0.5);

        // Add a rectangle to follow the circle
        let brightnessBar = this.add.rectangle(centerX, centerY + 30*rescale, 200, 5, 0xFFFFFF).setOrigin(0.5);
        // Add a circle to be dragged horizontally to change brightness
        let currentBrightness = 200 * brightness + brightnessBar.x - 100;
        let brightnessCircle = this.add.circle(currentBrightness, centerY + 30*rescale, 10, 0xff0000).setOrigin(0.5);
        brightnessCircle.setInteractive({draggable: true});

        brightnessCircle.on('drag', function(pointer, dragX) {
            if (dragX < brightnessBar.x + 100 && dragX > brightnessBar.x - 100) this.x = dragX;
            else if (dragX < brightnessBar.x - 100) this.x = brightnessBar.x - 100;
            else if (dragX > brightnessBar.x + 100) this.x = brightnessBar.x + 100;

            brightness = (this.x - brightnessBar.x + 100) / 200;
            brightnessBG.setAlpha(1 - brightness);
        });
    }


    
}
