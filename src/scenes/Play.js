class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create() {
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
        this.player = new Player(this, centerX, centerY, 'PLAYER');
    }

    update() {
        this.camera.setAlpha(brightness);
        updateCurrPrev(play, title);

        // Update Player
        this.player.update();
    }

}