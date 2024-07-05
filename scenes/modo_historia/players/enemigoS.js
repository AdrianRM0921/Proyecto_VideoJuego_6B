export class EnemigoS {
    constructor(scene, player) {
        this.scene = scene;
        this.player = player; 
        this.isAttacking = false; 
        this.enemigos = []; 
    }

    preload() {
        // Cargar recursos del enemigo
        this.scene.load.image('atacar1_D', 'assets/img/FIFAS/enemigo1/ataqued1.png');
        this.scene.load.image('atacar2_D', 'assets/img/FIFAS/enemigo1/ataqued2.png');
        this.scene.load.image('atacar1_I', 'assets/img/FIFAS/enemigo1/ataquei1.png');
        this.scene.load.image('atacar2_I', 'assets/img/FIFAS/enemigo1/ataquei2.png');
        this.scene.load.image('caminar1_D', 'assets/img/FIFAS/enemigo1/caminad1.png');
        this.scene.load.image('caminar2_D', 'assets/img/FIFAS/enemigo1/caminad2.png');
        this.scene.load.image('caminar1_I', 'assets/img/FIFAS/enemigo1/caminai1.png');
        this.scene.load.image('caminar2_I', 'assets/img/FIFAS/enemigo1/caminai2.png');
        this.scene.load.image('parado1', 'assets/img/FIFAS/enemigo1/parado1.png');
        this.scene.load.image('parado2', 'assets/img/FIFAS/enemigo1/parado2.png');
        this.scene.load.image('muerte1_D', 'assets/img/FIFAS/enemigo1/muerted1.png');
        this.scene.load.image('muerte2_D', 'assets/img/FIFAS/enemigo1/muerted2.png');
        this.scene.load.image('muerte1_I', 'assets/img/FIFAS/enemigo1/muertei1.png');
        this.scene.load.image('muerte2_I', 'assets/img/FIFAS/enemigo1/muertei2.png');

        // Cargar imágenes de vida del enemigo
        this.scene.load.image('vida_enemigo1', 'assets/img/FIFAS/VIDA/VIDA100.png');
        this.scene.load.image('vida_enemigo2', 'assets/img/FIFAS/VIDA/VIDA75.png');
        this.scene.load.image('vida_enemigo3', 'assets/img/FIFAS/VIDA/VIDA50.png');
        this.scene.load.image('vida_enemigo4', 'assets/img/FIFAS/VIDA/VIDA25.png');
        this.scene.load.image('vida_enemigo5', 'assets/img/FIFAS/VIDA/VIDA1.png');
        this.scene.load.image('vida_enemigo6', 'assets/img/FIFAS/VIDA/VIDA0.png');
    }

    create(x, y) {
        this.enemy = this.scene.physics.add.sprite(x, y, 'parado1');
        this.enemy.body.setSize(this.enemy.width * 0.4, this.enemy.height * 0.6);
        this.enemy.body.setOffset(this.enemy.width * 0.3, this.enemy.height * 0.1);
        this.enemy.setBounce(0.2);
        this.enemy.setScale(2);
        this.enemy.setCollideWorldBounds(true);
        
        this.enemy.vida = 50; // Asigna vida al enemigo
        this.enemy.maxVida = 50; // Asigna vida máxima al enemigo
        this.enemy.barraVida = this.scene.add.image(x, y - 50, 'vida_enemigo1').setDepth(1);
        this.enemy.barraVida.setScale(0.5);

        // Crear animaciones
        this.scene.anims.create({
            key: 'caminar_D',
            frames: [{ key: 'caminar1_D' }, { key: 'caminar2_D' }],
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'atacar_D',
            frames: [{ key: 'atacar1_D' }, { key: 'atacar2_D' }],
            frameRate: 5,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'caminar_I',
            frames: [{ key: 'caminar1_I' }, { key: 'caminar2_I' }],
            frameRate: 5,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'atacar_I',
            frames: [{ key: 'atacar1_I' }, { key: 'atacar2_I' }],
            frameRate: 5,
            repeat: -1
        });

        // Iniciar animación por defecto
        this.enemy.anims.play('caminar_D', true);

        // Agregar el enemigo al array de enemigos
        this.enemigos.push(this.enemy);
    }

    update() {
        // Lógica de movimiento, detección de jugador, ataque, etc.
        const distancia = Phaser.Math.Distance.Between(this.enemy.x, this.enemy.y, this.player.x, this.player.y);

        if (distancia < 300) {
            if (!this.isAttacking) {
                this.isAttacking = true;
                this.scene.physics.moveToObject(this.enemy, this.player, 100)
                if (this.enemy.x < this.player.x) {
                    this.enemy.anims.play('atacar_D', true);
                } else {
                    this.enemy.anims.play('atacar_I', true);
                }
            }
        } else {
            this.isAttacking = false;
            this.enemy.body.setVelocity(0);
            
            if (this.enemy.x < this.player.x) {
                this.enemy.anims.play('caminar_D', true); 
            } else {
                this.enemy.anims.play('caminar_I', true); 
            }
        }

        // Actualizar la barra de vida del enemigo
        this.enemy.barraVida.setPosition(this.enemy.x, this.enemy.y - 50);
    }

    receiveDamage(enemy, amount) {
        if (enemy.vida <= 0) return;
        
        enemy.vida -= amount;
        if (enemy.vida < 0) {
            enemy.vida = 0;
        }
        
        // Actualiza la textura de la barra de vida basada en la salud restante
        const escala = enemy.vida / enemy.maxVida;
        if (escala >= 0.75) {
            enemy.barraVida.setTexture('vida_enemigo1');
        } else if (escala >= 0.5) {
            enemy.barraVida.setTexture('vida_enemigo2');
        } else if (escala >= 0.25) {
            enemy.barraVida.setTexture('vida_enemigo3');
        } else if (escala > 0) {
            enemy.barraVida.setTexture('vida_enemigo4');
        } else {
            enemy.barraVida.setTexture('vida_enemigo6');
            // Reproduce animación de muerte y elimina enemigo
            enemy.anims.play('muerte1_D', true);
            this.scene.time.delayedCall(500, () => {
                enemy.destroy();
                enemy.barraVida.destroy();
            });
        }
    }
}

