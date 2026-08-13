"use client";

import { QrCodeIcon } from "lucide-react";
import React, { useRef, useState } from "react";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { triggerDownloadFromUrl } from "@/lib/utils";

const MissingQRData = () => (
  <div className="my-8 flex flex-col items-center space-y-4">
    <QrCodeIcon
      strokeWidth={1.5}
      size={220}
      className="mt-4 rounded-md border border-dashed border-border text-muted-foreground/40"
    />
    <p className="w-full rounded-full border border-border bg-foreground px-4 py-2 text-center text-sm font-semibold text-background">
      Missing QR Content
    </p>
  </div>
);

interface QRCodeDownloadProps {
  value: string;
  size: number;
  bgColor?: string;
  fgColor?: string;
  level?: "L" | "M" | "Q" | "H";
  marginSize?: number;
}

const QRCode: React.FC<QRCodeDownloadProps> = ({
  value,
  size,
  bgColor = "#ffffff",
  fgColor = "#000000",
  level: initialLevel = "M",
  marginSize = 1,
}) => {
  const previewRef = useRef<HTMLDivElement | null>(null);
  const svgWrapRef = useRef<HTMLDivElement | null>(null);
  const [level, setLevel] = useState<"L" | "M" | "Q" | "H">(initialLevel);

  const downloadPng = () => {
    const canvas = previewRef.current?.querySelector("canvas");
    if (!canvas) return;
    triggerDownloadFromUrl(canvas.toDataURL("image/png"), "qr-code.png");
  };

  const downloadSvg = () => {
    const svg = svgWrapRef.current?.querySelector("svg");
    if (!svg) return;
    const source = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    triggerDownloadFromUrl(url, "qr-code.svg");
    URL.revokeObjectURL(url);
  };

  if (!value.trim()) {
    return <MissingQRData />;
  }

  return (
    <section className="my-8 flex w-full max-w-xs flex-col items-center space-y-4">
      <div ref={previewRef} className="rounded-md border border-border bg-white p-3">
        <QRCodeCanvas
          value={value}
          size={size || 200}
          bgColor={bgColor}
          fgColor={fgColor}
          level={level}
          marginSize={marginSize}
          includeMargin={false}
        />
      </div>
      <div ref={svgWrapRef} className="sr-only" aria-hidden="true">
        <QRCodeSVG
          value={value}
          size={size || 200}
          bgColor={bgColor}
          fgColor={fgColor}
          level={level}
          marginSize={marginSize}
        />
      </div>
      <label className="flex w-full items-center justify-between gap-3 text-xs text-muted-foreground">
        Error correction
        <select
          value={level}
          onChange={(event) => setLevel(event.target.value as "L" | "M" | "Q" | "H")}
          className="field-input max-w-[8rem] py-1.5"
          aria-label="QR error correction level"
        >
          <option value="L">Low</option>
          <option value="M">Medium</option>
          <option value="Q">Quartile</option>
          <option value="H">High</option>
        </select>
      </label>
      <div className="flex w-full flex-col gap-2 sm:flex-row">
        <Button type="button" className="w-full" onClick={downloadPng}>
          Download PNG
        </Button>
        <Button type="button" variant="outline" className="w-full" onClick={downloadSvg}>
          Download SVG
        </Button>
      </div>
    </section>
  );
};

export {
  QRCode,
  QRCode as GetQRCode,
  MissingQRData,
  MissingQRData as NoQRData,
  MissingQRData as NoQR,
};
export default QRCode;
