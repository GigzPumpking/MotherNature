class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // menuAssets
        this.load.path = 'assets/menu/';
        this.load.image('menuBG', 'menu_bg.png');
        this.load.image('options', 'options.png');
        this.load.image('optionsHover', 'yellow_options.png');
        this.load.image('start', 'start.png');
        this.load.image('startHover', 'yellow_start.png');
        this.load.image('controls', 'controls.png');
        this.load.image('controlsHover', 'yellow_controls.png');
        this.load.image('arrow', 'arrow.png');

        // Stills
        this.load.path = 'assets/Stills/';
        this.load.image('lamby_stuffed', 'lamby_stuffed.png');
        this.load.image("Scene1", "Scene1.png");
        this.load.image("Scene2", "Scene2.png");
        this.load.image("Scene3", "Scene3.png");
        this.load.image("Scene4", "Scene4.png");
        this.load.image("Scene5Sheet", "Scene5.png");
        this.load.spritesheet("Scene5", "Scene5.png", { frameWidth: 160, frameHeight: 90, startFrame: 0, endFrame: 3 });
        this.load.image("Scene6", "Scene6.png");
        this.load.image("Scene7", "Scene7.png");

        // environmentAssets
        this.load.path = 'assets/environment/';
        this.load.image('snowLump', 'lumpOfSnow.png');
        this.load.image('groundTilesetImage', 'groundTilemap.png');
        this.load.tilemapTiledJSON('groundJSON', 'groundTileset.json');
        this.load.image('treestack', 'repeatableTrees.png');
        this.load.image('house', 'agnes_house.png');
        this.load.image('rock', 'rock.png');
        this.load.image('textBubble', 'text_bubble.png');
        this.load.image('caveBack', 'CaveBack.png');
        this.load.image('caveFront', 'CaveFront.png');

        // characterAssets
        this.load.path = 'assets/characters/';
        this.load.image('agnes', 'agnes_sprite.png');
        this.load.image('lamby', 'lamby_sprite.png');
        this.load.image('tortoise', 'tortoise_sprite.png');
        this.load.image('abby', 'abby_sprite.png');
        this.load.image('shadow', 'shadow_sprite.png');

        // character animations
        this.load.path = 'assets/characters/animations/';
        this.load.spritesheet('abbyIdle', 'abby_idle.png', { frameWidth: 21, frameHeight: 29, startFrame: 0, endFrame: 6 });
        this.load.spritesheet('agnesIdle', 'agnes_idle.png', { frameWidth: 20, frameHeight: 28, startFrame: 0, endFrame: 2 });
        this.load.spritesheet('agnesWalk', 'agnes_walk.png', { frameWidth: 20, frameHeight: 29, startFrame: 0, endFrame: 5 });
        this.load.spritesheet('agnesTrip', 'agnes_trip.png', { frameWidth: 57, frameHeight: 33, startFrame: 0, endFrame: 15 });
        this.load.spritesheet('lambyIdle', 'lamby_idle.png', { frameWidth: 21, frameHeight: 31, startFrame: 0, endFrame: 2 });
        this.load.spritesheet('lambyWalk', 'lamby_walk.png', { frameWidth: 21, frameHeight: 32, startFrame: 0, endFrame: 5 });
        this.load.spritesheet('shadowIdle', 'shadow_idle.png', { frameWidth: 23, frameHeight: 40, startFrame: 0, endFrame: 2 });
        this.load.spritesheet('shadowWalk', 'shadow_walkt.png', { frameWidth: 23, frameHeight: 42, startFrame: 0, endFrame: 6 });
        this.load.spritesheet('nigelIdle', 'nigel_idle.png', { frameWidth: 24, frameHeight: 31, startFrame: 0, endFrame: 4 });
        this.load.spritesheet('nigelWalk', 'nigel_walk.png', { frameWidth: 24, frameHeight: 31, startFrame: 0, endFrame: 7 });


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
        this.load.image('abby_guitar', 'abby_guitar.png');
        this.load.image('agnes_guitar', 'agnes_guitar.png');

        // SFX assets
        this.load.path = 'assets/SFX/';
        this.load.audio('agnesVoice', 'agnes_voice_long.mp3');
        this.load.audio('agnesVoice2', 'agnes_voice_short.mp3');
        this.load.audio('lambyVoice', 'lamby_voice_long.mp3');
        this.load.audio('lambyVoice2', 'lamby_voice_short.mp3');
        this.load.audio('turtleDadVoice', 'turtle_dad_voice_long.mp3');
        this.load.audio('turtleDadVoice2', 'turtle_dad_voice_short.mp3');
        this.load.audio('turtleDaughterVoice', 'turtle_daughter_voice_long.mp3');
        this.load.audio('turtleDaughterVoice2', 'turtle_daughter_voice_short.mp3');

        this.load.audio('TV', 'broadcast_TV_fuzz.mp3');
        this.load.audio('hammerWood', 'hammering_wooden_boards.mp3');
        this.load.audio('doorClose', 'door_closing.mp3');
        this.load.audio('doorOpen', 'door_opening.mp3');
        this.load.audio('footsteps_snow', 'footsteps_snow.mp3');
        this.load.audio('trip', 'tripping_in_snow.mp3');
        this.load.audio('shadowy_figure_woosh', 'shadowy_figure_woosh.mp3');
        this.load.audio('menuSelect', 'menu_select.mp3');

        // pause assets
        this.load.path = 'assets/pause/';
        this.load.image('arrowP', 'arrow.png');
        this.load.image('mainMenuP', 'mainmenu.png');
        this.load.image('pauseBox', 'pauseBox.png');
        this.load.image('resumeP', 'resume.png');
        this.load.image('restartP', 'restart.png');
        this.load.image('mainMenuPHover', 'yellow_mainmenu.png');
        this.load.image('resumePHover', 'yellow_resume.png');
        this.load.image('restartPHover', 'yellow_restart.png');

        // music
        this.load.path = 'assets/music/';
        this.load.audio('Title_winter_ambient', 'Title_winter_ambience_final_intro.mp3');
        this.load.audio('Title_winter_ambient_loop', 'Title_winter_ambience_final_loop.mp3');
        this.load.audio('guitar_minigame', 'guitar_repaired_final.mp3');

        // tunnel assets
        this.load.path = 'assets/tunnel/';

        this.load.image("TunnelBg", "tunneConceptl.png");
        this.load.image("agnes", "agnes_tunnel.png");
        this.load.image("circleG", "circle_green.png");
        this.load.image("circleP", "circle_purple.png");
        this.load.image("circleR", "circle_red.png");
        this.load.image("line", "line.png");
        this.load.image("smcG", "smcircle_green.png");
        this.load.image("smcP", "smcircle_purple.png");
        this.load.image("smcR", "smcircle_red.png");

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
        controls = this.scene.get('controlsScene');
        play = this.scene.get('playScene');
        ui = this.scene.get('uiScene');
        inv = this.scene.get('inventoryScene');
        mus = this.scene.get('musicScene');
        tun = this.scene.get('tunnelScene');

        // Assign music to variables
        music = [];

        // Animation
        play.anims.create({
            key: 'scene5',
            frames: this.anims.generateFrameNumbers('Scene5', { start: 0, end: 3, first: 0}),
            frameRate: 5,
            repeat: 0
        });

        play.anims.create({
            key: 'abby_idle',
            frames: this.anims.generateFrameNumbers('abbyIdle', { start: 0, end: 6, first: 0}),
            frameRate: 6.66,
            repeat: -1
        });

        play.anims.create({
            key: 'agnes_idle',
            frames: this.anims.generateFrameNumbers('agnesIdle', { start: 0, end: 2, first: 0}),
            frameRate: 10,
            repeat: -1
        });

        mus.anims.create({
            key: 'agnes_idleM',
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
            key: 'agnes_trip',
            frames: this.anims.generateFrameNumbers('agnesTrip', { start: 0, end: 15, first: 0}),
            frameRate: 10,
            repeat: 0
        });

        play.anims.create({
            key: 'lamby_idle',
            frames: this.anims.generateFrameNumbers('lambyIdle', { start: 0, end: 2, first: 0}),
            frameRate: 10,
            repeat: -1
        });

        play.anims.create({
            key: 'lamby_walk',
            frames: this.anims.generateFrameNumbers('lambyWalk', { start: 0, end: 5, first: 0}),
            frameRate: 10,
            repeat: -1
        });

        play.anims.create({
            key: 'shadow_idle',
            frames: this.anims.generateFrameNumbers('shadowIdle', { start: 0, end: 2, first: 0}),
            frameRate: 10,
            repeat: -1
        });

        play.anims.create({
            key: 'shadow_walk',
            frames: this.anims.generateFrameNumbers('shadowWalk', { start: 0, end: 6, first: 0}),
            frameRate: 10,
            repeat: -1
        });

        play.anims.create({
            key: 'nigel_idle',
            frames: this.anims.generateFrameNumbers('nigelIdle', { start: 0, end: 4, first: 0}),
            frameRate: 6.66,
            repeat: -1
        });

        play.anims.create({
            key: 'nigel_walk',
            frames: this.anims.generateFrameNumbers('nigelWalk', { start: 0, end: 7, first: 0}),
            frameRate: 10,
            repeat: -1
        });

        // music
        music[0] = this.sound.add('Title_winter_ambient');
        music[1] = this.sound.add('Title_winter_ambient_loop');
        music[2] = this.sound.add('guitar_minigame');

        // create agnes voice
        agnesVoice = this.sound.add('agnesVoice');
        agnesVoice2 = this.sound.add('agnesVoice2');

        // create lamby voice
        lambyVoice = this.sound.add('lambyVoice');
        lambyVoice2 = this.sound.add('lambyVoice2');

        // create turtle dad voice
        turtleDadVoice = this.sound.add('turtleDadVoice');
        turtleDadVoice2 = this.sound.add('turtleDadVoice2');

        // create turtle daughter voice
        turtleDaughterVoice = this.sound.add('turtleDaughterVoice');
        turtleDaughterVoice2 = this.sound.add('turtleDaughterVoice2');

        // create TV sound
        TV = this.sound.add('TV');
        TV.loop = true;

        // create hammerWood sound
        hammerWood = this.sound.add('hammerWood');

        // create door sounds
        doorClose = this.sound.add('doorClose');
        doorOpen = this.sound.add('doorOpen');

        // create footsteps sound
        footsteps_snow = this.sound.add('footsteps_snow');

        // create trip sound
        trip = this.sound.add('trip');

        // menu select sound
        menuSelect = this.sound.add('menuSelect');

        // shadowey woosh
        shadowyWoosh = this.sound.add('shadowy_figure_woosh');

        // Start Title Scene
        this.scene.start(title);
    }
}
