import { useEffect, useState } from "react";
import { socket } from "../utils/socket";
import Chat from "./Chat";

export default function Homepage() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username && room) {
      socket.emit("join_room", room);
      setShowChat(true)
    }
  };

  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Ghazi",
      message: "tes hello",
    },
  ]);

  const sendMessage = (e) => {
    e.preventDefault();
    const payload = {
      sender: "user1",
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
        <div className="App">
          <div className="joinChatContainer">
            <div> Join A chat</div>
            <input
              type="text"
              placeholder="Your Name..."
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              placeholder="Room Id..."
              onChange={(e) => setRoom(e.target.value)}
            />
            <button onClick={joinRoom}>Join A room</button>
            
           
            <Chat socket={socket} username={username} room={room} />
          </div>
            
        </div>
    </>
  );
}
