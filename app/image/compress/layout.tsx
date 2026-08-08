/**
 * FILE: app/image/compress/layout.tsx
 */

import ToolSectionHeader from "@/components/ToolSectionHeader";


export default function ImageCompressorLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="container mx-auto w-full">
            <ToolSectionHeader appId="image-compressor" />
            {children}
        </main>
    );
}
