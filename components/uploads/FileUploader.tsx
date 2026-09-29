"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { X, FileText, Image as ImageIcon } from "lucide-react";

interface FileUploaderProps {
  endpoint: "documentUploader" | "storyImageUploader" | "evidenceUploader";
  onUploadComplete: (urls: string[]) => void;
  onUploadError?: (error: Error) => void;
  multiple?: boolean;
  label?: string;
  existingFiles?: string[];
  onRemove?: (url: string) => void;
}

export default function FileUploader({
  endpoint,
  onUploadComplete,
  onUploadError,
  multiple = false,
  label,
  existingFiles = [],
  onRemove,
}: FileUploaderProps) {
  return (
    <div className="w-full">
      {label && (
        <p className="text-sm font-semibold text-ink mb-2">{label}</p>
      )}

      {/* Existing Files */}
      {existingFiles.length > 0 && (
        <div className="space-y-2 mb-4">
          {existingFiles.map((url, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 bg-cloud rounded-input border border-gray-100"
            >
              <div className="bg-white rounded p-2 shrink-0">
                {url.toLowerCase().endsWith(".pdf") ? (
                  <FileText className="w-4 h-4 text-navy" />
                ) : (
                  <ImageIcon className="w-4 h-4 text-teal" />
                )}
              </div>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-xs text-navy truncate hover:underline"
              >
                {url.split("/").pop()}
              </a>
              {onRemove && (
                <button
                  type="button"
                  onClick={() => onRemove(url)}
                  className="p-1.5 text-error hover:bg-error/10 rounded transition-colors shrink-0"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          if (res && res.length > 0) {
            const urls = res.map((file) => file.url);
            onUploadComplete(urls);
          }
        }}
        onUploadError={(error: Error) => {
          console.error("Upload error:", error);
          if (onUploadError) onUploadError(error);
        }}
        config={{ mode: multiple ? "auto" : "manual" }}
        appearance={{
          container: {
            border: "2px dashed #e5e7eb",
            borderRadius: "12px",
            padding: "24px",
            background: "#F6F8FB",
          },
          label: {
            color: "#1F2D3D",
            fontSize: "14px",
            fontWeight: "600",
          },
          allowedContent: {
            color: "#6b7280",
            fontSize: "12px",
          },
          button: {
            background: "#0B468F",
            color: "white",
            fontSize: "14px",
            fontWeight: "600",
            padding: "10px 20px",
            borderRadius: "10px",
            marginTop: "12px",
          },
        }}
      />
    </div>
  );
}