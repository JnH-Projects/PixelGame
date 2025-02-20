import { useEffect, useState } from "react";
import "./App.css";
import { useCanvas } from "./hooks/useCanvas";
import TilemapGenerator from "./handlers/TilemapGenerator";
import { world_collider, world_map_img_source } from "./constants/world_data";
import { CanvasScreen } from "@jaymar921/2dgraphic-utils";

function App() {
  const canvasScreen = useCanvas(
    "canvas-screen",
    window.innerWidth,
    window.innerHeight,
    "#25220E"
  );
  const [world, setWorld] = useState(null);

  const loginPlayer = () => {};

  useEffect(() => {
    if (!canvasScreen.getScreen() && !world) return;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    canvasScreen.enableScreenDrag(true);
    canvasScreen.enableScreenZoom(true);

    if (!world) {
      const worldGen = new TilemapGenerator(canvasScreen.getScreen())
        .addLevel(
          world_map_img_source,
          1600,
          1280,
          {
            x: -(1600 / 2 - screenWidth / 2),
            y: -(1280 / 2 - screenHeight / 2),
          },
          TilemapGenerator.convertSingleArrayMapTo2DArray(world_collider)
        )
        .loadLevel(1)
        .zoomInAnimation(0.2, loginPlayer);
      setWorld(worldGen);
    }
  }, [canvasScreen, world]);

  return (
    <>
      <div className="flex justify-center place-items-center h-screen">
        <canvas className="w-full h-full" id="canvas-screen"></canvas>
      </div>
    </>
  );
}

export default App;
