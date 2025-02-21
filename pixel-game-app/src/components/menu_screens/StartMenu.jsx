import React from "react";

function StartMenu({ onClick = () => {} }) {
  return (
    <>
      <div className="text-center">
        <button
          className="border-2 p-2 w-[200px] bg-[rgba(0,0,0,0.3)] rounded-md pixel-font"
          onClick={onClick}
        >
          Start
        </button>
      </div>
    </>
  );
}

export default StartMenu;
