let config = {
    type: Phaser.WEBGL,
    width: 960,
    height: 540,
    pixelArt: true,
    scale: {
        //mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            fps: 60
        }
    },
    scene: [ Load, Title, Credits, Options, Play, UI, Inventory, Music ]
}

let game = new Phaser.Game(config);

let w = game.config.width;
let h = game.config.height;

let rescale = w / 192;
let centerX = w / 2;
let centerY = h / 2;

// UI Button Locations (Technically obsolete, since a separate UI scene is used)
// Still used to determine the location of buttons

backX = w - 15*rescale;
backY = 10*rescale;

optionsX = 12*rescale;
optionsY = 6*rescale;

inventoryX = 14*rescale;
inventoryY = 12*rescale;

// Default Text Config

let textConfig = {
    fontFamily: 'Courier',
    fontSize: '40px',
    color: '#FFFFFF',
    align: 'center',
    padding: {
        top: 5,
        bottom: 5,
        left: 5,
        right: 5
    },
    fixedWidth: 0
};

textConfig.fontSize = 4*rescale;

// Text Config for Title Text

const titleConfig = Object.assign({}, textConfig, {color: '#FFF21A'});

// Set titleConfig fontSize to 6*rescale

titleConfig.fontSize = 12*rescale;

// Text Config for Credits Menu

const creditsConfig = Object.assign({}, textConfig, {fontFamily: 'Verdana', backgroundColor: '#383B3C', align: 'left'});

// Set creditsConfig fontSize to 2.2*rescale
creditsConfig.fontSize = 4.4*rescale;

// Hotkeys

let keyESC, keySPACE, keyP, keyC, keyO, keyR, keyM, keyI;

let uiESC, uiI;

let keyW, keyA, keyS, keyD;

// Scene List

let load = null;
let title = null;
let credits = null;
let options = null;
let play = null;
let ui = null;
let inv = null;
let mus = null;

// Current & Previous Scene

let currScene = null;
let prevScene = null;

// Music List

let music = [];

// Default Audio Config

let musicVolume = 0.5;
let sfxVolume = 0.5;

let brightness = 0.5;

// Inventory

let inventory = [];