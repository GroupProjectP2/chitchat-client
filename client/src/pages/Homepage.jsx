import { useEffect, useState } from "react";
import Conversation from "../components/Conversation";
import MessageInput from "../components/MessageInput";
import MessageProfileHeader from "../components/MessageProfileHeader";
import SearchInput from "../components/SearchInput";
import { socket } from "../utils/socket";

export default function Homepage() {
  const [currentMessage, setCurrentMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Ghazi",
      message: "tes hello",
    },
  ]);


  const sendMessage = (e) =>{
    e.preventDefault()
    const payload ={
      id: new Date().getTime(),
      sender: 'user1',
      message: currentMessage
    }
    socket.emit("sendMessage",payload)
    setMessages((prev) => [...prev, payload])
    setCurrentMessage("")
  }
  

  useEffect(() => {
    if (socket) {
      socket.on("hello", (msg) => {
        console.log(msg)
      })
      socket.emit("hello", "hellow from client"); 
      // socket.emit("setUser", localStorage.getItem("access_token"));
      socket.on("newMessage", (payload) => {
        setMessages((prev) => [...prev, payload])
      })
    }
  }, [socket]);

  return (
    <>
      <div className="container mt-5 border p-3">
        <div className="row gap-3">

          <div id="div1" className="col border p-2">
            <SearchInput></SearchInput>
            <div className='d-flex flex-column align-items-start justify-content-start px-2 my-3'>
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
            
            <Conversation></Conversation>
            <Conversation></Conversation>
            <Conversation></Conversation>
          </div>
          <div id="div2" className="col border p-2">
            <MessageProfileHeader></MessageProfileHeader>
            <MessageInput></MessageInput>
           
          </div>
        </div>
      </div>
    </>
  );
}
