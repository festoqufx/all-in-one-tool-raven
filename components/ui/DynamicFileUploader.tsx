"use client";

import React, { useCallback, useState } from "react";
import { XIcon, FileIcon, UploadIcon } from "lucide-react";
import { Accept, useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void;
  acceptedFileTypes?: Accept;
  multiple?: boolean;
  maxFiles?: number;
  onFileRemove?: (file: File) => void;
  disabled?: boolean;
  className?: string;
}

export default function FileUploader({
  onFilesSelected,
  acceptedFileTypes = {},
  multiple = false,
  maxFiles = 5,
  onFileRemove,
  disabled = false,
  className = "",
}: FileUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (disabled || acceptedFiles.length === 0) return;
      const newFiles = multiple
        ? [...files, ...acceptedFiles].slice(0, maxFiles)
        : acceptedFiles.slice(0, 1);
      setFiles(newFiles);
      onFilesSelected(newFiles);
    },
    [disabled, files, maxFiles, multiple, onFilesSelected]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
    multiple,
    maxFiles,
    disabled,
    noClick: true,
    noKeyboard: true,
  });

  const removeFile = (fileToRemove: File) => {
    const updatedFiles = files.filter((file) => file !== fileToRemove);
    setFiles(updatedFiles);
    onFilesSelected(updatedFiles);
    onFileRemove?.(fileToRemove);
  };

  const handlePaste = (event: React.ClipboardEvent) => {
    if (disabled) return;
    const pastedFiles = Array.from(event.clipboardData.files);
    if (pastedFiles.length > 0) {
      onDrop(pastedFiles);
    }
  };

  return (
    <section className={cn("mx-auto w-full max-w-md", className)} onPaste={handlePaste}>
      <div
        {...getRootProps()}
        className={cn(
          "rounded-2xl border-2 border-dashed p-10 text-center transition-all duration-200",
          isDragActive
            ? "border-foreground bg-accent/80 shadow-[var(--shadow-soft)]"
            : "border-border/80 bg-muted/20 hover:border-foreground/40 hover:bg-muted/30",
          disabled ? "pointer-events-none cursor-not-allowed opacity-60" : "cursor-pointer"
        )}
        onClick={() => {
          if (!disabled) open();
        }}
      >
        <input {...getInputProps()} />
        <UploadIcon className="mx-auto h-12 w-12 text-muted-foreground" strokeWidth={1.5} />
        <p className="mt-3 text-sm font-medium text-foreground">
          Drag & drop files here, or click to browse
        </p>
        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
          {Object.keys(acceptedFileTypes).length === 0
            ? "Any file type accepted"
            : `Accepted: ${Object.values(acceptedFileTypes).join(", ")}`}
        </p>
        <Button
          onClick={(event) => {
            event.stopPropagation();
            if (!disabled) open();
          }}
          type="button"
          variant="outline"
          className="mt-5"
          disabled={disabled}
        >
          Select Files
        </Button>
      </div>
      {files.length > 0 && (
        <ul className="mt-4 space-y-2">
          {files.map((file) => (
            <li key={`${file.name}-${file.lastModified}`} className="flex items-center justify-between rounded-xl border border-border bg-muted/40 p-3">
              <div className="flex min-w-0 items-center">
                <FileIcon className="mr-2 h-5 w-5 shrink-0 text-muted-foreground" />
                <span className="truncate text-sm">{file.name}</span>
              </div>
              <Button
                onClick={() => removeFile(file)}
                variant="ghost"
                size="icon"
                type="button"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <XIcon className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export {
  FileUploader,
  FileUploader as Upload,
  FileUploader as Uploader,
  FileUploader as FileInput,
  FileUploader as DynamicFileInput,
  FileUploader as DynamicFileUploader,
};
