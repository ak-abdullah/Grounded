import { useState } from "react";

function InputBox({ onSend }) {
    const [input, setInput] = useState("");

    const handleSubmit = () => {
        if (!input.trim()) return;
        onSend(input);
        setInput("");
    }

    return (
        <div style={
            {
                display: 'flex',
                padding: '10px',
                borderTop: '1px solid #ddd',
            }}>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type Your Message Here..."
                style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px solid #ccc',
                    marginRight: '8px',
                }} />

            <button onClick={handleSubmit}
                style={{
                    padding: '10px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#2563eb',
                    color: 'white',
                    cursor: 'pointer',
                }}>
                Send
            </button>
        </div>
    )
}

export default InputBox;