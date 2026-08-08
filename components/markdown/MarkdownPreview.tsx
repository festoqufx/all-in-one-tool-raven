"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import styled from 'styled-components';
import ReactShowdown from 'react-showdown';
import { Button } from '@/components/ui/button';
import { MarkdownIcon } from '@/components/markdown/MarkdownIcon';
import { CopyToClipboardButton } from '@/components/ui/CopyToClipboardButton';
import { ExpandIcon, ShrinkIcon, PrinterIcon, DownloadIcon } from 'lucide-react';

// Define the styled component with all your styles
const PreviewContent = styled.main`
    #preview-content blockquote {
        margin: 20px 15px !important;
        padding: 0.4em;
        color: #666c74;
        border-left: 0.25em solid #dfe2e5;
        background-color: #f3f3f3;
    }

    #preview-content p {
        margin: 10px 0 !important;
        line-height: 1.6 !important;
    }

    #preview-content a {
        color: blue;
        text-decoration: none;
        transition: color 0.3s ease-in-out !important;
    }

    #preview-content a:hover {
        text-decoration: underline;
    }

    #preview-content code {
        background-color: #eeecec;
        border-radius: 8px;
        padding: 5px;
        margin: 10px 0;
        font-family: "Courier New", Courier, monospace;
        font-size: 14px;
        line-height: 1.5;
        color: #333;
    }

    #preview-content pre {
        display: block;
        background-color: #eeecec !important;
        padding: 15px !important;
        margin: 15px 0 !important;
        border-radius: 15px;
    }

    #preview-content h1,
    #preview-content h2,
    #preview-content h3,
    #preview-content h4,
    #preview-content h5,
    #preview-content h6 {
        font-weight: bold !important;
        margin-top: 20px !important;
        margin-bottom: 10px !important;
    }

    #preview-content h1 {
        font-size: 32px !important;
        border-bottom: 1px solid #eaecef !important;
        padding-bottom: 10px !important;
    }

    #preview-content h2 {
        font-size: 24px !important;
        border-bottom: 1px solid #eaecef !important;
        padding-bottom: 6px !important;
    }

    #preview-content h3 {
        font-size: 20px !important;
    }

    #preview-content h4 {
        font-size: 16px !important;
    }

    #preview-content h5 {
        font-size: 14px !important;
    }

    #preview-content h6 {
        font-size: 12px !important;
    }

    #preview-content table {
        width: 100% !important;
        border-collapse: collapse !important;
        margin-bottom: 16px !important;
    }

    #preview-content th,
    #preview-content td {
        padding: 6px 13px !important;
        border: 1px solid #dfe2e5 !important;
    }

    #preview-content th {
        background-color: #f6f8fa !important;
        font-weight: bold !important;
    }

    #preview-content td {
        background-color: #fff !important;
    }

    #preview-content img {
        width: auto;
        max-width: 100%;
        margin: 1.5rem auto;
        height: auto;
        border: 0;
        vertical-align: middle;
    }

    #preview-content strong {
        font-weight: 600;
    }

    #preview-content em,
    #preview-content i {
        font-style: italic;
    }

    #preview-content del {
        text-decoration: line-through;
        color: #cb2431;
    }

    #preview-content ul {
        list-style-type: disc !important;
        margin: 10px !important;
        list-style-position: outside !important;
    }

    #preview-content ul ul {
        list-style-type: circle !important;
    }

    #preview-content ul ul ul {
        list-style-type: square !important;
    }

    #preview-content ol {
        list-style-type: decimal !important;
        margin: 15px !important;
    }

    #preview-content .border-bottom-none {
        border-bottom: none !important;
    }
`;


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
                        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400&display=swap" rel="stylesheet">
                        <style>
                            body {
                                font-family: "Noto Sans", sans-serif;
                                margin: 20px;
                            }
                            blockquote {
                                margin: 20px 15px !important;
                                padding: 0.4em;
                                color: #666c74;
                                border-left: 0.25em solid #dfe2e5;
                                background-color: #f3f3f3;
                            }
                            p {
                                margin: 10px 0 !important;
                                line-height: 1.6 !important;
                            }
                            a {
                                color: blue;
                                text-decoration: none;
                                transition: color 0.3s ease-in-out !important;
                            }
                            a:hover {
                                text-decoration: underline;
                            }
                            code {
                                background-color: #eeecec;
                                border-radius: 8px;
                                padding: 5px;
                                margin: 10px 0;
                                font-family: "Courier New", Courier, monospace;
                                font-size: 14px;
                                line-height: 1.5;
                                color: #333;
                            }
                            pre {
                                display: block;
                                background-color: #eeecec !important;
                                padding: 15px !important;
                                margin: 15px 0 !important;
                                border-radius: 15px;
                            }
                            h1, h2, h3, h4, h5, h6 {
                                font-weight: bold !important;
                                margin-top: 20px !important;
                                margin-bottom: 10px !important;
                            }
                            h1 {
                                font-size: 32px !important;
                                border-bottom: 1px solid #eaecef !important;
                                padding-bottom: 10px !important;
                            }
                            h2 {
                                font-size: 24px !important;
                                border-bottom: 1px solid #eaecef !important;
                                padding-bottom: 6px !important;
                            }
                            h3 { font-size: 20px !important; }
                            h4 { font-size: 16px !important; }
                            h5 { font-size: 14px !important; }
                            h6 { font-size: 12px !important; }
                            table {
                                width: 100% !important;
                                border-collapse: collapse !important;
                                margin-bottom: 16px !important;
                            }
                            th, td {
                                padding: 6px 13px !important;
                                border: 1px solid #dfe2e5 !important;
                            }
                            th {
                                background-color: #f6f8fa !important;
                                font-weight: bold !important;
                            }
                            td {
                                background-color: #fff !important;
                            }
                            img {
                                width: auto;
                                max-width: 100%;
                                margin: 1.5rem auto;
                                height: auto;
                                border: 0;
                                vertical-align: middle;
                            }
                            strong { font-weight: 600; }
                            em, i { font-style: italic; }
                            del {
                                text-decoration: line-through;
                                color: #cb2431;
                            }
                            ul {
                                list-style-type: disc !important;
                                margin: 10px !important;
                                list-style-position: outside !important;
                            }
                            ul ul { list-style-type: circle !important; }
                            ul ul ul { list-style-type: square !important; }
                            ol {
                                list-style-type: decimal !important;
                                margin: 15px !important;
                            }
                            .border-bottom-none {
                                border-bottom: none !important;
                            }
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
        link.href = URL.createObjectURL(blob);
        link.download = 'document.md';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <article className={cn(
            "flex flex-col",
            isFullScreen && "fixed p-8 top-0 left-0 bg-gray-50 right-0 bottom-0 z-50 scrollbar-hide"
        )}>
            {/* Editor Header */}
            <header className="flex items-center justify-between mb-2 bg-black rounded p-2" id='editor-header'>
                <h2 className="text-xl font-semibold mb-2 flex items-center text-white">
                    <MarkdownIcon className="w-12 h-8 bg-black fill-white rounded-md mr-2 px-2" />
                    Preview
                </h2>
                <section className='flex space-x-2'>

                    {/* Save as Markdown Button */}
                    <CopyToClipboardButton
                        data={markdown}
                        copyIconClassName='w-4 h-4'
                        className='bg-black text-white hover:bg-gray-50 hover:text-black p-2 rounded'
                    />

                    {/* Save as Markdown Button */}
                    <Button
                        className='bg-black hover:bg-gray-50 hover:text-black'
                        size={'icon'}
                        title='Save as Markdown'
                        onClick={handleSaveAsMarkdown}
                    >
                        <DownloadIcon className="w-4 h-4" />
                    </Button>

                    {/* Print Button */}
                    <Button
                        size={'icon'}
                        title='Print Preview'
                        onClick={handlePrint}
                        className='bg-black hover:bg-gray-50 hover:text-black'
                    >
                        <PrinterIcon className="w-4 h-4" />
                    </Button>

                    {/* FullScreen Control Button */}
                    <Button
                        size={'icon'}
                        title='Toggle FullScreen'
                        onClick={handleToggleFullScreen}
                        className='bg-black hover:bg-gray-50 hover:text-black'
                    >
                        {isFullScreen ? <ShrinkIcon className="w-4 h-4" /> : <ExpandIcon className="w-4 h-4" />}
                    </Button>
                </section>
            </header>

            <PreviewContent className="h-[calc(100vh-200px)] border rounded border-black overflow-auto w-full bg-white p-6 scrollbar-hide">
                {markdown ? (
                    <ReactShowdown
                        id="preview-content"
                        markdown={markdown}
                        flavor="github"
                        options={{ emoji: true }}
                    />
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <MarkdownIcon className="w-24 h-24 fill-gray-300" aria-label="No content available" />
                    </div>
                )}
            </PreviewContent>

            {/* Only display when full screen */}
            {isFullScreen && (
                <footer>
                    <Button type='button' size={'sm'} onClick={modeToggle} className='max-w-lg my-4 mx-auto w-36'>
                        Edit
                    </Button>
                </footer>
            )}
        </article>
    );
}

