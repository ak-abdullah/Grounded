import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const mdComponents = {
  p: ({ children }) => (
    <p className="mb-2 last:mb-0 first:mt-0">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc pl-5 mb-2 space-y-1 last:mb-0">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-5 mb-2 space-y-1 last:mb-0">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }) => (
    <strong className="font-semibold text-slate-900">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  code: ({ inline, className, children, ...props }) => {
    if (inline) {
      return (
        <code
          className="text-[0.9em] font-mono bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded-md"
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <code
        className={`block font-mono text-sm text-slate-100 whitespace-pre-wrap ${className || ""}`}
        {...props}
      >
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="my-2 overflow-x-auto rounded-lg bg-slate-900 p-3 text-sm text-slate-100 [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-inherit">
      {children}
    </pre>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-blue-600 underline underline-offset-2 hover:text-blue-700 break-all"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  h1: ({ children }) => (
    <h3 className="text-base font-semibold text-slate-900 mt-3 mb-2 first:mt-0">
      {children}
    </h3>
  ),
  h2: ({ children }) => (
    <h3 className="text-base font-semibold text-slate-900 mt-3 mb-2 first:mt-0">
      {children}
    </h3>
  ),
  h3: ({ children }) => (
    <h3 className="text-sm font-semibold text-slate-900 mt-2 mb-1 first:mt-0">
      {children}
    </h3>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-slate-200 pl-3 my-2 text-slate-600 italic">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-3 border-slate-200" />,
};

function Message({ role, content }) {
  const isUser = role === "user";

  return (
    <div
      className={`flex gap-3 mb-6 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      <div
        className={`shrink-0 h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold ${
          isUser
            ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
            : "bg-slate-200 text-slate-600 ring-2 ring-white shadow-sm"
        }`}
        aria-hidden
      >
        {isUser ? "You" : "AI"}
      </div>
      <div
        className={`min-w-0 max-w-[min(85%,42rem)] ${isUser ? "text-right" : ""}`}
      >
        <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400 mb-1.5 m-0">
          {isUser ? "You" : "Assistant"}
        </p>
        <div
          className={`inline-block text-left text-[15px] leading-relaxed wrap-break-word px-4 py-3 rounded-2xl shadow-sm ${
            isUser
              ? "bg-blue-600 text-white rounded-tr-md shadow-blue-600/20 [&_a]:text-blue-100 [&_a]:underline"
              : "bg-white text-slate-800 border border-slate-200/90 rounded-tl-md shadow-slate-200/50"
          }`}
        >
          {isUser ? (
            <span className="whitespace-pre-wrap">{content}</span>
          ) : (
            <div className="markdown-body">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={mdComponents}
              >
                {content}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Message;
