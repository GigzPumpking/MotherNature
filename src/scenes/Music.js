class Music extends Phaser.Scene {
    constructor() {
        super({ key: 'musicScene' })
    }

    create() {
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        prevScene = play;
        currScene = mus;

        // Create a circle in the center of the screen
        this.circle = this.add.circle(centerX, centerY, 50*rescale, 0xFFFFFF, 0.5);

        // Add a cigbox sprite to the edge of the circle
        this.cigbox = new RotatingObject(this, centerX + 40*rescale, centerY, 'cigbox', 0, rescale, 40*rescale, Math.PI, 0.01);

        this.cigbox2 = new RotatingObject(this, centerX + 40*rescale, centerY, 'cigbox', 0, rescale, 40*rescale, 0, 0.01);

    }

    update() {
        this.cigbox.update();

        if (this.keyA.isDown) {
            this.cigbox2.speed = -0.01;
            this.cigbox2.update();
        }

        if (this.keyD.isDown) {
            this.cigbox2.speed = 0.01;
            this.cigbox2.update();
        }
    }
}
