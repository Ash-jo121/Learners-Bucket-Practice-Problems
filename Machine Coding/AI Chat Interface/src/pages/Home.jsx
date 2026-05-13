import { useEffect, useState } from "react";
import "../styles/Home.css";
import { useQueueContext } from "../context/QueueContext";
import ChatBox from "../components/ChatBox";

export default function Home() {
  const [search, setSearch] = useState("");
  const [chatList, setChatList] = useState([]);
  const { addCallback, callbackQueue } = useQueueContext();

  const handleSearch = () => {
    setChatList((prev) => [...prev, search]);
    addCallback({ chatText: search });
  };

  return (
    <div className="dashboard">
      {callbackQueue.map((item) => (
        <ChatBox chatData={item} key={item.id} />
      ))}
      <div className="home">
        <input
          placeholder="Ask AI"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />{" "}
        <button className="ai-button" onClick={handleSearch}>
          AI
        </button>
      </div>
    </div>
  );
}
