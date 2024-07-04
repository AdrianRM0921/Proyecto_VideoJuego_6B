class BattleModeScene extends Phaser.Scene {
    constructor(scene) {
        
        super({ key: 'BattleModeScene' });
        this.myScene = scene
    }

 
        preload ()  {
            this.load.image("fondo","/assets/img/noche.jpg");
            this.load.image("Pisos","assets/img/Pisos.png"); // donde estan los patrones
            this.load.tilemapTiledJSON("tilemap","/scenes/modo_campal/level1_1.0.0.json") // donde esta el achivo json
        

        }
        create () {

            this.map = this.myScene.make.tilemap({key: 'tilemap'})
            this.tileset = this.map.addTilesetImage('Capa de patrones 1','Pisos')
            this.layer1 = this.map.createLayer("BattleModeScene", this.tileset, 0, 0)

            this.layer1.setCollisionByProperty({ collision: true });


                    // Fondo de la escena
        

        }

    }
   


export default BattleModeScene;