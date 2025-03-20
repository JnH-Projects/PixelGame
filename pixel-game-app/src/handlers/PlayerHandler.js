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
    this.target = {
      x: 0,
      y: 0,
    };
    this.prevDirection = "left";
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
        x: 4,
        width: 10, // 4 + 10 + 4 = 18
        y: 2,
        height: 20,
      },
    });

    this.target = {
      x: posX,
      y: posY,
    };
    // add player to the canvas
    this.player = player;
    this.canvasScreen.registerObject(this.player);
  }

  loadControls() {
    // register player move event
    this.canvasScreen.handleScreenClickedEvent((e) =>
      this.changeDirectionCoordinate(e, this)
    );

    setInterval(() => this.movePlayerTowardDirection(this), 100);
  }

  /**
   *
   * @param {*} event
   * @param {PlayerHandler} screen
   * @returns
   */
  changeDirectionCoordinate(event, playerHandler) {
    const { mousePosition } = event;
    const player = playerHandler.player;
    const screen = playerHandler.canvasScreen;

    // set the new direction
    const x =
      (mousePosition.x -
        (player.width / 2) * player.scale * screen.globalScale) /
      screen.globalScale;
    const y =
      (mousePosition.y -
        (player.height / 2) * player.scale * screen.globalScale) /
      screen.globalScale;

    playerHandler.target = {
      x,
      y,
    };
  }

  movePlayerTowardDirection(playerHandler) {
    const player = playerHandler.player;
    const target = playerHandler.target;
    const gS = playerHandler.canvasScreen.globalScale;

    if (target.x === null || target.y === null) {
      if (this.prevDirection === "left") player.switchAnimation("idleLeft");
      else player.switchAnimation("idleRight");
      return;
    }

    const speed = 2;

    const hitbox = player.getHitbox();

    let dx = target.x - (hitbox.x + hitbox.width / 2);
    let dy = target.y - (hitbox.y + hitbox.height / 2);
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < speed) {
      // Stop moving if close to target
      target.x = null;
      target.y = null;
      return;
    }
    // Normalize movement vector
    let moveX = (dx / distance) * speed;
    let moveY = (dy / distance) * speed;

    if (moveX < 0) {
      this.prevDirection = "left";
      player.switchAnimation("walkLeft");
    } else if (moveX > 0) {
      this.prevDirection = "right";
      player.switchAnimation("walkRight");
    }
    // Move player
    player.posX += moveX;
    //this.checkForHorizontalCollision(["id-1"]);

    player.posY += moveY;
    //this.checkForVerticalCollision(["id-1"]);

    // if player collide with a specific collision block id
    // const collisionId = this.checkAllDirectionCollision(["id-2", "id-3", "id-4"]);
    // for(const cbks of this.callbacks) cbks({
    //     collisionId: collisionId,
    //     position: { x: player.posX, y: player.posY }
    // })
  }
}
