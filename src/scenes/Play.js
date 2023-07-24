class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create() {
        // Current and Previous Scene
        currScene = play;
        prevScene = title;

        inventory = [];

        this.createMap();

        this.cameraInitialize();

        this.createCharacters();

        this.cutsceneOne();
    }

    update() {
        this.camera.startFollow(this.player, true, 0.25, 0.25);

        updateCurrPrev(play, title);

        // Update characters
        this.player.update();
        this.lamby.update();

        for (let i = 0; i < conversations.length; i++) {
            conversations[i].update();
        }
    }

    createMap() {
        map = this.add.tilemap('groundJSON');
        let tileset = map.addTilesetImage('groundTileset', 'groundTilesetImage');

        for (let i = 0; centerX + i*240*rescale < map.widthInPixels * rescale; i++) {
            this.createTree(centerX + i*240*rescale, centerY + rescale*5, rescale, 'treestack');
        }
        
        let groundLayer = map.createLayer('Ground', tileset, 0, 0);
        groundLayer.setScale(rescale);

        this.agnesHouse();

        this.tortoiseHouse();

        this.mapLength = map.widthInPixels * rescale;
    }

    cameraInitialize() {
        this.camera = this.cameras.main;
        cameraSettings(this.camera);
        this.camera.setBounds(0, 0, map.widthInPixels * rescale, map.heightInPixels * rescale);
        this.physics.world.setBounds(0, 0, map.widthInPixels * rescale, map.heightInPixels * rescale);
    }

    createTree(x, y, scale, texture) {
        this.add.sprite(x, y, texture).setScale(scale);
    }

    agnesHouse() {
        this.house = this.add.sprite(centerX/2 - 20*rescale, centerY, 'house').setScale(rescale);
        this.snowlump = this.add.sprite(centerX/2 + 25*rescale, centerY + 50*rescale, 'snowLump').setScale(rescale);
        this.rock = this.add.sprite(centerX/2 + 60*rescale, centerY + 50*rescale, 'rock').setScale(rescale);
    }

    tortoiseHouse() {
        this.tortoiseHouse = this.add.sprite(centerX + 400*rescale, centerY + 5*rescale, 'tortoiseHouse').setScale(rescale);
        this.tortoiseHouseBase = this.add.sprite(centerX + 400*rescale, centerY + 5*rescale, 'tortoiseHouseBase').setScale(rescale);
        this.tortoiseHousePillar = this.add.sprite(centerX + 400*rescale, centerY + 5*rescale, 'tortoiseHousePillars').setScale(rescale);
        this.tortoiseHouseSnow = this.add.sprite(centerX + 400*rescale, centerY - 20*rescale, 'tortoiseHouseSnow').setScale(rescale);
        this.tortoiseHouseStairs = this.add.sprite(centerX + 400*rescale, centerY + 50*rescale, 'tortoiseHouseStairs').setScale(rescale);
    }

    createCharacters() {
        // Add Player
        this.player = new Player(this, centerX/2, 102*rescale, 'agnes', 0, rescale).setOrigin(0.5, 0).setDepth(2);
        this.player.flipX = true;

        // Add Abby
        this.abby = new NPC(this, centerX/2 + 400*rescale, centerY + 65*rescale, 'abby', 0, rescale, false).setOrigin(0.5, 1);
        this.abby.flipX = true;
        this.abby.anims.play('abby_idle');

        // Add Tortoise
        this.tortoise = new NPC(this, centerX/2 + 500*rescale, centerY + 30*rescale, 'tortoise', 0, rescale, false).setOrigin(0.5, 0);
        this.tortoise.flipX = true;

        // Add Lamby

        this.lamby = new NPC(this, 35*rescale, 130*rescale, 'lamby', 0, rescale, true, this.player).setOrigin(0.5, 1);

        // Add invisible floor collision
        this.floor = this.add.rectangle(this.mapLength / 2, h, this.mapLength, 10*rescale, 0x000000, 0);
        this.physics.add.existing(this.floor, true);

        // Set collision for floor
        this.physics.add.collider(this.player, this.floor);
        this.physics.add.collider(this.abby, this.floor);
        this.physics.add.collider(this.tortoise, this.floor);
        this.physics.add.collider(this.lamby, this.floor);

        this.player.on('animationupdate', this.onAnimationUpdate, this);
        this.lamby.on('animationupdate', this.onAnimationUpdate, this);
    }

    onAnimationUpdate(animation, frame) {
        if (animation.key === 'agnes_idle' || animation.key === 'lamby_idle') {
            if (frame.index === 1) {
                pauseForDuration(play, animation, 400);
            } else if (frame.index === 3) {
                pauseForDuration(play, animation, 200);
            } else {
                pauseForDuration(play, animation, 100);
            }
        }
    }

    createTextBubble(speaker, text) {
        let talk = new TextBubble(this, speaker.x, speaker.y, 'textBubble', 0, rescale, text, speaker).setOrigin(1.2, 1).setDepth(3);
        conversations.push(talk);
    }

    cutsceneOne() {
        cutscene = true;

        // create black screen
        this.blackScreen = this.add.rectangle(centerX, centerY, w, h + 20*rescale, 0x000000, 1).setOrigin(0.5).setDepth(4);

        this.time.delayedCall(700, () => {     
            new TextBubble(this, centerX + 7*rescale, centerY + 42.5*rescale, 'textBubble', 0, rescale, "Agnes! Agnes wake up!! What happened?!", null, 5, 1, true, () => {
                this.time.delayedCall(1000, () => {
                    // Fade in
                    this.tweens.add({
                        targets: this.blackScreen,
                        alpha: 0,
                        duration: 1000,
                        ease: 'Linear',
                        onComplete: () => {
                            this.blackScreen.destroy();
                            new TextBubble(this, centerX + 7*rescale, centerY + 42.5*rescale, 'textBubble', 0, rescale, "I can't believe you walked out", null, 3, 0, true, () => {
                                new TextBubble(this, centerX + 7*rescale, centerY + 42.5*rescale, 'textBubble', 0, rescale, "into the blizzard like that! ", null, 3, 2, true, () => {
                                    new TextBubble(this, centerX + 7*rescale, centerY + 42.5*rescale, 'textBubble', 0, rescale, "Come back inside. ", null, 3, 2, true, () => {
                                        new TextBubble(this, centerX + 7*rescale, centerY + 42.5*rescale, 'textBubble', 0, rescale, "You should just wait at the house", null, 3, 0, true, () => {
                                            new TextBubble(this, centerX + 7*rescale, centerY + 42.5*rescale, 'textBubble', 0, rescale, "like your mother told you to! ", null, 3, 2, true, () => {
                                                new TextBubble(this, centerX + 7*rescale, centerY + 42.5*rescale, 'textBubble', 0, rescale, "She's probably still looking for help out there!", null, 3, 1, true, () => {
                                                    new TextBubble(this, centerX + 30*rescale, centerY + 44*rescale, 'textBubble', 0, rescale, "No, I have to find her. She could be hurt.", null, 3, 1, true, () => {
                                                        cutscene = false;
                                                        this.scene.launch('ui');
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        }
                    });
                });    
            });
        }, null, this);
    }
}