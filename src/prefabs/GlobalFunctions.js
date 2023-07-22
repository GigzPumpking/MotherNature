function createBackButton(scene, stop, resume) {
    scene.backButton = new TextButton(scene, backX, backY, 'Back', textConfig, () => {
        scene.scene.stop(stop);
        scene.scene.resume(resume);
    });
    
    /* new ButtonR(scene, backX, backY, 'backButton', rescale, () => {
        scene.scene.stop(stop);
        scene.scene.resume(resume);
    }); */
}

function createOptionsButton(scene) {
    // Temporary Text Button, will be replaced with a sprite
    
    scene.optionsButton = new TextButton(scene, optionsX, optionsY, 'Options', textConfig, () => {
        scene.scene.pause(currScene).pause().launch('optionsScene');
    });

    /* new ButtonR(scene, optionsX, optionsY, 'optionsButton', rescale, () => {
        scene.scene.pause().launch('optionsScene');
    }); */
}

function createInventoryButton(scene) {
    // Temporary Text Button, will be replaced with a sprite
    
    scene.inventoryButton = new TextButton(scene, inventoryX, inventoryY, 'Inventory', textConfig, () => {
        scene.scene.pause(currScene).pause().launch('inventoryScene');
    });

    /* new ButtonR(scene, optionsX, optionsY, 'optionsButton', rescale, () => {
        scene.scene.pause().launch('optionsScene');
    }); */
}

function updateCurrPrev(curr, prev) {
    if (currScene != curr) currScene = curr;
    if (prevScene != prev) prevScene = prev;
}

function dimBG(scene, opacity) {
    scene.dimBG = scene.add.rectangle(0, 0, w, h, 0x000000, opacity).setOrigin(0, 0);
}

function jiggle(scene, element) {
    scene.tweens.add({
        targets: element,
        scaleX: element.scale - element.scale/20,
        scaleY: element.scale - element.scale/20,
        duration: 500,
        yoyo: true,
        repeat: -1
    });

    scene.tweens.add({
        targets: element,
        angle: 1,
        duration: 300,
        yoyo: true,
        ease: 'Sine.easeInOut',
        repeat: -1
    });
}

function cameraSettings(camera) {
    camera.setBounds(0, 0, w, h);
    camera.setZoom(1);
    camera.centerOn(centerX, centerY);
}

function circleXY(w, h, r, t) {
    var cos = Math.cos(t);
    var sin = Math.sin(t);

    var x = w - r * sin;
    var y = h + r * cos;

    return [x, y];
}

function pauseForDuration(scene, animation, duration) {
    animation.paused = true;
    // Wait for the specified duration
    scene.time.delayedCall(duration, () => {
        // Then resume the animation
        animation.paused = false;
    }, [], scene);
  }