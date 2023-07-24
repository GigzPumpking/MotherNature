class TextBubble extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, scale, fulltext, depth, flipX, callback) {
        super(scene, x, y, texture, frame, scale);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scene = scene;
        this.scale = scale;
        this.originalScale = scale;
        this.depth = depth;
        this.callback = callback;
        this.flipX = flipX;

        this.timer = 0;
        this.cooldown = 1;

        // set origin
        this.setOrigin(1.2, 1);

        this.fulltext = fulltext;
        this.destroyed = false;

        if (flipX) this.textX = this.x - 71*rescale;
        else this.textX = this.x - 73.5*rescale;

        this.speech = scene.add.text(this.textX, this.y - 27.5*rescale, '', { fontFamily: 'mxfont', fontSize: 6.7*rescale, align: 'left', wordWrap: { width: 56.5*rescale, useAdvancedWrap: false } }).setDepth(depth+0.5);

        // make Interactive
        this.setInteractive();

        // On click, delete
        this.on('pointerdown', () => {
            if (this.speech.text.length < this.fulltext.length) {
                this.speech.text = this.fulltext;
            } else {
                this.delete(this.status);
            }
        });

        conversations.push(this);
    }

    update() {
        if (!this.destroyed) {
            if (this.timer >= this.cooldown) {
                if (this.speech.text.length < this.fulltext.length) {
                    this.speech.text += this.fulltext[this.speech.text.length];
                    if (this.speech.text[this.speech.text.length-1] === '.' || this.speech.text[this.speech.text.length-1] === '?' || this.speech.text[this.speech.text.length-1] === '!' || this.speech.text[this.speech.text.length-1] === ',' && this.fulltext[this.speech.text.length] === ' ') {
                        this.cooldown = 7.5;
                    } else {
                        this.cooldown = 1;
                    }
                    this.timer = 0;
                } 
                this.timer = 0;
            } else {
                this.timer+= 0.5;
            }
        }
    }

    delete() {
        this.destroyed = true;
        conversations.splice(conversations.indexOf(this), 1);
        this.callback();
        this.speech.destroy();
        this.destroy();
    }

}