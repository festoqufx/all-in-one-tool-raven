// app/ip-insights/layout.tsx

import ToolSectionHeader from "@/components/ToolSectionHeader";


export default function MyIPLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="container mx-auto w-full">
            <ToolSectionHeader appId="ip-insights" />
            {children}
        </main>
    );
}
