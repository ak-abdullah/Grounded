import ChatWindow from "./components/ChatWindow";

function App() {
  return (
    <div className="flex h-screen bg-[#f5f5f5]">
      <div className="w-[260px] bg-[#111827] text-white p-5 box-border flex flex-col">
        <h2 className="mt-0">Grounded</h2>
        <p className="opacity-70 cursor-pointer mt-5 hover:opacity-100">+ New Chat</p>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="h-[60px] border-b border-[#ddd] flex items-center px-5 bg-white">
          <h3 className="m-0">Chat</h3>
        </div>

        <div className="flex-1 flex flex-col">
          <ChatWindow />
        </div>
      </div>
    </div>
  );
}

export default App;
