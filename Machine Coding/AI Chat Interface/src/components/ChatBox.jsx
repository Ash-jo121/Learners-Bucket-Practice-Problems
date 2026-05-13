import { useEffect, useState } from "react";
import "../styles/ChatBox.css";
export default function ChatBox({ chatData }) {
  return (
    <div className="chatbox">
      <div>{chatData.title}</div>
      <div>{chatData.status}</div>
      {chatData.processes.map((process) => (
        <div style={{ display: "flex", gap: "4px" }} key={process.name}>
          <div>{process.name}</div>
          <div>{process.status}</div>
        </div>
      ))}
    </div>
  );
}
