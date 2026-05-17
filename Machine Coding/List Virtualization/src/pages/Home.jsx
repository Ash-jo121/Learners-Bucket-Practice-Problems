import React, { useState } from "react";
import "../styles/Home.css";
import Item from "../components/Item";

const items = Array.from({ length: 10000 }, (_, i) => ({
  id: i,
  text: `Item ${i + 1}`,
}));

export default function Home() {
  const [itemsList, setItemsList] = useState(items.slice(0, 18));
  const [startIndex, setStartIndex] = useState(0);

  const handleScroll = (event) => {
    const scrollTop = event.target.children[0].getBoundingClientRect().top; // ← stable, doesn't change on re-render
    let startIdx = Math.max(0, Math.floor(Math.abs(scrollTop) / 40) - 3);
    setStartIndex(startIdx);
    const endIndex = Math.min(items.length, startIdx + 16 + 6);
    setItemsList((prev) => items.slice(startIdx, endIndex));
  };

  return (
    <div className="home" onScroll={handleScroll}>
      {/* Inner div maintains total scroll height */}
      <div style={{ height: `${items.length * 40}px` }}>
        <div style={{ transform: `translateY(${startIndex * 40}px)` }}>
          {itemsList.map((item) => (
            <Item key={item.id}>{item.text}</Item>
          ))}
        </div>
      </div>
    </div>
  );
}
