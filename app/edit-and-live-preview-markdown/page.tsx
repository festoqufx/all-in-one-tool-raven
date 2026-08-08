import { Metadata } from 'next';
import MarkdownPlayground from '@/components/markdown/MarkdownPlayground';

export const metadata: Metadata = {
    title: 'Online Markdown Editor & Live Previewer',
    description: 'Edit, create, and preview Markdown files in real-time with this intuitive online Markdown editor. Effortlessly print your documents as PDFs.',
    keywords: 'Markdown editor, live Markdown preview, markdown to pdf, print markdown, save markdown as pdf, online Markdown tool, create Markdown files, edit Markdown documents, PDF export, Next.js Markdown editor, Markdown playground, web-based Markdown editor',
};

export default function MarkdownHomepage() {
    return (
        <main>
            <h1 className='sr-only'>{metadata.title as string}</h1>
            <h2 className='sr-only'>{metadata.description as string}</h2>

            <MarkdownPlayground />
        </main>
    );
}
