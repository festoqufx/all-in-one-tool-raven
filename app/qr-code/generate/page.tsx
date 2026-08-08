import { Metadata } from 'next';
import { QrCodeIcon } from 'lucide-react';
import { CardTitle } from "@/components/ui/card";
import { GenerateTabs } from "@/components/qr/Tabs";
import { GenerateTxtToQR } from "@/components/qr/generate/GenerateTxtToQR";
import { GenerateUrlToQR } from "@/components/qr/generate/GenerateUrlToQR";
import { GenerateSMSToQR } from '@/components/qr/generate/GenerateSMSToQR';
import { GenerateWiFiToQR } from '@/components/qr/generate/GenerateWiFiToQR';
import { GenerateEmailToQR } from "@/components/qr/generate/GenerateEmailToQR";
import { GenerateVcardQRCode } from "@/components/qr/generate/GenerateVcardQRCode";

// Metadata for the page
export const metadata: Metadata = {
    title: 'QR Code Generator',
    description: 'Generate custom QR codes effortlessly in various formats including TEXT, URL, VCARD, EMAIL, SMS, and WIFI. Start creating your QR codes now!',
};

// List of tab options with their corresponding components
const tabOptions = [
    { text: "Text", Component: GenerateTxtToQR },
    { text: "URL", Component: GenerateUrlToQR },
    { text: "WiFi", Component: GenerateWiFiToQR },
    { text: "Email", Component: GenerateEmailToQR },
    { text: "SMS", Component: GenerateSMSToQR },
    { text: "VCard", Component: GenerateVcardQRCode },
];

/**
 * Renders the content for each tab.
 * 
 * @param {React.ComponentType} Component - The component to render inside the tab.
 * @returns {JSX.Element} - The rendered tab content.
 */
const TabContent: React.FC<{ Component: React.ComponentType }> = ({ Component }) => (
    <article className="p-4" role="tabpanel">
        <Component />
    </article>
);

/**
 * Component for rendering custom tabs for different QR code generation options.
 * Uses the `GenerateTabs` component to display tabs and their associated content.
 * 
 * @returns {JSX.Element} - The rendered tabs with corresponding QR code generators.
 */
export default function CustomTabs() {
    // Create tab options with rendered tab content
    const options = tabOptions.map(({ text, Component }) => ({
        text,
        content: <TabContent key={text} Component={Component} />,
    }));

    const allOptions = tabOptions.map(option => option.text).join(', ');

    return (
        <>
            <h1 className='sr-only'>Generate QR Codes for {allOptions}, and More.</h1>

            <article className="container w-full mx-auto mt-8">
                <CardTitle className="flex items-center gap-2 m-4">
                    <QrCodeIcon className="w-6 h-6" />
                    Generate QR codes
                </CardTitle>
                <GenerateTabs options={options} />
            </article>
        </>
    );
}
