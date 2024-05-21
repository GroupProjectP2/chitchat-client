import { useEffect, useState } from "react";

export default function Chat({ socket, username, room }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);


    const sendMessage = async () => {
        if (currentMessage) {
            const messageData = {
                room,
                author: username,
                message: currentMessage,
                time:
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            };
            await socket.emit('send_message', messageData);
            setMessageList((list) => [...list, messageData])
        }
    };

    useEffect(() => {
        socket.on('receive_message', (messageData) => {
            console.log({ messageData })
            setMessageList((list) => [...list, messageData])
        })
    }, [socket])
    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>live chat</p>
            </div>
            <div className="chat-body">
                {messageList.map((messageContent) => {
                    return (
                        <div className="container border">
                            <div className="bg-primary">
                                <p>{messageContent.message}</p>
                            </div>
                            <div className="message-meta">
                                <p>{messageContent.time}</p>
                                <p>{messageContent.author}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="chat-footer">
                <input
                    type="text"
                    placeholder="hey..."
                    onChange={(e) => setCurrentMessage(e.target.value)}
                />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    );
}
