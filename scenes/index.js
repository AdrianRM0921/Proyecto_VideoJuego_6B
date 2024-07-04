
import BackgroundScene from './scene_fondo.js';
import MainMenuScene from './scene_menu_principal.js';
import StoryModeScene from './modo_historia/scene_iniciar_modoH.js';
import PauseScene from './pausa/scene_pausa.js';
import GameOverScene from'./modo_historia/players/scene_over.js'
import CharacterSelectionScene from './modo_campal/Scene_seleccion/seleccion.js';

const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080,
    },
    scene: [BackgroundScene, MainMenuScene, StoryModeScene, PauseScene, GameOverScene, CharacterSelectionScene],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 },
            debug: false
        }
    }
};

const game = new Phaser.Game(config);