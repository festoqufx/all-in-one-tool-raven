import { AppLinkProps } from '@/lib/type-interface';
import * as to from "@/lib/routes";

export const AppLinks: AppLinkProps[] = [
    {
        id: 'qr-code',
        href: to.QR_ROUTE,
        icon: "QrCodeIcon",
        label: "QR Code",
        shortLabel: "QR",
        category: "Generate",
        keywords: "qr barcode scan generate wifi vcard sms email url",
        description: "Generate and read QR codes with clean, structured workflows.",
    },
    {
        id: 'text-editor',
        href: to.TEXT_EDITOR_ROUTE,
        icon: "FilePenLineIcon",
        label: "Text Editor",
        shortLabel: "Text",
        category: "Write",
        keywords: "notes txt rtf write draft document",
        description: "Edit text quickly with a distraction-free writing workspace.",
    },
    {
        id: 'edit-and-preview-markdown',
        href: to.MARKDOWN_PREVIEWER_ROUTE,
        icon: "Columns2Icon",
        label: "Markdown (Edit & Preview)",
        shortLabel: "Markdown",
        category: "Write",
        keywords: "markdown md preview github readme",
        description: "Write markdown and preview changes instantly side by side.",
    },
    {
        id: 'ip-insights',
        href: to.MY_IP_ROUTE,
        icon: "GlobeIcon",
        label: "IP Insights",
        shortLabel: "IP",
        category: "Network",
        keywords: "ip address dns domain lookup geolocation isp",
        description: "View your public IP data, region details, and network context.",
    },
    {
        id: 'image-compressor',
        href: to.IMAGE_ROUTE.COMPRESSOR,
        icon: "Minimize2Icon",
        label: "Image Compressor",
        shortLabel: "Image",
        category: "Media",
        keywords: "compress jpeg png webp optimize resize",
        description: "Shrink image sizes while preserving quality for faster sharing.",
    },
];

export const getAppLinkById = (id: string): AppLinkProps | undefined => {
    return AppLinks.find(link => link.id === id);
}
