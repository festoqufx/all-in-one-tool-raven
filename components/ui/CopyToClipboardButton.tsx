"use client";

import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CopyIcon, CopyCheckIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Props for the CopyToClipboardButton component.
 */
interface CopyToClipboardButtonProps {
    /**
     * The text to be copied to the clipboard.
     */
    data?: string;

    /**
     * If true, only the text will be displayed, ignoring the icon.
     */
    textOnly?: boolean;

    /**
     * The text displayed on the button.
     * If `textOnly` is false (default), this prop will be ignored.
     */
    buttonText?: string;

    /**
     * Optional additional class names to be applied to the root <div> element.
     */
    className?: string;

    /**
     * Optional additional class names to be applied to the copy icon.
     */
    copyIconClassName?: string;

    /**
     * Optional additional class names to be applied to the text element.
     */
    textClassName?: string;
}

/**
 * A button component that copies text to the clipboard when clicked.
 * Displays a copy icon initially and a check icon once the text is copied.
 * The button text and icon visibility can be customized via props.
 *
 * @param {CopyToClipboardButtonProps} props - The props for the component.
 * @returns {JSX.Element} The rendered button component.
 */
export const CopyToClipboardButton: React.FC<CopyToClipboardButtonProps> = ({
    data: textToCopy,
    buttonText,
    textOnly = false,
    className,
    copyIconClassName,
    textClassName
}) => {
    const [isCopied, setIsCopied] = useState<boolean>(false);

    /**
     * Handles the copy action and updates the copied state.
     * Resets the copied state after 2 seconds.
     */
    const handleCopy = () => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset the copy status after 2 seconds
    };

    return (
        <div>
            <CopyToClipboard text={textToCopy || ''} onCopy={handleCopy}>
                <button
                    type='button'
                    title={isCopied ? 'Copied!' : 'Copy to Clipboard'}
                    className={cn('inline-flex gap-x-2 items-center p-1.5 border border-transparent', className)}
                >
                    {buttonText && (
                        <span className={cn(isCopied ? 'animate-pulse' : '', textClassName)}>
                            {buttonText}
                        </span>
                    )}

                    {!textOnly && (
                        isCopied ? (
                            <CopyCheckIcon className={cn("w-5 h-5", copyIconClassName)} />
                        ) : (
                            <CopyIcon className={cn("w-5 h-5 opacity-70", copyIconClassName)} />
                        )
                    )}
                </button>
            </CopyToClipboard>
        </div>
    );
};

export default CopyToClipboardButton;
