class TunnelGame extends Phaser.Scene
{
    constructor(){
        super("tunnelScene");
        this.lineIsMoving = true;
        this.score = 0;
        this.rotationSpeed = 0.02;

    }

    create()
    {
        this.smcPositions = [
            {x: this.sys.game.config.width - 570, y: this.sys.game.config.height - 500},
            {x: this.sys.game.config.width - 570, y: this.sys.game.config.height - 500},
            {x: this.sys.game.config.width - 530, y: this.sys.game.config.height - 325},
            {x: this.sys.game.config.width - 690, y: this.sys.game.config.height - 450},
            {x: this.sys.game.config.width - 558, y: this.sys.game.config.height - 500},
        ];  

        this.background = this.add.image(0, 0, 'TunnelBg').setOrigin(0,0);
        this.background.displayWidth = this.sys.game.config.width;
        this.background.displayHeight = this.sys.game.config.height;

        this.agnes = this.add.sprite(this.sys.game.config.width - 1100, this.sys.game.config.height - 300 , "agnes");
        this.agnes.setScale(2.5);

        this.circle = this.add.sprite(this.sys.game.config.width - 600, this.sys.game.config.height - 400 , "circleP");
        this.circle.setScale(4);


        this.smc = this.add.sprite(this.sys.game.config.width - 694, this.sys.game.config.height - 350 , "smcP");
        this.smc.setScale(4);

        this.line = this.add.sprite(this.sys.game.config.width - 600, this.sys.game.config.height - 400 , "line").setOrigin(0,1);
        this.line.setScale(3.15);

        // Create two black rectangles for the fade effect.
        this.topRect = this.add.graphics({ fillStyle: { color: 0x000000 } });
        this.bottomRect = this.add.graphics({ fillStyle: { color: 0x000000 } });
        
        // Initially, they have zero height.
        this.topRectHeight = 0;
        this.bottomRectHeight = 0;
        this.updateRects();

        this.input.on('pointerdown', function (pointer) {
            if (pointer.leftButtonDown()) {

                if (this.checkOverlap()) {
                    /*
                    ------------------------------------------------------------------
                    player got it right
                    ------------------------------------------------------------------
                    */
                    this.circle.setTexture('circleG');
                    this.smc.setTexture('smcG');
                    this.lineIsMoving = false;
                    this.blink([this.circle, this.smc, this.line]);

                    this.score += 1;
                    this.rotationSpeed += 0.02;

                    if (this.score >= 5){
                        /*
                        ------------------------------------------------------------------
                        Out of Tunnel code here, scene transition?
                        ------------------------------------------------------------------
                        */
                        console.log("out of tunnel");
                    }
                    else{
                        this.time.delayedCall(500, this.fadeOutAndIn, [], this);
                        this.time.delayedCall(1450, this.resetGame, [], this);
                    }
                }
                else{
                    /*
                    ------------------------------------------------------------------
                    player got it wrong
                    ------------------------------------------------------------------
                    */
                    this.cameras.main.shake(100, 0.02);
                    this.circle.setTexture('circleR');
                    this.smc.setTexture('smcR')
                    this.lineIsMoving = false;
                    this.time.delayedCall(1000, this.resetGame, [], this);
                }
            }
        }, this);

    }

    update()
    {
        console.log("Tunnel Game Score: " + this.score);

        if (this.lineIsMoving){
            this.line.rotation += this.rotationSpeed;
        }

        const tipX = this.line.x + this.line.width * Math.cos(0);  // assuming 0 rotation
        const tipY = this.line.y + this.line.width * Math.sin(0); 

        const dx = tipX - this.circle.x;
        const dy = tipY - this.circle.y;
        const angle = (Phaser.Math.RadToDeg(Math.atan2(dy, dx)) + 360) % 360;

    }

    checkOverlap() {
        const dx = this.smc.x - this.circle.x;
        const dy = this.smc.y - this.circle.y;
        let angleToSMC = (Phaser.Math.RadToDeg(Math.atan2(dy, dx)) + 360) % 360;
        

        let lineAngle = (Phaser.Math.RadToDeg(this.line.rotation) + 360) % 360;

        lineAngle = (lineAngle - 45 ) % 360;
    
        const angleDifference = Phaser.Math.Angle.ShortestBetween(lineAngle, angleToSMC);
        const acceptableAngleDifference = 13;
    
        
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
        if (this.score < this.smcPositions.length){
            this.smc.x = this.smcPositions[this.score].x;
            this.smc.y = this.smcPositions[this.score].y;
        }

    }

    updateRects() {
        this.topRect.clear().fillRect(0, 0, this.sys.game.config.width, this.topRectHeight);
        this.bottomRect.clear().fillRect(0, this.sys.game.config.height - this.bottomRectHeight, this.sys.game.config.width, this.bottomRectHeight);
    }

    fadeOutAndIn() {
        let targetHeight = this.sys.game.config.height / 2;
    
        this.tweens.add({
            targets: this,
            topRectHeight: targetHeight,
            bottomRectHeight: targetHeight,
            duration: 1000,
            ease: 'Sine.easeOut',
            onComplete: () => {  
                this.time.delayedCall(700, this.fadeIn, [], this);
            },
            onUpdate: () => {
                this.updateRects();
            }
        });
    }
    
    

    fadeIn() {
        this.tweens.add({
            targets: this,
            topRectHeight: 0,
            bottomRectHeight: 0,
            duration: 1000,
            ease: 'Sine.easeIn',
            onUpdate: () => {
                this.updateRects();
            }
        });
    }
    
}