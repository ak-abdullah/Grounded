function Message({ role, content }) {
  const isUser = role === "user";

  return (
    <div
      className={`flex mb-3 ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`box-border max-w-[70%] leading-normal text-sm break-words px-4 py-3 rounded-[18px] ${
          isUser
            ? "bg-[#2563eb] text-white"
            : "bg-[#f3f4f6] text-[#111827]"
        }`}
      >
        {content}
      </div>
    </div>
  );
}

export default Message;
