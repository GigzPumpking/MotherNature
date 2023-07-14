class ButtonR extends Button {
    constructor(scene, x, y, texture, scale, callback) {
        super(scene, x, y, texture, scale, callback);
        this.initialScale = scale;
    }

    pointerOn() {
        this.setScale(this.initialScale * 1.1);
    }

    pointerOut() {
        this.setScale(this.initialScale);
    }
}