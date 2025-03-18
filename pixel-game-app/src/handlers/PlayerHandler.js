import { CanvasScreen, SpriteType } from "@jaymar921/2dgraphic-utils";
import Player from "../objects/Player";
import player_idle_left from "../assets/pixel-game-images/PLAYER-1-LEFT.png";
import player_idle_right from "../assets/pixel-game-images/PLAYER-1-RIGHT.png";
import player_walk_left from "../assets/pixel-game-images/PLAYER-1-LEFT-WALK.png";
import player_walk_right from "../assets/pixel-game-images/PLAYER-1-RIGHT-WALK.png";

export default class PlayerHandler {
  /**
   *
   * @param {CanvasScreen} canvasScreen
   * @returns
   */
  constructor(canvasScreen, name = "someone") {
    if (!canvasScreen) return;
    this.canvasScreen = canvasScreen;
    this.player = null;
    this.name = name;
  }

  initializePlayer(posX = 0, posY = 0) {
    const player = new Player({
      objID: "player-1",
      name: this.name,
      type: SpriteType.PLAYER,
      posX,
      posY,
      imageSource: player_idle_left,
      frames: 8,
      animations: {
        idleLeft: {
          frames: 8,
          imageSource: player_idle_left,
        },
        idleRight: {
          frames: 8,
          imageSource: player_idle_right,
        },
        walkLeft: {
          frames: 6,
          imageSource: player_walk_left,
        },
        walkRight: {
          frames: 6,
          imageSource: player_walk_right,
        },
      },
      hitbox: {
        x: 8,
        width: 16,
        y: 10,
        height: 22,
      },
    });

    // add player to the canvas
    this.player = player;
    this.canvasScreen.registerObject(this.player);
  }

  loadControls() {
    // register player move event
    this.canvasScreen.handleScreenClickedEvent(this.playerMoveEvent);
  }

  playerMoveEvent(event) {
    const { layers, mousePosition, type, objID } = event;

    if (layers.length === 0) return;

    console.log(layers);
  }
}
