function TypingIndicator() {
    return (
      <div className="flex justify-start mb-3">
        <div className="px-4 py-3 rounded-[18px] bg-[#f3f4f6] text-[#111827] flex gap-1.5 items-center">
          <span
            className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"
            style={{ animationDelay: "0ms" }}
          />
          <span
            className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"
            style={{ animationDelay: "160ms" }}
          />
          <span
            className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"
            style={{ animationDelay: "320ms" }}
          />
        </div>
      </div>
    );
  }
  
  export default TypingIndicator;