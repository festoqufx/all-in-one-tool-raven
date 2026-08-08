// app/edit-and-preview-markdown/layout.tsx

import ToolSectionHeader from "@/components/ToolSectionHeader";


export default function MarkdownLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="container mx-auto w-full">
            <ToolSectionHeader appId="edit-and-preview-markdown" />
            {children}
        </main>
    );
}
