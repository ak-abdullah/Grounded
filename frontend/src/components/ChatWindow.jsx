import { useState } from "react";
import Message from "./Message";
import InputBox from "./InputBox";
import { sendMessage } from "../services/api";

function ChatWindow() {
  const [messages, setMessages] = useState([
    { id: 1, role: "user", content: "What is RAG?" },
    { id: 2, role: "assistant", content: "RAG stands for Retrieval-Augmented Generation." }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (text) => {
    const newMessage = {
      id: Date.now(),
      role: "user",
      content: text
    };
    setMessages([...messages, newMessage]);
    

    try {
      setIsLoading(true);
      const reply = await sendMessage(text);
      const assistantMessage = {
        id: Date.now(),
        role: "assistant",
        content: reply
      };
      setMessages([...messages, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="flex-1 overflow-y-auto p-5 flex flex-col min-h-0">
        {messages.map((msg) => (
          <Message
            key={msg.id}
            role={msg.role}
            content={msg.content}
          />
        ))}
         {isLoading && <Message role="assistant" content="..." />}
      </div>
      <InputBox onSend={handleSend} />
    </div>
  );
}

export default ChatWindow;
