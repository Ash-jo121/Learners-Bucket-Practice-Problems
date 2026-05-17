import React, { useEffect, useState } from "react";
import "../styles/Home.css";

const items = Array.from({ length: 10000 }, (_, i) => ({
  id: i,
  text: `Item ${i + 1}`,
}));
export default function Home() {
  const [itemElements, setItemElements] = useState(items.slice(0, 100));
  const [pointer, setPointer] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleInfiniteScroll = () => {
    setPointer((prev) => prev + 1);
  };

  const updateItems = () => {
    setIsLoading(true);
    setTimeout(() => {
      setItemElements((prev) => [
        ...prev,
        ...items.slice(pointer * 100, (pointer + 1) * 100),
      ]);
    }, 500);
  };

  useEffect(() => {
    const newElement = document.getElementById("sentinel");
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.0,
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        handleInfiniteScroll();
      }
    }, options);
    if (newElement) {
      observer.observe(newElement);
    }
  }, []);

  useEffect(() => {
    setIsLoading(false);
  }, [itemElements]);

  useEffect(() => {
    updateItems();
  }, [pointer]);

  return (
    <>
      <div id="scrollArea" className="layout">
        {itemElements.map((item) => (
          <div key={item.id}>{item.text}</div>
        ))}
      </div>
      <div id="sentinel"></div>
      {isLoading ? <div>Loading.....</div> : <></>}
    </>
  );
}
