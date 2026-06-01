import { useState, useRef, useCallback } from "react";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp", "application/pdf"];
const ALLOWED_EXT = ".jpg,.jpeg,.png,.gif,.webp,.pdf";

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

export default function FileUploadField({ fieldId, required, value, onChange, error }) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const inputRef = useRef(null);

  // value shape: { url, name, type, size } | null

  const processFile = useCallback(async (file) => {
    setUploadError("");

    if (!ALLOWED_TYPES.includes(file.type)) {
      setUploadError("Only images (JPEG, PNG, GIF, WebP) and PDFs are allowed.");
      return;
    }
    if (file.size > MAX_SIZE) {
      setUploadError(`File is too large. Max size is 5MB (your file: ${formatBytes(file.size)}).`);
      return;
    }

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      onChange({ url: data.url, name: data.name, type: data.type, size: data.size });
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setUploading(false);
    }
  }, [onChange]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  }, [processFile]);

  const handleDragOver = (e) => { e.preventDefault(); setDragging(true); };
  const handleDragLeave = () => setDragging(false);
  const handleInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    // reset input so same file can be re-selected
    e.target.value = "";
  };

  const handleRemove = () => {
    onChange(null);
    setUploadError("");
  };

  const isPdf = value?.type === "application/pdf";

  return (
    <div>
      {/* Uploaded state */}
      {value ? (
        <div
          style={{
            border: "1px solid var(--border)",
            borderRadius: 10,
            padding: "1rem",
            background: "var(--bg-2)",
            display: "flex",
            alignItems: "center",
            gap: "0.875rem",
          }}
        >
          {/* Preview */}
          {isPdf ? (
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 8,
                background: "var(--danger-light)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.4rem",
                flexShrink: 0,
              }}
            >
              📄
            </div>
          ) : (
            <img
              src={value.url}
              alt={value.name}
              style={{
                width: 52,
                height: 52,
                borderRadius: 8,
                objectFit: "cover",
                border: "1px solid var(--border)",
                flexShrink: 0,
              }}
            />
          )}

          {/* Info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontWeight: 600,
                fontSize: "0.875rem",
                color: "var(--text)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {value.name}
            </div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-3)", marginTop: 2 }}>
              {formatBytes(value.size)} · {isPdf ? "PDF" : "Image"}
            </div>
            <a
              href={value.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "0.75rem", color: "var(--accent)", textDecoration: "none" }}
            >
              View file ↗
            </a>
          </div>

          {/* Remove */}
          <button
            onClick={handleRemove}
            className="btn-danger"
            style={{ padding: "0.35rem 0.6rem", fontSize: "0.85rem", flexShrink: 0 }}
            title="Remove file"
          >
            ✕
          </button>
        </div>
      ) : (
        /* Drop zone */
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => !uploading && inputRef.current?.click()}
          style={{
            border: `2px dashed ${dragging ? "var(--accent)" : error ? "var(--danger)" : "var(--border-2)"}`,
            borderRadius: 10,
            padding: "2rem 1.5rem",
            textAlign: "center",
            cursor: uploading ? "wait" : "pointer",
            background: dragging ? "var(--accent-light)" : "var(--bg-2)",
            transition: "all 0.15s",
            position: "relative",
          }}
        >
          <input
            ref={inputRef}
            type="file"
            accept={ALLOWED_EXT}
            onChange={handleInputChange}
            style={{ display: "none" }}
          />

          {uploading ? (
            <div>
              <div style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>⏳</div>
              <div style={{ fontWeight: 600, color: "var(--text-2)", fontSize: "0.9rem" }}>
                Uploading…
              </div>
              {/* Progress bar shimmer */}
              <div
                style={{
                  height: 3,
                  borderRadius: 2,
                  background: "var(--border)",
                  marginTop: "1rem",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    background: "var(--accent)",
                    borderRadius: 2,
                    animation: "shimmer 1.2s ease-in-out infinite",
                    width: "60%",
                  }}
                />
              </div>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                {dragging ? "📂" : "☁️"}
              </div>
              <div style={{ fontWeight: 600, color: "var(--text)", fontSize: "0.9rem", marginBottom: "0.25rem" }}>
                {dragging ? "Drop file here" : "Drag & drop or click to upload"}
              </div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-3)" }}>
                Images (JPEG, PNG, GIF, WebP) or PDF · Max 5 MB
              </div>
            </div>
          )}
        </div>
      )}

      {/* Upload error */}
      {uploadError && (
        <p style={{ color: "var(--danger)", fontSize: "0.78rem", marginTop: "0.4rem", marginBottom: 0 }}>
          ⚠ {uploadError}
        </p>
      )}

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); width: 60%; }
          50% { transform: translateX(80%); width: 80%; }
          100% { transform: translateX(200%); width: 60%; }
        }
      `}</style>
    </div>
  );
}
