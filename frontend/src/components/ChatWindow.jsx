import { useState, useRef, useEffect } from "react";
import Message from "./Message";
import InputBox from "./InputBox";
import { sendMessage } from "../services/api";
import TypingIndicator from "./TypingIndicator";

function ChatWindow() {
  const [messages, setMessages] = useState([
    { id: 1, role: "user", content: "What is RAG?" },
    { id: 2, role: "assistant", content: "RAG stands for Retrieval-Augmented Generation." }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages.length, isLoading]);

  const handleSend = async (text) => {
    const newMessage = {
      id: Date.now(),
      role: "user",
      content: text
    };
    setMessages((prev) => [...prev, newMessage])
    

    try {
      setIsLoading(true);
      const reply = await sendMessage(text);
      const assistantMessage = {
        id: Date.now(),
        role: "assistant",
        content: reply
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        id: Date.now(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again."
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 flex flex-col min-h-0">
        {messages.map((msg) => (
          <Message
            key={msg.id}
            role={msg.role}
            content={msg.content}
          />
        ))}
         {isLoading && <TypingIndicator />}
      </div>
      <InputBox onSend={handleSend} disabled={isLoading} />
    </div>
  );
}

export default ChatWindow;
