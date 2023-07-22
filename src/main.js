let config = {
    type: Phaser.WEBGL,
    width: 1200,
    height: 675,
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
    scene: [ Load, Title, Credits, Play, UI, Inventory, Music, Options ]
}

var fontStyle = {
    fontFamily: 'mxfont', // This will be used to reference the font later
    src: 'url("./assets/detmonowebr.ttf")' // The URL to your TTF font file
};

let game = new Phaser.Game(config);
let map = null;

let w = game.config.width;
let h = game.config.height;

let rescale = w / 240;
let centerX = w / 2;
let centerY = h / 2;

// UI Button Locations (Technically obsolete, since a separate UI scene is used)
// Still used to determine the location of buttons

backX = w - 10*rescale;
backY = 5*rescale;

optionsX = 12*rescale;
optionsY = 6*rescale;

inventoryX = 14*rescale;
inventoryY = 12*rescale;

// Default Text Config

let textConfig = {
    fontFamily: fontStyle.fontFamily,
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

// Text Config for Credits Menu

const creditsConfig = Object.assign({}, textConfig, {fontFamily: 'Verdana', backgroundColor: '#383B3C', align: 'left'});

// Set creditsConfig fontSize to 2.2*rescale
creditsConfig.fontSize = 4.4*rescale;

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

let brightnessBG = null;
let brightness = 1;

// Inventory

let inventory = [];