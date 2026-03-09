const API_BASE = import.meta.env.VITE_API_BASE;

export async function sendMessage(question, sessionId) {
  const url = import.meta.env.DEV ? "/api/chat" : `${API_BASE}/chat`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, session_id: sessionId }),
  });

  if (!res.ok) throw new Error("Failed to send message");
  const data = await res.json();
  return data.answer;
}
// Use same base as sendMessage (e.g. /api in dev)
const getBase = () => (import.meta.env.DEV ? '/api' : (import.meta.env.VITE_API_BASE || ''));

export async function uploadDocuments(files, sessionId) {
  const formData = new FormData();
  formData.append("session_id", sessionId);
  files.forEach((file) => formData.append("files", file));

  const res = await fetch(`${getBase()}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Upload failed");
  return res.json();
}
