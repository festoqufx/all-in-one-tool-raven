// app/qr-code/layout.tsx

import HomeLink from '@/components/HomeLink';
import { getAppLinkById } from '@/lib/apps-data';
import { ILinkTabsData } from "@/lib/type-interface";
import { DynamicIcon } from '@/components/ui/DynamicIcon';
import { GenerateLinkTabs } from '@/components/qr/Tabs';


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
    // Retrieve application link details based on the 'qr-code' id
    const appLink = getAppLinkById('qr-code');

    return (
        <>
            <header className="container flex items-center space-x-4 p-4">
                <HomeLink iconOnly={true} />
                <h1 className="text-lg lg:text-xl font-semibold flex items-center gap-2">
                    {/* Render dynamic icon and application label */}
                    <DynamicIcon name={appLink?.icon} defaultIcon="BoxIcon" />
                    {appLink?.label}
                </h1>
            </header>
            <main>
                {/* Render navigation tabs */}
                <GenerateLinkTabs tabs={tabs} />
                {/* Render child components */}
                {children}
            </main>
        </>
    );
}
