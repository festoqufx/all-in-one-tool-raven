import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { DynamicIcon } from '@/components/ui/DynamicIcon';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

/**
 * Props for the ConfirmationModal component.
 */
interface ConfirmationModalProps {
    /** Name of the icon to display in the trigger button. */
    triggerIconName?: string;
    /** Additional CSS classes for the icon. */
    triggerIconClass?: string;
    /** A custom icon element to display in the trigger button. */
    triggerIcon?: JSX.Element;
    /** Text to display alongside the icon in the trigger button. */
    triggerText?: string;
    /** Title of the confirmation modal. */
    title: string;
    /** Optional message to display in the modal. */
    message?: string;
    /** Text for the confirm button. */
    confirmText?: string;
    /** Text for the cancel button. */
    cancelText?: string;
    /** Function to call when the confirm button is clicked. */
    onConfirm: () => void;
    /** Optional function to call when the cancel button is clicked. */
    onCancel?: () => void;
    /** Additional CSS classes for the button. */
    className?: string;
    /** Additional props for the button element. */
    restProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

/**
 * A modal component for user confirmation actions.
 *
 * @param {ConfirmationModalProps} props - The props for the modal.
 * @returns {JSX.Element} The rendered confirmation modal.
 */
const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    triggerIconName,
    triggerIconClass,
    triggerIcon,
    triggerText,
    title,
    message,
    confirmText,
    cancelText,
    onConfirm,
    onCancel,
    className,
    restProps
}) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className={cn('flex items-center justify-center space-x-2', className)}
                    size="icon"
                    title={triggerText || title || 'Open Confirmation'}
                >
                    {triggerIcon || (triggerIconName && <DynamicIcon name={triggerIconName} className={triggerIconClass || ''} />)}
                    {triggerText && <span>{triggerText}</span>}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {message && <DialogDescription>{message}</DialogDescription>}
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                    {onConfirm && (
                        <DialogClose asChild>
                            <Button
                                type="submit"
                                variant="default"
                                onClick={() => {
                                    onConfirm();
                                    // Optional: You can also call DialogClose() explicitly if needed
                                }}
                                className="w-full"
                                {...restProps}
                            >
                                {confirmText || 'Confirm'}
                            </Button>
                        </DialogClose>
                    )}
                    {onCancel && (
                        <DialogClose asChild>
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={onCancel}
                                className="w-full border border-black"
                            >
                                {cancelText || 'Cancel'}
                            </Button>
                        </DialogClose>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ConfirmationModal;
