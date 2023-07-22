class NPC extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, scale, followingPlayer, player) {
        super(scene, x, y, texture, frame, scale);

        // NPC Object
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scene = scene;
        this.scale = scale;

        this.body.setCollideWorldBounds(true);
        this.body.setGravityY(400);
        this.body.setDragX(1000);

        this.followingPlayer = followingPlayer;
        this.player = player;
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
            //this.anims.play('lamby_walk', true);
            this.anims.play('lamby_idle', false);
        } else if (this.x > this.player.x + 25*rescale) {
            this.body.setVelocityX(-this.player.playerSpeed*0.9);
            this.flipX = true;
            //this.anims.play('lamby_walk', true);
            this.anims.play('lamby_idle', false);
        } else {
            this.body.setVelocityX(0);
            this.anims.play('lamby_idle', true);
        }
    }
}