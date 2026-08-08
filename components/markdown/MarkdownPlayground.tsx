"use client";

import { useState, useEffect } from 'react';
import MarkdownEditor from '@/components/markdown/MarkdownEditor';
import MarkdownPreview from '@/components/markdown/MarkdownPreview';

export default function MarkdownPlayground() {
    const [markdown, setMarkdown] = useState('');
    const [isEditorFullScreen, setIsEditorFullScreen] = useState(false);
    const [isPreviewFullScreen, setIsPreviewFullScreen] = useState(false);

    const handleToggleEditorFullScreen = () => {
        setIsPreviewFullScreen(isEditorFullScreen);
        setIsEditorFullScreen(!isEditorFullScreen);
    };

    const handleTogglePreviewFullScreen = () => {
        setIsEditorFullScreen(isPreviewFullScreen);
        setIsPreviewFullScreen(!isPreviewFullScreen);
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsEditorFullScreen(false);
                setIsPreviewFullScreen(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
            <MarkdownEditor
                markdown={{ value: markdown, update: setMarkdown }}
                isFullScreen={isEditorFullScreen}
                handleToggleFullScreen={() => setIsEditorFullScreen(!isEditorFullScreen)}
                modeToggle={handleToggleEditorFullScreen}
            />
            <MarkdownPreview
                markdown={markdown}
                isFullScreen={isPreviewFullScreen}
                handleToggleFullScreen={() => setIsPreviewFullScreen(!isPreviewFullScreen)}
                modeToggle={handleTogglePreviewFullScreen}
            />
        </div>
    );
}
