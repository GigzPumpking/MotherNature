function createBackButton(scene, stop, resume) {
    scene.backButton = new ButtonR(scene, backX, backY, 'backButton', rescale, () => {
        scene.scene.stop(stop);
        scene.scene.resume(resume);
    });
}

function createOptionsButton(scene) {
    // Temporary Text Button, will be replaced with a sprite
    
    scene.pauseButton = new TextButton(scene, optionsX, optionsY, 'Options', textConfig, () => {
        scene.scene.pause().launch('optionsScene');
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

function jiggle( scene,element) {
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