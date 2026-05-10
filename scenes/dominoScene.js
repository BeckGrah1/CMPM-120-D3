export default class dominoScene extends Phaser.Scene {
    constructor(key) {
        super(key);
    }

    preload() {
        this.load.image("ground",      "assets/dirt.png");
        this.load.image("stone",       "assets/stone.png");
        this.load.image("domino",      "assets/domino.png");
        this.load.image("startDomino", "assets/start_domino.png");
        this.load.image("endDomino",   "assets/end_domino.png");
        this.load.image("arrow",       "assets/arrow_small.png");
        this.load.image("button",      "assets/button.png");
        this.load.audio("winSound", "assets/audio/win_sound.mp3");
    }

    create() {
        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#687967");
        this.ground = [];
        this.dominoes = [];
        this.knockdownStarted = false;
        this.cheated = false;

        const groundTexture = this.textures.get("ground");
        this.groundWidth = groundTexture.getSourceImage().width;
        const groundHeight = groundTexture.getSourceImage().height;
        let groundTileCount = this.scale.width / (this.groundWidth * 10);

        for (let i = 0; i < groundTileCount; i++) {
            let tile = this.matter.add.image(
                i * this.groundWidth * 10 + (this.groundWidth * 10) / 2,
                this.scale.height - (groundHeight * 10) / 2,
                "ground"
            )
            .setScale(10)
            .setStatic(true);
            this.ground.push(tile);
        }

        this.sceneSpecificCreate();
    }
}