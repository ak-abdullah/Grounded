import React, { useState } from "react";
import { uploadDocuments } from "../services/api";

function UploadPage({ sessionId }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const onSelect = (e) => {
    const chosen = Array.from(e.target.files || []);
    setFiles((prev) => [...prev, ...chosen]);
    setStatusMessage(null);
  };

  const remove = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setStatusMessage(null);
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    setLoading(true);
    setStatusMessage(null);
    try {
      await uploadDocuments(files, sessionId);
      setStatusMessage({
        type: "success",
        text: "Documents uploaded successfully.",
      });
      setFiles([]);
    } catch (err) {
      console.error("Error uploading documents:", err);
      setStatusMessage({
        type: "error",
        text: "Upload failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 p-6 overflow-auto">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Upload documents
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        Add PDFs or text files. They will be used to answer your questions in
        Chat.
      </p>
      <input
        type="file"
        multiple
        accept=".pdf,.txt,.docx"
        onChange={onSelect}
        className="mb-4"
      />
      {files.length > 0 && (
        <ul className="mb-4 space-y-2">
          {files.map((f, i) => (
            <li key={i} className="flex items-center justify-between text-sm">
              <span className="text-gray-700">{f.name}</span>
              <button
                type="button"
                onClick={() => remove(i)}
                className="text-red-600 hover:underline"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <button
        type="button"
        onClick={handleUpload}
        disabled={files.length === 0 || loading}
        className="px-4 py-2 rounded-lg bg-[#2563eb] text-white disabled:opacity-50"
      >
        {loading ? "Uploading…" : "Upload"}
      </button>
      {statusMessage && (
        <p
          className={`mt-4 text-sm ${statusMessage.type === "error" ? "text-red-600" : "text-green-600"}`}
        >
          {statusMessage.text}
        </p>
      )}
    </div>
  );
}

export default UploadPage;
