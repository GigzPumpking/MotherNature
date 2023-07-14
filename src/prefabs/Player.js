class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // Player Object
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scene = scene;

        this.body.setCollideWorldBounds(true);
        this.body.setGravityY(400);
        this.body.setDragX(1000);

        this.playerSpeed = 200;
        this.isGrounded = false;

        keyW = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    update() {
        this.sideScrollerMovement();
        this.jumpUpdate();
    }

    sideScrollerMovement() {
        if (keyA.isDown) {
            this.body.setVelocityX(-this.playerSpeed);
        } else if (keyD.isDown) {
            this.body.setVelocityX(this.playerSpeed);
        } else {
            this.body.setVelocityX(0);
        }
    }

    jumpUpdate() {
        this.isGrounded = this.body.blocked.down;

        if (keyW.isDown && this.isGrounded) {
            this.body.setVelocityY(-200);
        }
    }
}