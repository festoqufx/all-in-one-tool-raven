// app/text-editor/page.tsx

import { Metadata } from 'next';
import TextEditor from '@/components/text-editor/editor';

export const metadata: Metadata = {
    title: 'Simple Online Text Editor',
    description: 'Use this simple online text editor to create, edit, and save .txt and .rtf files directly from your browser. Print your documents as PDFs effortlessly.',
    keywords: 'online text editor, create text files, edit .txt, edit .rtf, Next.js text editor, print PDF, web app',
};

export default function TextEditorHomePage() {

    return (
        <main>
            <h1 className='sr-only'>{metadata.title as string}</h1>
            <h2 className='sr-only'>{metadata.description as string}</h2>

            <div className="min-h-screen flex items-center justify-center">
                <TextEditor />
            </div>
        </main>
    );
}
