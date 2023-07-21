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

        // backgroundAssets
        this.load.path = 'assets/';
        this.load.image('snowLump', 'inlumpofsnow.png');
        this.load.image('groundTilesetImage', 'groundTileset.png');
        this.load.tilemapTiledJSON('groundJSON', 'groundTileset.json');
        this.load.image('tree1', 'itree1.png');
        this.load.image('tree2', 'itree2.png');
        this.load.image('treestack', 'repeatable_trees.png');
        this.load.image('house', 'intro_house.png');
        this.load.image('snowlump', 'inlumpofsnow.png');
        this.load.image('rock', 'rock.png');

        // characterAssets
        this.load.path = 'assets/characters/';
        this.load.image('agnes', 'agnes_sprite.png');
        this.load.image('lamby', 'lamby_sprite.png');
        this.load.image('tortoise', 'tortoise_sprite.png');

        // character animations
        this.load.path = 'assets/characters/animations/';
        this.load.image('abby', 'abby_idle.png');
        this.load.spritesheet('abbyIdle', 'abby_idle.png', { frameWidth: 24, frameHeight: 32, startFrame: 0, endFrame: 6 });

        // tortoiseHouse Assets
        this.load.path = 'assets/tortoiseHouse/';
        this.load.image('tortoiseHouse', 'tortoiseHouse.png');
        this.load.image('tortoiseHouseBase', 'tortoiseHouseBase.png');
        this.load.image('tortoiseHousePillars', 'tortoiseHousePillars.png');
        this.load.image('tortoiseHouseSnow', 'tortoiseHouseSnow.png');
        this.load.image('tortoiseHouseStairs', 'tortoiseHouseStairs.png');

        // guitar minigame assets
        this.load.path = 'assets/guitarminigame/';
        this.load.image('circle', 'circle.png');
        this.load.image('dad_head', 'dad_head.png');
        this.load.image('green_bar', 'green_bar.png');
        this.load.image('red_bar', 'red_bar.png');
        this.load.image('guitarBG', 'minigame_bg.png');
        this.load.image('slice', 'slice.png');
        this.load.image('nigel_shadow', 'nigel_shadow.png');

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

        // Animation
        play.anims.create({
            key: 'abby_idle',
            frames: this.anims.generateFrameNumbers('abbyIdle', { start: 0, end: 6, first: 0}),
            frameRate: 10,
            repeat: -1
        });

        // Keybinds

        uiESC = ui.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        uiI = ui.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);

        this.scene.start('titleScene');
    }
}
