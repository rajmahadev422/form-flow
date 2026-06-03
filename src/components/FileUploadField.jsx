"use client";
import { useState, useRef, useCallback } from "react";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "application/pdf",
];
const ALLOWED_EXT = ".jpg,.jpeg,.png,.gif,.webp,.pdf";

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

export default function FileUploadField({
  fieldId,
  required,
  value,
  onChange,
  error,
}) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const inputRef = useRef(null);

  // Cloudinary Upload Handler
  const processFile = useCallback(
    async (file) => {
      setUploadError("");

      // Front-end Validation checks
      if (!ALLOWED_TYPES.includes(file.type)) {
        setUploadError(
          "Only images (JPEG, PNG, GIF, WebP) and PDFs are allowed.",
        );
        return;
      }
      if (file.size > MAX_SIZE) {
        setUploadError(
          `File is too large. Max size is 5MB (your file: ${formatBytes(file.size)}).`,
        );
        return;
      }

      setUploading(true);
      try {
        const { VITE_CLOUD_NAME, VITE_UPLOAD_PRESET } = import.meta.env;

        const fd = new FormData();
        fd.append("file", file);
        fd.append("upload_preset", VITE_UPLOAD_PRESET);

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${VITE_CLOUD_NAME}/auto/upload`,
          {
            method: "POST",
            body: fd,
          },
        );

        const data = await res.json();
        if (!res.ok) throw new Error(data.error?.message || "Upload failed");

        onChange({
          url: data.secure_url,
          name: file.name,
          type: file.type,
          size: file.size,
        });
      } catch (err) {
        setUploadError(err.message);
      } finally {
        setUploading(false);
      }
    },
    [onChange],
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file) processFile(file);
    },
    [processFile],
  );

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };
  const handleDragLeave = () => setDragging(false);

  const handleInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    e.target.value = "";
  };

  const handleRemove = () => {
    onChange(null);
    setUploadError("");
  };

  const isPdf = value?.type === "application/pdf";

  return (
    <div className="w-full">
      {/* State A: File Uploaded Successfully */}
      {value ? (
        <div className="border border-(--border) rounded-xl p-4 bg-(--bg-2) flex items-center gap-3.5">
          {/* File Thumbnail Preview block */}
          {isPdf ? (
            <div className="w-13 h-13 rounded-lg bg-(--danger-light) flex items-center justify-center text-2xl shrink-0 select-none">
              📄
            </div>
          ) : (
            <img
              src={value.url}
              alt={value.name}
              className="w-13 h-13 rounded-lg object-cover border border-(--border) shrink-0"
            />
          )}

          {/* Upload Metadata Info */}
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm text-(--text) truncate">
              {value.name}
            </div>
            <div className="text-xs text-(--text-3) mt-0.5">
              {formatBytes(value.size)} · {isPdf ? "PDF" : "Image"}
            </div>
            <a
              href={value.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-(--accent) no-underline hover:underline inline-block mt-0.5"
            >
              View file ↗
            </a>
          </div>

          {/* Remove Entry Switch button */}
          <button
            type="button"
            onClick={handleRemove}
            className="btn-danger p-1.5 text-xs shrink-0 w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer"
            title="Remove file"
          >
            ✕
          </button>
        </div>
      ) : (
        /* State B: Empty Drag & Drop File Zone Panel */
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => !uploading && inputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl px-6 py-8 text-center transition-all duration-150 relative select-none ${
            dragging
              ? "border-(--accent) bg-(--accent-light)"
              : error || uploadError
                ? "border-(--danger) bg-(--bg-2)"
                : "border-(--border) bg-(--bg-2)"
          } ${uploading ? "cursor-wait" : "cursor-pointer"}`}
        >
          <input
            ref={inputRef}
            type="file"
            accept={ALLOWED_EXT}
            onChange={handleInputChange}
            className="hidden"
          />

          {uploading ? (
            /* Upload Progress Processing Loop */
            <div className="flex flex-col items-center justify-center">
              <div className="text-3xl mb-2 animate-bounce">⏳</div>
              <div className="font-semibold text-(--text-2) text-sm">
                Uploading to Cloudinary…
              </div>

              {/* Infinite Shimmer Loading Track */}
              <div className="h-1 w-32 rounded-full bg-(--border) mt-4 overflow-hidden relative">
                <div className="h-full bg-(--accent) rounded-full w-3/5 absolute top-0 left-0 animate-[shimmer_1.5s_ease-in-out_infinite]" />
              </div>
            </div>
          ) : (
            /* Waiting for Input Interaction Dropstate */
            <div>
              <div className="text-4xl mb-2 transition-transform duration-200">
                {dragging ? "📂" : "☁️"}
              </div>
              <div className="font-semibold text-(--text) text-sm mb-1">
                {dragging ? "Drop file here" : "Drag & drop or click to upload"}
              </div>
              <div className="text-xs text-(--text-3)">
                Images (JPEG, PNG, GIF, WebP) or PDF · Max 5 MB
              </div>
            </div>
          )}
        </div>
      )}

      {/* Logic Error Prompt */}
      {uploadError && (
        <p className="text-(--danger) text-[0.78rem] mt-1.5 mb-0 font-medium">
          ⚠ {uploadError}
        </p>
      )}
    </div>
  );
}
