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
    // Load saved draft once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      isFullScreen && "fixed inset-0 z-40 bg-background p-8 scrollbar-hide"
    )}>
      <header className="mb-2 flex items-center justify-between rounded-xl bg-foreground p-2 text-background" id='editor-header'>
        <h2 className="mb-0 flex items-center text-lg font-semibold md:text-xl">
          <PencilRulerIcon className="mr-2 h-8 w-10 px-2" />
          Editor
        </h2>
        <section className='flex space-x-2'>
          {value === '' ? (
            <Button
              className='bg-foreground text-background hover:bg-background hover:text-foreground'
              size='icon'
              title='Load Sample'
              onClick={handleLoadSample}
            >
              <FileQuestionIcon className="h-4 w-4" />
            </Button>
          ) : (
            <ConfirmationModal
              title="Load Sample?"
              message="This will replace your current content. Are you sure?"
              onConfirm={handleLoadSample}
              className='bg-foreground text-background hover:bg-background hover:text-foreground'
              triggerIconName='FileQuestionIcon'
              triggerIconClass='w-4 h-4'
              confirmText="Yes"
              cancelText="No"
            />
          )}

          <FileInput
            onFileSelect={handleFileSelect}
            accept=".md"
            size="icon"
            className='bg-foreground text-background hover:bg-background hover:text-foreground'
            title="Open Markdown File"
            hideText
          />

          <ConfirmationModal
            title="Clear Editor?"
            message="It will delete all the content in the editor."
            onConfirm={handleClear}
            className='bg-foreground text-background hover:bg-background hover:text-foreground'
            triggerIconClass="w-4 h-4"
            triggerIconName='Trash2Icon'
            confirmText='Clear'
          />

          <Button
            className='bg-foreground text-background hover:bg-background hover:text-foreground'
            size='icon'
            title='Toggle Full Screen'
            onClick={handleToggleFullScreen}
          >
            {isFullScreen ? <ShrinkIcon className="h-4 w-4" /> : <ExpandIcon className="h-4 w-4" />}
          </Button>
        </section>
      </header>

      <main>
        <textarea
          className="field-input h-[calc(100vh-240px)] rounded-xl p-4 font-mono scrollbar-hide"
          value={value}
          onChange={handleChange}
          placeholder="Enter your markdown here..."
          aria-label="Markdown editor"
        />
      </main>

      {isFullScreen &&
        <footer>
          <Button type='button' size='sm' onClick={modeToggle} className='mx-auto my-2 w-36 max-w-lg'>
            Preview
          </Button>
        </footer>
      }
    </article>
  );
}
