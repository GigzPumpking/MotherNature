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

        // tempAssets
        this.load.path = 'assets/tempAssets/';
        this.load.image('cigbox', 'cigbox.png');
        this.load.image('silhouette', 'silhouette_3.png');

    }

    create() {
        // Assign scenes to variables

        load = this.scene.get('loadScene');
        title = this.scene.get('titleScene');
        options = this.scene.get('optionsScene');
        credits = this.scene.get('creditScene');
        play = this.scene.get('playScene');
        ui = this.scene.get('uiScene');
        inv = this.scene.get('inventoryScene');
        mus = this.scene.get('musicScene');

        // Assign music to variables
        music = [];

        // Keybinds

        uiESC = ui.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        uiI = ui.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);

        this.scene.start('titleScene');
    }
}
