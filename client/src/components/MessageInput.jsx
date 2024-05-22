import { useState, useEffect } from "react";
import { socket } from "../utils/socket";
export default function MessageInput({ fullName }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = (e) => {
    e.preventDefault();
    const payload = {
      id: localStorage.getItem("user_id"),
      sender: fullName,
      message: currentMessage,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };
    socket.emit("sendMessage", payload);
    setMessages((prev) => [...prev, payload]);
    setCurrentMessage("");
  };

  useEffect(() => {
    if (socket) {
      socket.on("hello", (msg) => {
        console.log(msg);
      });

      socket.emit("hello", "hellow from client");

      socket.on("newMessage", (payload) => {
        setMessages((prev) => [...prev, payload]);
      });
    }
  }, [socket]);
  return (
    <>
      <div className="d-flex flex-column align-items-start justify-content-start px-2 my-3">
        {messages.map((msg) => (
          <span key={msg.id}>
            <strong>{msg.sender}</strong>: {msg.message}
          </span>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Type your message here..."
            aria-label="Type your message here..."
            aria-describedby="button-addon2"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
          />
          <button
            className="btn btn-outline-secondary"
            type="submit"
            id="button-addon2"
          >
            Send
          </button>
        </div>
      </form>
    </>
  );
}
