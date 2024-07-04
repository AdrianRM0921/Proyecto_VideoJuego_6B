import { Player } from "./players/testAnim.js";
import { EnemigoS } from "./players/enemigoS.js";
import GameOverScene from './players/scene_over.js';

class StoryModeScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StoryModeScene' });
        this.player = null;
        this.enemigoS = null;
        this.enemigoS1 = null;
        this.enemigoS2 = null;
        this.enemigoS3 = null;
        this.enemigoS4 = null;
        this.enemigoS5 = null;
        this.enemigoS6 = null;
        this.enemigoS7 = null;
        
    }

    preload() {

        
        // Cargar recursos generales de la escena
        this.load.spritesheet('background2', 'assets/img/bosque_lluvia.png', { frameWidth: 500, frameHeight: 740 });
        this.load.image('titulo', 'assets/img/titulo.png');
        this.load.image('buttonStart', 'assets/img/boton-de-play.png');
        this.load.image('Pisos1', '/assets/Mossy-Tileset/Mossy-BackgroundDecoration.png');
        this.load.image('Pisos2', '/assets/Mossy-Tileset/Mossy-Decorations_Hazards.png');
        this.load.image('Pisos3', '/assets/Mossy-Tileset/Mossy-FloatingPlatforms.png');
        this.load.image('Pisos4', '/assets/Mossy-Tileset/Mossy-Hanging_Plants.png');
        this.load.image('Pisos5', '/assets/Mossy-Tileset/Mossy-MossyHills.png');
        this.load.image('Pisos6', '/assets/Mossy-Tileset/Mossy-TileSet.png');
        this.load.tilemapTiledJSON('tilemap', '/scenes/modo_historia/mapaVegetac/mapaVegetacion3.json');
        


        // Cargar recursos del jugador
        this.player = new Player(this);
        this.player.preload();

        // Cargar recursos del enemigo
        this.enemigoS = new EnemigoS(this, null); // El jugador se asignará en create
        this.enemigoS1 = new EnemigoS(this, null);
        this.enemigoS2 = new EnemigoS(this, null);
        this.enemigoS3 = new EnemigoS(this, null);
        this.enemigoS4 = new EnemigoS(this, null);
        this.enemigoS5 = new EnemigoS(this, null);
        this.enemigoS6 = new EnemigoS(this, null);
        this.enemigoS7 = new EnemigoS(this, null);
        this.enemigoS.preload();
        this.enemigoS1.preload();
        this.enemigoS2.preload();
        this.enemigoS3.preload();
        this.enemigoS4.preload();
        this.enemigoS5.preload();
        this.enemigoS6.preload();
        this.enemigoS7.preload();
    }

    create() {


        // Crear elementos de la escena
        this.input.keyboard.on('keydown-P', () => {
            this.scene.launch('PauseScene');
            this.scene.pause();
        });

        // Crear animaciones y elementos visuales
        this.anims.create({
            key: 'background3',
            frames: this.anims.generateFrameNumbers('background2', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1,
        });
        

        this.background = this.add.sprite(0, 0, 'background2').setOrigin(0, 0).play('background3');
        this.scaleBackgroundToFit(this.background);

        const map = this.make.tilemap({ key: 'tilemap' });
        const tileset1 = map.addTilesetImage('Mossy-BackgroundDecoration', 'Pisos1');
        const tileset2 = map.addTilesetImage('Mossy-Decorations_Hazards', 'Pisos2');
        const tileset3 = map.addTilesetImage('Mossy-FloatingPlatforms', 'Pisos3');
        const tileset4 = map.addTilesetImage('Mossy-Hanging_Plants', 'Pisos4');
        const tileset5 = map.addTilesetImage('Mossy-MossyHills', 'Pisos5');
        const tileset6 = map.addTilesetImage('Mossy-TileSet', 'Pisos6');

        const layers = {
            troncos: map.createLayer('troncos', [tileset1, tileset2, tileset3, tileset4, tileset5, tileset6], 0, 0),
            Plantas: map.createLayer('Plantas', [tileset1, tileset2, tileset3, tileset4, tileset5, tileset6], 0, 0),
            Decoracion: map.createLayer('Decoracion', [tileset1, tileset2, tileset3, tileset4, tileset5, tileset6], 0, 0),
            Terreno: map.createLayer('Terreno', [tileset1, tileset2, tileset3, tileset4, tileset5, tileset6], 0, 0),
            detalles: map.createLayer('detalles', [tileset1, tileset2, tileset3, tileset4, tileset5, tileset6], 0, 0)
        };

        const scaleRatio = Math.max(this.scale.width / map.widthInPixels, this.scale.height / map.heightInPixels);

        Object.values(layers).forEach(layer => {
            layer.setScale(scaleRatio);
            layer.setCollisionByProperty({ colision: true });
        });
        

        // Crear jugador y configurar colisiones
        this.player.create();
        this.cameras.main.startFollow(this.player.Player, true, 0.05, 0.05);

        // Crear enemigos y configurar colisiones
        const enemies = [this.enemigoS, this.enemigoS1, this.enemigoS2, this.enemigoS3, this.enemigoS4, this.enemigoS5, this.enemigoS6, this.enemigoS7];
        const enemyPositions = [
            { x: 1200, y: 980 },
            { x: 1250, y: 300 },
            { x: 600, y: 530 },
            { x: 1550, y: 300 },
            { x: 2000, y: 600 },
            { x: 3000, y: 600 },
            { x: 1390, y: 980 },
            { x: 790, y: 530 }
        ];

        enemies.forEach((enemy, index) => {
            enemy.player = this.player.Player;
            enemy.create(enemyPositions[index].x, enemyPositions[index].y);
            this.physics.add.collider(enemy.enemy, layers.Terreno);
            this.physics.add.collider(enemy.enemy, this.player.Player, () => {
                console.log(`El enemigoS${index} ha colisionado con el jugador`);
                // Aplicar daño al jugador cuando colisiona con un enemigo
                const cantidadDanio = 5; // Cantidad de daño que el enemigo hace
                this.player.recibirDanio(cantidadDanio);
            });
        });

        // Configurar límites de cámara y física del mundo
        const mapWidth = 10240;
        const mapHeight = 3200;
        this.cameras.main.setBounds(0, 0, mapWidth * scaleRatio, mapHeight * scaleRatio);
        this.physics.world.setBounds(0, 0, mapWidth * scaleRatio, mapHeight * scaleRatio);

        this.background.setDepth(-1);

        window.addEventListener('resize', () => {
            this.scaleBackgroundToFit(this.background);
        });

        Object.values(layers).forEach(layer => {
            this.physics.add.collider(this.player.Player, layer);
        });
    }

    scaleBackgroundToFit(background) {
        if (background && background.width && background.height) {
            const scale = Math.max(this.sys.game.config.width / background.width, this.sys.game.config.height / background.height);
            background.setScale(scale).setScrollFactor(0);
            background.x = 0;
            background.y = 0;
        } else {
            console.log('Error al escalar el fondo. Verifica las dimensiones del spritesheet.');
        }
    }

    update() {
        

        if (!this.player) return;
        this.player.update();

        if (this.barraVida) {
            this.barraVida.setScrollFactor(0);
        }

        // Actualizar los enemigos
        this.enemigoS.update();
        this.enemigoS1.update();
        this.enemigoS2.update();
        this.enemigoS3.update();
        this.enemigoS4.update();
        this.enemigoS5.update();
        this.enemigoS6.update();
        this.enemigoS7.update();
    }
}

export default StoryModeScene;
