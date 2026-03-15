import { useEffect } from "react";
import { useState } from "react";
import "../styles/home.css";

const SAMPLE_PARAGRAPH =
  "lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut metus justo, finibus et dictum eu, elementum sit amet mauris. Mauris commodo dui et mi porta, at pulvinar eros lacinia. Maecenas lectus est, malesuada ac tincidunt ac, faucibus vel purus. Cras sagittis nulla lorem, elementum vehicula sem mollis et. Duis ac nulla purus. Aenean tincidunt non sapien ac aliquam. Donec sed nulla arcu. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum vel est odio.";

export default function Home() {
  const [paragraph, setParagraph] = useState([]);
  const [startTimer, setStartTimer] = useState(null);
  const [input, setInput] = useState("");
  const [mismatch, setMismatch] = useState([]);

  useEffect(() => {
    setParagraph(
      SAMPLE_PARAGRAPH.split("").map((item) => ({
        value: item,
        color: "black",
        id: crypto.randomUUID(),
      })),
    );
  }, []);

  const changeColorForAll = (startIndex, endIndex, color) => {
    setParagraph((prev) =>
      prev.map((item, idx) => ({
        ...item,
        color:
          idx < startIndex
            ? "green"
            : idx >= startIndex && idx < endIndex
              ? color
              : "black",
      })),
    );
  };

  const handleKeyPress = (event) => {
    event.preventDefault();
    let pIndex = 0;
    let key = event.key;
    if (startTimer === null) {
      setStartTimer(Date.now());
    } else {
      pIndex = input.length;
    }
    if (key !== "Backspace") {
      if (key === paragraph[pIndex].value) {
        setParagraph((prev) => {
          const updated = [...prev];
          updated[pIndex] = { ...updated[pIndex], color: "green" };
          return updated;
        });
      } else {
        changeColorForAll(pIndex, SAMPLE_PARAGRAPH.length - 1, "red");
        setMismatch((prev) => [...prev, key]);
      }
      setInput((prev) => prev + key);
    } else {
      changeColorForAll(
        input.length - mismatch.length + 1,
        input.length,
        "red",
      );
      changeColorForAll(input.length + 1, SAMPLE_PARAGRAPH.length - 1, "black");
      setMismatch((prev) => prev.pop());
      setInput((prev) => prev.slice(prev.length - 2, prev.length - 1));
    }
  };

  return (
    <div
      tabIndex={0}
      autoFocus
      onKeyDown={(e) => handleKeyPress(e)}
      className="home"
    >
      {paragraph.map((item) => (
        <span key={item.id} style={{ color: item.color, fontSize: "50px" }}>
          {item.value}
        </span>
      ))}
    </div>
  );
}
