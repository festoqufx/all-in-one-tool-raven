// app/qr-code/layout.tsx

import { ILinkTabsData } from "@/lib/type-interface";
import { GenerateLinkTabs } from '@/components/qr/Tabs';
import ToolSectionHeader from "@/components/ToolSectionHeader";


/**
 * Array of tabs for navigation within the QR code section.
 * Each tab represents a link to different functionalities related to QR codes.
 */
const tabs: ILinkTabsData[] = [
    { label: 'Generator', href: '/qr-code/generate' },
    { label: 'Reader', href: '/qr-code/reader' },
];

/**
 * Layout component for the QR code section of the application.
 * Renders a header with a dynamic icon and application label, navigation tabs, and a content area.
 * 
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 * @returns {JSX.Element} - The rendered layout component.
 */
export default function QrCodeLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="container mx-auto w-full">
            <ToolSectionHeader appId="qr-code" />
            <section>
                {/* Render navigation tabs */}
                <GenerateLinkTabs tabs={tabs} />
                {/* Render child components */}
                {children}
            </section>
        </main>
    );
}
