const dotClass =
  "w-2 h-2 rounded-full bg-slate-400 animate-pulse motion-reduce:animate-none";

function TypingIndicator() {
  return (
    <div
      className="flex gap-3 mb-6"
      role="status"
      aria-live="polite"
      aria-label="Assistant is typing"
    >
      <div
        className="shrink-0 h-8 w-8 rounded-full bg-slate-200 text-slate-600 ring-2 ring-white shadow-sm flex items-center justify-center text-xs font-semibold"
        aria-hidden
      >
        AI
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400 mb-1.5 m-0">
          Assistant
        </p>
        <div className="inline-flex items-center gap-1.5 px-4 py-3 rounded-2xl rounded-tl-md bg-white border border-slate-200/90 shadow-sm">
          <span className={dotClass} style={{ animationDelay: "0ms" }} />
          <span className={dotClass} style={{ animationDelay: "160ms" }} />
          <span className={dotClass} style={{ animationDelay: "320ms" }} />
        </div>
      </div>
    </div>
  );
}

export default TypingIndicator;
