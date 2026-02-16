import { useState } from "react";
import Message from "./Message";
import InputBox from "./InputBox";

function ChatWindow() {
  const [messages, setMessages] = useState([
    { id: 1, role: "user", content: "What is RAG?" },
    { id: 2, role: "assistant", content: "RAG stands for Retrieval-Augmented Generation." }
  ]);


  const handleSend = (text) => {
    const newMessage = {
      id: Date.now(),
      role: "user",
      content: text
    }
    setMessages([...messages, newMessage]);
  }
  return (
    <div>
      <div
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          height: "80vh",
          overflowY: "auto"
        }}
      >
        {messages.map((msg) => (
          <Message
            key={msg.id}
            role={msg.role}
            content={msg.content}
          />
        ))}
      </div>
      <InputBox onSend={handleSend} />
    </div>
  ) 
}

export default ChatWindow

