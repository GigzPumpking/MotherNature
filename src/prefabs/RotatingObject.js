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
        var cos = Math.cos(this.t);
        var sin = Math.sin(this.t);

        this.x = centerX + this.r * cos;
        this.y = centerY + this.r * sin;

        if (sin > 0) this.flipX = true;
        else this.flipX = false;

        this.t += this.speed;
    }
}