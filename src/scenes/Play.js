class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create() {
        cutscene = false;
        conversations = [];

        // Current and Previous Scene
        currScene = play;
        prevScene = title;

        this.createMap();

        this.cameraInitialize();

        this.createCharacters();

        this.cutsceneZero();

        this.scene.launch(ui);
    }

    update() {
        if (!cutscene && cutsceneNum != 4) this.camera.startFollow(this.player, true, 0.25, 0.25);

        updateCurrPrev(play, title);

        // Update characters
        if (!cutscene) {
            this.player.update();
            this.lamby.update();
        }

        for (let i = 0; i < conversations.length; i++) {
            conversations[i].update();
        }

        if (!cutscene && this.player.x > centerX + this.tortoiseHousex - 160*rescale && cutsceneNum === 1) {
            this.cutsceneTwo();
        }

        if (!cutscene && this.player.x > this.tunnelBack.x - 130*rescale && cutsceneNum === 3) {
            this.cutsceneFour();
        }

        if (!cutscene && this.player.x > this.tunnelBack.x + 40*rescale && cutsceneNum === 4) {
            this.cutsceneFive();
        }

        if (!cutscene && this.player.x > this.tunnelBack2.x + 210*rescale && cutsceneNum === 5) {
            this.cutsceneSix();
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

        this.createTortoiseHouse();

        this.createTunnel();

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
        this.snowlump = this.add.sprite(centerX/2 + 52*rescale, centerY + 60*rescale, 'snowLump').setScale(rescale);
        this.rock = this.add.sprite(centerX/2 + 88*rescale, centerY + 55*rescale, 'rock').setScale(rescale);
    }

    createTortoiseHouse() {
        this.tortoiseHousex = 350*rescale;
        //this.tortoiseHouse = this.add.sprite(centerX + 600*rescale, centerY + 5*rescale, 'tortoiseHouse').setScale(rescale);
        this.tortoiseHouseBase = this.add.sprite(centerX + this.tortoiseHousex, centerY + 5*rescale, 'tortoiseHouseBase').setScale(rescale);
        this.tortoiseHousePillar = this.add.sprite(centerX + this.tortoiseHousex, centerY + 5*rescale, 'tortoiseHousePillars').setScale(rescale);
        this.tortoiseHouseSnow = this.add.sprite(centerX + this.tortoiseHousex, centerY - 20*rescale, 'tortoiseHouseSnow').setScale(rescale);
        this.tortoiseHouseStairs = this.add.sprite(centerX + this.tortoiseHousex, centerY + 50*rescale, 'tortoiseHouseStairs').setScale(rescale);
    }

    createTunnel() {
        this.tunnelBack = this.add.sprite(centerX + this.tortoiseHousex + 300*rescale, centerY + 5*rescale, 'caveBack').setScale(rescale);
        this.tunnelFront = this.add.sprite(this.tunnelBack.x + 25*rescale, centerY + 20*rescale, 'caveFront').setScale(rescale).setDepth(2.5);

        this.tunnelBack2 = this.add.sprite(this.tunnelBack.x + 100*rescale, centerY + 5*rescale, 'caveBack').setScale(rescale);
        this.tunnelBack2.flipX = true;
        this.tunnelFront2 = this.add.sprite(this.tunnelBack2.x - 25*rescale, centerY + 20*rescale, 'caveFront').setScale(rescale).setDepth(2.5);
        this.tunnelFront2.flipX = true;

        this.momLump = this.add.sprite(this.tunnelBack2.x + 300*rescale, centerY + 60*rescale, 'snowLump').setScale(rescale).setDepth(2.5);
    }

    createCharacters() {
        // Add Player
        this.player = new Player(this, centerX - 58*rescale, 102*rescale, 'agnes', 0, rescale).setOrigin(0.5, 0).setDepth(1).setAlpha(0);
        this.camera.startFollow(this.player, true, 0.25, 0.25);

        // Add Abby
        this.abby = new NPC(this, centerX/2 + this.tortoiseHousex, centerY + 65*rescale, 'abby', 0, rescale, this.player).setOrigin(0.5, 1);
        this.abby.anims.play('abby_idle');

        this.abbyGuitar = this.add.sprite(this.abby.x - 1*rescale, this.abby.y - rescale, 'agnes_guitar').setScale(rescale).setOrigin(0.5, 1).setDepth(1);

        // Add Nigel
        this.nigel = new NPC(this, centerX/2 + this.tortoiseHousex + 40*rescale, centerY + 30*rescale, 'tortoise', 0, rescale, this.player).setOrigin(0.5, 0);
        this.nigel.flipX = true;
        this.nigel.anims.play('nigel_idle');

        // Add Lamby
        this.lamby = new NPC(this, centerX + 20*rescale, 130*rescale, 'lamby', 0, rescale, this.player).setOrigin(0.5, 1);
        this.lamby.flipX = true;
        this.lamby.anims.play('lamby_idle');
        this.lamby.setAlpha(0);

        this.shadow = new NPC(this, -15*rescale, 130*rescale, 'shadow', 0, rescale, null).setOrigin(0.5, 1).setDepth(3);
        this.shadow.anims.play('shadow_walk');

        // Add invisible floor collision
        this.floor = this.add.rectangle(this.mapLength / 2, h, this.mapLength, 10*rescale, 0x000000, 0);
        this.physics.add.existing(this.floor, true);

        // Set collision for floor
        this.physics.add.collider(this.player, this.floor);
        this.physics.add.collider(this.abby, this.floor);
        this.physics.add.collider(this.nigel, this.floor);
        this.physics.add.collider(this.lamby, this.floor);

        this.player.on('animationupdate', this.onAnimationUpdate, this);
        this.lamby.on('animationupdate', this.onAnimationUpdate, this);
        this.abby.on('animationupdate', this.onAnimationUpdate, this);
        this.shadow.on('animationupdate', this.onAnimationUpdate, this);
    }

    onAnimationUpdate(animation, frame) {
        if (animation.key === 'agnes_idle' || animation.key === 'lamby_idle' || animation.key === 'shadow_idle') {
            if (frame.index === 1) {
                pauseForDuration(play, animation, 400);
            } else if (frame.index === 3) {
                pauseForDuration(play, animation, 200);
            } else {
                pauseForDuration(play, animation, 100);
            }
        }

        if (animation.key === 'agnes_trip' && frame.index === 9) {
            // tween rock 5 rescale right
            this.tweens.add({
                targets: this.rock,
                x: this.rock.x + 5*rescale,
                duration: 1000,
                ease: 'Power2'
            });
        } 
    }

    createTextBubble(speaker, text, depth, flipX, callback) {
        let x, y;
        if (speaker === this.player) {
            if (flipX) x = this.player.x + 92*rescale;
            else x = this.player.x;
            y = this.player.y + 9.5*rescale;
        } else if (speaker === this.lamby) {
            if (flipX) x = this.lamby.x + 92*rescale;
            else x = this.lamby.x;
            y = this.lamby.y - 20*rescale;
        } else if (speaker === this.abby) {
            if (flipX) x = this.abby.x + 92*rescale;
            else x = this.abby.x;
            y = this.abby.y - 20*rescale;
        } else if (speaker === this.nigel) {
            if (flipX) x = this.nigel.x + 92*rescale;
            else x = this.nigel.x;
            y = this.nigel.y;
        }

        let textBubble = new TextBubble(this, x, y, 'textBubble', 0, rescale, text, depth, flipX, speaker, callback);

        this.input.on('pointerdown', () => {
            if (!textBubble.destroyed) textBubble.skip();
        });
    }

    blackScreenFade(alpha, duration, callback) {
        this.tweens.add({
            targets: this.blackScreen,
            alpha: alpha,
            duration: duration,
            ease: 'Linear',
            onComplete: () => {
                callback();
            }
        });
    }

    cutsceneZero() {
        cutscene = true;
        cutsceneNum = 0;

        this.initialBG = this.add.rectangle(centerX, centerY, w*1.5, h + 20*rescale, 0x000000).setOrigin(0.5).setAlpha(1);

        this.blackScreen = this.add.rectangle(centerX, centerY, w*1.5, h + 20*rescale, 0x000000).setOrigin(0.5).setDepth(2).setAlpha(1);
        // Create scene 1
        this.scene1 = this.add.sprite(centerX, centerY, 'Scene1').setScale(rescale).setOrigin(0.5).setDepth(1.5).setInteractive();
        TV.play();
        this.blackScreenFade(0, 3000, () => {
        this.scene1.on('pointerdown', () => {
            this.scene1.disableInteractive();
            this.blackScreenFade(1, 1000, () => {
            this.scene1.setAlpha(0);
            this.scene2 = this.add.sprite(centerX, centerY, 'Scene2').setScale(rescale).setOrigin(0.5).setDepth(1.5).setInteractive();
            this.blackScreenFade(0, 1000, () => {
        this.scene2.on('pointerdown', () => {
            TV.stop();
            this.scene2.disableInteractive();
            this.blackScreenFade(1, 1000, () => {
            this.scene2.setAlpha(0);
            this.scene3 = this.add.sprite(centerX, centerY, 'Scene3').setScale(rescale).setOrigin(0.5).setDepth(1.5).setInteractive();
            this.blackScreenFade(0, 1000, () => {
        this.scene3.on('pointerdown', () => {
            this.scene3.disableInteractive();
            this.blackScreenFade(1, 1000, () => {
            this.scene3.setAlpha(0);
            this.scene4 = this.add.sprite(centerX, centerY, 'Scene4').setScale(rescale).setOrigin(0.5).setDepth(1.5).setInteractive();
            this.blackScreenFade(0, 1000, () => {
        this.scene4.on('pointerdown', () => {
            this.scene4.disableInteractive();
            this.blackScreenFade(1, 1000, () => {
            this.scene4.setAlpha(0);
            this.scene5 = this.add.sprite(centerX, centerY, 'Scene5', 0).setScale(rescale).setOrigin(0.5).setDepth(1.5).setInteractive();
            this.blackScreenFade(0, 1000, () => {
            this.scene5.anims.play('scene5');
        this.scene5.on('pointerdown', () => {
            this.scene5.disableInteractive();
            this.blackScreenFade(1, 1000, () => {
            this.scene5.setAlpha(0);
            this.scene6 = this.add.sprite(centerX, centerY, 'Scene6').setScale(rescale).setOrigin(0.5).setDepth(1.5).setInteractive();
            this.blackScreenFade(0, 1000,  () => {
        this.scene6.on('pointerdown', () => {
            this.scene6.disableInteractive();
            this.blackScreenFade(1, 1000, () => {
            this.scene6.setAlpha(0);
            this.scene7 = this.add.sprite(centerX, centerY, 'Scene7').setScale(rescale).setOrigin(0.5).setDepth(1.5).setInteractive();
            this.blackScreenFade(0, 1000, () => {
        this.scene7.on('pointerdown', () => {
            this.scene7.disableInteractive();
            this.blackScreenFade(1, 1000, () => {
            this.scene7.setAlpha(0);
            this.initialBG.destroy();
            this.blackScreenFade(0, 1000, () => {
                this.player.setAlpha(1);
                this.cutsceneOne();
            });

        }); }); }); }); }); }); }); }); }); }); }); }); }); }); }); }); }); }); }); }); });
    }

    cutsceneOne() {
        this.scenes = [this.scene1, this.scene2, this.scene3, this.scene4, this.scene5, this.scene6, this.scene7];
        // make all scenes invisible if they are not already (backup manuever)
        for (let i = 0; i < this.scenes.length; i++) {
            this.scenes[i].setAlpha(0);
        }

        cutscene = true;
        cutsceneNum = 1;

        this.snowlump.setDepth(2);

        doorOpen.play();

        this.player.anims.play('agnes_idle');

        // wait 2 seconds
        this.time.delayedCall(2000, () => {

        this.player.anims.play('agnes_walk');
        this.tweens.add({
            targets: this.player,
            x: centerX - 23*rescale,
            duration: 1500,
            ease: 'Linear',
            onComplete: () => {
        this.player.x += 16.5*rescale;
        this.player.anims.play('agnes_trip');
        this.player.y -= 4*rescale;

        // on trip animation complete
        this.player.on('animationcomplete', () => {

        // fade in black screen
        this.tweens.add({
            targets: this.blackScreen,
            alpha: 1,
            duration: 1000,
            ease: 'Linear',
            onComplete: () => {

        this.player.x -= 16.5*rescale;
        this.player.y += 4*rescale;
        this.player.anims.play('agnes_idle');
        this.lamby.setAlpha(1);

        this.time.delayedCall(3000, () => {     
            this.createTextBubble(this.lamby, "Agnes! Agnes wake up!! What happened?!", 5, true, () => {
                this.time.delayedCall(1000, () => {
                    this.tweens.add({
                        targets: this.blackScreen,
                        alpha: 0,
                        duration: 1000,
                        ease: 'Linear',
                        onComplete: () => {
                            this.blackScreen.destroy();
                            this.createTextBubble(this.lamby, "I can't believe you walked out", 3, true, () => {
                            this.createTextBubble(this.lamby, "into the blizzard like that! ", 3, true, () => {
                            this.createTextBubble(this.lamby, "Come back\ninside. ", 3, true, () => {
                            this.createTextBubble(this.lamby, "You should just wait at the house", 3, true, () => {
                            this.createTextBubble(this.lamby, "like your mother told you to! ", 3, true, () => {
                            this.createTextBubble(this.lamby, "She's probably still looking for help out there!", 3, true, () => {
                            this.createTextBubble(this.player, "No, I have to find her. She could be hurt.",  3, false, () => {
                            this.time.delayedCall(1000, () => {
                            this.tweens.add({
                                targets: this.shadow,
                                x: w + 50*rescale,
                                duration: 1000,
                                ease: 'Linear',
                                onComplete: () => {
                                    this.shadow.setAlpha(0);
                            this.createTextBubble(this.player, "What was that?! Did you see that thing, Lamby?", 3, false, () => {
                            this.createTextBubble(this.lamby, "What in the world are you talking about?", 3, true, () => {
                            this.createTextBubble(this.lamby, "Jeez, that rock really messed you up, huh?", 3, true, () => {
                            this.createTextBubble(this.player, "You really didn't see that?", 3, false, () => {
                            this.createTextBubble(this.player, "Well, whatever, I just need to find mom.", 3, false, () => {
                            this.createTextBubble(this.lamby, "Uhhhh okay, but I really think you should just stay here.", 3, true, () => {
                            this.createTextBubble(this.lamby, "She said she's going to come back.", 3, true, () => {
                            this.createTextBubble(this.player, "I've waited too long, I have to try looking.", 3, false, () => {
                            this.createTextBubble(this.lamby, "Fine, I'll just wait here then, since I know she'll be back.", 3, true, () => {
                            this.createTextBubble(this.player, "Okay then, bye Lamby…", 3, false, () => {
                                cutscene = false;
                                ui.cinematicViewExit();

        
        }); }); }); }); }); }); }); }); }); }); }}); }); }); }); }); }); }); }); }); }}); }); }); }); }}); }); }}); });
    }

    cutsceneTwo() {
        this.player.setAlpha(1).setDepth(2);
        this.player.x = centerX + this.tortoiseHousex - 160*rescale;
        cutscene = true;
        cutsceneNum = 2;
        ui.cinematicViewEnter();
        this.player.anims.play('agnes_idle');
        // pan camera to Abby
        this.camera.startFollow(this.abby, true, 0.25, 0.25);

        this.time.delayedCall(700, () => {
            this.createTextBubble(this.abby, "This guitar is\nawesome!!", 3, false, () => {
            this.createTextBubble(this.abby, "I can't believe\nit just fell out of the sky!\nHehehe...", 3, false, () => {
            this.createTextBubble(this.nigel, "Throw that #%!@\nout!", 3, false, () => {
            this.createTextBubble(this.nigel, "It's just\nanother piece of trash on this\nplanet!", 3, false, () => {
            this.createTextBubble(this.abby, "Oh Pa, please\ndon't be so grouchy…", 3, false, () => {
            this.createTextBubble(this.nigel, "I'm going inside.", 3, false, () => {
                this.nigel.flipX = false;
                this.nigel.anims.play('nigel_walk');
                //tween nigel to the door
                this.tweens.add({
                    targets: this.nigel,
                    x: this.nigel.x + 20*rescale,
                    duration: 1500,
                    ease: 'Linear',
                    onComplete: () => {
                        this.nigel.anims.play('nigel_idle');
                        // fade nigels alpha
                        this.tweens.add({
                            targets: this.nigel,
                            alpha: 0,
                            duration: 1000,
                            ease: 'Linear',
                        });
                        this.abby.flipX = true;
                        this.player.anims.play('agnes_walk');
                        // tween player to abby
                        this.tweens.add({
                            targets: this.player,
                            x: this.abby.x - 30*rescale,
                            duration: 1500,
                            ease: 'Linear',
                            onComplete: () => {
                                this.player.anims.play('agnes_idle');

            this.createTextBubble(this.player, "Hey Abby...\nUhhh this is a\nlittle awkward,", 3, false, () => {
            this.createTextBubble(this.player, "but I think\nthat's my guitar.\nHaha.", 3, false, () => {
            this.createTextBubble(this.abby, "OMG. This is\nyours??", 3, true, () => {
            this.createTextBubble(this.abby, "It just fell out\nof the sky a\nwhile ago and\nnow...", 3, true, () => {
            this.createTextBubble(this.abby, "I'm obsessed! It makes me feel like a rockstar just holding it!", 3, true, () => {
            this.createTextBubble(this.abby, "Heh heh heh…", 3, true, () => {
            this.createTextBubble(this.player, "Yeah my dumb\nhouse burped out\nsome of my stuff,", 3, false, () => {
            this.createTextBubble(this.player, "Sorry about that.\nYou know how to play?", 3, false, () => {
            this.createTextBubble(this.abby, "Yeah I do…\nI haven't played in a while though.", 3, true, () => {
            this.createTextBubble(this.abby, "Dad sorta banned music in the house when Mom died.", 3, true, () => {
            this.createTextBubble(this.abby, "We used to have a family band together…", 3, true, () => {
            this.createTextBubble(this.player, "I'm so sorry\nabout that Abby…", 3, false, () => {
            this.createTextBubble(this.abby, "It's fine,\nI just miss playing with my dad really.", 3, true, () => {
            this.createTextBubble(this.abby, "I can barely\nconnect with him nowadays, he's just so grumpy.", 3, true, () => {
            this.createTextBubble(this.abby, "Wait, I just had an idea! My dad\nsaid no music IN the house...", 3, true, () => {
            this.createTextBubble(this.abby, "but what if we played something OUTSIDE…?", 3, true, () => {
            this.createTextBubble(this.player, "I'm down,\nwhat would we--", 3, false, () => {
            this.createTextBubble(this.abby, "I know exactly what we should play!!", 3, true, () => {
            this.createTextBubble(this.abby, "He'll have to come out for his legendary solo on this song…", 3, true, () => {
            this.createTextBubble(this.abby, "I know he misses it deep down!", 3, true, () => {
            this.createTextBubble(this.player, "Let's do this.", 3, false, () => {
                cutscene = false;
                ui.cinematicViewExit();
                this.camera.startFollow(this.player, true, 0.25, 0.25);
                
                // Temporary Transition
                // Wait 1 second
                this.time.delayedCall(1000, () => {
                    this.nigel.setAlpha(1);
                    this.nigel.flipX = true;
                    this.nigel.x = centerX/2 + this.tortoiseHousex + 40*rescale;
                    this.cutsceneThree();
                });

            }); }); }); }); }); }); }); }); }); }); }); }); }); }); }); }); }); }); }); }); }); }});
                
        }}); }); }); }); }); }); }); });
    }

    cutsceneThree() {
        this.player.setAlpha(1);
        this.player.x = this.abby.x - 30*rescale;
        cutscene = true;
        cutsceneNum = 3;
        ui.cinematicViewEnter();
        this.player.anims.play('agnes_idle');

        this.camera.startFollow(this.abby, true, 0.25, 0.25);

        this.time.delayedCall(700, () => {
            this.createTextBubble(this.nigel, "You both play so well,", 3, true, () => {
            this.createTextBubble(this.nigel, "it felt like the band was back together!", 3, true, () => {
            this.createTextBubble(this.nigel, "I just had to play my solo!", 3, true, () => {
            this.createTextBubble(this.abby, "I knew you'd come out Pa, I just kne--", 3, true, () => {
            this.createTextBubble(this.nigel, "But it still hurts, don't get me wrong…", 3, true, () => {
            this.createTextBubble(this.nigel, "I just miss your mother so much, Abby.", 3, true, () => {
            this.createTextBubble(this.abby, "I know Pa, but you can't just give up music…", 3, true, () => {
            this.createTextBubble(this.abby, "It will just take some time to get back into, that's all!", 3, true, () => {
            this.createTextBubble(this.nigel, "Maybe you're right… I don't know…", 3, true, () => {
            this.createTextBubble(this.nigel, "I'm gonna go back inside.", 3, true, () => {
            this.nigel.flipX = false;
            this.nigel.anims.play('nigel_walk');
            //tween nigel to the door
            this.tweens.add({
                targets: this.nigel,
                x: this.nigel.x + 20*rescale,
                duration: 1500,
                ease: 'Linear',
                onComplete: () => {
                    this.nigel.anims.play('nigel_idle');
                    // fade nigels alpha
                    this.tweens.add({
                        targets: this.nigel,
                        alpha: 0,
                        duration: 1000,
                        ease: 'Linear',
                    });
            this.createTextBubble(this.abby, "Well, thank you so much for playing Agnes.", 3, true, () => {
            this.createTextBubble(this.abby, "I appreciate it a lot. I think we sparked some change in my dad,", 3, true, () => {
            this.createTextBubble(this.abby, "which is all I could ask for.", 3, true, () => {
            this.createTextBubble(this.player, "No problem at all, that was really fun!!", 3, false, () => {
            this.createTextBubble(this.player, "We should play again sometime…", 3, false, () => {
            this.createTextBubble(this.abby, "I'd love to!", 3, true, () => {
            this.createTextBubble(this.player, "Well, I better be going now,", 3, false, () => {
            this.createTextBubble(this.player, "I really need to find my mom.", 3, false, () => {
            this.createTextBubble(this.abby, "See ya! Hope you find your mom!", 3, true, () => {
                cutscene = false;
                ui.cinematicViewExit();
                this.camera.startFollow(this.player, true, 0.25, 0.25);
        }); }); }); }); }); }); }); }); }); }}); }); }); }); }); }); }); }); }); }); }); });
    }

    cutsceneFour() {
        this.shadow.x = this.tunnelBack.x - 50*rescale;
        this.shadow.anims.play('shadow_idle');
        this.shadow.flipX = true;
        this.shadow.setDepth(1.3);

        this.player.setAlpha(1);
        this.player.x = this.tunnelBack.x - 130*rescale;
        // set camera position to this.tunnelBack.x - 85.5*rescale
        this.cameraPointCave = this.add.circle(this.tunnelBack.x - 85.5*rescale, this.player.y, 1, 0x000000, 0).setOrigin(0.5);
        this.camera.startFollow(this.cameraPointCave, true, 0.25, 0.25);

        cutscene = true;
        cutsceneNum = 4;
        ui.cinematicViewEnter();
        this.player.anims.play('agnes_idle');

        this.time.delayedCall(1500, () => {
            // flip shadow, tween shadow to the right
            this.shadow.flipX = false;
            this.shadow.anims.play('shadow_walk');
            this.tweens.add({
                targets: this.shadow,
                x: this.shadow.x + 100*rescale,
                duration: 1000,
                ease: 'Linear',
                onComplete: () => {
                    this.shadow.setAlpha(0);
                    this.player.anims.play('agnes_walk');
                    // tween player to the right
                    this.tweens.add({
                        targets: this.player,
                        x: this.player.x + 10*rescale,
                        duration: 500,
                        ease: 'Linear',
                        onComplete: () => {
                            this.player.anims.play('agnes_idle');
                            this.player.flipX = true;
                            this.cutsceneFour2();
                        }
                    });
                }
            });
        });
    }

    cutsceneFour2() {
        // Create a rectangular wall on the left
        this.wall = this.add.rectangle(this.player.x - 90*rescale, h, 10*rescale, 100*rescale, 0x000000, 0).setOrigin(0.5, 1).setDepth(2);
        this.physics.add.existing(this.wall, true);
        this.physics.add.collider(this.player, this.wall);

        this.lamby.setAlpha(1);
        this.lamby.x = this.player.x - 100*rescale;
        this.lamby.flipX = false;
        this.lamby.anims.play('lamby_walk');

        // tween lamby to the right
        this.tweens.add({
            targets: this.lamby,
            x: this.player.x - 40*rescale,
            duration: 1000,
            ease: 'Linear',
            onComplete: () => {
                this.lamby.anims.play('lamby_idle');
                this.createTextBubble(this.lamby, "Agnes! Please don't go into that tunnel!", 3, true, () => {
                this.createTextBubble(this.player, "Why?", 3, true, () => {
                this.createTextBubble(this.lamby, "Well… it's uh… DANGEROUS!!", 3, true, () => {
                this.createTextBubble(this.player, "You don't sound too sure, Lamby…", 3, true, () => {
                this.createTextBubble(this.player, "I have to go in, I think Mom is in there.", 3, true, () => {
                this.createTextBubble(this.lamby, "Well if you're gonna be stubborn,", 3, true, () => {
                this.createTextBubble(this.lamby, "then at least follow this advice:", 3, true, () => {
                this.createTextBubble(this.lamby, "Close your eyes everytime you see the shadow.", 3, true, () => {
                this.createTextBubble(this.player, "What? Why? That sounds silly.", 3, true, () => {
                this.createTextBubble(this.lamby, "JUST DO IT.", 3, true, () => {
                    cutscene = false;
                    ui.cinematicViewExit();
                }); }); }); }); }); }); }); }); }); });
            }
        });
    }

    cutsceneFive() {
        this.player.setAlpha(1);
        this.player.x = this.tunnelBack2.x - 30*rescale;
        cutscene = true;
        cutsceneNum = 5;
        ui.cinematicViewEnter();
        this.player.anims.play('agnes_walk');

        // set camera position to this.tunnelBack.x - 85.5*rescale
        this.cameraPointCave2 = this.add.circle(this.tunnelBack2.x + 85.5*rescale, this.player.y, 1, 0x000000, 0).setOrigin(0.5);
        this.camera.startFollow(this.cameraPointCave2, true, 0.25, 0.25);

        // tween player to the right
        this.tweens.add({
            targets: this.player,
            x: this.tunnelBack2.x + 40*rescale,
            duration: 1000,
            ease: 'Linear',
            onComplete: () => {
                this.player.anims.play('agnes_idle');
                cutscene = false;
                ui.cinematicViewExit();
                // set Camera bounds
                this.camera.setBounds(this.tunnelBack2.x - this.tunnelBack2.width*2.36, 0, this.mapLength, h + 9*rescale);
                this.camera.startFollow(this.player, true, 0.25, 0.25);
            }
        });
    }

    cutsceneSix() {
        this.player.setAlpha(1);
        this.lamby.setAlpha(0);
        this.lamby.x = this.tunnelBack2.x + 90*rescale;
        this.player.x = this.tunnelBack2.x + 210*rescale;
        cutscene = true;
        cutsceneNum = 6;
        ui.cinematicViewEnter();
        this.player.anims.play('agnes_idle');
        // set camera position to this.tunnelBack.x - 85.5*rescale
        this.cameraPointCave3 = this.add.circle(this.player.x, this.player.y, 1, 0x000000, 0).setOrigin(0.5);
        this.camera.startFollow(this.cameraPointCave3, true, 0.25, 0.25);

        this.yes = this.add.text(this.momLump.x - 135*rescale, centerY, 'Yes', { fontFamily: 'mxfont', fontSize: 20*rescale }).setOrigin(0.5).setAlpha(0);
        this.no = this.add.text(this.momLump.x - 35*rescale, centerY, 'No', { fontFamily: 'mxfont', fontSize: 20*rescale }).setOrigin(0.5).setAlpha(0);

        // Wait 2 seconds
        this.time.delayedCall(2000, () => {
            this.createTextBubble(this.lamby, "Don't go near that lump of snow Agnes.", 3, true, () => {
            this.createTextBubble(this.player, "Why?", 3, false, () => {
            this.createTextBubble(this.lamby, "It'll only bring you pain.", 3, true, () => {
            this.createTextBubble(this.player, "I have to know what it is.", 3, false, () => {
            this.createTextBubble(this.lamby, "Do you really want to know?", 3, true, () => {
                // fade in yes and no
                this.tweens.add({
                    targets: [this.yes, this.no],
                    alpha: 1,
                    duration: 1000,
                    ease: 'Linear',
                    onComplete: () => {
                        this.yes.setInteractive();
                        this.no.setInteractive();

                        // On hover, increase font size
                        this.yes.on('pointerover', () => {
                            this.yes.setFontSize(22*rescale);
                        });
                        this.no.on('pointerover', () => {
                            this.no.setFontSize(22*rescale);
                        });

                        // On hover out, decrease font size
                        this.yes.on('pointerout', () => {
                            this.yes.setFontSize(20*rescale);
                        });
                        this.no.on('pointerout', () => {
                            this.no.setFontSize(20*rescale);
                        });

                        // When no is clicked, restart the game
                        this.no.on('pointerdown', () => {
                            this.scene.restart();
                        });

                        this.yes.on('pointerdown', () => {
                            this.no.disableInteractive();
                            this.yes.disableInteractive();
                            this.no.setAlpha(0);
                            this.yes.setAlpha(0);
                            this.player.anims.play('agnes_walk');
                            // tween player to the right
                            this.tweens.add({
                                targets: this.player,
                                x: this.momLump.x,
                                duration: 2000,
                                ease: 'Linear',
                                onComplete: () => {
                                    this.player.anims.play('agnes_idle');
                                    this.createTextBubble(this.lamby, "The End.", 3, true, () => {
                                    
                                    });
                                }
                            });
                        });

                    }
                });

            }); }); }); }); });
        });
    }
}