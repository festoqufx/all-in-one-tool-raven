"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileInput } from '@/components/ui/FileInput';
import React, { useState, useEffect, useCallback } from 'react';
import { PlusIcon, MinusIcon, PrinterIcon, SaveIcon, FileIcon } from 'lucide-react';

/**
 * Props for EditorHeader.
 */
interface EditorHeaderProps {
    fileName: string;
    setFileName: React.Dispatch<React.SetStateAction<string>>;
    zoomLevel: number;
    handleZoom: (direction: 'in' | 'out') => void;
}

/**
 * EditorHeader displays the file name input and zoom controls.
 *
 * @param {EditorHeaderProps} props
 */
const EditorHeader: React.FC<EditorHeaderProps> = ({ fileName, setFileName, zoomLevel, handleZoom }) => (
    <header className="flex items-center justify-between px-4 pb-3">
        <section className="flex items-center">
            <FileIcon className="h-4 w-4 mr-2" />
            <Input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className='border-0 focus:ring-0 focus:border-slate-200 focus:shadow-none shadow-none underline underline-offset-4'
                aria-label="File name"
            />
        </section>
        <nav className="flex items-center space-x-2 ml-auto">
            <Button size="icon" variant="outline" onClick={() => handleZoom('out')} aria-label="Zoom out">
                <MinusIcon className="h-4 w-4" />
            </Button>
            <span className="hidden md:inline-block text-sm font-medium">{zoomLevel}%</span>
            <Button size="icon" variant="outline" onClick={() => handleZoom('in')} aria-label="Zoom in">
                <PlusIcon className="h-4 w-4" />
            </Button>
        </nav>
    </header>
);

/**
 * Props for EditorFooter.
 */
interface EditorFooterProps {
    characterCount: number;
    wordCount: number;
    lineCount: number;
}

/**
 * EditorFooter displays statistics about the content.
 *
 * @param {EditorFooterProps} props
 */
const EditorFooter: React.FC<EditorFooterProps> = ({ characterCount, wordCount, lineCount }) => (
    <footer className="text-sm text-muted-foreground px-4">
        {
            characterCount > 0
                ? (
                    <span>
                        Total <strong>{characterCount}</strong> characters, <strong>{wordCount}</strong> words, and <strong>{lineCount}</strong> lines
                    </span>
                )
                : 'No content.'
        }
    </footer>
);

/**
 * Main TextEditor component.
 *
 * @returns {JSX.Element} The rendered text editor component.
 */
export const TextEditor: React.FC = () => {
    const [content, setContent] = useState<string>('');
    const [zoomLevel, setZoomLevel] = useState<number>(100);
    const [fileName, setFileName] = useState<string>('Document');

    const handleFileChange = (file: File) => {
        const nameWithoutExtension = file.name.replace(/\.(txt|rtf)$/i, '');
        setFileName(nameWithoutExtension);

        const reader = new FileReader();
        reader.onload = (e) => {
            let text = e.target?.result as string;
            text = text.replace(/\r\n/g, '\n').replace(/\n/g, '<br>');
            setContent(text);
        };
        reader.readAsText(file);
    };

    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(`
                <html>
                  <head>
                    <title>${fileName || 'Document'}</title>
                    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bangla:wght@400&display=swap" rel="stylesheet">
                    <style>
                      body {
                        font-family: 'Noto Sans Bengali', sans-serif;
                      }
                    </style>
                  </head>
                  <body>
                    ${content}
                  </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.print();
        }
    };

    const handleZoom = (direction: 'in' | 'out') => {
        setZoomLevel(prev => {
            if (direction === 'in') return Math.min(prev + 10, 200);
            if (direction === 'out') return Math.max(prev - 10, 50);
            return prev;
        });
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    const calculateStats = (text: string) => {
        const characterCount = (text.match(/[^\s]/g) || []).length; // Count non-whitespace characters
        const wordCount = (text.trim() === '' ? 0 : text.trim().split(/\s+/).length); // Count words
        const lineCount = (text.trim() === '' ? 0 : text.split('\n').length); // Count lines
        return { characterCount, wordCount, lineCount };
    };
    const { characterCount, wordCount, lineCount } = calculateStats(content);

    // Define handleSave using useCallback to avoid unnecessary re-renders
    const handleSave = useCallback((format: 'txt' | 'rtf') => {
        const mimeType = format === 'txt' ? 'text/plain;charset=utf-8' : 'application/rtf;charset=utf-8';
        const rtfContent = format === 'rtf' ? `{\\rtf1\\ansi\\ansicpg1252\\deff0\\nouicompat{\\fonttbl{\\f0\\fnil\\fcharset0 Calibri;}}\\viewkind4\\uc1 \\pard\\fs22\\lang9 ${content}\\par}` : content;

        const blob = new Blob([rtfContent], { type: mimeType });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${fileName || 'document'}.${format}`;
        link.click();
    }, [content, fileName]);

    // Use effect to handle keydown event
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.key === 's') {
                event.preventDefault(); // Prevent the default save action
                handleSave('txt'); // Save as TXT
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleSave]);

    return (
        <article className='container w-full mx-auto p-4'>

            {/* Editor Menu Section */}
            <header className="mb-4 flex space-x-2">
                <FileInput size={'sm'} onFileSelect={handleFileChange} accept=".txt,.rtf" />
                <Button size={'sm'} onClick={() => handleSave('txt')} variant="secondary" className='border hover:border-black'>
                    <SaveIcon className="h-4 w-4 mr-2" />
                    TXT
                </Button>
                <Button size={'sm'} onClick={() => handleSave('rtf')} variant="secondary" className='border hover:border-black'>
                    <SaveIcon className="h-4 w-4 mr-2" />
                    RTF
                </Button>
                <Button size={'sm'} onClick={handlePrint} variant="secondary" className='border hover:border-black'>
                    <PrinterIcon className="h-4 w-4 md:mr-2" />
                    <span className='hidden md:inline'>Print</span>
                </Button>
            </header>

            {/* Editor Section */}
            <section className="grid w-full gap-1.5 text-sans-bn border border-black rounded-lg py-4">
                <EditorHeader
                    fileName={fileName}
                    setFileName={setFileName}
                    zoomLevel={zoomLevel}
                    handleZoom={handleZoom}
                />
                <main>
                    <Textarea
                        id="editor"
                        value={content}
                        onChange={handleContentChange}
                        placeholder="Start typing ..."
                        className="h-[calc(100vh-200px)] py-4 mb-2 bg-white shadow-none border-y rounded-none border-x-0 focus:shadow-none focus:border-slate-200 focus-ring-0"
                        style={{
                            fontSize: `${zoomLevel}%`,
                            lineHeight: `${1.2 + (zoomLevel - 100) / 200}` // Controll line height with zooming. 
                        }}
                        aria-label="Text editor"
                    />
                </main>
                <EditorFooter
                    characterCount={characterCount}
                    wordCount={wordCount}
                    lineCount={lineCount}
                />
            </section>
        </article>
    );
}

export default TextEditor;
