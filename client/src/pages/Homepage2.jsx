import { useState } from "react";
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
