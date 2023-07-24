class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, scale) {
        super(scene, x, y, texture, frame, scale);

        // Player Object
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scene = scene;
        this.scale = scale;

        this.body.setCollideWorldBounds(true);
        this.body.setDragX(1000);

        this.playerSpeed = 200;

        this.keyW = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    update() {

        if (!this.sideScrollerMovement()) {
            play.player.anims.play('agnes_idle', true);
        };
    }

    sideScrollerMovement() {
        if (!cutscene) {
            if (this.keyA.isDown) {
                this.body.setVelocityX(-this.playerSpeed);
                this.flipX = true;
                play.player.anims.play('agnes_walk', true);
                return true;
            } else if (this.keyD.isDown) {
                this.body.setVelocityX(this.playerSpeed);
                this.flipX = false;
                play.player.anims.play('agnes_walk', true);
                return true;
            } 
        }

        return false;
    }
}