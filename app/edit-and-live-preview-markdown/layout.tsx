// app/edit-and-preview-markdown/layout.tsx

import HomeLink from '@/components/HomeLink';
import { getAppLinkById } from '@/lib/apps-data';
import { DynamicIcon } from '@/components/ui/DynamicIcon';


export default function MarkdownLayout({ children }: { children: React.ReactNode }) {
    // Retrieve application link details based on the 'text-editor' id
    const appLink = getAppLinkById('edit-and-preview-markdown');

    return (
        <>
            <header className="flex items-center space-x-4 p-4">
                <HomeLink iconOnly={true} />
                <h1 className="text-lg lg:text-xl font-semibold flex items-center gap-2 border-bottom-none">
                    {/* Render dynamic icon and application label */}
                    <DynamicIcon name={appLink?.icon} defaultIcon="BoxIcon" />
                    {appLink?.label}
                </h1>
            </header>
            
            {children}
        </>
    );
}
