import { TreeImageSource } from "../constants/trees_data";
import { Tree } from "../objects/Tree";
import TilemapGenerator from "./TilemapGenerator";

export class TreeGenerator {
  /**
   *
   * @param {TilemapGenerator} worldGenerator
   */
  constructor(worldGenerator) {
    this.levelTrees = [];
    this.worldGenerator = worldGenerator;
  }

  addTreesLevel(worldLevel, treeMap = []) {
    const world = this.worldGenerator.getLevel(worldLevel);

    if (world.level === 0) return;

    const { mapWidth, mapHeight, offset } = world;

    const level_trees = [];

    for (let y = 0; y < treeMap.length; y++) {
      for (let x = 0; x < treeMap[y].length; x++) {
        if (treeMap[y][x] === 0) continue;
        const posX = x * (mapWidth / treeMap[y].length) + offset.x;
        const posY = y * (mapHeight / treeMap.length) + offset.y;

        const tree = new Tree({
          objID: `tree-${posX}-${posY}`,
          name: `tree:-${posX}-${posY}`,
          posX,
          posY,
          imageSource: TreeImageSource.pine_tree,
          frames: 7,
          frameBuffer: 10,
        });

        level_trees.push(tree);
      }
    }

    this.levelTrees.push({
      level: this.levelTrees.length + 1,
      trees: level_trees,
    });

    return this;
  }

  loadTrees(n) {
    const levelTrees = this.levelTrees[n - 1];
    if (!levelTrees) return this;

    const canvasScreen = this.worldGenerator.canvasScreen;

    if (!canvasScreen) return this;

    for (const tree of levelTrees.trees) {
      canvasScreen.registerObject(tree);
    }

    return this;
  }
}
