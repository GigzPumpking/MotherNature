class NPC extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, scale, followingPlayer, player) {
        super(scene, x, y, texture, frame, scale);

        // NPC Object
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scene = scene;
        this.scale = scale;

        this.body.setCollideWorldBounds(true);
        this.body.setDragX(1000);

        this.followingPlayer = followingPlayer;
        this.player = player;

        this.texture = texture;
    }

    update() {
        if (this.followingPlayer) {
            this.followPlayer();
        }
    }

    followPlayer() {
        if (this.x < this.player.x - 25*rescale) {
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
        }
    }
}