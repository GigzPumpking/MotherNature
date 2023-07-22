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

        // environmentAssets
        this.load.path = 'assets/environment/';
        this.load.image('snowLump', 'lumpOfSnow.png');
        this.load.image('groundTilesetImage', 'groundTilemap.png');
        this.load.tilemapTiledJSON('groundJSON', 'groundTileset.json');
        this.load.image('treestack', 'repeatableTrees.png');
        this.load.image('house', 'agnes_house.png');
        this.load.image('rock', 'rock.png');

        // characterAssets
        this.load.path = 'assets/characters/';
        this.load.image('agnes', 'agnes_sprite.png');
        this.load.image('lamby', 'lamby_sprite.png');
        this.load.image('tortoise', 'tortoise_sprite.png');
        this.load.image('abby', 'abby_sprite.png');

        // character animations
        this.load.path = 'assets/characters/animations/';
        this.load.image('abby', 'abby_idle.png');
        this.load.spritesheet('abbyIdle', 'abby_idle.png', { frameWidth: 24, frameHeight: 32, startFrame: 0, endFrame: 6 });
        this.load.spritesheet('agnesIdle', 'agnes_idle.png', { frameWidth: 20, frameHeight: 28, startFrame: 0, endFrame: 2 });
        this.load.spritesheet('agnesWalk', 'agnes_walk.png', { frameWidth: 20, frameHeight: 29, startFrame: 0, endFrame: 5 });
        this.load.spritesheet('lambyIdle', 'lamby_idle.png', { frameWidth: 21, frameHeight: 31, startFrame: 0, endFrame: 2 });

        // tortoiseHouse Assets
        this.load.path = 'assets/environment/tortoiseHouse/';
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

        play.anims.create({
            key: 'agnes_idle',
            frames: this.anims.generateFrameNumbers('agnesIdle', { start: 0, end: 2, first: 0}),
            frameRate: 10,
            repeat: -1
        });

        play.anims.create({
            key: 'agnes_walk',
            frames: this.anims.generateFrameNumbers('agnesWalk', { start: 0, end: 5, first: 0}),
            frameRate: 10,
            repeat: -1
        });

        play.anims.create({
            key: 'lamby_idle',
            frames: this.anims.generateFrameNumbers('lambyIdle', { start: 0, end: 2, first: 0}),
            frameRate: 10,
            repeat: -1
        });

        // Start Title Scene
        this.scene.start(title);
    }
}
