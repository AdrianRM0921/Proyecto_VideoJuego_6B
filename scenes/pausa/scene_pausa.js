class PauseScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PauseScene' });
    }

    preload() {
        // Cargar las imágenes para el fondo de pausa y los botones
        this.load.image('pauseBackground', 'assets/img/titulo.png'); // Título del juego
        this.load.image('buttonResume', 'assets/img/btn_reanudar.png'); // Botón de reanudar
        this.load.image('buttonRestart', 'assets/img/btn_reiniciar.png'); // Botón de reiniciar
        this.load.image('buttonSettings', 'assets/img/selec_opciones.png'); // Botón de opciones
        this.load.image('buttonMainMenu', 'assets/img/brn_regresar.png'); // Botón de regresar al menú principal
    }

    create() {
        // Crear una capa oscura semi-transparente para oscurecer la escena de fondo
        const backgroundOverlay = this.add.graphics();
        backgroundOverlay.fillStyle(0x000000, 0.8); // Negro con 80% de opacidad
        backgroundOverlay.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height);

        // Añadir el título (pausa) en el centro superior
        const title = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY - 250, 'pauseBackground').setOrigin(0.5);
        title.setScale(1.2); // Ajusta la escala según el tamaño de tu imagen

        // Espaciado entre los botones y el título
        const spacingFromTitle = 220; // Espaciado entre el título y el primer botón
        const buttonSpacing = 85; // Espaciado entre cada botón

        // Tamaño de los botones
        const buttonScale = 0.7; // Ajusta la escala de los botones

        // Calcular la posición base del primer botón
        const baseButtonY = this.cameras.main.centerY - 250 + spacingFromTitle;

        // Botón de reanudar
        const resumeButton = this.add.image(this.cameras.main.centerX, baseButtonY, 'buttonResume').setOrigin(0.5).setInteractive();
        resumeButton.setScale(buttonScale);
        resumeButton.on('pointerover', () => {
            resumeButton.setTint(0x87ceeb); // Aplicar color al colocar el ratón sobre el botón
        });
        resumeButton.on('pointerout', () => {
            resumeButton.clearTint(); // Limpiar el color cuando el ratón sale del botón
        });
        resumeButton.on('pointerdown', () => {
            this.scene.resume('StoryModeScene'); 
            this.scene.stop(); 
        });

        // Botón de reiniciar
        const restartButton = this.add.image(this.cameras.main.centerX, baseButtonY + buttonSpacing, 'buttonRestart').setOrigin(0.5).setInteractive();
        restartButton.setScale(buttonScale);
        restartButton.on('pointerover', () => {
            restartButton.setTint(0x87ceeb); // Aplicar color al colocar el ratón sobre el botón
        });
        restartButton.on('pointerout', () => {
            restartButton.clearTint(); // Limpiar el color cuando el ratón sale del botón
        });
        restartButton.on('pointerdown', () => {
            this.scene.stop('StoryModeScene'); 
            this.scene.stop(); 
            this.scene.start('StoryModeScene'); 
        });

        // Botón de opciones
        const settingsButton = this.add.image(this.cameras.main.centerX, baseButtonY + buttonSpacing * 2, 'buttonSettings').setOrigin(0.5).setInteractive();
        settingsButton.setScale(buttonScale);
        settingsButton.on('pointerover', () => {
            settingsButton.setTint(0x87ceeb); // Aplicar color al colocar el ratón sobre el botón
        });
        settingsButton.on('pointerout', () => {
            settingsButton.clearTint(); // Limpiar el color cuando el ratón sale del botón
        });
        settingsButton.on('pointerdown', () => {
            console.log('Abrir configuración');
            // Configuración para desplegar un menú de opciones
        });

        // Espaciado independiente para el botón de regresar al menú principal
        const mainMenuButtonSpacing = 110; // Ajusta este valor según sea necesario

        // Botón de regresar al menú principal
        const mainMenuButton = this.add.image(this.cameras.main.centerX, baseButtonY + buttonSpacing * 2 + mainMenuButtonSpacing, 'buttonMainMenu').setOrigin(0.5).setInteractive();
        mainMenuButton.setScale(buttonScale);
        mainMenuButton.on('pointerover', () => {
            mainMenuButton.setTint(0x87ceeb); // Aplicar color al colocar el ratón sobre el botón
        });
        mainMenuButton.on('pointerout', () => {
            mainMenuButton.clearTint(); // Limpiar el color cuando el ratón sale del botón
        });
        mainMenuButton.on('pointerdown', () => {
            this.scene.stop('StoryModeScene'); 
            this.scene.stop(); 
            this.scene.start('MainMenuScene'); 
        });

        // Reanudar con tecla ESC
        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.resume('StoryModeScene'); 
            this.scene.stop(); 
        });
    }
}

export default PauseScene;
