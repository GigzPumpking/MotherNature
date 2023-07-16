class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create() {
        inventory = [];
        
        // Add white rectangle to cover screen
        this.add.rectangle(centerX, centerY, w, h, 0xFFFFFF).setAlpha(0.5);

        this.camera = this.cameras.main;
        cameraSettings(this.camera);

        // Play Music

        // Current and Previous Scene
        currScene = play;
        prevScene = title;

        this.scene.launch(ui);

        // Add Player
        this.player = new Player(this, centerX, centerY, 'silhouette', 0, rescale/2);

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
    }

    update() {
        this.camera.setAlpha(brightness);
        updateCurrPrev(play, title);

        // Update Player
        this.player.update();
    }

}