import tutorial from '/scenes/tutorial.js';
import score from '/scenes/score.js';
import level2 from '/scenes/level2.js';
import level3 from '/scenes/level3.js';
import startScene from '/scenes/startScene.js';
import dominoScene from '/scenes/dominoScene.js';

let config = {
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    physics: {
        default: 'matter',
        matter: {
            gravity: { y: 1 },
            debug: false
        }
    },
    parent: "root",
    scene: [startScene, level3, level2, tutorial, score],
    render: {
        pixelArt: true,
        antialias: false
    },
    backgroundColor: Phaser.Display.Color.HexStringToColor("#577754"),
    title: "Dominoes",
};

// Wait for fonts then start game
WebFont.load({
    google: {
        families: ['Pixelify+Sans:400,700']
    },
    active: function() {
        const game = new Phaser.Game(config);
    },
    // In case fonts fail to load, start the game anyway
    inactive: function() {
        const game = new Phaser.Game(config);
    }
});