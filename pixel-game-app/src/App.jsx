import { useEffect, useState } from "react";
import "./App.css";
import { useCanvas } from "./hooks/useCanvas";
import GameEngine from "./engines/GameEngine";
import Menu from "./components/Menu";

function App() {
  const canvasScreen = useCanvas(
    "canvas-screen",
    window.innerWidth,
    window.innerHeight,
    "#25220E"
  );
  const [gameEngine, setGameEngine] = useState(null);
  const [showMenu, setShowMenu] = useState(true);

  useEffect(() => {
    if (!canvasScreen.getScreen() && !gameEngine) return;
    canvasScreen.enableScreenDrag(true);
    canvasScreen.enableScreenZoom(true);

    // initialize the game engine
    if (!gameEngine) {
      const engine = new GameEngine(canvasScreen.getScreen());
      engine.initializeWorld();
      setGameEngine(engine);
    }
  }, [canvasScreen, gameEngine]);

  return (
    <>
      {showMenu && <Menu gameEngine={gameEngine} setShowMenu={setShowMenu} />}
      <div className="flex justify-center place-items-center h-screen">
        <canvas className="w-full h-full" id="canvas-screen"></canvas>
      </div>
    </>
  );
}

export default App;
