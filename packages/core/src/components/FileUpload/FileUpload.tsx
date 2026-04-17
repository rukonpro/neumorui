import React, { useCallback, useRef, useState } from "react";
import { cn } from "../../utils/cn";

export interface UploadedFile {
  id: string;
  file: File;
  preview?: string;
  progress?: number;
  error?: string;
}

interface FileUploadProps {
  value?: UploadedFile[];
  onChange?: (files: UploadedFile[]) => void;
  multiple?: boolean;
  accept?: string;
  maxSize?: number;
  maxFiles?: number;
  label?: string;
  hint?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const formatBytes = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const UploadIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path
      d="M14 19V8M14 8l-5 5M14 8l5 5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 22h18"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const FileIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M5 2h7l4 4v11a1 1 0 01-1 1H5a1 1 0 01-1-1V3a1 1 0 011-1z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    <path d="M12 2v4h4" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
  </svg>
);

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M2 2l10 10M12 2L2 12"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

export const FileUpload: React.FC<FileUploadProps> = ({
  value,
  onChange,
  multiple = false,
  accept,
  maxSize,
  maxFiles,
  label = "Drop files here or click to browse",
  hint,
  disabled,
  className,
  style,
  ...rest
}) => {
  const [internal, setInternal] = useState<UploadedFile[]>([]);
  const files = value ?? internal;
  const setFiles = (next: UploadedFile[]) => {
    if (!value) setInternal(next);
    onChange?.(next);
  };

  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFiles = useCallback(
    (list: FileList | null) => {
      if (!list || list.length === 0) return;
      const incoming = Array.from(list);
      const next: UploadedFile[] = [];

      for (const file of incoming) {
        const entry: UploadedFile = {
          id: `${file.name}-${file.size}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          file,
          progress: 100,
        };
        if (maxSize && file.size > maxSize) {
          entry.error = `Max size ${formatBytes(maxSize)}`;
        }
        if (file.type.startsWith("image/")) {
          entry.preview = URL.createObjectURL(file);
        }
        next.push(entry);
      }

      const combined = multiple ? [...files, ...next] : next.slice(0, 1);
      const trimmed = maxFiles ? combined.slice(0, maxFiles) : combined;
      setFiles(trimmed);
    },
    [files, multiple, maxFiles, maxSize]
  );

  const remove = (id: string) => {
    const target = files.find((f) => f.id === id);
    if (target?.preview) URL.revokeObjectURL(target.preview);
    setFiles(files.filter((f) => f.id !== id));
  };

  return (
    <div className={cn("flex flex-col gap-3 w-full", className)} style={style} {...rest}>
      <button
        type="button"
        onClick={() => !disabled && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          if (!disabled) processFiles(e.dataTransfer.files);
        }}
        disabled={disabled}
        className={cn(
          "w-full flex flex-col items-center justify-center gap-2 px-6 py-10",
          "rounded-neu-lg neu-transition outline-none",
          "focus-visible:ring-2 focus-visible:ring-[var(--neu-accent)]",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          !disabled && "cursor-pointer"
        )}
        style={{
          background: "var(--neu-bg)",
          boxShadow: isDragging
            ? "var(--neu-shadow-inset)"
            : "var(--neu-shadow-inset-sm)",
          border: `2px dashed ${
            isDragging ? "var(--neu-accent)" : "var(--neu-text-muted)"
          }`,
          borderRadius: "14px",
        }}
      >
        <span style={{ color: "var(--neu-accent)" }}>
          <UploadIcon />
        </span>
        <span
          className="text-sm font-medium"
          style={{ color: "var(--neu-text-primary)" }}
        >
          {label}
        </span>
        {hint && (
          <span
            className="text-xs"
            style={{ color: "var(--neu-text-muted)" }}
          >
            {hint}
          </span>
        )}
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          multiple={multiple}
          accept={accept}
          onChange={(e) => processFiles(e.target.files)}
        />
      </button>

      {files.length > 0 && (
        <ul className="flex flex-col gap-2">
          {files.map((f) => (
            <li
              key={f.id}
              className="flex items-center gap-3 px-3 py-2 rounded-neu"
              style={{
                background: "var(--neu-bg)",
                boxShadow: "var(--neu-shadow-raised-sm)",
              }}
            >
              <div
                className="w-10 h-10 rounded-neu shrink-0 overflow-hidden flex items-center justify-center"
                style={{
                  background: "var(--neu-bg)",
                  boxShadow: "var(--neu-shadow-inset-sm)",
                  color: "var(--neu-text-secondary)",
                }}
              >
                {f.preview ? (
                  <img
                    src={f.preview}
                    alt={f.file.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FileIcon />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div
                  className="text-sm font-medium truncate"
                  style={{ color: "var(--neu-text-primary)" }}
                >
                  {f.file.name}
                </div>
                <div
                  className="text-xs"
                  style={{
                    color: f.error ? "var(--neu-danger)" : "var(--neu-text-muted)",
                  }}
                >
                  {f.error ?? formatBytes(f.file.size)}
                </div>
                {f.progress !== undefined && f.progress < 100 && !f.error && (
                  <div
                    className="h-1 rounded-full mt-1.5 overflow-hidden"
                    style={{
                      background: "var(--neu-bg)",
                      boxShadow: "var(--neu-shadow-inset-sm)",
                    }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${f.progress}%`,
                        background: "var(--neu-gradient-primary)",
                      }}
                    />
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => remove(f.id)}
                aria-label="Remove file"
                className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center neu-transition hover:-translate-y-0.5 outline-none"
                style={{
                  background: "var(--neu-bg)",
                  boxShadow: "var(--neu-shadow-raised-sm)",
                  color: "var(--neu-text-secondary)",
                }}
              >
                <CloseIcon />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
