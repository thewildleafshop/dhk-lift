"use client";

import { useUploadThing } from "@/lib/uploadthing";
import { useState } from "react";
import { Upload, CheckCircle, Loader2, X } from "lucide-react";

interface FileUploaderProps {
  endpoint: 
    | "applicationUploader"
    | "equipmentUploader"
    | "projectMilestoneUploader"
    | "claimUploader"
    | "partnerVerificationUploader"
    | "storyUploader"
    | "userDocumentUploader"
    | "documentUploader";
  onUploadComplete: (urls: string[]) => void;
  onUploadError?: (error: Error) => void;
  label?: string;
  multiple?: boolean;
  existingFiles?: string[];
  onRemove?: (url: string) => void;
}

export default function FileUploader({ 
  endpoint, 
  onUploadComplete, 
  onUploadError,
  label,
  multiple = false,
  existingFiles = [],
  onRemove,
}: FileUploaderProps) {
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // ✅ useUploadThing hook
  const { startUpload } = useUploadThing(endpoint, {
    onClientUploadComplete: (res) => {
      const urls = res.map((file) => file.url);
      setUploadedUrls(urls);
      onUploadComplete(urls);
      setIsUploading(false);
      alert("✅ Upload Completed!");
    },
    onUploadError: (error: Error) => {
      setIsUploading(false);
      if (onUploadError) {
        onUploadError(error);
      } else {
        alert(`❌ ERROR! ${error.message}`);
      }
    },
  });

  // ✅ File input handler
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    await startUpload(Array.from(files));
  };

  // ✅ Trigger file input
  const triggerFileInput = () => {
    document.getElementById(`file-input-${endpoint}`)?.click();
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-ink mb-2">
          {label}
        </label>
      )}
      
      {/* Hidden file input */}
      <input
        id={`file-input-${endpoint}`}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
        multiple={multiple}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Custom Upload Button */}
      <div className="border-2 border-dashed border-gray-200 rounded-input p-4 hover:border-gold transition-colors">
        <div className="flex flex-col items-center gap-3">
          <div className="bg-navy/5 rounded-full p-3">
            <Upload className="w-5 h-5 text-navy" />
          </div>
          <p className="text-xs text-ink/60 text-center">
            {isUploading ? "Uploading..." : "Click below to upload your file"}
          </p>
          
          {/* ✅ Custom Button */}
          <button
            type="button"
            onClick={triggerFileInput}
            disabled={isUploading}
            className="bg-navy text-white font-semibold text-xs px-5 py-2.5 rounded-lg hover:bg-navy/90 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Choose File
              </>
            )}
          </button>
          
          <p className="text-[10px] text-ink/40">
            PDF, JPG, PNG • Max 8MB
          </p>
        </div>
      </div>

      {/* Uploaded Files Display */}
      {uploadedUrls.length > 0 && (
        <div className="space-y-2 mt-3">
          {uploadedUrls.map((url, index) => (
            <div 
              key={index} 
              className="flex items-center gap-2 p-2 bg-success/5 border border-success/20 rounded-input"
            >
              <CheckCircle className="w-4 h-4 text-success shrink-0" />
              <a 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-xs text-navy truncate flex-1 hover:underline"
              >
                File {index + 1} uploaded
              </a>
            </div>
          ))}
        </div>
      )}

      {/* Existing Files */}
      {existingFiles.length > 0 && (
        <div className="space-y-2 mt-2">
          {existingFiles.map((url, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-2 bg-gray-50 border border-gray-200 rounded-lg"
            >
              <a 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm text-blue-600 hover:underline truncate flex-1"
              >
                📎 File {index + 1}
              </a>
              {onRemove && (
                <button
                  type="button"
                  onClick={() => onRemove(url)}
                  className="text-red-500 text-xs font-semibold ml-2 flex items-center gap-1"
                >
                  <X className="w-3 h-3" />
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}