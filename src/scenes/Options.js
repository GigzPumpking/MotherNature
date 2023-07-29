class Options extends Phaser.Scene {
    constructor() {
        super({ key: 'optionsScene' })
    }

    create() {

        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

        this.menu = this.add.sprite(centerX, centerY, 'pauseBox').setScale(rescale).setOrigin(0.5, 0.5);

        // Temporary Text Buttons, replace with commented out sprites when assets available

        let Resume = new Button(this, centerX - 12.5*rescale, centerY - 10.5*rescale, 'resumeP', 'resumePHover', rescale, () => {
            music = [];
            music.forEach(song => {
                if (song.isPaused) song.resume();
            })
            this.scene.resume(currScene).resume(ui).stop();
        })

        if (currScene != title) {
            let Restart = new Button(this, centerX - 13.5*rescale, centerY, 'restartP', 'restartPHover', rescale, () => {
                menuSelect.play();
                music = [];
                music.forEach(song => {
                    if (song.isPlaying || song.isPaused) song.stop();
                })

                this.scene.stop(currScene).stop(ui).start(play).stop();
            })

            let MainMenu = new Button(this, centerX - 18.5*rescale, centerY + 10.5*rescale, 'mainMenuP', 'mainMenuPHover', rescale, () => {
                menuSelect.play();
                music = [];
                music.forEach(song => {
                    if (song.isPlaying || song.isPaused) song.stop();
                })

                if (currScene != play) this.scene.stop(play);

                this.scene.stop(currScene).stop(ui).start(title);
            }) 

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
                menuSelect.play();
                music = [];
                music.forEach(song => {
                    if (song.isPlaying || song.isPaused) song.stop();
                })
    
                this.scene.stop(currScene).stop(ui).start(play).stop();
            }
    
            if (Phaser.Input.Keyboard.JustDown(this.keyM)) {
                menuSelect.play();
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
