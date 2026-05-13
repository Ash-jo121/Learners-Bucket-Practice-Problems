import "../styles/MessageBlock.css";

export default function MessageBlock({ message }) {
  return (
    <div className="message-block">
      <div className="user-block">{message.user}</div>
      <div className="ai-block">{message.ai}</div>
    </div>
  );
}
