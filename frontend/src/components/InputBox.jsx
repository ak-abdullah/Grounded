import { useState } from "react";

function InputBox({ onSend }) {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <div className="flex p-2.5 border-t border-[#ddd]">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type Your Message Here..."
        className="flex-1 p-2.5 rounded-lg border border-[#ccc] mr-2"
      />
      <button
        type="button"
        onClick={handleSubmit}
        className="py-2.5 px-4 rounded-lg border-none bg-[#2563eb] text-white cursor-pointer"
      >
        Send
      </button>
    </div>
  );
}

export default InputBox;
