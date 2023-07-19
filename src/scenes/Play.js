class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create() {
        inventory = [];

        map = this.add.tilemap('groundJSON');
        let tileset = map.addTilesetImage('groundTileset', 'groundTilesetImage');
        let groundLayer = map.createLayer('Ground', tileset, 0, 0);
        groundLayer.setScale(rescale);

        // set collision between player and groundLayer
        groundLayer.setCollisionByProperty({ Collision: true });


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
        this.player = new Player(this, centerX, centerY, 'silhouette', 0, rescale/2);
        this.physics.add.collider(this.player, groundLayer);

        // Add cigbox temp asset with gravity
        this.cigbox = new Item(this, centerX + 100, centerY, 'cigbox', 0, rescale);
        this.physics.add.collider(this.cigbox, groundLayer);

        // On collision, add cigbox to inventory
        this.physics.add.overlap(this.player, this.cigbox, () => {
            this.cigbox.destroy();
            inventory.push('cigbox');
        });

        this.cigbox2 = new Item(this, centerX + 200, centerY, 'cigbox', 0, rescale);
        this.physics.add.collider(this.cigbox2, groundLayer);

        // On collision, add cigbox to inventory
        this.physics.add.overlap(this.player, this.cigbox2, () => {
            this.cigbox2.destroy();
            inventory.push('cigbox');
        });
    }

    update() {
        this.camera.setAlpha(brightness);
        this.camera.startFollow(this.player, true, 0.25, 0.25);

        updateCurrPrev(play, title);

        // Update Player
        this.player.update();
    }

}