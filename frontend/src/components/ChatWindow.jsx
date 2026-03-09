import { useState, useRef, useEffect } from "react";
import Message from "./Message";
import InputBox from "./InputBox";
import { sendMessage } from "../services/api";
import TypingIndicator from "./TypingIndicator";

function ChatWindow({ messages, setMessages, sessionId }) {
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages?.length, isLoading]);

  const handleSend = async (text) => {
    const newMessage = {
      id: Date.now(),
      role: "user",
      content: text,
    };
    setMessages((prev) => [...prev, newMessage]);

    try {
      setIsLoading(true);
      const reply = await sendMessage(text, sessionId);
      const assistantMessage = {
        id: Date.now(),
        role: "assistant",
        content: reply,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        id: Date.now(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-5 flex flex-col min-h-0"
      >
        {messages.length === 0 && !isLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-6 px-4">
            <h2 className="text-xl font-medium text-gray-800 text-center m-0">
              How can I help you today?
            </h2>
            <p className="text-sm text-gray-500 text-center max-w-md m-0">
              Ask anything. I’ll use your documents to give accurate answers.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                "What is RAG?",
                "Summarize my documents",
                "Explain in simple terms",
              ].map((label) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => handleSend(label)}
                  className="px-4 py-2.5 rounded-full text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-200 transition-colors"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.length > 0 && (
            <>
              {messages.map((msg) => (
                <Message key={msg.id} role={msg.role} content={msg.content} />
              ))}
              {isLoading && <TypingIndicator />}
            </>
          )
        )}
      </div>
      <InputBox onSend={handleSend} disabled={isLoading} />
    </div>
  );
}

export default ChatWindow;
