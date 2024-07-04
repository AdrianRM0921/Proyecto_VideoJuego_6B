export class EnemigoS {
    constructor(scene, player) {
        this.scene = scene;
        this.player = player; // Referencia al jugador para detectar su proximidad
        this.isAttacking = false; // Para evitar múltiples ataques simultáneos
        this.enemigos = []; // Array para almacenar los enemigos creados
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
    }

    create(x, y) {
        this.enemy = this.scene.physics.add.sprite(x, y, 'parado1');
        // Configuración física, tamaño, colisiones, etc.
        this.enemy.body.setSize(this.enemy.width * 0.4, this.enemy.height * 0.6);
        this.enemy.body.setOffset(this.enemy.width * 0.3, this.enemy.height * 0.1);
        this.enemy.setBounce(0.2);
        this.enemy.setScale(2);
        this.enemy.setCollideWorldBounds(true);
        

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
        // Ejemplo básico de seguimiento de jugador
        const distancia = Phaser.Math.Distance.Between(this.enemy.x, this.enemy.y, this.player.x, this.player.y);

        if (distancia < 300) {
            // Si el jugador está lo suficientemente cerca, realizar alguna acción (ataque, movimiento, etc.)
            if (!this.isAttacking) {
                this.isAttacking = true;
                // Lógica de ataque o movimiento hacia el jugador
             
                this.scene.physics.moveToObject(this.enemy, this.player, 100);
                // Determinar dirección del jugador para animación de ataque
                if (this.enemy.x < this.player.x) {
                    this.enemy.anims.play('atacar_D', true); // Activar animación de ataque hacia la derecha
                } else {
                    this.enemy.anims.play('atacar_I', true); // Activar animación de ataque hacia la izquierda
                }
            }
        } else {
            // Si el jugador está lejos, detener cualquier acción de ataque o seguimiento
            this.isAttacking = false;
            this.enemy.body.setVelocity(0);
            // Determinar dirección del jugador para animación de caminar
            if (this.enemy.x < this.player.x) {
                this.enemy.anims.play('caminar_D', true); // Activar animación de caminar hacia la derecha
            } else {
                this.enemy.anims.play('caminar_I', true); // Activar animación de caminar hacia la izquierda
            }
        }

        
    }
}
