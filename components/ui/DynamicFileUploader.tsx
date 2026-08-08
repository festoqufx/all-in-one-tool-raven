/**
 * DynamicFileUploader component provides an interface to upload files via drag & drop, file selection, and clipboard pasting.
 */

import React, { useState, useCallback, useRef } from 'react'
import { XIcon, FileIcon, UploadIcon } from 'lucide-react'
import { Accept, useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/**
 * Props for the FileUploader component.
 */
interface FileUploaderProps {
    /** Callback fired when files are selected */
    onFilesSelected: (files: File[]) => void
    /** Accepted file types, defined using react-dropzone's Accept type */
    acceptedFileTypes?: Accept
    /** Whether multiple files can be uploaded */
    multiple?: boolean
    /** Maximum number of files that can be uploaded */
    maxFiles?: number
    /** Callback fired when a file is removed */
    onFileRemove?: (file: File) => void
    /** Whether the file uploader is disabled */
    disabled?: boolean
    /** Additional class names for styling */
    className?: string
}

/**
 * FileUploader component provides an interface to upload files via drag & drop, file selection, and clipboard pasting.
 */
export default function FileUploader({
    onFilesSelected,
    acceptedFileTypes = {},
    multiple = false,
    maxFiles = 5,
    onFileRemove,
    disabled = false,
    className = '',
    ...props
}: FileUploaderProps) {
    const [files, setFiles] = useState<File[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null)

    /**
     * Handles file drop event and updates state.
     */
    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (disabled) return;
        const newFiles = [...files, ...acceptedFiles].slice(0, maxFiles)
        setFiles(newFiles)
        onFilesSelected(newFiles)
    }, [files, maxFiles, onFilesSelected, disabled])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: acceptedFileTypes,
        multiple,
        maxFiles,
    })

    /**
     * Removes a specific file from the file list.
     */
    const removeFile = (fileToRemove: File) => {
        const updatedFiles = files.filter(file => file !== fileToRemove)
        setFiles(updatedFiles)
        onFilesSelected(updatedFiles)
        onFileRemove?.(fileToRemove)
    }

    /**
     * Handles file paste event from clipboard.
     */
    const handlePaste = (event: React.ClipboardEvent) => {
        const pastedFiles = Array.from(event.clipboardData.files)
        if (pastedFiles.length > 0) {
            const newFiles = [...files, ...pastedFiles].slice(0, maxFiles)
            setFiles(newFiles)
            onFilesSelected(newFiles)
        }
    }

    /**
     * Triggers the hidden file input for manual file selection.
     */
    const triggerFileInput = () => {
        fileInputRef.current?.click()
    }

    return (
        <section className={cn("w-full max-w-md mx-auto", className)} onPaste={handlePaste} {...props}>
            <div
                {...getRootProps()}
                className={cn(
                    "p-8 cursor-auto border-2 border-dashed rounded-lg text-center transition-colors",
                    isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-primary',
                    disabled ? 'pointer-events-none cursor-not-allowed' : ''
                )}
            >
                <input {...getInputProps()} ref={fileInputRef} title='file input' placeholder='Drag & drop or select files' disabled={disabled} />
                <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">Drag & drop files here, or click to select files</p>
                <p className="mt-1 text-xs text-gray-500">
                    {Object.keys(acceptedFileTypes).length === 0 ? 'Any file type accepted' : `Accepted: ${Object.values(acceptedFileTypes).join(', ')}`}
                </p>
                <Button onClick={triggerFileInput} type="button" variant="outline" className="mt-4" disabled={disabled}>
                    Select Files
                </Button>
            </div>
            {files.length > 0 && (
                <ul className="mt-4 space-y-2">
                    {files.map((file, index) => (
                        <li key={index} className="flex items-center justify-between p-2 bg-gray-100 rounded">
                            <div className="flex items-center">
                                <FileIcon className="h-5 w-5 mr-2 text-gray-500" />
                                <span className="text-sm truncate">{file.name}</span>
                            </div>
                            <Button
                                onClick={() => removeFile(file)}
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-gray-500 hover:text-red-500"
                            >
                                <XIcon className="h-4 w-4" />
                            </Button>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )
}

/**
 * Named exports for alternative references to FileUploader.
 */
export {
    FileUploader,
    FileUploader as Upload,
    FileUploader as Uploader,
    FileUploader as FileInput,
    FileUploader as DynamicFileInput,
    FileUploader as DynamicFileUploader,
}
