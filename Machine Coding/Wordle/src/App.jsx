import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import Home from "./pages/Home";

const WORDS = Object.freeze([
  "APPLE",
  "BEAST",
  "FAINT",
  "FEAST",
  "FRUIT",
  "GAMES",
  "PAINT",
  "PASTE",
  "TOWER",
  "REACT",
]);

function App() {
  const [isReset, setIsReset] = useState(false);
  const [word, setWord] = useState(
    WORDS[Math.floor(Math.random() * WORDS.length)],
  );

  const toggleReset = () => {
    setIsReset(!isReset);
  };

  useEffect(() => {
    setWord(WORDS[Math.floor(Math.random() * WORDS.length)]);
  }, [isReset]);

  return (
    <>
      <Home inputWord={word} toggleReset={() => toggleReset()} />
    </>
  );
}

export default App;
