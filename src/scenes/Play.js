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

        this.cutsceneOne();

        this.scene.launch(ui);
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

        if (this.player.x > centerX + 600*rescale && !cutscenes[1]) {
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
        this.snowlump = this.add.sprite(centerX/2 + 25*rescale, centerY + 50*rescale, 'snowLump').setScale(rescale);
        this.rock = this.add.sprite(centerX/2 + 60*rescale, centerY + 50*rescale, 'rock').setScale(rescale);
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
        this.player = new Player(this, centerX/2, 102*rescale, 'agnes', 0, rescale).setOrigin(0.5, 0).setDepth(2);
        this.player.flipX = true;

        // Add Abby
        this.abby = new NPC(this, centerX/2 + 600*rescale, centerY + 65*rescale, 'abby', 0, rescale, false).setOrigin(0.5, 1);
        this.abby.flipX = true;
        this.abby.anims.play('abby_idle');

        // Add Tortoise
        this.tortoise = new NPC(this, centerX/2 + 700*rescale, centerY + 30*rescale, 'tortoise', 0, rescale, false).setOrigin(0.5, 0);
        this.tortoise.flipX = true;

        // Add Lamby

        this.lamby = new NPC(this, 35*rescale, 130*rescale, 'lamby', 0, rescale, false).setOrigin(0.5, 1);
        //this.lamby.flipX = true;
        this.lamby.anims.play('lamby_idle');

        this.shadow = new NPC(this, -15*rescale, 130*rescale, 'shadow', 0, rescale, false).setOrigin(0.5, 1).setDepth(3);
        this.shadow.anims.play('shadow_walk');

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
    }

    createTextBubble(speaker, text, depth, status, flipX, callback) {
        let x, y;
        if (speaker === this.player) {
            x = this.player.x + 90*rescale;
            y = this.player.y + 9.5*rescale;
        } else if (speaker === this.lamby) {
            x = this.lamby.x + 92*rescale;
            y = this.lamby.y - 20*rescale;
        }
        new TextBubble(this, x, y, 'textBubble', 0, rescale, text, depth, status, flipX, () => {
            callback();
        });
    }

    cutsceneOne() {
        cutscene = true;
        cutscenes[0] = true;

        this.blackScreen = this.add.rectangle(centerX, centerY, w, h + 20*rescale, 0x000000, 1).setOrigin(0.5).setDepth(4);

        this.time.delayedCall(700, () => {     
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
                            this.createTextBubble(this.player, "No, I have to find her. She could be hurt.",  3, true, () => {
                            this.time.delayedCall(1000, () => {
                            this.tweens.add({
                                targets: this.shadow,
                                x: w + 50*rescale,
                                duration: 1000,
                                ease: 'Linear',
                                onComplete: () => {
                                    this.shadow.destroy();
                            this.createTextBubble(this.player, "What was that?! Did you see that thing, Lamby?", 3, true, () => {
                            this.createTextBubble(this.lamby, "What in the world are you talking about?", 3, true, () => {
                            this.createTextBubble(this.lamby, "Jeez, that rock really messed you up, huh?", 3, true, () => {
                            this.createTextBubble(this.player, "You really didn't see that?", 3, true, () => {
                            this.createTextBubble(this.player, "Well, whatever, I just need to find mom.", 3, true, () => {
                            this.createTextBubble(this.lamby, "Uhhhh okay, but I really think you should just stay here.", 3, true, () => {
                            this.createTextBubble(this.lamby, "She said she's going to come back.", 3, true, () => {
                            this.createTextBubble(this.player, "I've waited too long, I have to try looking.", 3, true, () => {
                            this.createTextBubble(this.lamby, "Fine, I'll just wait here then because I know she'll be back.", 3, true, () => {
                            this.createTextBubble(this.player, "Okay then, bye Lamby…", 3, true, () => {
                                cutscene = false;
        
        }); }); }); }); }); }); }); }); }); }); }}); }); }); }); }); }); }); }); }); }}); }); }); });
    }

    cutsceneTwo() {
        cutscene = true;
        cutscenes[1] = true;
    }
}