"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { usePathname } from 'next/navigation';
import { ITabsData } from "@/lib/type-interface";
import { ILinkTabsData } from "@/lib/type-interface";
import { CircleIcon, CircleDotIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface GenerateTabsProps {
    options: ITabsData[];
}

const GenerateTabs: React.FC<GenerateTabsProps> = ({ options }) => {
    const [activeTab, setActiveTab] = useState(options[0].text.toLowerCase());

    useEffect(() => {
        const stored = window.localStorage.getItem("qr-generator-tab");
        if (stored && options.some((option) => option.text.toLowerCase() === stored)) {
            setActiveTab(stored);
        }
        // Restore last used generator tab once on mount.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const selectTab = (tab: string) => {
        setActiveTab(tab);
        window.localStorage.setItem("qr-generator-tab", tab);
    };

    return (
        <>
            <section className="flex max-w-full flex-wrap items-center justify-center" role="tablist">
                {options.map((option) => {
                    const tabId = `tab-${option.text.toLowerCase()}`;
                    const panelId = `tabpanel-${option.text.toLowerCase()}`;
                    const isActive = activeTab === option.text.toLowerCase();

                    return (
                        <button
                            key={option.text}
                            id={tabId}
                            role="tab"
                            aria-selected={isActive}
                            aria-controls={panelId}
                            onClick={() => selectTab(option.text.toLowerCase())}
                            className={cn(
                                "m-1 rounded-full border px-4 py-2 text-sm font-medium uppercase tracking-wide focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                isActive
                                    ? "border-foreground bg-foreground text-background"
                                    : "border-border bg-background text-foreground hover:border-foreground"
                            )}
                        >
                            {option.text}
                        </button>
                    );
                })}
            </section>

            <section>
                {options
                    .filter(option => option.text.toLowerCase() === activeTab)
                    .map(option => (
                        <div
                            key={option.text}
                            id={`tabpanel-${option.text.toLowerCase()}`}
                            role="tabpanel"
                            aria-labelledby={`tab-${option.text.toLowerCase()}`}
                        >
                            {option.content}
                        </div>
                    ))}
            </section>
        </>
    );
};

interface GenerateLinkTabsProps {
    tabs: ILinkTabsData[];
    className?: string;
    activeClassName?: string;
}

export default function GenerateLinkTabs({ tabs }: GenerateLinkTabsProps) {
    const pathname = usePathname()

    return (
        <Tabs value={pathname} className="container mx-auto w-full">
            <TabsList className="grid w-full grid-cols-2">
                {tabs.map((tab) => (
                    <TabsTrigger key={tab.label} value={tab.href} asChild>
                        <Link href={tab.href}>{tab.label}</Link>
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    )
}

const GenerateLinkTabs2: React.FC<GenerateLinkTabsProps> = ({ tabs, className, activeClassName }) => {
    const pathname = usePathname();

    return (
        <article className="flex w-full items-center justify-center gap-1 rounded-full bg-foreground p-2">
            {tabs.map((tab) => (
                <Link key={tab.label} href={tab.href} legacyBehavior>
                    <a
                        className={cn(
                            "flex items-center gap-1 rounded-full border px-4 py-2 font-bold",
                            pathname === tab.href ?
                                `border-background bg-background text-foreground ${activeClassName}` :
                                `border-transparent bg-transparent text-background/80 hover:text-background`,
                            className
                        )}
                    >
                        {pathname === tab.href ? <CircleDotIcon strokeWidth={3} className="h-4 w-4" /> : <CircleIcon className="h-4 w-4 opacity-50" />}
                        {tab.label}
                    </a>
                </Link>
            ))}
        </article>
    );
};


export {
    GenerateTabs,
    GenerateLinkTabs,
    GenerateLinkTabs2,
    GenerateTabs as Tabs,
    GenerateLinkTabs as LinkTabs,
};
