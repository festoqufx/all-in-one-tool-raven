import type { MetadataRoute } from 'next';
import {
    HOME_ROUTE,
    QR_GENERATE_ROUTE,
    QR_READ_ROUTE,
    TEXT_EDITOR_ROUTE,
    MARKDOWN_PREVIEWER_ROUTE,
    MY_IP_ROUTE,
} from "@/lib/routes";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://tools.forhadakhan.com';


export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: `${BASE_URL}${HOME_ROUTE}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${BASE_URL}${QR_GENERATE_ROUTE}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}${QR_READ_ROUTE}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}${TEXT_EDITOR_ROUTE}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}${MARKDOWN_PREVIEWER_ROUTE}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}${MY_IP_ROUTE}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
    ]
}