import { Metadata } from "next";
import QRGeneratorClient from "@/components/qr/generate/QRGeneratorClient";

export const metadata: Metadata = {
  title: "QR Code Generator",
  description:
    "Generate custom QR codes effortlessly in various formats including TEXT, URL, VCARD, EMAIL, SMS, and WIFI. Start creating your QR codes now!",
};

export default function QrCodeGeneratorPage() {
  return (
    <>
      <h1 className="sr-only">Generate QR Codes for Text, URL, WiFi, Email, SMS, VCard, and More.</h1>
      <QRGeneratorClient />
    </>
  );
}
