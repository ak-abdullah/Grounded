import { useState, useRef, useCallback } from "react";
import { Upload } from "lucide-react";
import { uploadDocuments } from "../services/api";

function UploadPage({ sessionId }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [dragDepth, setDragDepth] = useState(0);
  const inputRef = useRef(null);

  const isDragging = dragDepth > 0;

  const addFiles = useCallback((fileList) => {
    const chosen = Array.from(fileList || []);
    const allowed = chosen.filter((f) => {
      const ext = f.name.split(".").pop()?.toLowerCase();
      return ["pdf", "txt", "docx"].includes(ext);
    });
    if (allowed.length > 0) {
      setFiles((prev) => [...prev, ...allowed]);
      setStatusMessage(null);
    }
  }, []);

  const onSelect = (e) => {
    addFiles(e.target.files);
    e.target.value = "";
  };

  const remove = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setStatusMessage(null);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragDepth((d) => d + 1);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragDepth((d) => Math.max(0, d - 1));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragDepth(0);
    addFiles(e.dataTransfer.files);
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    setLoading(true);
    setStatusMessage(null);
    try {
      await uploadDocuments(files, sessionId);
      setStatusMessage({
        type: "success",
        text: "Documents uploaded successfully. You can start chatting now.",
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
    <section
      className="flex-1 overflow-auto p-6 sm:p-10"
      aria-labelledby="upload-heading"
    >
      <div className="max-w-xl mx-auto">
        <div className="rounded-2xl border border-slate-200/90 bg-white shadow-xl shadow-slate-200/40 overflow-hidden">
          <div className="px-6 pt-8 pb-2">
            <h2
              id="upload-heading"
              className="text-lg font-semibold text-slate-900 m-0"
            >
              Add documents
            </h2>
            <p className="text-sm text-slate-500 mt-2 m-0 leading-relaxed">
              Upload PDF, TXT, or DOCX files. We’ll index them so Chat can answer
              from your content.
            </p>
          </div>

          <div className="p-6">
            <input
              ref={inputRef}
              type="file"
              multiple
              accept=".pdf,.txt,.docx"
              onChange={onSelect}
              className="hidden"
              id="file-upload"
            />
            <div
              role="region"
              aria-label="File drop zone"
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <label
                htmlFor="file-upload"
                className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-12 cursor-pointer transition-all duration-200 motion-reduce:transition-none motion-reduce:scale-100 group ${
                  isDragging
                    ? "border-blue-500 bg-blue-50/60 scale-[1.01]"
                    : "border-slate-200 bg-slate-50/80 hover:border-blue-300 hover:bg-blue-50/30"
                }`}
              >
                <div
                  className={`h-12 w-12 rounded-xl border flex items-center justify-center mb-3 shadow-sm transition-shadow ${
                    isDragging
                      ? "bg-blue-100 border-blue-200 text-blue-600"
                      : "bg-white border-slate-200 text-slate-600 group-hover:border-blue-200 group-hover:shadow-md"
                  }`}
                >
                  <Upload className="h-6 w-6" strokeWidth={2} aria-hidden />
                </div>
                <span className="text-sm font-medium text-slate-700">
                  Click to browse or drop files here
                </span>
                <span className="text-xs text-slate-400 mt-1">
                  PDF, TXT, DOCX · multiple files OK
                </span>
              </label>
            </div>

            {files.length > 0 && (
              <ul className="mt-6 space-y-2" aria-label="Selected files">
                {files.map((f, i) => (
                  <li
                    key={`${f.name}-${i}`}
                    className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm"
                  >
                    <span className="text-slate-700 truncate font-medium">
                      {f.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => remove(i)}
                      className="shrink-0 text-xs font-medium text-red-600 hover:text-red-700 px-2 py-1 rounded-lg hover:bg-red-50 transition-colors"
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
              aria-busy={loading}
              className="mt-6 w-full py-3.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/25 disabled:opacity-40 disabled:shadow-none disabled:cursor-not-allowed transition-all duration-200 motion-reduce:transition-none"
            >
              {loading ? "Uploading…" : "Upload & index"}
            </button>

            {statusMessage && (
              <div
                role={statusMessage.type === "error" ? "alert" : "status"}
                aria-live={statusMessage.type === "error" ? "assertive" : "polite"}
                className={`mt-4 rounded-xl px-4 py-3 text-sm font-medium ${
                  statusMessage.type === "error"
                    ? "bg-red-50 text-red-800 border border-red-100"
                    : "bg-emerald-50 text-emerald-800 border border-emerald-100"
                }`}
              >
                {statusMessage.text}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default UploadPage;
