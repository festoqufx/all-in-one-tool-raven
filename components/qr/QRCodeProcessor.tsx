"use client";

import { useState, useCallback } from "react";
import { BrowserQRCodeReader } from "@zxing/browser";
import { IFormattedVCardData } from "@/lib/type-interface";
import { VCardDisplay } from "@/components/qr/VCardDisplay";
import AutoLinkText from "@/components/general/AutoLinkText";
import { isVCard, getVCardData, formatVCardData } from "@/lib/utils/qr";

export const useQRCodeProcessor = () => {
  const [qrData, setQrData] = useState<string | null>(null);
  const [formattedData, setFormattedData] = useState<JSX.Element | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"raw" | "formatted">("formatted");
  const [isProcessing, setIsProcessing] = useState(false);

  const applyDecodedText = useCallback((text: string) => {
    setQrData(text);
    setErrorMessage(null);

    if (isVCard(text)) {
      const vCardData = getVCardData(text);
      const formatted = vCardData ? formatVCardData(vCardData) : null;
      if (formatted) {
        setFormattedData(<VCardDisplay data={formatted as IFormattedVCardData} />);
        setActiveTab("formatted");
        return;
      }
      setErrorMessage("Failed to parse vCard data.");
    }

    setFormattedData(<AutoLinkText text={text} />);
    setActiveTab("formatted");
  }, []);

  const processFile = useCallback(
    async (file: File) => {
      setIsProcessing(true);
      setErrorMessage(null);

      try {
        const reader = new FileReader();
        const dataUrl = await new Promise<string>((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => reject(new Error("Failed to read file"));
          reader.readAsDataURL(file);
        });

        const img = new Image();
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = () => reject(new Error("Invalid image"));
          img.src = dataUrl;
        });

        const codeReader = new BrowserQRCodeReader();
        const result = await codeReader.decodeFromImageElement(img);
        applyDecodedText(result.getText());
      } catch {
        setErrorMessage("Failed to read QR code from the image.");
      } finally {
        setIsProcessing(false);
      }
    },
    [applyDecodedText]
  );

  const clearResults = useCallback(() => {
    setQrData(null);
    setFormattedData(null);
    setErrorMessage(null);
    setActiveTab("formatted");
  }, []);

  return {
    qrData,
    formattedData,
    errorMessage,
    activeTab,
    isProcessing,
    processFile,
    applyDecodedText,
    clearResults,
    setErrorMessage,
    setActiveTab,
  };
};
