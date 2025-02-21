import React from "react";

function MainMenu({ gameEngine, setShowMenu = () => {} }) {
  return (
    <div className="text-center p-2 rounded-xl border-2 border-[#d0ac77] bg-[#Fffdd0] text-black">
      <h1 className="text-xl pixel-font">Pixel Game v1.0</h1>
      <p>
        Created by:{" "}
        <a
          className="font-bold text-blue-600"
          href="https://jayharronabejar.vercel.app"
          target="_blank"
        >
          JayMar921
        </a>
      </p>
      <button
        className="border-2 p-2 w-[200px] bg-[rgba(0,0,0,0.3)] rounded-md pixel-font"
        onClick={() => {
          setShowMenu(false);
        }}
      >
        Start
      </button>
    </div>
  );
}

export default MainMenu;
