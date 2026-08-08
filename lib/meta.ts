import type { Metadata } from "next";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://tools.forhadakhan.com";
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@forhadakhan.com";
export const TITLE = "Tools by Forhad Khan";
export const SHORT_NAME = "Tools";
export const DESCRIPTION = "Tools by Forhad Khan is an all-in-one app offering essential tools seamlessly combined in one convenient web application for enhanced productivity.";
export const KEYWORDS = [
    "all-in-one tools app", "online productivity tools", "essential online tools", "toolkit app", "tools by Forhad Khan", 
    "QR code generator", "QR code scanner", "QR code reader", "QR code encoder", "QR code decoder", "QR code app", 
    "text editor", "markdown editor", "online text editor", "live text editor", "markdown text editor app", 
    "IP address lookup", "IP address details", "my IP address", "IP insights", "domain IP lookup", "IP address tool",
];

export const META_INFO: Metadata = {
    metadataBase: new URL(BASE_URL),
    title: {
        template: "%s | Tools by Forhad Khan",
        default: TITLE,
    },
    applicationName: TITLE,
    description: DESCRIPTION,
    keywords: KEYWORDS,
    authors: [{ name: "FORHAD KHAN", url: "https://forhadakhan.com" }],
    openGraph: {
        title: "Tools by Forhad Khan - Your all-in-One tool-kit for everyday needs!",
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
        creator: "@forhadakhan",
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