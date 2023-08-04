class TunnelGame extends Phaser.Scene
{
    constructor(){
        super("tunnelGame");
        this.lineIsMoving = true;
    }

    preload(){
        this.load.path = 'assets/tunnel/';

        this.load.image("TunnelBg", "tunneConceptl.png");
        this.load.image("agnes", "agnes_tunnel.png");
        this.load.image("circleG", "circle_green.png");
        this.load.image("circleP", "circle_purple.png");
        this.load.image("circleR", "circle_red.png");
        this.load.image("line", "line.png");
        this.load.image("smcG", "smcircle_green.png");
        this.load.image("smcP", "smcircle_purple.png");
        this.load.image("smcR", "smcircle_red.png");
    }

    create()
    {
        this.background = this.add.image(0, 0, 'TunnelBg').setOrigin(0,0);
        this.background.displayWidth = this.sys.game.config.width;
        this.background.displayHeight = this.sys.game.config.height;

        this.agnes = this.add.sprite(this.sys.game.config.width - 1100, this.sys.game.config.height - 300 , "agnes");
        this.agnes.setScale(2.5);

        this.circle = this.add.sprite(this.sys.game.config.width - 600, this.sys.game.config.height - 400 , "circleP");
        this.circle.setScale(4);

        this.smc = this.add.sprite(this.sys.game.config.width - 570, this.sys.game.config.height - 500 , "smcP");
        this.smc.setScale(4);

        this.line = this.add.sprite(this.sys.game.config.width - 600, this.sys.game.config.height - 400 , "line").setOrigin(0,1);
        this.line.setScale(3.15);
    }

    update()
    {

        if (this.lineIsMoving){
            this.line.rotation += 0.02;
        }

        this.input.on('pointerdown', function (pointer) {
            if (pointer.leftButtonDown()) {
                if (this.checkOverlap()) {
                    this.circle.setTexture('circleG');
                    this.smc.setTexture('smcG');
                    this.lineIsMoving = false;
                    this.blink([this.circle, this.smc, this.line]);
                }
                else{
                    this.cameras.main.shake(100, 0.02);
                    this.circle.setTexture('circleR');
                    this.smc.setTexture('smcR')
                    this.lineIsMoving = false;
                    this.time.delayedCall(1000, this.resetGame, [], this);
                }
            }
        }, this);
    }

    checkOverlap() {
        const lineAngle = Phaser.Math.RadToDeg(this.line.rotation + Math.PI / 2) % 360; 
        
        const smcCenterX = this.smc.x + this.smc.displayWidth / 2;
        const smcCenterY = this.smc.y + this.smc.displayHeight / 2;
        
        const angleToSmc = Phaser.Math.RadToDeg(Math.atan2(this.line.y - smcCenterY, smcCenterX - this.line.x)) % 360;
        
        const angleDifference = Phaser.Math.Angle.ShortestBetween(lineAngle, angleToSmc);
        
        const acceptableAngleDifference = 10;
    
        return Math.abs(angleDifference) <= acceptableAngleDifference;
    }

    blink(objects) {
        objects.forEach((object) => {
            this.tweens.add({
                targets: object,
                alpha: 0,
                duration: 100,
                ease: 'Linear',
                yoyo: true, 
                repeat: 2
            });
        });
    }

    resetGame() {
        this.line.rotation = 0; 
        this.circle.setTexture('circleP');
        this.smc.setTexture('smcP');
        this.lineIsMoving = true;
    }
    
    
    
    
}