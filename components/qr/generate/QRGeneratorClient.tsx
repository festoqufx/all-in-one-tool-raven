"use client";

import dynamic from "next/dynamic";
import { QrCodeIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { LoadingDots } from "@/components/ui/LoadingDots";
import { cn } from "@/lib/utils";

const GenerateTxtToQR = dynamic(
  () => import("@/components/qr/generate/GenerateTxtToQR").then((m) => m.GenerateTxtToQR),
  { loading: () => <TabLoader /> }
);
const GenerateUrlToQR = dynamic(
  () => import("@/components/qr/generate/GenerateUrlToQR").then((m) => m.GenerateUrlToQR),
  { loading: () => <TabLoader /> }
);
const GenerateWiFiToQR = dynamic(
  () => import("@/components/qr/generate/GenerateWiFiToQR").then((m) => m.GenerateWiFiToQR),
  { loading: () => <TabLoader /> }
);
const GenerateEmailToQR = dynamic(
  () => import("@/components/qr/generate/GenerateEmailToQR").then((m) => m.GenerateEmailToQR),
  { loading: () => <TabLoader /> }
);
const GenerateSMSToQR = dynamic(
  () => import("@/components/qr/generate/GenerateSMSToQR").then((m) => m.GenerateSMSToQR),
  { loading: () => <TabLoader /> }
);
const GenerateVcardQRCode = dynamic(
  () => import("@/components/qr/generate/GenerateVcardQRCode"),
  { loading: () => <TabLoader /> }
);

const TAB_OPTIONS = [
  { id: "text", label: "Text", Component: GenerateTxtToQR },
  { id: "url", label: "URL", Component: GenerateUrlToQR },
  { id: "wifi", label: "WiFi", Component: GenerateWiFiToQR },
  { id: "email", label: "Email", Component: GenerateEmailToQR },
  { id: "sms", label: "SMS", Component: GenerateSMSToQR },
  { id: "vcard", label: "VCard", Component: GenerateVcardQRCode },
] as const;

type TabId = (typeof TAB_OPTIONS)[number]["id"];

function TabLoader() {
  return (
    <div className="flex min-h-64 items-center justify-center">
      <LoadingDots size={6} />
    </div>
  );
}

export default function QRGeneratorClient() {
  const [activeTab, setActiveTab] = useState<TabId>("text");

  useEffect(() => {
    const stored = window.localStorage.getItem("qr-generator-tab");
    if (TAB_OPTIONS.some((tab) => tab.id === stored)) {
      setActiveTab(stored as TabId);
    }
  }, []);

  const ActiveComponent =
    TAB_OPTIONS.find((tab) => tab.id === activeTab)?.Component ?? GenerateTxtToQR;

  return (
    <article className="container mx-auto mt-6 w-full md:mt-8">
      <h2 className="m-4 flex items-center gap-2 text-lg font-semibold tracking-tight">
        <QrCodeIcon className="h-6 w-6" />
        Generate QR codes
      </h2>

      <div
        className="flex max-w-full flex-wrap items-center justify-center"
        role="tablist"
        aria-label="QR code type"
      >
        {TAB_OPTIONS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => {
                setActiveTab(tab.id);
                window.localStorage.setItem("qr-generator-tab", tab.id);
              }}
              className={cn(
                "m-1 rounded-full border px-4 py-2 text-sm font-medium uppercase tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isActive
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-background text-foreground hover:border-foreground"
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="p-4" role="tabpanel">
        <ActiveComponent />
      </div>
    </article>
  );
}
