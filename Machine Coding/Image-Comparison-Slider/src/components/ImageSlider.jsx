import { useRef, useState } from "react";
import "../styles/ImageSlider.css";

export default function ImageSlider() {
  const sliderRef = useRef(null);
  const holderRef = useRef(null);
  const containerRef = useRef(null);
  const [isSliderMoving, setIsSliderMoving] = useState(false);

  const handleSliderMouseDown = (e) => {
    e.preventDefault();
    setIsSliderMoving(true);
  };

  const handleSliderMove = (e) => {
    if (!isSliderMoving) return;
    e.preventDefault();
    const containerRect = containerRef.current.getBoundingClientRect();
    const containerX = containerRect.left;
    const containerY = containerRect.top;
    const containerWidth = containerRect.width;
    const posX = e.clientX - containerX;
    const posY = e.clientY - containerY;
    console.log(posX, containerX);
    if (posX < 0 || posX > containerWidth || posY < 195 || posY > 205) {
      return;
    }
    holderRef.current.style.left = `${posX}px`;
    holderRef.current.style.top = `${posY}px`;
    sliderRef.current.style.left = `${posX}px`;
    sliderRef.current.style.top = `${posY}px`;
  };

  const handleSliderMouseUp = (e) => {
    e.preventDefault();
    setIsSliderMoving(false);
  };

  return (
    <div className="body" onMouseUp={(e) => handleSliderMouseUp(e)}>
      <div className="container" ref={containerRef}>
        <div
          className="slider-hold"
          ref={holderRef}
          onMouseDown={(e) => handleSliderMouseDown(e)}
          onMouseMove={(e) => handleSliderMove(e)}
        ></div>
        <div ref={sliderRef} className="slider"></div>
        <div className="top-image">
          <img src="src/assets/hero.png" height={400} width={400} />
        </div>
        <div className="bottom-image">
          <img src="src/assets/image1.png" height={400} width={400} />
        </div>
      </div>
    </div>
  );
}
