import StoryModeScene from "../scenes/modo_historia/scene_iniciar_modoH.js";
import BackgroundScene from '../scenes/scene_fondo.js';
//import StartScene from ../scenes/modo_historia/scene_start.js';
import MainMenuScene from '../scenes/scene_menu_principal.js';
import CharacterSelectionScene from '../scenes/modo_campal/Scene_seleccion/seleccion.js';
var config = {

    type:Phaser.AUTO,
    scale: {
        mode:Phaser.Scale.FIT, 
        autoCenter:Phaser.Scale.CENTER_BOTH, 
        width:1920,
        height:1080,
    },
    physics : {
        default:"arcade",  
        arcade: {
            gravity: { y :0},
            debug: true 
        }
    },

    scene:[BackgroundScene, MainMenuScene, StoryModeScene, CharacterSelectionScene]
}

var game = new Phaser.Game(config) 
var jugador;
var cursors;
var Enemigos;

