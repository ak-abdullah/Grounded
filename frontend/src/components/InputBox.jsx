import { useState } from "react";

function InputBox({ onSend, disabled }) {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (!input.trim() || disabled) return;
    onSend(input);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !disabled) {
      handleSubmit();
    }
  };

  return (
    <div className="flex p-2.5 border-t border-[#ddd]">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type Your Message Here..."
        className="flex-1 p-2.5 rounded-lg border border-[#ccc] mr-2"
        disabled={disabled}
        onKeyDown={handleKeyDown}
      />
      <button
        type="button"
        onClick={handleSubmit}
        className="py-2.5 px-4 rounded-lg border-none bg-[#2563eb] text-white cursor-pointer"
        disabled={disabled}
      >
        Send
      </button>
    </div>
  );
}

export default InputBox;
