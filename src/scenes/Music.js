class Music extends Phaser.Scene {
    constructor() {
        super({ key: 'musicScene' })
    }

    create() {
        music[2].play();
        music[2].setLoop(true);

        // Create background
        this.background = this.add.image(0, 0, 'guitarBG').setOrigin(0, 0).setScale(rescale);

        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        
        prevScene = play;
        currScene = mus;

        // Create a circle in the center of the screen
        this.circle = this.add.image(centerX, centerY + 21.5*rescale, 'circle').setScale(rescale);

        // Add a cigbox sprite to the edge of the circle
        this.slice = this.add.sprite(this.circle.x, this.circle.y, 'slice').setScale(rescale).setOrigin(0.5, 0.05);
        this.slice.flipY = true;

        this.abby = this.add.sprite(centerX, centerY + 21.5*rescale, 'abby', 0).setScale(rescale).setOrigin(0.5, 0.75);
        this.abby.anims.play('abby_idle');

        this.agnes = new RotatingObject(this, centerX + 40*rescale, centerY + 21.5*rescale, 'agnes', 0, rescale, 40*rescale, 0, 0.01).setOrigin(0.5, 1);
        this.agnes.anims.play('agnes_idleM');

        this.nigel = this.add.sprite(centerX + 28.5*rescale, 15.4*rescale, 'nigel_shadow', 0).setScale(rescale).setAlpha(0);

        // Create a bar to show the player's progress
        this.redBar = this.add.image(w - 25*rescale, centerY + 2.25*rescale, 'red_bar').setScale(rescale);
        this.greenBar = this.add.image(w - 25*rescale, h - 8.75*rescale, 'green_bar').setScale(rescale).setOrigin(0.5, 1);
        this.greenBar.displayHeight = 0;

        // Create dad head to mark the end of the green bar
        this.dadHead = this.add.image(w - 25*rescale, centerY + 2.75*rescale, 'dad_head').setScale(rescale);

        this.agnes.on('animationupdate', this.onAnimationUpdate, this);
    }

    update() {
        this.nigel.setAlpha(this.greenBar.displayHeight / this.redBar.displayHeight);
        this.dadHead.y = this.greenBar.y - this.greenBar.displayHeight;

        this.slice.rotation += 0.01;

        var xy = circleXY(this.slice.x, this.slice.y, 40*rescale, this.slice.rotation);

        // If this.agnes is touching the slice, increase the green bar
        if (this.progressUpdateBool(xy[0], xy[1], 50, 50, 50, 50)) {
            if (this.greenBar.displayHeight < this.redBar.displayHeight) this.greenBar.displayHeight += 0.5;
        } else if (this.progressUpdateBool(xy[0], xy[1], 100, 100, 100, 100)) {
            if (this.greenBar.displayHeight < this.redBar.displayHeight) this.greenBar.displayHeight += 0.25;
        } else {
            if (this.greenBar.displayHeight > 0) this.greenBar.displayHeight -= 0.5;
        }

        if (this.greenBar.displayHeight >= this.redBar.displayHeight) {
            this.scene.resume(play);
            play.cutsceneThree();
            music[2].stop();
            this.scene.stop();
        }

        if (this.keyA.isDown) {
            this.agnes.speed = -0.01;
            this.agnes.update();
            if (this.agnes.sin > 0) {
                this.agnes.flipX = false;
            }
            else this.agnes.flipX = true;
        }

        if (this.keyD.isDown) {
            this.agnes.speed = 0.01;
            this.agnes.update();
            if (this.agnes.sin > 0) this.agnes.flipX = true;
            else this.agnes.flipX = false;
        }
    }

    progressUpdateBool(x, y, x1, x2, y1, y2) {
        return (this.agnes.x > x - x1 && this.agnes.x < x + x2 && this.agnes.y > y - y1 && this.agnes.y < y + y2);
    }

    onAnimationUpdate(animation, frame) {
        if (animation.key === 'agnes_idleM') {
            if (frame.index === 1) {
                pauseForDuration(this, animation, 400);
            } else if (frame.index === 3) {
                pauseForDuration(this, animation, 200);
            } else {
                pauseForDuration(this, animation, 100);
            }
        }
    }
}
