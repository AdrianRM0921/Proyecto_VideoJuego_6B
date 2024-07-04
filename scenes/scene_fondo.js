
class BackgroundScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BackgroundScene' });
    }

    preload() {
        
        
        this.load.spritesheet('backgroundAnim', 'assets/img/fondo_cielo.png', {
            frameWidth: 960, 
            frameHeight: 540 
        });

        this.load.image('titulo', 'assets/img/titulo.png');
        this.load.image('buttonStart', 'assets/img/boton-de-play.png'); 
    }

    create() {
        
        
        this.anims.create({
            key: 'backgroundLoop',
            frames: this.anims.generateFrameNumbers('backgroundAnim', { start: 0, end: 33 }), 
            frameRate: 10, 
            repeat: -1 
        });

       
        this.background = this.add.sprite(0, 0, 'backgroundAnim').setOrigin(0, 0);
        this.background.play('backgroundLoop');

       
        this.scaleBackgroundToFit(this.background);

        
        this.titulo = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'titulo');
        this.titulo.setOrigin(0.5, 0.5); 

        this.titulo.setScale(2.0); 

        this.titulo.setDepth(1);

        this.background.setAlpha(0.7);

        this.createStartButton();

     
        window.addEventListener('resize', () => {
            this.scaleBackgroundToFit(this.background);
        });
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

    createStartButton() {
  
        const buttonY = this.titulo.y + this.titulo.height / 2 + 150; 


        const button = this.add.image(this.sys.game.config.width / 2, buttonY, 'buttonStart');

        
        button.setScale(0.3); 

       
        button.setDepth(0.9); 

        
        button.setInteractive();


        button.on('pointerover', () => {
            button.setTint(0x87ceeb);
        });

        
        button.on('pointerout', () => {
            button.clearTint(); 
        });

       
        button.on('pointerdown', () => {
            this.scene.start('MainMenuScene'); 
        });
    }
}

export default BackgroundScene;
