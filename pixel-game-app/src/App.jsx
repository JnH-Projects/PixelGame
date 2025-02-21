import { useEffect, useState } from "react";
import "./App.css";
import { useCanvas } from "./hooks/useCanvas";
import GameEngine from "./engines/GameEngine";

function App() {
  const canvasScreen = useCanvas(
    "canvas-screen",
    window.innerWidth,
    window.innerHeight,
    "#25220E"
  );
  const [gameEngine, setGameEngine] = useState(null);

  const loginPlayer = () => {};

  useEffect(() => {
    if (!canvasScreen.getScreen() && !gameEngine) return;
    canvasScreen.enableScreenDrag(true);
    canvasScreen.enableScreenZoom(true);

    // initialize the game engine
    if (!gameEngine) {
      const engine = new GameEngine(canvasScreen.getScreen());
      engine.initializeWorld(loginPlayer);
      setGameEngine(engine);
    }
  }, [canvasScreen, gameEngine]);

  return (
    <>
      <div className="flex justify-center place-items-center h-screen">
        <canvas className="w-full h-full" id="canvas-screen"></canvas>
      </div>
    </>
  );
}

export default App;
