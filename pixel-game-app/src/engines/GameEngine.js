import { CanvasScreen } from "@jaymar921/2dgraphic-utils";
import TilemapGenerator from "../handlers/TilemapGenerator";
import { world_collider, world_map_img_source } from "../constants/world_data";

export default class GameEngine {
  /**
   *
   * @param {CanvasScreen} canvasScreen
   */
  constructor(canvasScreen) {
    this.canvasScreen = canvasScreen;
    this.world = new TilemapGenerator(canvasScreen);
  }

  initializeWorld(onLoadCallback = () => {}) {
    const { width: screenWidth, height: screenHeight } =
      this.canvasScreen.canvasElement;

    // initialize world
    this.world
      .addLevel(
        world_map_img_source,
        1600,
        1280,
        {
          x: -(1600 / 2 - screenWidth / 2),
          y: -(1280 / 2 - screenHeight / 2),
        },
        TilemapGenerator.convertSingleArrayMapTo2DArray(
          world_collider,
          { row: 50, column: 40 },
          1
        )
      )
      .loadLevel(1)
      .zoomInAnimation(0.2, onLoadCallback);

    return this;
  }
}
