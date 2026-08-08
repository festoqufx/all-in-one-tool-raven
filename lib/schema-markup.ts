import { TITLE, DESCRIPTION, KEYWORDS, CONTACT_EMAIL, SHORT_NAME, BASE_URL } from "@/lib/meta";

export const SchemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": TITLE,
    "email": CONTACT_EMAIL,
    "alternateName": SHORT_NAME,
    "url": BASE_URL,
    "keywords": [...KEYWORDS],
    "logo": {
        "@type": "ImageObject",
        "url": "/icon.jpeg",
    },
    "image": {
        "@type": "ImageObject",
        "url": "/banner-image.jpg",
    },
    "description": DESCRIPTION,
};