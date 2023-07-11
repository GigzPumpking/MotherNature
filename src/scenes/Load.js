class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // loading bar
        // See: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();                                 // reset fill/line style
            loadingBar.fillStyle(0xFFFFFF, 1);                  // (color, alpha)
            loadingBar.fillRect(0, centerY, w * value, 5);  // (x, y, w, h)
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });

    }

    create() {
        // Assign scenes to variables

        load = this.scene.get('loadScene');
        title = this.scene.get('titleScene');
        options = this.scene.get('optionsScene');
        credits = this.scene.get('creditsScene');
        play = this.scene.get('playScene');


        // Assign music to variables

        music = [];

        // Initial scene

        this.scene.start('titleScene');
    }
}
