import { Sprite } from "@jaymar921/2dgraphic-utils";

export class Tree extends Sprite {
  /**
   *
   */
  constructor({
    objID,
    name,
    posX,
    posY,
    width,
    height,
    imageSource,
    animations,
    collider = { offsetX: 0, offsetY: 0 },
    frames = 1,
    frameBuffer = 3,
    loop = true,
    autoPlay = true,
    scale = 1,
    imageSmoothingEnabled = false,
    type = "TREE",
  }) {
    super({
      objID,
      name,
      posX,
      posY,
      width,
      height,
      imageSource,
      animations,
      frames,
      frameBuffer,
      loop,
      autoPlay,
      scale,
      imageSmoothingEnabled,
      type,
    });
    this.collider = collider;
  }
}
