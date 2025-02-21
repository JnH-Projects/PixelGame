import React, { useState } from "react";
import { menu_screen } from "../constants/menu_data";
import StartMenu from "./menu_screens/StartMenu";
import MainMenu from "./menu_screens/MainMenu";

function Menu({ gameEngine, setShowMenu = () => {} }) {
  const [screen, setScreen] = useState(menu_screen.start);

  function handleMenuStart() {
    setScreen(menu_screen.menu);
    gameEngine.playBackgroundMusic();
  }

  function loadMenuScreen(screen) {
    switch (screen) {
      case menu_screen.start:
        return <StartMenu onClick={handleMenuStart} />;
      case menu_screen.menu:
        return <MainMenu gameEngine={gameEngine} setShowMenu={setShowMenu} />;
      default:
        return <></>;
    }
  }

  return (
    <div className="absolute w-screen h-screen bg-[rgba(0,0,0,0.5)] flex place-content-center items-center">
      <div className="relative w-[300px] p-2">{loadMenuScreen(screen)}</div>
    </div>
  );
}

export default Menu;
