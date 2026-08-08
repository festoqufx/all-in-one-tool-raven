
import React, { useState, useEffect, useCallback } from 'react'
import { UploadIcon } from 'lucide-react'

interface DragAndDropProps {
    processFile: (file: File) => void;
    setErrorMessage: (message: string) => void;
}

export const DragAndDrop: React.FC<DragAndDropProps> = ({ processFile, setErrorMessage }) => {
    const [isDragging, setIsDragging] = useState(false)


    const handleDragEnter = (e: DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(true)
    }

    const handleDragLeave = (e: DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
    }

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleDrop = useCallback(async (e: DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)

        if (e.dataTransfer && e.dataTransfer.files) {
            const files = Array.from(e.dataTransfer.files)
            if (files.length > 0) {
                const file = files[0]
                if (file.type.startsWith('image/')) {
                    await processFile(file)
                } else {
                    setErrorMessage('Please drop an image file.')
                }
            }
        }
    }, [processFile, setIsDragging, setErrorMessage])


    useEffect(() => {
        window.addEventListener('dragenter', handleDragEnter)
        window.addEventListener('dragleave', handleDragLeave)
        window.addEventListener('dragover', handleDragOver)
        window.addEventListener('drop', handleDrop)

        return () => {
            window.removeEventListener('dragenter', handleDragEnter)
            window.removeEventListener('dragleave', handleDragLeave)
            window.removeEventListener('dragover', handleDragOver)
            window.removeEventListener('drop', handleDrop)
        }
    }, [handleDrop])

    return (
        <>

            {/* While dragging, show a message */}
            {isDragging && (
                <div className="fixed baackdrop-filter backdrop-blur-sm inset-0 pointer-events-none flex items-center justify-center bg-primary/20 z-50">
                    <div className="bg-black text-white border p-8 rounded-lg shadow-lg text-center">
                        <UploadIcon className="w-16 h-16 mx-auto mb-4 text-primary text-white" />
                        <p className="text-lg font-semibold">Drop your image here</p>
                    </div>
                </div>
            )}

        </>
    )
}
