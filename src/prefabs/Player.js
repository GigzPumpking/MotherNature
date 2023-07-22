class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, scale) {
        super(scene, x, y, texture, frame, scale);

        // Player Object
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scene = scene;
        this.scale = scale;

        this.body.setCollideWorldBounds(true);
        this.body.setGravityY(400);
        this.body.setDragX(1000);

        this.playerSpeed = 200;
        this.isGrounded = false;

        this.keyW = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keySPACE = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        this.sideScrollerMovement();
        this.jumpUpdate();
    }

    sideScrollerMovement() {
        if (this.keyA.isDown) {
            this.body.setVelocityX(-this.playerSpeed);
            this.flipX = true;
        } else if (this.keyD.isDown) {
            this.body.setVelocityX(this.playerSpeed);
            this.flipX = false;
        } else {
            this.body.setVelocityX(0);
        }
    }

    jumpUpdate() {
        this.isGrounded = this.body.blocked.down;

        if ((this.keyW.isDown || this.keySPACE.isDown) && this.isGrounded) {
            this.body.setVelocityY(-200);
        }
    }
}