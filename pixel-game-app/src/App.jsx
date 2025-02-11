import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex justify-center place-items-center h-screen">
        <h1 className="text-2xl h-fit">Pixel Game - v 0.0.1</h1>
      </div>
    </>
  );
}

export default App;
