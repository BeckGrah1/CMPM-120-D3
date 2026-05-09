export default class score extends Phaser.Scene {
    constructor() {
        super("score");
    }

    init(data) {
        this.time = data.time;
        this.dominosUsed = data.dominosUsed;
        this.nextLevel = data.nextLevel;
    }

    preload() {
        this.load.image("button", "assets/button.png");
    }

    create() {
        
        let congratulationsText = this.add.text(this.scale.width / 2, 200, "You completed the level!", {
            fontFamily: "Pixelify Sans",
            fontSize: "80px",
            color: "#ffffff",
            wordWrap: {
                width: 600,
                useAdvancedWrap: true
            },
            align: "center"
        }).setOrigin(0.5).setScale(0);

        let statsText = this.add.text(this.scale.width / 2, this.scale.height / 2 - 50, `Time: ${this.time} seconds\nDominos Used: ${this.dominosUsed}`, {
            fontSize: "24px",
            color: "#ffffff",
            wordWrap: {
                width: 600,
                useAdvancedWrap: true
            },
            align: "center"
        }).setOrigin(0.5).setScale(0);

        let button = this.add.image(this.scale.width / 2, this.scale.height / 2 + 100, "button").setOrigin(0.5).setScale(0).setInteractive();
        let buttonText = null;
        if (this.nextLevel != "startScene") {
            buttonText = this.add.text(this.scale.width / 2, this.scale.height / 2 + 100, "Next Level", {
                fontFamily: "Pixelify Sans",
                fontSize: "24px",
                color: "#ffffff",
            }).setOrigin(0.5).setScale(0);  
        }
        else {
            buttonText = this.add.text(this.scale.width / 2, this.scale.height / 2 + 100, "Main Menu", {
                fontFamily: "Pixelify Sans",
                fontSize: "24px",
                color: "#ffffff",
            }).setOrigin(0.5).setScale(0);
        }

        this.tweens.add({
            targets: [congratulationsText, statsText, buttonText],
            scale: 2,
            duration: 500,
            ease: "Sine.easeInOut"
        });
        this.tweens.add({
            targets: button,
            scale: 3,
            duration: 500,
            ease: "Sine.easeInOut",
        });

        button.on("pointerover", () => {
            this.tweens.add({
                targets: button,
                scale: 3.2,
                duration: 200,
                ease: "Sine.easeInOut"
            });
        });

        button.on("pointerout", () => {
            this.tweens.add({
                targets: button,
                scale: 3,
                duration: 200,
                ease: "Sine.easeInOut"
             });
        });
        

        button.on("pointerdown", () => {
            this.tweens.add({
                targets: this.children.getAll(),
                scale: 0,
                duration: 500,
                ease: "Sine.easeInOut",
                onComplete: () => {
                    if (this.nextLevel === "startScene") {
                        window.location.reload();
                    }
                    else {
                        this.scene.start(this.nextLevel);
                    }
                }
            });
        });
    }
}