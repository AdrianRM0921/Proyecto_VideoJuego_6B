
class CharacterSelectionScene extends Phaser.Scene {
    constructor() {
        super({ key: 'CharacterSelectionScene' });
    }

    preload() {
        // Cargar imágenes de los personajes y hexágonos
        this.load.image('character1', 'assets/img/Player/Captain/09-Idle Sword/0.png');
        this.load.image('character2', 'assets/img/Player/Captain/10-Run Sword/Run Sword 01.png');
        this.load.image('character3', 'assets/img/Player/Captain/13-Ground Sword/frente1-removebg-preview.png');
        this.load.image('hexagon', 'assets/img/hexagono.png');

        // Cargar el spritesheet del fondo animado
        this.load.spritesheet('backgroundAnim', 'assets/img/fondo_cielo.png', {
            frameWidth: 960, // Ajusta esto al ancho de cada frame
            frameHeight: 540 // Ajusta esto al alto de cada frame
        });

        // Cargar la imagen del título
        this.load.image('titulo', 'assets/img/titulo.png');

        // Cargar imágenes de botones
        this.load.image('buttonStart', 'assets/img/boton-de-play.png'); // Botón de Comenzar
        this.load.image('buttonExit', 'assets/img/btn_salir.png'); // Botón de Salir
    }

    create() {
        // Fondo con color para la escena
        this.cameras.main.setBackgroundColor('#2b2b2b');

        // Configuración de los hexágonos y personajes
        const hexWidth = 512; // Ancho del hexágono
        const hexHeight = 590; // Alto del hexáono (ajustado para hexágonos regulares)
        const hexOffsetX = hexWidth * 0.4; // Offset X para posicionar hexágonos en filas (ajustado para 0.5 cm de separación)
        const hexOffsetY = hexHeight * 0.2; // Offset Y para posicionar hexágonos en columnas (ajustado para 0.5 cm de separación)

        // Posiciones iniciales
        let startX = 960 - (hexOffsetX * -1); // Centrando en X
        let startY = 350; // Ajustar si es necesario

        // Matriz de posiciones de hexágonos
        const hexPositions = [
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 2, y: 0 },
            { x: 0.5, y: 1 },
            { x: 1.5, y: 1 },
            { x: 2.5, y: 1 },
            { x: 0, y: 2 },
            { x: 1, y: 2 },
            { x: 2, y: 2 }
        ];

        // Lista de personajes
        const characters = ['character1', 'character2', 'character3'];

        // Visualización del personaje
        this.selectedCharacterImage = this.add.image(480, 540, 'character1').setScale(4).setVisible(false); // Aumenta la escala
        this.add.text(480, 150, 'Visualización del personaje', { fontSize: '36px', fill: '#fff' }).setOrigin(0.5);

        // Crear hexágonos y personajes
        hexPositions.forEach((pos, index) => {
            let hexX = startX + pos.x * hexOffsetX;
            let hexY = startY + pos.y * hexOffsetY;

            // Agregar hexágono con interactividad
            let hexagon = this.add.image(hexX, hexY, 'hexagon').setScale(0.35).setInteractive();
            hexagon.on('pointerover', () => {
                hexagon.setTint(0x87ceeb); // Cambia de color al pasar el ratón
                this.updateCharacterPreview(characters[index % characters.length]);
            });
            hexagon.on('pointerout', () => hexagon.clearTint()); // Quita el cambio de color al salir el ratón

            // Selecciona el personaje de la lista usando el índice
            let characterKey = characters[index % characters.length];

            // Agregar personaje en el centro del hexágono
            let character = this.add.image(hexX, hexY, characterKey).setScale(1.2); // Aumenta la escala dentro del hexágon
            character.setDepth(1); // Asegura que los personajes estén sobre los hexágonos

            // Selección de personaje al hacer clic
            hexagon.on('pointerdown', () => this.selectCharacter(characterKey));
        });

        // Texto de selección de personaje
        this.add.text(1400, 100, 'Selecciona tu personaje', { fontSize: '50px', fill: '#fff' }).setOrigin(0.5);

        // Botón de inicio de juego
        let startButton = this.add.image(1300, 850, 'buttonStart').setOrigin(0.5).setInteractive().setScale(0.2);
        startButton.on('pointerup', () => this.startGame());

        // Botón de salir
        let exitButton = this.add.image(1450, 850, 'buttonExit').setOrigin(0.5).setInteractive().setScale(0.2);
        exitButton.on('pointerup', () => this.startBack());

        // Cambiar color al pasar el ratón sobre los botones
        startButton.on('pointerover', () => {
            startButton.setTint(0x87ceeb); // Verde brillante al pasar el ratón
        });
        startButton.on('pointerout', () => {
            startButton.clearTint(); // Quita el cambio de color al salir el ratón
        });

        exitButton.on('pointerover', () => {
            exitButton.setTint(0x87ceeb); 
        });
        exitButton.on('pointerout', () => {
            exitButton.clearTint(); // Quita el cambio de color al salir el ratón
        });

        // Configurar el fondo animado
        this.anims.create({
            key: 'backgroundLoop',
            frames: this.anims.generateFrameNumbers('backgroundAnim', { start: 0, end: 33 }), // 34 frames
            frameRate: 10, // Ajusta la velocidad de la animación (frames por segundo)
            repeat: -1 // -1 hace que la animación se repita indefinidamente
        });

        // Agregar el fondo animado
        this.background = this.add.sprite(0, 0, 'backgroundAnim').setOrigin(0, 0);
        this.background.play('backgroundLoop');
        this.background.setAlpha(0.10); // Ajusta la opacidad si es necesario

        // Escalar el fondo para que se ajuste a la pantalla
        this.scaleBackgroundToFit(this.background);

        // Ajustar la profundidad del fondo para que esté detrás de todo
        this.background.setDepth(-1); // Asegura que el fondo esté detrás de todo

        // Evento de redimensionamiento de la ventana
        window.addEventListener('resize', () => {
            this.scaleBackgroundToFit(this.background);
        });
    }

    updateCharacterPreview(characterKey) {
        this.selectedCharacterImage.setTexture(characterKey);
        this.selectedCharacterImage.setVisible(true);
    }

    selectCharacter(characterKey) {
        this.selectedCharacter = characterKey;
        console.log(`Seleccionaste el personaje: ${characterKey}`);
    }

    startGame() {
        console.log(`Comenzar juego con el personaje: ${this.selectedCharacter}`);
        // Aquí puedes iniciar el juego con el personaje seleccionado
        // Por ejemplo: this.scene.start('GameScene', { character: this.selectedCharacter });
    }

    startBack() {
        console.log(`Comenzar juego con el personaje: ${this.selectedCharacter}`);
        // Aquí puedes iniciar el juego con el personaje seleccionado
        this.scene.start('MainMenuScene');
    }

    scaleBackgroundToFit(background) {
        if (background && background.width && background.height) {
            const scaleX = this.sys.game.config.width / background.width;
            const scaleY = this.sys.game.config.height / background.height;
            const scale = Math.max(scaleX, scaleY);
            background.setScale(scale).setScrollFactor(0);
        } else {
            console.log('Error al escalar el fondo. Verifica las dimensiones del spritesheet.');
        }
    }
}

export default CharacterSelectionScene;
