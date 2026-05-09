export default class startScene extends Phaser.Scene {
    constructor() {
        super("start");
    }

    preload() {
        this.load.image("button", "assets/button.png");
    }

    create() {
        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#577754");

        let titleText = this.add.text(this.scale.width / 2, 200, "Dominos", {
            fontFamily: "Pixelify Sans",
            fontSize: "128px",
            color: "#ffffff",
            wordWrap: {
                width: 600,
                useAdvancedWrap: true
            },
            align: "center"
        }).setOrigin(0.5).setScale(0);

        let howToPlayText = this.add.text(this.scale.width / 2, this.scale.height / 2, "How to Play:\n - Click to place dominos\n - Click on green domino to start the chain\n - knock over red domino to win", {
            fontFamily: "Pixelify Sans",
            fontSize: "80px",
            color: "#ffffff",
            wordWrap: {
                width: 1200,
                useAdvancedWrap: true
            },
            align: "center"
        }).setOrigin(0.5).setScale(0);

        let button = this.add.image(this.scale.width / 2, this.scale.height / 2 + 400, "button").setOrigin(0.5).setInteractive().setScale(0);
        let buttonText = this.add.text(this.scale.width / 2, this.scale.height / 2 + 400, "Start Game", {
            fontFamily: "Pixelify Sans",
            fontSize: "60px",
            color: "#ffffff",
        }).setOrigin(0.5).setScale(0);

        this.tweens.add({
            targets: [titleText, howToPlayText, buttonText],
            scale: 1,
            duration: 500,
            ease: "Sine.easeInOut",
        });

        this.tweens.add({
            targets: button,
            scale: 3,
            duration: 500,
            ease: "Sine.easeInOut",
        });

        button.on('pointerover', () => {
            this.tweens.add({
                targets: button,
                scale: 3.2,
                duration: 200,
                ease: "Sine.easeInOut",
            });
        });

        button.on('pointerout', () => {
            this.tweens.add({
                targets: button,
                scale: 3,
                duration: 200,
                ease: "Sine.easeInOut",
            });
        });

        button.on('pointerdown', () => {
            this.tweens.add({
                targets: [titleText, howToPlayText, button, buttonText],
                scale: 0,
                duration: 500,
                ease: "Sine.easeInOut",
                onComplete: () => {
                    this.scene.start("tutorial");
                }
            });
        });
    }
}