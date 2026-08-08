"use client"

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { usePathname } from 'next/navigation';
import { ITabsData } from "@/lib/type-interface";
import { ILinkTabsData } from "@/lib/type-interface";
import { CircleIcon, CircleDotIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface GenerateTabsProps {
    options: ITabsData[];
}

/**
 * `GenerateTabs` is a functional React component that renders a tabbed interface.
 * 
 * @param {GenerateTabsProps} props - The properties for the component.
 * @param {ITabsData[]} props.options - An array of tab options, where each option contains text for the tab and content to display in the tab panel.
 * 
 * @returns {JSX.Element} The rendered tabbed interface.
 */
const GenerateTabs: React.FC<GenerateTabsProps> = ({ options }) => {
    // Initialize the active tab based on the first option
    const [activeTab, setActiveTab] = useState(options[0].text.toLowerCase());

    return (
        <>
            {/* Tab Buttons */}
            <section className="flex flex-wrap items-center justify-center max-w-full">
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
                            onClick={() => setActiveTab(option.text.toLowerCase())}
                            className={`px-4 border m-1 py-2 text-sm font-medium focus:outline-none uppercase ${isActive
                                ? "border-b-2 bg-black text-white"
                                : "text-black bg-white border-black"
                                }`}
                        >
                            {option.text}
                        </button>
                    );
                })}
            </section>

            {/* Tab Panels */}
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

/**
 * `GenerateLinkTabs` is a functional React component that renders a set of tab links.
 * Each tab link navigates to a different route, and the active tab is styled differently based on the current route.
 * 
 * @param {GenerateLinkTabsProps} props - The properties for the component.
 * @param {ILinkTabsData[]} props.tabs - An array of tab objects where each object contains:
 *   - `label` (string): The text to display on the tab.
 *   - `href` (string): The URL to navigate to when the tab is clicked.
 * 
 * @returns {JSX.Element} The rendered set of tab links.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function GenerateLinkTabs({ tabs, className, activeClassName }: GenerateLinkTabsProps) {
    const pathname = usePathname()

    return (
        <Tabs value={pathname} className="container w-full mx-auto">
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
    // Get the current pathname from the Next.js navigation context
    const pathname = usePathname();

    return (
        <article className="w-full bg-black p-2 flex items-center justify-center gap-1">
            {tabs.map((tab) => (
                <Link key={tab.label} href={tab.href} legacyBehavior>
                    <a
                        className={cn(
                            "py-2 px-4 font-bold bg-gray-100 flex items-center gap-1 border rounded",
                            pathname === tab.href ?
                                `border-b-4 border-gray-500 text-gray-500 ${activeClassName}` :
                                `border-b-4 border-gray-700 text-gray-700 bg-white hover:text-blue-500 hover:border-blue-500`,
                            className
                        )}
                    >
                        {pathname === tab.href ? <CircleDotIcon strokeWidth={3} className="w-4 h-4" /> : <CircleIcon className="w-4 h-4 opacity-50" />}
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
