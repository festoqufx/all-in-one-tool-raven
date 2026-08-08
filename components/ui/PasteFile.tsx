
import { Button } from "@/components/ui/button";
import { Clipboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCallback, useEffect } from "react";

interface PasteFileProps {
    processFile: (file: File) => void;
    setErrorMessage: (message: string) => void;
    className?: string;
    children?: React.ReactNode;
}

export const PasteFile: React.FC<PasteFileProps> = ({ processFile, setErrorMessage, className, children }) => {


    const handlePaste = useCallback(async (event: ClipboardEvent) => {
        const items = event.clipboardData?.items
        let imageFound = false

        if (items) {
            const itemsArray = Array.from(items); // Convert DataTransferItemList to an array
            for (const item of itemsArray) {
                if (item.type.startsWith('image/')) {
                    const file = item.getAsFile();
                    if (file) {
                        imageFound = true;
                        processFile(file);
                        break;
                    }
                }
            }
        }

        if (!imageFound) {
            setErrorMessage('No image found in clipboard.')
        }
    }, [processFile, setErrorMessage])

    const handlePasteButtonClick = useCallback(() => {
        navigator.clipboard.read().then(async (items) => {
            let imageFound = false

            for (const item of items) {
                if (item.types.includes('image/png') || item.types.includes('image/jpeg')) {
                    const blob = await item.getType('image/png')
                    const file = new File([blob], "pasted-image.png", { type: 'image/png' })
                    imageFound = true
                    await processFile(file)
                    break
                }
            }

            if (!imageFound) {
                setErrorMessage('No image found in clipboard.')
            }
        }).catch((err) => {
            console.error('Failed to access clipboard:', err)
            setErrorMessage('Failed to access clipboard.')
        })
    }, [processFile, setErrorMessage])

    
    useEffect(() => {
        window.addEventListener('paste', handlePaste);

        return () => {
            window.removeEventListener('paste', handlePaste);
        }
    }, [handlePaste])

    return (
        <PasteButton onPasteClick={handlePasteButtonClick} className={className}>{children}</PasteButton>
    )
}

interface PasteButtonProps {
    onPasteClick: () => void;
    className?: string;
    children?: React.ReactNode;
}

export const PasteButton: React.FC<PasteButtonProps> = ({ onPasteClick, className, children }) => {
    return (
        <Button
            variant="ghost"
            onClick={onPasteClick}
            className={cn('rounded border border-gray-400 hover:bg-gray-100 hover:border-gray-500', className)}
        >
            <Clipboard className="w-4 h-4" />
            <span className="hidden sm:inline ml-2">{children || 'Paste'}</span>
        </Button>
    )
}

export default PasteFile;
