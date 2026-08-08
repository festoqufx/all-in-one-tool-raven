import { cn } from "@/lib/utils";
import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { FolderOpenIcon } from 'lucide-react';

interface FileInputProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    onFileSelect: (file: File) => void; // Callback function triggered when a file is selected.
    accept?: string;    // The accepted file types for the input. Defaults to all types.
    className?: string; // Additional class names for the button.
    label?: string;     // The label to display on the button.
    size?: "default" | "sm" | "lg" | "icon" | null | undefined; // The size of the button.
    hideText?: boolean; // If true, the button will hide the text label and only show the icon.
}

/**
 * FileInput component allows users to select a file through a button.
 *
 * @param {FileInputProps} props - The props for the component.
 * @returns {JSX.Element} The rendered FileInput component.
 */
export function FileInput({ onFileSelect, accept, className, label, size, hideText, ...restProps }: FileInputProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileOpen = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onFileSelect(file);
        }
    };

    return (
        <>
            <input
                type="file"
                accept={accept || '*'}
                onChange={handleFileOpen}
                ref={fileInputRef}
                className="hidden"
            />
            <Button 
                size={size || 'default'} 
                onClick={() => fileInputRef.current?.click()} 
                className={className} 
                {...restProps} // Spread restProps here
            >
                <FolderOpenIcon className={cn("h-4 w-4", !hideText && "mr-2")} />
                {hideText ? '' : label || 'Open File'}
            </Button>
        </>
    );
}

export default FileInput;
