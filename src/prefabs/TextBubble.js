class TextBubble extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, scale, fulltext, depth, status, flipX, callback) {
        super(scene, x, y, texture, frame, scale);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scene = scene;
        this.scale = scale;
        this.originalScale = scale;
        this.depth = depth;
        this.callback = callback;
        this.status = status;
        this.flipX = flipX;

        this.timer = 0;
        this.cooldown = 1;

        // set origin
        this.setOrigin(1.2, 1);

        this.fulltext = fulltext;
        this.destroyed = false;

        this.speech = scene.add.text(this.x - 71*rescale, this.y - 27.5*rescale, '', { fontFamily: 'mxfont', fontSize: 6.7*rescale, align: 'left', wordWrap: { width: 56.5*rescale, useAdvancedWrap: false } }).setDepth(depth+0.5);

        conversations.push(this);
    }

    update() {
        if (this.timer >= this.cooldown) {
            if (this.speech.text.length < this.fulltext.length) {
                this.speech.text += this.fulltext[this.speech.text.length];
                if (this.speech.text[this.speech.text.length-1] === '.' || this.speech.text[this.speech.text.length-1] === '?' || this.speech.text[this.speech.text.length-1] === '!' || this.speech.text[this.speech.text.length-1] === ',' && this.fulltext[this.speech.text.length] === ' ') {
                    this.cooldown = 7.5;
                } else {
                    this.cooldown = 1;
                }
                this.timer = 0;
            } else {
                // wait 1 second
                if (!this.destroyed) {
                    this.destroyed = true;
                    this.delete(this.status);
                }
            }
            this.timer = 0;
        } else {
            this.timer+= 0.5;
        }
    }

    delete(status) {
        if (status === 1) {
            this.scene.time.delayedCall(2000, () => {
                conversations.splice(conversations.indexOf(this), 1);
                // fade out
                this.scene.tweens.add({
                    targets: [this.speech, this],
                    alpha: 0,
                    duration: 300,
                    ease: 'Linear',
                    onComplete: () => {
                        this.callback();
                        this.speech.destroy();
                        this.destroy();
                    }
                });
            }, null, this);
        } else if (status === 2) {
            this.scene.time.delayedCall(1000, () => {
                conversations.splice(conversations.indexOf(this), 1);
                this.callback();
                this.speech.destroy();
                this.destroy();
            }, null, this);
        } else {
            this.scene.time.delayedCall(300, () => {
                conversations.splice(conversations.indexOf(this), 1);
                this.callback();
                this.speech.destroy();
                this.destroy();
            }, null, this);
        }
    }

}