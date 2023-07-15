class Music extends Phaser.Scene {
    constructor() {
        super({ key: 'musicScene' })
    }

    create() {
        prevScene = play;
        currScene = mus;

        // Create a circle in the center of the screen
        this.circle = this.add.circle(centerX, centerY, 50*rescale, 0xFFFFFF, 0.5);

        // Add a cigbox sprite to the edge of the circle
        this.cigbox = this.add.sprite(centerX + 40*rescale, centerY, 'cigbox').setScale(rescale);

    }

    update() {

    }
}
