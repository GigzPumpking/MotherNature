class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create() {
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
        if (!cutscene) this.camera.startFollow(this.player, true, 0.25, 0.25);

        updateCurrPrev(play, title);

        // Update characters
        if (!cutscene) {
            this.player.update();
            this.lamby.update();
        }

        for (let i = 0; i < conversations.length; i++) {
            conversations[i].update();
        }

        if (!cutscene && this.player.x > centerX + 450*rescale && cutsceneNum === 1) {
            this.cutsceneTwo();
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
        this.tortoiseHouse = this.add.sprite(centerX + 600*rescale, centerY + 5*rescale, 'tortoiseHouse').setScale(rescale);
        this.tortoiseHouseBase = this.add.sprite(centerX + 600*rescale, centerY + 5*rescale, 'tortoiseHouseBase').setScale(rescale);
        this.tortoiseHousePillar = this.add.sprite(centerX + 600*rescale, centerY + 5*rescale, 'tortoiseHousePillars').setScale(rescale);
        this.tortoiseHouseSnow = this.add.sprite(centerX + 600*rescale, centerY - 20*rescale, 'tortoiseHouseSnow').setScale(rescale);
        this.tortoiseHouseStairs = this.add.sprite(centerX + 600*rescale, centerY + 50*rescale, 'tortoiseHouseStairs').setScale(rescale);
    }

    createCharacters() {
        // Add Player
        this.player = new Player(this, centerX - 58*rescale, 102*rescale, 'agnes', 0, rescale).setOrigin(0.5, 0).setDepth(1).setAlpha(0);
        this.camera.startFollow(this.player, true, 0.25, 0.25);

        // Add Abby
        this.abby = new NPC(this, centerX/2 + 600*rescale, centerY + 65*rescale, 'abby', 0, rescale, this.player).setOrigin(0.5, 1);
        this.abby.flipX = true;
        this.abby.anims.play('abby_idle');

        this.abbyGuitar = this.add.sprite(this.abby.x - 2*rescale, this.abby.y + 2*rescale, 'agnes_guitar').setScale(rescale).setOrigin(0.5, 1).setDepth(1);

        // Add Nigel
        this.nigel = new NPC(this, centerX/2 + 640*rescale, centerY + 30*rescale, 'tortoise', 0, rescale, this.player).setOrigin(0.5, 0);
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

    createTextBubble(speaker, text, depth, status, flipX, callback) {
        let x, y;
        if (speaker === this.player) {
            if (flipX) x = this.player.x;
            else x = this.player.x + 90*rescale;
            y = this.player.y + 9.5*rescale;
        } else if (speaker === this.lamby) {
            if (flipX) x = this.lamby.x + 92*rescale;
            else x = this.lamby.x;
            y = this.lamby.y - 20*rescale;
        } else if (speaker === this.abby) {
            if (flipX) x = this.abby.x;
            else x = this.abby.x + 92*rescale;
            y = this.abby.y - 20*rescale;
        } else if (speaker === this.nigel) {
            if (flipX) x = this.nigel.x;
            else x = this.nigel.x + 92*rescale;
            y = this.nigel.y;
        }

        new TextBubble(this, x, y, 'textBubble', 0, rescale, text, depth, status, flipX, () => {
            callback();
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

        this.blackScreenFade(0, 3000, () => {
        this.scene1.on('pointerdown', () => {
            this.scene1.disableInteractive();
            this.blackScreenFade(1, 1000, () => {
            this.scene1.setAlpha(0);
            this.scene2 = this.add.sprite(centerX, centerY, 'Scene2').setScale(rescale).setOrigin(0.5).setDepth(1.5).setInteractive();
            this.blackScreenFade(0, 1000, () => {
        this.scene2.on('pointerdown', () => {
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
        this.player.y -= 2*rescale;
        this.player.anims.play('agnes_trip');

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
        this.player.y += 2*rescale;
        this.player.anims.play('agnes_idle');
        this.lamby.setAlpha(1);
        this.snowlump.setDepth(1);

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
                            this.createTextBubble(this.lamby, "Come back inside. ", 3, true, () => {
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
                                    this.shadow.destroy();
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
        cutscene = true;
        cutsceneNum = 2;
        ui.cinematicViewEnter();
        this.player.anims.play('agnes_idle');
        // pan camera to Abby
        this.camera.startFollow(this.abby, true, 0.25, 0.25);

        this.time.delayedCall(700, () => {
            this.createTextBubble(this.abby, "This guitar is awesome!!", 3, false, () => {
            this.createTextBubble(this.abby, "I can't believe it just fell out of the sky! Hehehe...", 3, false, () => {
            this.createTextBubble(this.nigel, "Throw that #%!@ out!", 3, false, () => {
            this.createTextBubble(this.nigel, "It's just another piece of trash on this planet!", 3, false, () => {
            this.createTextBubble(this.abby, "Oh Pa, please don't be so grouchy…", 3, false, () => {
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
    
                
                
        }}); }); }); }); }); }); }); });
    }
}