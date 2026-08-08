// File: lib/routes.ts

export const HOME_ROUTE = '/';
export const QR_ROUTE = '/qr-code';
export const QR_GENERATE_ROUTE = '/qr-code/generate';
export const QR_READ_ROUTE = '/qr-code/read';
export const BAR_CODE_ROUTE = '/bar-code';
export const BAR_CODE_GENERATE_ROUTE = '/bar-code/generate';
export const BAR_CODE_READ_ROUTE = '/bar-code/read';
export const COLOR_ROUTE = '/color';
export const TEXT_EDITOR_ROUTE = '/text-editor';
export const MARKDOWN_PREVIEWER_ROUTE = '/edit-and-live-preview-markdown';
export const IP_INSIGHTS_ROUTE = '/ip-insights';
export const MY_IP_ROUTE = IP_INSIGHTS_ROUTE;
export const VIDEO_EDITOR_ROUTE = '/video-editor';
export const IMAGE_ROUTE = {
    COMPRESSOR: '/image/compress',
};
export const VIDEO_EDITOR_ROUTES = {
    MERGE: '/video-editor/merge-videos',
    TRIM: '/video-editor/trim',
    CONVERT: {
        HOME: '/video-editor/convert',
        TStoMP4: '/video-editor/convert/ts-to-mp4',
        AVItoMP4: '/video-editor/convert/avi-to-mp4',
    },
    EXTRACT_AUDIO: '/video-editor/extract-audio',
    AUDIO_OVERLAY: '/video-editor/audio-overlay',
};
