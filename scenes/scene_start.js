// scene_start.js

class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScene' });
    }

    create() {
        const startButton = this.add.text(960, 540, 'Iniciar juego', {
            fontSize: '84px',
            fill: '#ff0',
            shadow: {
                offsetX: 3,
                offsetY: 2,
                color: '#000',
                blur: 3,
                stroke: true,
                fill: true
            }
        });
        startButton.setOrigin(0.5);
        startButton.setInteractive();

        startButton.on('pointerdown', () => {
            this.scene.start('MainMenuScene'); 
        });
    }
}

export default StartScene;
