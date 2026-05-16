import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import Home from "./pages/Home";

const gridSize = 5;
const winSize = 4;
function App() {
  return (
    <>
      <Home gridSize={gridSize} winSize={winSize} />
    </>
  );
}

export default App;
