import { AppLinkProps } from '@/lib/type-interface';
import * as to from "@/lib/routes";

// Array to hold link data
export const AppLinks: AppLinkProps[] = [
    { id: 'qr-code', href: to.QR_ROUTE, icon: "QrCodeIcon", label: "QR Code" },
    { id: 'text-editor', href: to.TEXT_EDITOR_ROUTE, icon: "FilePenLineIcon", label: "Text Editor" },
    { id: 'edit-and-preview-markdown', href: to.MARKDOWN_PREVIEWER_ROUTE, icon: "Columns2Icon", label: "Markdown (Edit & Preview)" },
    { id: 'ip-insights', href: to.MY_IP_ROUTE, icon: "GlobeIcon", label: "IP Insights" },
    { id: 'image-compressor', href: to.IMAGE_ROUTE.COMPRESSOR, icon: "Minimize2Icon", label: "Image Compressor" },
];

// Function to get a link by its id
export const getAppLinkById = (id: string): AppLinkProps | undefined => {
    return AppLinks.find(link => link.id === id);
}
