import { useEffect, useState } from "react";
import "../styles/Home.css";

const arr = Array.from({ length: 30 }, () => ({
  id: crypto.randomUUID(),
  val: "",
  color: "white",
}));

export default function Home({ inputWord, toggleReset }) {
  const [inputElements, setInputElements] = useState(arr);
  const [pointer, setPointer] = useState(1);
  const [level, setLevel] = useState(1);
  const [typedWord, setTypedWord] = useState("");
  const inputSet = new Set(inputWord);

  const handleComparison = () => {
    for (let i = 0; i < 5; i++) {
      let idx = pointer - (5 - i) - 1;
      if (inputWord[i] === typedWord[i]) {
        setInputElements((prev) =>
          prev.map((item, index) =>
            index === idx ? { ...item, color: "green" } : item,
          ),
        );
      } else if (inputSet.has(typedWord[i])) {
        setInputElements((prev) =>
          prev.map((item, index) =>
            index === idx ? { ...item, color: "yellow" } : item,
          ),
        );
      } else {
        setInputElements((prev) =>
          prev.map((item, index) =>
            index === idx ? { ...item, color: "gray" } : item,
          ),
        );
      }
    }
  };

  useEffect(() => {
    if (level === 7) {
      setTimeout(() => {
        setInputElements((prev) =>
          prev.map((item) => ({ ...item, color: "white", val: "" })),
        );
        toggleReset();
      }, 5000);
    }
  }, [level]);

  const handleKeyDown = (event) => {
    if (level > 6) {
      return;
    }

    if (event.key === "Enter" && pointer === level * 5 + 1) {
      handleComparison();
      setLevel((prev) => prev + 1);
      setTypedWord("");
      return;
    }

    if (pointer > level * 5) {
      return;
    }

    if (event.key.length !== 1) {
      return;
    }

    setInputElements((prev) =>
      prev.map((item, index) =>
        index === pointer - 1
          ? { ...item, val: event.key.toUpperCase() }
          : item,
      ),
    );

    setTypedWord((prev) => prev + event.key.toUpperCase());
    setPointer((prev) => prev + 1);
  };

  return (
    <div className="home-grid" onKeyDown={(e) => handleKeyDown(e)} tabIndex={0}>
      {inputElements.map((item) => (
        <div
          className="cell"
          key={item.id}
          style={{ backgroundColor: `${item.color}` }}
        >
          {item.val}
        </div>
      ))}
    </div>
  );
}
