class Inventory extends Phaser.Scene {
    constructor() {
        super({ key: 'inventoryScene' })
    }

    create() {
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        prevScene = currScene;
        currScene = inv;

        dimBG(this, 0.6);

        // Create the inventory menu
        //this.inventoryMenu = this.add.sprite(centerX, centerY, 'inventory').setScale(rescale);

        this.xOffset = centerX - 37.5*rescale;
        this.yOffset = centerY - rescale;
        this.gap = 25*rescale;

        // Add 4 blank rectangles to the scene to represent the inventory slots

        this.inventory1 = this.add.rectangle(this.xOffset, this.yOffset, 20*rescale, 20*rescale, 0xF3E5AB, 0.5);
        // this.add.sprite(this.xOffset, this.yOffset, 'inventoryBox').setScale(rescale);

        this.inventory2 = this.add.rectangle(this.xOffset + this.gap, this.yOffset, 20*rescale, 20*rescale, 0xF3E5AB, 0.5);
        //this.add.sprite(this.xOffset + this.gap, this.yOffset, 'inventoryBox').setScale(rescale);

        this.inventory3 = this.add.rectangle(this.xOffset + 2*this.gap, this.yOffset, 20*rescale, 20*rescale, 0xF3E5AB, 0.5);
        //this.add.sprite(this.xOffset + 2*this.gap, this.yOffset, 'inventoryBox').setScale(rescale);

        this.inventory4 = this.add.rectangle(this.xOffset + 3*this.gap, this.yOffset, 20*rescale, 20*rescale, 0xF3E5AB, 0.5);
        //this.add.sprite(this.xOffset + 3*this.gap, this.yOffset, 'inventoryBox').setScale(rescale);

        this.resume = new TextButton(this, centerX, centerY + 25*rescale, 'Resume', Object.assign({}, textConfig, {fontSize: 6*rescale}), () => {
            this.scene.resume(prevScene).resume(ui).stop();
        })
        /* new ButtonR(this, centerX + rescale/2, centerY + 15*rescale, 'resume', rescale, () => {
            this.scene.resume(prevScene).stop();
        }) */

        this.itemCreation(this.cigbox, 'cigbox', () => {});
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.scene.resume(prevScene).resume(ui).stop();
        }
    }

    itemCreation(object, name, callback) {
        if (inventory.includes(name)) {
            // Create the cigbox item using the inventory array
            let index = inventory.indexOf(name);
            object = new ButtonR(this, this.xOffset + this.gap*index, this.yOffset, inventory[index], rescale, callback);
        }
    }
}
