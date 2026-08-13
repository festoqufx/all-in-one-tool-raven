"use client";

import React, { useState } from "react";
import { CopyIcon, CopyCheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyToClipboardButtonProps {
  data?: string;
  textOnly?: boolean;
  buttonText?: string;
  className?: string;
  copyIconClassName?: string;
  textClassName?: string;
}

export const CopyToClipboardButton: React.FC<CopyToClipboardButtonProps> = ({
  data: textToCopy,
  buttonText,
  textOnly = false,
  className,
  copyIconClassName,
  textClassName,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    const value = textToCopy || "";
    if (!value) return;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = value;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setIsCopied(true);
      window.setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <button
      type="button"
      title={isCopied ? "Copied!" : "Copy to Clipboard"}
      onClick={handleCopy}
      disabled={!textToCopy}
      className={cn(
        "inline-flex items-center gap-x-2 border border-transparent p-1.5 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
    >
      {buttonText && (
        <span className={cn(isCopied ? "animate-pulse" : "", textClassName)}>
          {isCopied ? "Copied" : buttonText}
        </span>
      )}
      {!textOnly &&
        (isCopied ? (
          <CopyCheckIcon className={cn("h-5 w-5", copyIconClassName)} />
        ) : (
          <CopyIcon className={cn("h-5 w-5 opacity-70", copyIconClassName)} />
        ))}
    </button>
  );
};

export default CopyToClipboardButton;
