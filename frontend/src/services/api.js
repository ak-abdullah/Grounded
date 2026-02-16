function ChatWindow() {
    const messages = [
        { id: 1, role: "user", content: "What is RAG?" },
        { id: 2, role: "assistant", content: "RAG stands for Retrieval-Augmented Generation." }
    ]

    return (
        <div>
            {messages.map((msg) => (
                <div key={msg.id}>
                    <strong>{msg.role}:</strong> {msg.content}
                </div>
            ))}
        </div>
    )
}

export default ChatWindow;