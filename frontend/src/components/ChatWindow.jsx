import { useState, useRef, useEffect } from "react";
import { Sparkles } from "lucide-react";
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
    <div className="flex flex-col flex-1 min-h-0 bg-linear-to-b from-slate-50/80 to-white">
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto min-h-0 px-4 py-6 sm:px-8"
        aria-label="Chat messages"
      >
        <div className="max-w-3xl mx-auto">
          {messages.length === 0 && !isLoading ? (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
              <div className="h-16 w-16 rounded-2xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-xl shadow-blue-500/30 mb-8">
                <Sparkles className="h-8 w-8" strokeWidth={1.75} aria-hidden />
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight m-0 mb-3">
                How can I help you today?
              </h2>
              <p className="text-slate-500 text-[15px] max-w-md leading-relaxed m-0 mb-10">
                Ask anything. I’ll search your uploaded documents and answer with
                grounded, accurate responses.
              </p>
              <div className="flex flex-wrap gap-2 justify-center max-w-lg">
                {[
                  "What are the main points?",
                  "Summarize my documents",
                  "Explain in simple terms",
                ].map((label) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => handleSend(label)}
                    className="px-5 py-2.5 rounded-full text-sm font-medium text-slate-700 bg-white border border-slate-200 shadow-sm hover:border-blue-300 hover:bg-blue-50/50 hover:text-blue-900 transition-all duration-200 motion-reduce:transition-none"
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
      </div>
      <InputBox onSend={handleSend} disabled={isLoading} />
    </div>
  );
}

export default ChatWindow;
