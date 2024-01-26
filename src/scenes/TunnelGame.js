class TunnelGame extends Phaser.Scene
{
    constructor(){
        super("tunnelScene");
        this.lineIsMoving = false;
        this.score = 0;
        this.rotationSpeed = 0.02;
        this.lineActive = false;
    }

    create()
    {
        this.smcPositions = [
            {x: w - 570, y: h - 500},
            {x: w - 570, y: h - 500},
            {x: w - 530, y: h - 325},
            {x: w - 690, y: h - 450},
            {x: w - 558, y: h - 500},
        ];  

        this.background = this.add.image(0, 0, 'TunnelBg').setOrigin(0,0);
        this.background.displayWidth = w;
        this.background.displayHeight = h;

        this.lamby = this.add.sprite(-15, h - 190 , "lamby");
        this.lamby.setScale(3);

        this.agnes = this.add.sprite(50, h - 190 , "agnes");
        this.agnes.setScale(3);

        this.agnes.on('animationupdate', this.onAnimationUpdate, this);
        this.lamby.on('animationupdate', this.onAnimationUpdate, this);

        this.agnes.anims.play('agnes_walk');

        this.circle = this.add.sprite(w - 600, h - 400 , "circleP");
        this.circle.setScale(4);
        this.circle.alpha = 0;

        this.smc = this.add.sprite(w - 694, h - 350 , "smcP");
        this.smc.setScale(4);
        this.smc.alpha = 0;

        this.line = this.add.sprite(w - 600, h - 400 , "line").setOrigin(0,1);
        this.line.setScale(3.15);
        this.line.alpha = 0;

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

                    this.time.delayedCall(500, this.deactivateLine, [], this);

                    this.time.delayedCall(1450, this.resetGame, [], this);
                    
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

        this.moveKeys = this.input.keyboard.addKeys({
            'left': Phaser.Input.Keyboard.KeyCodes.A,
            'right': Phaser.Input.Keyboard.KeyCodes.D
        });
    }

    activateLine(){
        // tween alpha to 1
        this.tweens.add({
            targets: this.line,
            alpha: 1,
            duration: 500,
            ease: 'Linear'
        });

        this.tweens.add({
            targets: this.circle,
            alpha: 1,
            duration: 500,
            ease: 'Linear'
        });

        this.tweens.add({
            targets: this.smc,
            alpha: 1,
            duration: 500,
            ease: 'Linear'
        });

        this.lineIsMoving = true;
        this.lineActive = true;
    }

    deactivateLine(){
        // tween alpha to 0
        this.tweens.add({
            targets: this.line,
            alpha: 0,
            duration: 500,
            ease: 'Linear'
        });

        this.tweens.add({
            targets: this.circle,
            alpha: 0,
            duration: 500,
            ease: 'Linear'
        });

        this.tweens.add({
            targets: this.smc,
            alpha: 0,
            duration: 500,
            ease: 'Linear'
        });

        this.lineIsMoving = false;
        this.lineActive = false;
    }

    update()
    {

        if (this.lineIsMoving){
            this.line.rotation += this.rotationSpeed;
        }

        const tipX = this.line.x + this.line.width * Math.cos(0);  // assuming 0 rotation
        const tipY = this.line.y + this.line.width * Math.sin(0); 

        const dx = tipX - this.circle.x;
        const dy = tipY - this.circle.y;
        const angle = (Phaser.Math.RadToDeg(Math.atan2(dy, dx)) + 360) % 360;

        if (this.moveKeys.right.isDown && !this.lineActive) {
            // move agnes right
            this.lamby.x += 2;
            this.agnes.x += 2;
            this.lamby.anims.play('lamby_walk', true);
            this.agnes.anims.play('agnes_walk', true);
            this.agnes.flipX = false;
            if ((this.agnes.x == 150 || this.agnes.x == 400 || this.agnes.x == 650 || this.agnes.x == 900 || this.agnes.x == 1150) && !this.lineActive){
                this.activateLine();
            }

            if (this.agnes.x >= 1250){
                this.scene.resume(play);
                play.cutsceneFive();
                this.scene.stop();
            }
        }
        else {
            // stop
            this.agnes.anims.play('agnes_idle', true);
            this.lamby.anims.play('lamby_idle', true);
        }

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
        this.topRect.clear().fillRect(0, 0, w, this.topRectHeight);
        this.bottomRect.clear().fillRect(0, h - this.bottomRectHeight, w, this.bottomRectHeight);
    }

    fadeOutAndIn() {
        let targetHeight = h / 2;
    
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

    onAnimationUpdate(animation, frame) {
        if (animation.key === 'agnes_idle' || animation.key === 'lamby_idle') {
            if (frame.index === 1) {
                pauseForDuration(play, animation, 400);
            } else if (frame.index === 3) {
                pauseForDuration(play, animation, 200);
            } else {
                pauseForDuration(play, animation, 100);
            }
        }
    }
}