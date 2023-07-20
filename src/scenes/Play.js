class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create() {
        inventory = [];

        map = this.add.tilemap('groundJSON');
        let tileset = map.addTilesetImage('groundTileset', 'groundTilesetImage');

        for (let i = 0; centerX + i*240*rescale < map.widthInPixels * rescale; i++) {
            this.createTree(centerX + i*240*rescale, centerY + rescale*5, rescale, 'treestack');
        }
        
        let groundLayer = map.createLayer('Ground', tileset, 0, 0);
        groundLayer.setScale(rescale);

        this.house = this.add.sprite(centerX/2 - 20*rescale, centerY, 'house').setScale(rescale);
        this.snowlump = this.add.sprite(centerX/2 + 25*rescale, centerY + 50*rescale, 'snowlump').setScale(rescale);
        this.rock = this.add.sprite(centerX/2 + 60*rescale, centerY + 50*rescale, 'rock').setScale(rescale);

        // Tortoise House

        this.tortoiseHouse = this.add.sprite(centerX + 100*rescale, centerY + 5*rescale, 'tortoiseHouse').setScale(rescale);
        this.tortoiseHouseBase = this.add.sprite(centerX + 100*rescale, centerY + 5*rescale, 'tortoiseHouseBase').setScale(rescale);
        this.tortoiseHousePillar = this.add.sprite(centerX + 100*rescale, centerY + 5*rescale, 'tortoiseHousePillars').setScale(rescale);
        this.tortoiseHouseSnow = this.add.sprite(centerX + 100*rescale, centerY - 20*rescale, 'tortoiseHouseSnow').setScale(rescale);
        this.tortoiseHouseStairs = this.add.sprite(centerX + 100*rescale, centerY + 50*rescale, 'tortoiseHouseStairs').setScale(rescale);

        this.mapLength = map.widthInPixels * rescale;

        this.camera = this.cameras.main;
        cameraSettings(this.camera);
        this.camera.setBounds(0, 0, map.widthInPixels * rescale, map.heightInPixels * rescale);
        this.physics.world.setBounds(0, 0, map.widthInPixels * rescale, map.heightInPixels * rescale);

        // Play Music

        // Current and Previous Scene
        currScene = play;
        prevScene = title;

        this.scene.launch(ui);

        // Add Player
        this.player = new Player(this, centerX/2 - 20*rescale, centerY + 48.5*rescale, 'agnes', 0, rescale);

        // Add cigbox temp asset with gravity
        this.cigbox = new Item(this, centerX + 100, centerY, 'cigbox', 0, rescale);

        // On collision, add cigbox to inventory
        this.physics.add.overlap(this.player, this.cigbox, () => {
            this.cigbox.destroy();
            inventory.push('cigbox');
        });

        this.cigbox2 = new Item(this, centerX + 200, centerY, 'cigbox', 0, rescale);

        // On collision, add cigbox to inventory
        this.physics.add.overlap(this.player, this.cigbox2, () => {
            this.cigbox2.destroy();
            inventory.push('cigbox');
        });

        // Add invisible floor collision
        this.floor = this.add.rectangle(this.mapLength / 2, h, this.mapLength, 10*rescale, 0x000000, 0);
        this.physics.add.existing(this.floor, true);

        // Set collision for floor
        this.physics.add.collider(this.player, this.floor);
        this.physics.add.collider(this.cigbox, this.floor);
        this.physics.add.collider(this.cigbox2, this.floor);
    }

    update() {
        this.camera.startFollow(this.player, true, 0.25, 0.25);

        updateCurrPrev(play, title);

        // Update Player
        this.player.update();
    }

    createTree(x, y, scale, texture) {
        this.add.sprite(x, y, texture).setScale(scale);
    }

}