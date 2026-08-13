"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileInput } from '@/components/ui/FileInput';
import React, { useState, useEffect, useCallback } from 'react';
import { CopyToClipboardButton } from "@/components/ui/CopyToClipboardButton";
import { triggerDownload } from "@/lib/utils";
import { PlusIcon, MinusIcon, PrinterIcon, SaveIcon, FileIcon, Trash2Icon } from "lucide-react";

const STORAGE_CONTENT = "text-editor-content";
const STORAGE_NAME = "text-editor-filename";

interface EditorHeaderProps {
    fileName: string;
    setFileName: React.Dispatch<React.SetStateAction<string>>;
    zoomLevel: number;
    handleZoom: (direction: 'in' | 'out') => void;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({ fileName, setFileName, zoomLevel, handleZoom }) => (
    <header className="flex items-center justify-between px-4 pb-3">
        <section className="flex min-w-0 items-center">
            <FileIcon className="mr-2 h-4 w-4 shrink-0" />
            <Input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className='border-0 shadow-none underline underline-offset-4 focus:border-border focus:shadow-none focus:ring-0'
                aria-label="File name"
            />
        </section>
        <nav className="ml-auto flex items-center space-x-2">
            <Button size="icon" variant="outline" onClick={() => handleZoom('out')} aria-label="Zoom out">
                <MinusIcon className="h-4 w-4" />
            </Button>
            <span className="hidden text-sm font-medium md:inline-block">{zoomLevel}%</span>
            <Button size="icon" variant="outline" onClick={() => handleZoom('in')} aria-label="Zoom in">
                <PlusIcon className="h-4 w-4" />
            </Button>
        </nav>
    </header>
);

interface EditorFooterProps {
    characterCount: number;
    wordCount: number;
    lineCount: number;
    autosaved: boolean;
}

const EditorFooter: React.FC<EditorFooterProps> = ({ characterCount, wordCount, lineCount, autosaved }) => (
    <footer className="flex flex-wrap items-center justify-between gap-2 px-4 text-sm text-muted-foreground">
        {
            characterCount > 0
                ? (
                    <span>
                        Total <strong>{characterCount}</strong> characters, <strong>{wordCount}</strong> words, and <strong>{lineCount}</strong> lines
                    </span>
                )
                : 'No content.'
        }
        <span className="text-xs uppercase tracking-[0.16em]">
            {autosaved ? "Saved locally" : "Unsaved"}
        </span>
    </footer>
);

export const TextEditor: React.FC = () => {
    const [content, setContent] = useState<string>('');
    const [zoomLevel, setZoomLevel] = useState<number>(100);
    const [fileName, setFileName] = useState<string>('Document');
    const [autosaved, setAutosaved] = useState(false);

    useEffect(() => {
        const savedContent = window.localStorage.getItem(STORAGE_CONTENT);
        const savedName = window.localStorage.getItem(STORAGE_NAME);
        if (savedContent) setContent(savedContent);
        if (savedName) setFileName(savedName);
    }, []);

    useEffect(() => {
        const timer = window.setTimeout(() => {
            window.localStorage.setItem(STORAGE_CONTENT, content);
            window.localStorage.setItem(STORAGE_NAME, fileName);
            setAutosaved(true);
        }, 400);
        return () => window.clearTimeout(timer);
    }, [content, fileName]);

    const handleFileChange = (file: File) => {
        const nameWithoutExtension = file.name.replace(/\.(txt|rtf)$/i, '');
        setFileName(nameWithoutExtension);

        const reader = new FileReader();
        reader.onload = (e) => {
            const text = ((e.target?.result as string) || "").replace(/\r\n/g, '\n');
            setContent(text);
            setAutosaved(false);
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
                    <style>
                      body {
                        font-family: system-ui, sans-serif;
                        white-space: pre-wrap;
                        margin: 24px;
                      }
                    </style>
                  </head>
                  <body>${content.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</body>
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
        setAutosaved(false);
    };

    const calculateStats = (text: string) => {
        const characterCount = (text.match(/[^\s]/g) || []).length;
        const wordCount = (text.trim() === '' ? 0 : text.trim().split(/\s+/).length);
        const lineCount = (text.trim() === '' ? 0 : text.split('\n').length);
        return { characterCount, wordCount, lineCount };
    };
    const { characterCount, wordCount, lineCount } = calculateStats(content);

    const handleSave = useCallback((format: 'txt' | 'rtf') => {
        const mimeType = format === 'txt' ? 'text/plain;charset=utf-8' : 'application/rtf;charset=utf-8';
        const rtfContent = format === 'rtf' ? `{\\rtf1\\ansi\\ansicpg1252\\deff0\\nouicompat{\\fonttbl{\\f0\\fnil\\fcharset0 Calibri;}}\\viewkind4\\uc1 \\pard\\fs22\\lang9 ${content}\\par}` : content;

        const blob = new Blob([rtfContent], { type: mimeType });
        triggerDownload(blob, `${fileName || "document"}.${format}`);
    }, [content, fileName]);

    const handleClear = () => {
        setContent('');
        setAutosaved(false);
        window.localStorage.removeItem(STORAGE_CONTENT);
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') {
                event.preventDefault();
                handleSave('txt');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleSave]);

    return (
        <article className='container mx-auto w-full p-4'>
            <header className="mb-4 flex flex-wrap gap-2">
                <FileInput size={'sm'} type="button" onFileSelect={handleFileChange} accept=".txt,.rtf,.md" />
                <Button type="button" size={'sm'} onClick={() => handleSave('txt')} variant="secondary">
                    <SaveIcon className="mr-2 h-4 w-4" />
                    TXT
                </Button>
                <Button type="button" size={'sm'} onClick={() => handleSave('rtf')} variant="secondary">
                    <SaveIcon className="mr-2 h-4 w-4" />
                    RTF
                </Button>
                <CopyToClipboardButton
                    data={content}
                    buttonText="Copy"
                    className="h-8 rounded-full border border-border px-3 text-xs hover:border-foreground"
                    textClassName="text-xs"
                    copyIconClassName="h-3.5 w-3.5"
                />
                <Button type="button" size={'sm'} onClick={handlePrint} variant="secondary">
                    <PrinterIcon className="h-4 w-4 md:mr-2" />
                    <span className='hidden md:inline'>Print</span>
                </Button>
                <Button type="button" size={'sm'} onClick={handleClear} variant="outline" disabled={!content}>
                    <Trash2Icon className="mr-2 h-4 w-4" />
                    Clear
                </Button>
            </header>

            <section className="text-sans-bn grid w-full gap-1.5 rounded-2xl border border-border py-4">
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
                        className="mb-2 h-[calc(100vh-260px)] rounded-none border-x-0 border-y bg-background py-4 shadow-none focus:border-border focus:shadow-none"
                        style={{
                            fontSize: `${zoomLevel}%`,
                            lineHeight: `${1.2 + (zoomLevel - 100) / 200}`
                        }}
                        aria-label="Text editor"
                    />
                </main>
                <EditorFooter
                    characterCount={characterCount}
                    wordCount={wordCount}
                    lineCount={lineCount}
                    autosaved={autosaved}
                />
            </section>
        </article>
    );
}

export default TextEditor;
