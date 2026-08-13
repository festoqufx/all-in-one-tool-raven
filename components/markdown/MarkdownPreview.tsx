"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import ReactShowdown from 'react-showdown';
import { Button } from '@/components/ui/button';
import { MarkdownIcon } from '@/components/markdown/MarkdownIcon';
import { CopyToClipboardButton } from '@/components/ui/CopyToClipboardButton';
import { ExpandIcon, ShrinkIcon, PrinterIcon, DownloadIcon } from 'lucide-react';

interface MarkdownPreviewProps {
    markdown: string;
    isFullScreen: boolean;
    handleToggleFullScreen?: () => void;
    modeToggle?: () => void;
}

export default function MarkdownPreview({ markdown, isFullScreen, handleToggleFullScreen, modeToggle }: MarkdownPreviewProps) {
    const handlePrint = () => {
        const printContent = document.getElementById("preview-content")?.innerHTML;
        const printWindow = window.open('', '_blank');

        if (printWindow && printContent) {
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Print Preview</title>
                        <style>
                            body { font-family: system-ui, sans-serif; margin: 20px; color: #111; }
                            blockquote { margin: 20px 15px; padding: 0.4em; color: #555; border-left: 0.25em solid #ccc; background: #f4f4f4; }
                            p { margin: 10px 0; line-height: 1.6; }
                            a { color: #111; text-decoration: underline; }
                            code, pre { background: #f2f2f2; border-radius: 8px; font-family: ui-monospace, monospace; }
                            pre { display: block; padding: 15px; margin: 15px 0; }
                            h1, h2 { border-bottom: 1px solid #ddd; padding-bottom: 8px; }
                            table { width: 100%; border-collapse: collapse; }
                            th, td { padding: 6px 13px; border: 1px solid #ddd; }
                            img { max-width: 100%; }
                            ul { list-style: disc; margin-left: 1.25rem; }
                            ol { list-style: decimal; margin-left: 1.25rem; }
                        </style>
                    </head>
                    <body>
                        <div id="preview-content">${printContent}</div>
                    </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.print();
        }
    };

    const handleSaveAsMarkdown = () => {
        const blob = new Blob([markdown], { type: 'text/markdown' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = 'document.md';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <article className={cn(
            "flex flex-col",
            isFullScreen && "fixed inset-0 z-50 bg-background p-8 scrollbar-hide"
        )}>
            <header className="mb-2 flex items-center justify-between rounded-xl bg-foreground p-2" id='editor-header'>
                <h2 className="mb-0 flex items-center text-lg font-semibold text-background md:text-xl">
                    <MarkdownIcon className="mr-2 h-8 w-12 fill-background px-2" />
                    Preview
                </h2>
                <section className='flex space-x-2'>
                    <CopyToClipboardButton
                        data={markdown}
                        copyIconClassName='w-4 h-4'
                        className='rounded-md bg-foreground p-2 text-background hover:bg-background hover:text-foreground'
                    />
                    <Button
                        className='bg-foreground text-background hover:bg-background hover:text-foreground'
                        size={'icon'}
                        title='Save as Markdown'
                        onClick={handleSaveAsMarkdown}
                    >
                        <DownloadIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        size={'icon'}
                        title='Print Preview'
                        onClick={handlePrint}
                        className='bg-foreground text-background hover:bg-background hover:text-foreground'
                    >
                        <PrinterIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        size={'icon'}
                        title='Toggle FullScreen'
                        onClick={handleToggleFullScreen}
                        className='bg-foreground text-background hover:bg-background hover:text-foreground'
                    >
                        {isFullScreen ? <ShrinkIcon className="h-4 w-4" /> : <ExpandIcon className="h-4 w-4" />}
                    </Button>
                </section>
            </header>

            <div className="markdown-preview scrollbar-hide h-[calc(100vh-240px)] w-full overflow-auto rounded-xl border border-border bg-card p-6">
                {markdown ? (
                    <ReactShowdown
                        id="preview-content"
                        markdown={markdown}
                        flavor="github"
                        options={{ emoji: true }}
                    />
                ) : (
                    <div className="flex h-full items-center justify-center">
                        <MarkdownIcon className="h-24 w-24 fill-muted-foreground/30" aria-label="No content available" />
                    </div>
                )}
            </div>

            {isFullScreen && (
                <footer>
                    <Button type='button' size={'sm'} onClick={modeToggle} className='mx-auto my-4 w-36 max-w-lg'>
                        Edit
                    </Button>
                </footer>
            )}
        </article>
    );
}
