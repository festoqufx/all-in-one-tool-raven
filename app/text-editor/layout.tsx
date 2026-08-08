// app/text-editor/layout.tsx

import ToolSectionHeader from "@/components/ToolSectionHeader";


export default function TextEditorHomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="container mx-auto w-full">
            <ToolSectionHeader appId="text-editor" />
            {children}
        </main>
    );
}
