import { useState } from "react";
import ChatWindow from "./components/ChatWindow";
import UploadPage from "./components/UploadPage";

const SESSION_KEY = "grounded_session_id";

function getOrCreateSessionId() {
  const id = crypto.randomUUID();
  localStorage.setItem(SESSION_KEY, id);
  return id;
}

function App() {
  const [messages, setMessages] = useState([]);
  const [view, setView] = useState("chat");
  const [sessionId, setSessionId] = useState(() => {
    const stored = localStorage.getItem(SESSION_KEY);
    return stored || getOrCreateSessionId();
  });

  const handleNewChat = () => {
    setMessages([]);
    setSessionId(getOrCreateSessionId());
  };

  return (
    <div className="flex h-screen bg-[#f5f5f5]">
      <div className="w-[260px] bg-[#111827] text-white p-5 box-border flex flex-col">
        <h2 className="mt-0">Grounded</h2>
        <p
          className="opacity-70 cursor-pointer mt-5 hover:opacity-100"
          onClick={() => setView("chat")}
        >
          Chat
        </p>
        <p
          className="opacity-70 cursor-pointer mt-2 hover:opacity-100"
          onClick={() => setView("upload")}
        >
          Upload
        </p>
        <p
          className="opacity-70 cursor-pointer mt-5 hover:opacity-100"
          onClick={handleNewChat}
        >
          + New Chat
        </p>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="h-[60px] border-b border-[#ddd] flex items-center px-5 bg-white">
          <h3 className="m-0">
            {view === "chat" ? "Chat" : "Upload documents"}
          </h3>
        </div>

        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          {view === "chat" && (
            <ChatWindow
              messages={messages}
              setMessages={setMessages}
              sessionId={sessionId}
            />
          )}
          {view === "upload" && <UploadPage sessionId={sessionId} />}
        </div>
      </div>
    </div>
  );
}

export default App;
