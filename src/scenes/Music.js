class Music extends Phaser.Scene {
    constructor() {
        super({ key: 'musicScene' })
    }

    create() {
        // Create background
        this.background = this.add.image(0, 0, 'guitarBG').setOrigin(0, 0).setScale(rescale);

        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        prevScene = play;
        currScene = mus;

        // Create a circle in the center of the screen
        this.circle = this.add.image(centerX, centerY, 'circle').setScale(rescale);

        // Add a cigbox sprite to the edge of the circle
        this.slice = this.add.sprite(centerX, centerY, 'slice').setScale(rescale).setOrigin(0.5, 0.05);
        this.slice.flipY = true;

        this.agnes = new RotatingObject(this, centerX + 40*rescale, centerY, 'agnes', 0, rescale, 40*rescale, 0, 0.01);

        // Create a bar to show the player's progress
        this.redBar = this.add.image(w - 20*rescale, centerY, 'red_bar').setScale(rescale);
        this.greenBar = this.add.image(w - 20*rescale, h - 11*rescale, 'green_bar').setScale(rescale).setOrigin(0.5, 1);
        this.greenBar.displayHeight = 0;

        // Create dad head to mark the end of the green bar
        this.dadHead = this.add.image(w - 20*rescale, centerY, 'dad_head').setScale(rescale);

    }

    update() {
        this.dadHead.y = this.greenBar.y - this.greenBar.displayHeight;

        var x = 40*rescale * Math.sin(Math.PI * 2 * this.slice.rotation) + centerX;
        var y = 40*rescale * Math.cos(Math.PI * 2 * this.slice.rotation) + centerY;

        // If this.agnes is touching the slice, increase the green bar
        if (this.agnes.x > x - 50 && this.agnes.x < x + 50 && this.agnes.y > y - 50 && this.agnes.y < y + 50) {
            if (this.greenBar.displayHeight < this.redBar.displayHeight) this.greenBar.displayHeight += 0.5;
        } else if (!(this.agnes.x > x - 100 && this.agnes.x < x + 100 && this.agnes.y > y - 100 && this.agnes.y < y + 100)) {
            if (this.greenBar.displayHeight > 0) this.greenBar.displayHeight -= 0.5;
        }

        this.slice.rotation += 0.01;

        if (this.keyA.isDown) {
            this.agnes.speed = -0.01;
            this.agnes.update();
        }

        if (this.keyD.isDown) {
            this.agnes.speed = 0.01;
            this.agnes.update();
        }
    }
}
