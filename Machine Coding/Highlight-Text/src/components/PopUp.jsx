import React from "react";

export default function PopUp({ x, y }) {
  return (
    <div
      style={{
        display: "flex",
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
      }}
    >
      <div>Twitter</div>
      <div>Medium</div>
    </div>
  );
}
