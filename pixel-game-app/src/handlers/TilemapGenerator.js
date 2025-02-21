import { CanvasScreen, Sprite } from "@jaymar921/2dgraphic-utils";
import { collisionBlockImage } from "../constants/world_data";

export default class TilemapGenerator {
  /**
   *
   * @param {CanvasScreen} CanvasScreen
   */
  constructor(CanvasScreen) {
    this.canvasScreen = CanvasScreen;
    this.levels = [];
  }

  addLevel(
    tileMapImageSource,
    mapWidth,
    mapHeight,
    offset = { x: 0, y: 0 },
    colliders = []
  ) {
    const levelSprite = new Sprite({
      objID: `level-${this.levels.length + 1}`,
      name: `level-${this.levels.length + 1}`,
      posX: offset.x,
      posY: offset.y,
      imageSource: tileMapImageSource,
    });

    const colliderSprites = [];

    let width = colliders.length,
      height = colliders[0]?.length ?? 0;
    for (let y = 0; y < colliders.length; y++) {
      for (let x = 0; x < colliders[y].length; x++) {
        if (colliders[y][x] === 0) continue;
        const posX = x * (mapWidth / colliders[y].length) + offset.x;
        const posY = y * (mapHeight / colliders.length) + offset.y;
        const colliderSprite = new Sprite({
          objID: `collider-${posX}-${posY}`,
          name: "id-" + colliders[y][x],
          posX,
          posY,
          imageSource: collisionBlockImage,
        });
        colliderSprites.push(colliderSprite);
      }
    }

    this.levels.push({
      level: this.levels.length + 1,
      map: levelSprite,
      colliders: colliderSprites,
      mapWidth,
      mapHeight,
      width,
      height,
      offset,
      boxSize: mapHeight / colliders.length,
    });

    return this;
  }

  loadLevel(n) {
    const level = this.levels[n - 1];
    if (!level) return this;

    this.canvasScreen.registerObject(level.map);

    for (const collider of level.colliders) {
      this.canvasScreen.registerObject(collider);
    }

    return this;
  }

  /**
   *
   * @param {Number} n
   * @returns {{ level: Number, map: Sprite, colliders: Array<Number>, mapWidth: Number, mapHeight: Number, width: Number, height: Number, boxSize: Number, offset: {x : Number, y: Number} }}
   */
  getLevel(n) {
    return (
      this.levels[n - 1] ?? {
        level: 0,
        map: "",
        colliders: [],
        mapWidth: 0,
        mapHeight: 0,
        width: 0,
        height: 0,
        boxSize: 0,
        offset: { x: 0, y: 0 },
      }
    );
  }

  zoomInAnimation(from, afterAnimationCallback = () => {}, speed = 0.008) {
    setTimeout(() => {
      let scale = from;

      const { width, height } = CanvasScreen.screen;
      const id = setInterval(async () => {
        if (!this.canvasScreen) return;
        if (scale >= 1) {
          clearInterval(id);
          afterAnimationCallback();
          return;
        }

        const globalScale = this.canvasScreen.globalScale;

        this.canvasScreen.setGlobalScale((scale += speed));
        const { x, y } = CanvasScreen.cameraOffset;

        const centerX =
          (CanvasScreen.fixedCameraOffset.x +
            (CanvasScreen.fixedCameraOffset.x + width)) /
          2;
        const centerY =
          (CanvasScreen.fixedCameraOffset.y +
            (CanvasScreen.fixedCameraOffset.y + height)) /
          2;

        const newX = centerX - (centerX - x) / (scale / globalScale);
        const newY = centerY - (centerY - y) / (scale / globalScale);

        this.canvasScreen.setCameraOffset(newX, newY);
      }, 10);
    }, 100);
    return this;
  }

  getBoxCollider(n) {
    const level = this.levels[n - 1];
    if (!level) return;

    const colliders = [];
    for (const collider of level.colliders) {
      colliders.push({
        x: collider.posX,
        y: collider.posY,
        width: level.boxSize,
        height: level.boxSize,
        name: collider.name,
      });
    }

    return colliders;
  }

  static convertSingleArrayMapTo2DArray = (
    arr = [],
    dimension = { row: 0, column: 0 },
    value = undefined
  ) => {
    const newArr = [];

    let i = 0;

    for (let r = 0; r < dimension.row; r++) {
      const colArr = [];

      for (let c = 0; c < dimension.column; c++) {
        let val = arr[i++];

        if (val !== null || val !== undefined) {
          if (value !== undefined && val !== 0) val = value;
          colArr.push(val);
        }
      }

      newArr.push(colArr);
    }

    return newArr;
  };
}
