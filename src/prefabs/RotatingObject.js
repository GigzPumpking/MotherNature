class RotatingObject extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, scale, r, t, speed) {
        super(scene, x, y, texture, frame, scale);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scene = scene;
        this.scale = scale;

        // Circular motion formula
        this.t = t;
        this.speed = speed;
        // r = distance from origin of circle
        this.r = r;
    }

    update() {
        this.x = centerX + this.r * Math.cos(this.t);
        this.y = centerY + this.r * Math.sin(this.t);

        this.t += this.speed;
    }
}