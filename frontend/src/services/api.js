const API_BASE = import.meta.env.VITE_API_BASE;

export async function sendMessage(question) {
    const url = import.meta.env.DEV ? '/api/chat' : `${API_BASE}/chat`;

    const res = await fetch(url,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",

        },
        body: JSON.stringify({ question }),
    })
    if (!res.ok) {
        throw new Error("Failed to send message");
    }
    const data = await res.json();
    return data.answer;
}

export default sendMessage;