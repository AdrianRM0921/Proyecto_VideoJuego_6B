class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    preload() {
        this.load.image('gameOverBackground', 'assets/img/gameover.png');
        this.load.image('buttonRestart', 'assets/img/btn_reiniciar.png');
        this.load.image('buttonMainMenu', 'assets/img/brn_regresar.png');
    }

    create() {
        const backgroundOverlay = this.add.graphics();
        backgroundOverlay.fillStyle(0x000000, 0.8);
        backgroundOverlay.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height);

        const gameOverBackground = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'gameOverBackground').setOrigin(0.5);
        gameOverBackground.alpha = 0; // Inicialmente establece la transparencia a 0

        // Efecto de desvanecimiento al mostrar la escena
        this.tweens.add({
            targets: gameOverBackground,
            alpha: 1,
            duration: 1000, // Duración de la animación en milisegundos
            ease: 'Linear'
        });

        const buttonSpacing = 100;
        const buttonScale = 0.7;
        const baseButtonY = this.cameras.main.centerY + gameOverBackground.displayHeight / 2 + buttonSpacing;

        const restartButton = this.add.image(this.cameras.main.centerX, baseButtonY, 'buttonRestart').setOrigin(0.5).setInteractive();
        restartButton.setScale(buttonScale);
        restartButton.on('pointerover', () => {
            restartButton.setTint(0x87ceeb);
        });
        restartButton.on('pointerout', () => {
            restartButton.clearTint();
        });
        restartButton.on('pointerdown', () => {
            this.scene.stop('GameOverScene'); 
            this.scene.start('StoryModeScene');
        });

        const mainMenuButton = this.add.image(this.cameras.main.centerX, baseButtonY + buttonSpacing, 'buttonMainMenu').setOrigin(0.5).setInteractive();
        mainMenuButton.setScale(buttonScale);
        mainMenuButton.on('pointerover', () => {
            mainMenuButton.setTint(0x87ceeb);
        });
        mainMenuButton.on('pointerout', () => {
            mainMenuButton.clearTint();
        });
        mainMenuButton.on('pointerdown', () => {
            this.scene.stop('GameOverScene');
            this.scene.start('MainMenuScene');
        });
    }
}

export default GameOverScene;
