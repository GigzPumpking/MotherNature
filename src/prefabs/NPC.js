class NPC extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, scale, player) {
        super(scene, x, y, texture, frame, scale);

        // NPC Object
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scene = scene;
        this.scale = scale;

        this.body.setDragX(1000);
        
        this.player = player;

        this.texture = texture;

        this.setInteractive();

        this.conversation = "";
        this.talkedTo = false;

        // on click, start conversation
        this.on('pointerdown', () => {
            if (this.player != null && !cutscene && !this.talkedTo) {
                this.startConversation(this);
            }
        });
    }

    update() {
        if (this.player != null) this.followPlayer();
    }

    followPlayer() {
        if (this.x < this.player.x + this.player.width) {
            this.flipX = false;
        } else if (this.x > this.player.x - this.player.width) {
            this.flipX = true;
        }

        /*if (this.x < this.player.x - 25*rescale) {
            this.body.setVelocityX(this.player.playerSpeed*0.9);
            this.flipX = false;
            if (this.anims.currentAnim != null && this.anims.currentAnim.key != 'lamby_walk') {
                this.anims.play('lamby_walk', true);
            }
        } else if (this.x > this.player.x + 25*rescale) {
            this.body.setVelocityX(-this.player.playerSpeed*0.9);
            this.flipX = true;
            if (this.anims.currentAnim != null && this.anims.currentAnim.key != 'lamby_walk') {
                this.anims.play('lamby_walk', true);
            }
        } else {
            this.body.setVelocityX(0);
            this.anims.play('lamby_idle', true);
        }*/
    }

    startConversation(speaker) {
        if (speaker == play.lamby && cutsceneNum == 1) {
            this.conversation = "Having second thoughts?"
        }
        play.createTextBubble(speaker, this.conversation, 3, true, () => {
            speaker.talkedTo = false;
        });

        this.talkedTo = true;
    }
}