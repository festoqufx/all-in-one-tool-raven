"use client";

import { cn } from "@/lib/utils";
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { FolderOpenIcon } from "lucide-react";

interface FileInputProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onFileSelect: (file: File) => void;
  accept?: string;
  className?: string;
  label?: string;
  size?: "default" | "sm" | "lg" | "icon" | null | undefined;
  hideText?: boolean;
}

export function FileInput({
  onFileSelect,
  accept,
  className,
  label,
  size,
  hideText,
  ...restProps
}: FileInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileOpen = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
      e.target.value = "";
    }
  };

  return (
    <>
      <input
        type="file"
        accept={accept || "*"}
        onChange={handleFileOpen}
        ref={fileInputRef}
        className="hidden"
      />
      <Button
        {...restProps}
        type="button"
        size={size || "default"}
        onClick={() => fileInputRef.current?.click()}
        className={className}
      >
        <FolderOpenIcon className={cn("h-4 w-4", !hideText && "mr-2")} />
        {hideText ? "" : label || "Open File"}
      </Button>
    </>
  );
}

export default FileInput;
