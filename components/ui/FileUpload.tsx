"use client";

import { cn } from "@/lib/utils";
import { useCallback } from "react";
import { UploadIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

/**
 * Component for file upload functionality.
 * 
 * @param processFile - Function to handle the file once it's selected.
 * @param className - Optional additional class names for the outer div.
 * @param inputClassName - Optional class names for the hidden input field.
 * @param buttonClassName - Optional class names for the button.
 * @param children - Optional content to display inside the button, defaults to 'Upload'.
 */
interface FileUploadProps {
    processFile: (file: File) => void;
    className?: string;
    inputClassName?: string;
    buttonClassName?: string;
    children?: React.ReactNode;
}

/**
 * A React component that renders a file upload button.
 * 
 * - Renders a hidden input field of type `file` for selecting images.
 * - Displays a button with an upload icon and optional text.
 * - Triggers `processFile` function when a file is selected.
 * 
 * @param props - Component props.
 * @returns The FileUpload component.
 */
const SingleImageFileUpload: React.FC<FileUploadProps> = ({ processFile, className, inputClassName, buttonClassName, children }) => {

    const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            await processFile(file);
        }
    }, [processFile]);

    return (
        <div className={cn("flex items-center justify-center gap-2", className)}>
            <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className={cn("hidden", inputClassName)}
                id="file-upload"
            />
            <Button variant="outline" className={cn('rounded-full', buttonClassName)} asChild>
                <label htmlFor="file-upload" className="cursor-pointer">
                    <UploadIcon className="w-4 h-4" />
                    <span className="hidden sm:inline ml-2">{children || 'Upload'}</span>
                </label>
            </Button>
        </div>
    );
};

// Alias for ImageUpload
export {
    SingleImageFileUpload,
    SingleImageFileUpload as ImageUpload,
    SingleImageFileUpload as ImageFileUpload,
    SingleImageFileUpload as FileUpload,
};
export default SingleImageFileUpload;