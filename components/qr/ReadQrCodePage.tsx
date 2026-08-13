"use client";

import { QrCodeIcon } from "lucide-react";
import AutoLinkText from "../general/AutoLinkText";
import { PasteFile } from "@/components/ui/PasteFile";
import { ErrorAlert } from "@/components/ui/ErrorAlert";
import { ImageUpload } from "@/components/ui/FileUpload";
import { DragAndDrop } from "@/components/ui/DragAndDrop";
import { useQRCodeProcessor } from "@/components/qr/QRCodeProcessor";
import { CopyToClipboardButton } from "@/components/ui/CopyToClipboardButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingDots } from "@/components/ui/LoadingDots";
import QRCodeScanner from "@/components/qr/QRCodeScanner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ReadQrCodePage() {
  const {
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
  } = useQRCodeProcessor();

  return (
    <div className="mx-auto w-full max-w-4xl p-4">
      <Card className="mx-auto w-full max-w-xl bg-card/90 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCodeIcon className="h-6 w-6" />
            Read QR Code
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <ImageUpload processFile={processFile} />
              <PasteFile processFile={processFile} setErrorMessage={setErrorMessage} />
              <QRCodeScanner
                setQrData={(text) => {
                  if (typeof text === "string" && text.trim()) {
                    applyDecodedText(text);
                  }
                }}
                setErrorMessage={setErrorMessage}
              />
            </div>
            <p className="text-center text-xs text-muted-foreground md:text-sm">
              Upload, paste, scan with camera, or drag and drop a QR image anywhere on the page.
            </p>
          </div>
          {isProcessing && (
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <LoadingDots size={5} />
              Reading QR code...
            </div>
          )}
          {errorMessage && <ErrorAlert message={errorMessage} />}
        </CardContent>
      </Card>

      {qrData && (
        <article className="surface-card mt-4 lg:mt-8">
          <div className="flex items-center justify-between border-b border-border px-2">
            <div className="flex">
              <button
                type="button"
                onClick={() => setActiveTab("formatted")}
                className={cn(
                  "px-4 py-2 text-sm font-medium",
                  activeTab === "formatted"
                    ? "border-b-2 border-foreground text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Formatted
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("raw")}
                className={cn(
                  "px-4 py-2 text-sm font-medium",
                  activeTab === "raw"
                    ? "border-b-2 border-foreground text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Raw
              </button>
            </div>
            <Button type="button" variant="ghost" size="sm" onClick={clearResults}>
              Clear
            </Button>
          </div>
          <section className="p-4">
            {activeTab === "raw" ? (
              <>
                <AutoLinkText text={qrData} />
                <CopyToClipboardButton
                  data={qrData}
                  buttonText="Copy"
                  className="my-2 items-center rounded-full border border-border px-4 py-2 hover:bg-foreground hover:text-background"
                  textClassName="text-xs font-normal lg:text-sm"
                  copyIconClassName="h-3 w-3"
                />
              </>
            ) : (
              formattedData
            )}
          </section>
        </article>
      )}

      <DragAndDrop processFile={processFile} setErrorMessage={setErrorMessage} />
    </div>
  );
}
