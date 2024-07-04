

export class Player {
    constructor(scene) {
        this.scene = scene;
        this.vida = 100;
        this.maxVida = 100;
        this.barraVida = null;
        this.isDead = false;
    }

    preload() {
        // Cargar imágenes necesarias para la barra de vida (si no están cargadas aún)
        this.scene.load.image('vida1', 'assets/img/FIFAS/VIDA/VIDA100.png');
        this.scene.load.image('vida2', 'assets/img/FIFAS/VIDA/VIDA75.png');
        this.scene.load.image('vida3', 'assets/img/FIFAS/VIDA/VIDA50.png');
        this.scene.load.image('vida4', 'assets/img/FIFAS/VIDA/VIDA25.png');
        this.scene.load.image('vida5', 'assets/img/FIFAS/VIDA/VIDA1.png');
        this.scene.load.image('vida6', 'assets/img/FIFAS/VIDA/VIDA0.png');

        // Cargar imágenes para las animaciones y sprites del jugador
        this.scene.load.image('caatc1', 'assets/img/FIFAS/PERSONAJE3/ataque1.png');
        this.scene.load.image('caatc2', 'assets/img/FIFAS/PERSONAJE3/ataque2.png');
        this.scene.load.image('caatc3', 'assets/img/FIFAS/PERSONAJE3/ataque3.png');
        this.scene.load.image('caatcd1', 'assets/img/FIFAS/PERSONAJE3/ataqued1.png');
        this.scene.load.image('caatcd2', 'assets/img/FIFAS/PERSONAJE3/ataqued2.png');
        this.scene.load.image('caatcd3', 'assets/img/FIFAS/PERSONAJE3/ataqued3.png');
        this.scene.load.image('cafre1', 'assets/img/FIFAS/PERSONAJE3/frente1.png');
        this.scene.load.image('cafre2', 'assets/img/FIFAS/PERSONAJE3/frente2.png');
        this.scene.load.image('cafre3', 'assets/img/FIFAS/PERSONAJE3/frente3.png');
        this.scene.load.image('cafre4', 'assets/img/FIFAS/PERSONAJE3/frente4.png');
        this.scene.load.image('cade1', 'assets/img/FIFAS/PERSONAJE3/corre1d.png');
        this.scene.load.image('cade2', 'assets/img/FIFAS/PERSONAJE3/corre2d.png');
        this.scene.load.image('caiz1', 'assets/img/FIFAS/PERSONAJE3/corre1.png');
        this.scene.load.image('caiz2', 'assets/img/FIFAS/PERSONAJE3/corre2.png');
        this.scene.load.image('casa1', 'assets/img/FIFAS/PERSONAJE3/paradolado1.png');
        this.scene.load.image('casa2', 'assets/img/FIFAS/PERSONAJE3/paradolado2.png');
        this.scene.load.image('muerto', 'assets/img/FIFAS/PERSONAJE3/defensa.png');
    }

    create() {
        // Crear la barra de vida inicial
        this.barraVida = this.scene.add.image(200, 100, 'vida1').setDepth(1);
        this.barraVida.setScrollFactor(0);

        // Crear el sprite del jugador y configurar físicas
        this.Player = this.scene.physics.add.sprite(50, 50, 'cafre1');
        this.Player.body.setSize(this.Player.width * 0.4, this.Player.height * 0.6);
        this.Player.body.setOffset(this.Player.width * 0.3, this.Player.height * 0.1);
        this.Player.setBounce(0.2);
        this.Player.setScale(2);
        this.Player.setCollideWorldBounds(true);

        // Configurar las animaciones del jugador
        this.scene.anims.create({
            key: 'frente',
            frames: [
                { key: 'cafre1' },
                { key: 'cafre2' },
                { key: 'cafre3' },
                { key: 'cafre4' }
            ],
            frameRate: 7,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'attacar',
            frames: [
                { key: 'caatc1' },
                { key: 'caatc2' },
                { key: 'caatc3' }
            ],
            frameRate: 6,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'attacarD',
            frames: [
                { key: 'caatcd1' },
                { key: 'caatcd2' },
                { key: 'caatcd3' }
            ],
            frameRate: 6,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'derecha',
            frames: [
                { key: 'cade1' },
                { key: 'cade2' }
            ],
            frameRate: 6,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'izquierda',
            frames: [
                { key: 'caiz1' },
                { key: 'caiz2' }
            ],
            frameRate: 6,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'saltar',
            frames: [
                { key: 'casa1' },
                { key: 'casa2' }
            ],
            frameRate: 6,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'morido',
            frames: [
                { key: 'muerto' }
            ],
            frameRate: 6,
            repeat: 0
        });

        // Configurar teclas para controlar al jugador
        this.keyD = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyS = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyA = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyK = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
        this.keyL = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
        this.keyW = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    }

    update() {
        if (this.isDead) {
            // Detener cualquier otra acción si el jugador está muerto
            this.Player.setVelocityX(0);
            this.Player.setVelocityY(0);
            return;
        }

        if (this.keyD.isDown) {
            this.Player.play('derecha', true);
            this.Player.setVelocityX(700);
        } else if (this.keyK.isDown) {
            this.Player.play('attacar', true);
            this.Player.setVelocityX(0);
        } else if (this.keyL.isDown) {
            this.Player.play('attacarD', true);
            this.Player.setVelocityX(0);
        } else if (this.keyA.isDown) {
            this.Player.play('izquierda', true);
            this.Player.setVelocityX(-700);
        } else {
            this.Player.setVelocityX(0);
            this.Player.play('frente', true);
        }

        if (this.keyW.isDown && this.Player.body.blocked.down) {
            this.Player.setVelocityY(-600);
            this.Player.play('saltar', true);
        }
    }

    recibirDanio(cantidadDanio) {
        if (this.isDead) return; // No recibir más daño si ya está muerto

        this.vida -= cantidadDanio;
        if (this.vida < 0) {
            this.vida = 0;
        }
        this.actualizarBarraVida();
    }

    curarVida(cantidadCuracion) {
        if (this.isDead) return; // No curarse si ya está muerto

        this.vida += cantidadCuracion;
        if (this.vida > this.maxVida) {
            this.vida = this.maxVida;
        }
        this.actualizarBarraVida();
    }

    actualizarBarraVida() {
        const escala = this.vida / this.maxVida;

        if (escala >= 0.75) {
            this.barraVida.setTexture('vida2');
        } else if (escala >= 0.5) {
            this.barraVida.setTexture('vida3');
        } else if (escala >= 0.25) {
            this.barraVida.setTexture('vida4');
        } else if (escala > 0) {
            this.barraVida.setTexture('vida5');
        } else {
            this.barraVida.setTexture('vida6');
            if (!this.isDead) {
                this.Player.play('morido', true);
                this.isDead = true;
                this.scene.time.addEvent({
                    delay: 1000,
                    callback: () => {
                        this.scene.scene.start('GameOverScene');
                    },
                    callbackScope: this.scene
                });
            }
        }
    }
}
