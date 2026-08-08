import { AppLinkProps } from '@/lib/type-interface';
import * as to from "@/lib/routes";

// Array to hold link data
export const AppLinks: AppLinkProps[] = [
    {
        id: 'qr-code',
        href: to.QR_ROUTE,
        icon: "QrCodeIcon",
        label: "QR Code",
        description: "Generate and read QR codes with clean, structured workflows.",
    },
    {
        id: 'text-editor',
        href: to.TEXT_EDITOR_ROUTE,
        icon: "FilePenLineIcon",
        label: "Text Editor",
        description: "Edit text quickly with a distraction-free writing workspace.",
    },
    {
        id: 'edit-and-preview-markdown',
        href: to.MARKDOWN_PREVIEWER_ROUTE,
        icon: "Columns2Icon",
        label: "Markdown (Edit & Preview)",
        description: "Write markdown and preview changes instantly side by side.",
    },
    {
        id: 'ip-insights',
        href: to.MY_IP_ROUTE,
        icon: "GlobeIcon",
        label: "IP Insights",
        description: "View your public IP data, region details, and network context.",
    },
    {
        id: 'image-compressor',
        href: to.IMAGE_ROUTE.COMPRESSOR,
        icon: "Minimize2Icon",
        label: "Image Compressor",
        description: "Shrink image sizes while preserving quality for faster sharing.",
    },
];

// Function to get a link by its id
export const getAppLinkById = (id: string): AppLinkProps | undefined => {
    return AppLinks.find(link => link.id === id);
}
