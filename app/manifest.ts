import { MetadataRoute } from "next";
import { TITLE, DESCRIPTION, SHORT_NAME } from "@/lib/meta";

export default function manifest(): MetadataRoute.Manifest {
    return {
        id: "/",
        name: TITLE,
        short_name: SHORT_NAME,
        start_url: "/",
        display: "standalone",
        description: DESCRIPTION,
        icons: [
            {
                "src": "/square-banner-image.jpeg",
                "sizes": "2160x2160"
            },
            {
                "src": "/android-chrome-192x192.png",
                "sizes": "192x192"
            },
            {
                "src": "/android-chrome-512x512.png",
                "sizes": "512x512"
            },
            {
                "src": "/favicon-16x16.png",
                "sizes": "16x16"
            },
            {
                "src": "/favicon-32x32.png",
                "sizes": "32x32"
            }
        ],
        theme_color: "#000000",         // for the address bar
        background_color: "#000000",    // for splash screen
        orientation: "any",
    };
}
