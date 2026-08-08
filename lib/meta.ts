import type { Metadata } from "next";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://ferdinandestoque.com";
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@ferdinandestoque.com";
export const TITLE = "All in one Tools";
export const SHORT_NAME = "All in one Tools";
export const DESCRIPTION = "All in one Tools by Ravenom is a minimalist toolkit that brings essential daily utilities into one fast and focused web application.";
export const KEYWORDS = [
    "all-in-one tools app", "online productivity tools", "essential online tools", "toolkit app", "all in one tools by Ravenom", 
    "QR code generator", "QR code scanner", "QR code reader", "QR code encoder", "QR code decoder", "QR code app", 
    "text editor", "markdown editor", "online text editor", "live text editor", "markdown text editor app", 
    "IP address lookup", "IP address details", "my IP address", "IP insights", "domain IP lookup", "IP address tool",
];

export const META_INFO: Metadata = {
    metadataBase: new URL(BASE_URL),
    title: {
        template: "%s | All in one Tools",
        default: TITLE,
    },
    applicationName: TITLE,
    description: DESCRIPTION,
    keywords: KEYWORDS,
    authors: [{ name: "Ravenom", url: "https://ferdinandestoque.com/" }],
    openGraph: {
        title: "All in one Tools by Ravenom",
        siteName: TITLE,
        description: DESCRIPTION,
        url: BASE_URL,
        type: "website",
        images: [
            {
                url: `/banner-image.jpg`,
                width: 4800,
                height: 2520,
                alt: TITLE,
            },
            {
                url: `/square-banner-image.jpeg`,
                width: 2160,
                height: 2160,
                alt: TITLE,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        creator: "@ravenom",
        title: TITLE,
        description: DESCRIPTION,
        images: `/banner-image.jpg`,
    },
    robots: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
    },
};