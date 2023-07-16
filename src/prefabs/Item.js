class Item extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, scale) {
        super(scene, x, y, texture, frame, scale);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scene = scene;
        this.scale = scale;

        this.body.setCollideWorldBounds(true);
        this.body.setGravityY(400);
        this.body.setDragX(1000);
    }

    update() {
        
    }
}