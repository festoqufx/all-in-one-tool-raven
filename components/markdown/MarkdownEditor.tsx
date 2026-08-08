"use client";

import { cn } from '@/lib/utils';
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { FileInput } from '@/components/ui/FileInput';
import SampleMarkdown from '@/components/markdown/SampleMarkdown';
import ConfirmationModal from '@/components/ui/ConfirmationModal';
import { PencilRulerIcon, ExpandIcon, ShrinkIcon, FileQuestionIcon } from 'lucide-react';


interface MarkdownEditorProps {
  markdown: { value: string; update: (value: string) => void };
  isFullScreen: boolean;
  handleToggleFullScreen?: ({ }) => void;
  modeToggle?: () => void;
}

export default function MarkdownEditor({ markdown, isFullScreen, handleToggleFullScreen, modeToggle }: MarkdownEditorProps) {
  const { value, update } = markdown;

  useEffect(() => {
    const savedMarkdown = localStorage.getItem('markdown');
    if (savedMarkdown) {
      update(savedMarkdown);
    }
  }, [update]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newMarkdown = e.target.value;
    update(newMarkdown);
    localStorage.setItem('markdown', newMarkdown);
  };

  const handleClear = () => {
    update('');
    localStorage.setItem('markdown', '');
  };

  const handleLoadSample = () => {
    update(SampleMarkdown);
    localStorage.setItem('markdown', SampleMarkdown);
  };

  const handleFileSelect = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        update(e.target.result);
        localStorage.setItem('markdown', e.target.result);
      }
    };
    reader.readAsText(file);
  };

  return (
    <article className={cn(
      "flex flex-col",
      isFullScreen && "fixed p-8 top-0 left-0 bg-gray-50 right-0 bottom-0 z-40 scrollbar-hide"
    )}>
      {/* Editor Header */}
      <header className="flex items-center justify-between mb-2 bg-black text-white rounded p-2" id='editor-header'>
        <h2 className="text-xl font-semibold mb-2 flex items-center">
          <PencilRulerIcon className="w-10 h-8 bg-black mr-2 px-2" />
          Editor
        </h2>
        <section className='flex space-x-2'>
          {/* Load Sample Button or Confirmation Modal */}
          {value === '' ? (
            <Button
              className='bg-black hover:underline underline-offset-4 font-normal text-xs md:text-sm'
              size='icon'
              title='Load Sample'
              onClick={handleLoadSample}
            >
              <FileQuestionIcon className="w-4 h-4" />
            </Button>
          ) : (
            <ConfirmationModal
              title="Load Sample?"
              message="This will replace your current content. Are you sure?"
              onConfirm={handleLoadSample}
              className='bg-black text-white hover:underline underline-offset-4 font-normal text-xs md:text-sm'
              triggerIconName='FileQuestionIcon'
              triggerIconClass='w-4 h-4'
              confirmText="Yes"
              cancelText="No"
            // Set restProps if needed
            />
          )}

          {/* Open Markdown File Button */}
          <FileInput
            onFileSelect={handleFileSelect}
            accept=".md"
            size="icon"
            className='bg-black hover:bg-gray-50 hover:text-black'
            title="Open Markdown File"
            hideText
          />

          {/* Clear Editor Button with Confirmation Dialog */}
          <ConfirmationModal
            title="Clear Editor?"
            message="It will delete all the content in the editor."
            onConfirm={handleClear}
            className='bg-black hover:bg-gray-50 hover:text-black'
            triggerIconClass="w-4 h-4"
            triggerIconName='Trash2Icon'
            confirmText='Clear'
          />

          {/* FullScreen Control Button */}
          <Button
            className='bg-black hover:bg-gray-50 hover:text-black'
            size='icon'
            title='Toggle Full Screen'
            onClick={handleToggleFullScreen}
          >
            {isFullScreen ? <ShrinkIcon className="w-4 h-4" /> : <ExpandIcon className="w-4 h-4" />}
          </Button>
        </section>
      </header>

      {/* Markdown Editor */}
      <main className=''>
        <textarea
          className="w-full h-[calc(100vh-200px)] p-4 border border-black rounded scrollbar-hide"
          value={value}
          onChange={handleChange}
          placeholder="Enter your markdown here..."
        />
      </main>

      {/* Only display when full screen */}
      {isFullScreen &&
        <footer>
          <Button type='button' size='sm' onClick={modeToggle} className='max-w-lg my-2 mx-auto w-36'>
            Preview
          </Button>
        </footer>
      }
    </article>
  );
}
