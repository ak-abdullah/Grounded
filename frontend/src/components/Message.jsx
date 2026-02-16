function Message({role, content }) {
    const isUser = role === "user";
  
    return (
      <div
        style={{
          display: "flex",
          justifyContent: isUser ? "flex-end" : "flex-start",
          marginBottom: "12px"
        }}
      >
        <div
          style={{
            padding: "12px 16px",
            borderRadius: "18px",
            backgroundColor: isUser ? "#2563eb" : "#f3f4f6",
            color: isUser ? "#ffffff" : "#111827",
            maxWidth: "70%",
            lineHeight: "1.5",
            fontSize: "14px",
            wordBreak: "break-word",
            boxSizing: "border-box"
          }}
        >
          {content}
        </div>
        
      </div>
    );
  }
  
  export default Message;
  