import { Metadata } from 'next';
import ReadQrCodePage from "@/components/qr/ReadQrCodePage";

// Metadata for the page
export const metadata: Metadata = {
  title: 'QR Code Reader',
  description: 'Read QR codes effortlessly in various formats including TEXT, URL, VCARD, EMAIL, SMS, and WIFI. Start decoding your QR codes now!',
};

export default function Home() {
  return (
    <>
      <h1 className='sr-only'>{metadata.title as string} </h1>
      <h2 className='sr-only'>{metadata.description as string}</h2>

      <article className="flex min-h-screen flex-col items-center justify-between">
        {/* Render the ReadQrCodePage component */}
        <ReadQrCodePage />
      </article>
    </>
  );
}
