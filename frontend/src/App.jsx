import { useState } from "react";
import { MessageCircle, Upload, Sparkles } from "lucide-react";
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

  const navItemClass = (active) =>
    `w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 motion-reduce:transition-none flex items-center gap-3 ${
      active
        ? "bg-white/10 text-white shadow-sm ring-1 ring-white/10"
        : "text-slate-400 hover:text-white hover:bg-white/5"
    }`;

  const iconClass = "shrink-0 h-[18px] w-[18px] opacity-90";

  return (
    <div className="flex h-screen bg-slate-100 text-slate-900">
      <aside
        className="w-[272px] shrink-0 bg-slate-950 text-white flex flex-col border-r border-slate-800/80 shadow-xl shadow-slate-950/20"
        aria-label="Workspace navigation"
      >
        <div className="p-6 pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-900/40">
              G
            </div>
            <div>
              <h1 className="text-base font-semibold tracking-tight text-white m-0">
                Grounded
              </h1>
              <p className="text-xs text-slate-500 m-0 mt-0.5">
                RAG on your documents
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-1" aria-label="Primary">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 px-3 mb-2">
            Workspace
          </p>
          <button
            type="button"
            onClick={() => setView("chat")}
            className={navItemClass(view === "chat")}
            aria-current={view === "chat" ? "page" : undefined}
          >
            <MessageCircle className={iconClass} strokeWidth={2} aria-hidden />
            Chat
          </button>
          <button
            type="button"
            onClick={() => setView("upload")}
            className={navItemClass(view === "upload")}
            aria-current={view === "upload" ? "page" : undefined}
          >
            <Upload className={iconClass} strokeWidth={2} aria-hidden />
            Upload
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800/80">
          <button
            type="button"
            onClick={handleNewChat}
            className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200 motion-reduce:transition-none flex items-center gap-3"
          >
            <Sparkles className={iconClass} strokeWidth={2} aria-hidden />
            New conversation
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 bg-white">
        <header className="h-14 shrink-0 border-b border-slate-200/90 bg-white/90 backdrop-blur-md px-6 flex items-center justify-between">
          <div>
            <h2 className="text-[15px] font-semibold text-slate-900 m-0 tracking-tight">
              {view === "chat" ? "Chat" : "Upload documents"}
            </h2>
            <p className="text-xs text-slate-500 m-0 mt-0.5">
              {view === "chat"
                ? "Ask questions grounded in your uploads"
                : "Add files to build your knowledge base"}
            </p>
          </div>
        </header>

        <main className="flex-1 flex flex-col min-h-0 overflow-hidden bg-slate-50/50">
          {view === "chat" && (
            <ChatWindow
              messages={messages}
              setMessages={setMessages}
              sessionId={sessionId}
            />
          )}
          {view === "upload" && <UploadPage sessionId={sessionId} />}
        </main>
      </div>
    </div>
  );
}

export default App;
