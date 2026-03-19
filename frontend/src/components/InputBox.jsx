import { useState, useRef, useEffect } from "react";

const MAX_TEXTAREA_HEIGHT = 200; // px

function InputBox({ onSend, disabled }) {
  const [input, setInput] = useState("");
  const textareaRef = useRef(null);

  const resizeTextarea = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    const next = Math.min(el.scrollHeight, MAX_TEXTAREA_HEIGHT);
    el.style.height = `${next}px`;
  };

  useEffect(() => {
    resizeTextarea();
  }, [input]);

  const handleSubmit = () => {
    if (!input.trim() || disabled) return;
    onSend(input);
    setInput("");
    requestAnimationFrame(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !disabled) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="shrink-0 border-t border-slate-200/90 bg-white p-4">
      <div className="max-w-4xl mx-auto flex gap-3 items-end">
        <div className="flex-1 rounded-2xl border border-slate-200 bg-slate-50/80 shadow-inner shadow-slate-100 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-400/60 transition-shadow">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message Grounded…"
            disabled={disabled}
            onKeyDown={handleKeyDown}
            rows={1}
            aria-label="Message"
            className="w-full bg-transparent px-4 py-3.5 text-[15px] text-slate-900 placeholder:text-slate-400 outline-none rounded-2xl disabled:opacity-50 resize-none min-h-[52px] max-h-[200px] overflow-y-auto leading-relaxed"
          />
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={disabled}
          className="shrink-0 px-6 py-3.5 rounded-2xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/25 disabled:opacity-40 disabled:shadow-none disabled:cursor-not-allowed transition-all duration-200 motion-reduce:transition-none motion-reduce:active:scale-100 active:scale-[0.98]"
        >
          Send
        </button>
      </div>
      <p className="text-center text-[11px] text-slate-400 mt-2 m-0">
        Enter to send · Shift+Enter for new line · Grounded uses your uploaded
        documents
      </p>
    </div>
  );
}

export default InputBox;
