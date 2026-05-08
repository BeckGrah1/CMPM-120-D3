export default class level2 extends Phaser.Scene {
    constructor() {
        super("level2");
    }

    preload() {
        this.load.image("ground", "assets/dirt.png");
        this.load.image("stone", "assets/stone.png");
        this.load.image("domino", "assets/domino.png");
        this.load.image("startDomino", "assets/start_domino.png");
        this.load.image("endDomino", "assets/end_domino.png");
        this.load.image("arrow", "assets/arrow_small.png");
    }

    create() {
        this.dominoCount = 5;
        this.dominoes = [];
        this.knockdownStarted = false;
        this.cheated = false;
        this.won = false;

        const groundTexture = this.textures.get("ground");
        const groundWidth = groundTexture.getSourceImage().width;
        const groundHeight = groundTexture.getSourceImage().height;
        let groundTileCount = this.scale.width / (groundWidth * 10);

        for (let i = 0; i < groundTileCount; i++) {
            this.matter.add.image(
                i * groundWidth * 10 + (groundWidth * 10) / 2,
                this.scale.height - (groundHeight * 10) / 2,
                "ground"
            )
            .setScale(10)
            .setStatic(true);
        }
        for (let j = 0; j < 4; j++) {
            for (let i = 0; i < (10 - 2 * j); i++) {
                this.matter.add.image(1920 - (i * groundWidth * 10) - (groundWidth * 5), this.scale.height - (groundHeight * 5) - (groundHeight * 10) - (150 * j), "stone")
                    .setScale(10)
                    .setStatic(true);
            }
        }

        this.placeStartDominos();

        this.input.on('pointerdown', (pointer) => {
            if (this.dominoCount > 0) {
                const dominoTexture = this.textures.get("domino");
                const dominoWidth = dominoTexture.getSourceImage().width * 10;
                const dominoHeight = dominoTexture.getSourceImage().height * 10;

                let canPlaceDomino = true;
                this.dominoes.forEach((domino) => {
                    if (Phaser.Geom.Intersects.RectangleToRectangle(
                        new Phaser.Geom.Rectangle(pointer.worldX, pointer.worldY, dominoWidth, dominoHeight),
                        domino.getBounds()
                    )) {
                        canPlaceDomino = false;
                    }
                });

                if (!canPlaceDomino) return;

                this.dominoCount--;
                let domino = this.matter.add.image(pointer.worldX + dominoWidth / 2, pointer.worldY + dominoHeight / 2, "domino")
                    .setScale(10)
                    .setFrictionAir(0.01)
                    .setBounce(0.05);
                domino.setMass(0.1);
                this.dominoes.push(domino);
            }
        });
    }

    placeStartDominos() {
        const startTexture = this.textures.get("startDomino").getSourceImage();
        this.startDomino = this.matter.add.image(100, this.scale.height - 500, "startDomino")
            .setScale(10)
            .setInteractive(new Phaser.Geom.Rectangle(
                -startTexture.width * 5,
                -startTexture.height * 5,
                startTexture.width * 10,
                startTexture.height * 10
            ), Phaser.Geom.Rectangle.Contains)
            .setFrictionAir(0.01)
        this.startDomino.setMass(0.3);
        this.dominoes.push(this.startDomino);

        this.clickText = this.add.text(100, 300, "Click to knock over!", {
            fontFamily: "Pixelify Sans",
            fontSize: "32px",
            color: "#ffffff",
            wordWrap: {
                width: 200,
                useAdvancedWrap: true
            },
            align: "center"
        }).setOrigin(0.5, 0);
        this.arrow = this.add.image(100, 450, "arrow").setScale(3).setOrigin(0.5, 0).setRotation(Math.PI);

        this.tweens.add({
            targets: this.clickText,
            y: 320,
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: "Sine.easeInOut"
        });

        this.tweens.add({
            targets: this.arrow,
            y: 470,
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: "Sine.easeInOut"
        });

        this.endDomino = this.matter.add.image(this.scale.width - 80, 100, "endDomino")
            .setScale(10);
        this.endDomino.setMass(0.1);
        this.dominoes.push(this.endDomino);

        this.startDomino.on('pointerdown', () => {
            this.startTime = this.time.now;
            this.startDomino.setAngularVelocity(.04);
            this.tweens.add({
                targets: [this.clickText, this.arrow],
                alpha: 0,
                scale: 0,
                duration: 500,
                ease: "Sine.easeInOut",
                onComplete: () => {
                    this.clickText.destroy();
                    this.arrow.destroy();
                }
            });

            this.knockdownStarted = true;
        });
    }
}