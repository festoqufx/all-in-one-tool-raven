// components/ui/ErrorAlert.tsx

import { cn } from "@/lib/utils";
import { TriangleAlertIcon } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface ErrorAlertProps {
    message: string;
    className?: string;
    iconClassName?: string;
    titleClassName?: string;
    descriptionClassName?: string;
}
/**
 * An error alert component.
 * @param {string} message - The error message to display.
 * @returns {JSX.Element} - The error alert component.
 */
const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, className, iconClassName, titleClassName, descriptionClassName }) => (
    <Alert variant="destructive" className={cn("mt-4 text-red-600", className)}>
        <TriangleAlertIcon className={cn("w-4 h-4", iconClassName)} />
        <AlertTitle className={cn("font-bold tracking-wide", titleClassName)}>Error</AlertTitle>
        <AlertDescription className={cn("flex items-center gap-4", descriptionClassName)}>
            {message}
        </AlertDescription>
    </Alert>
);

export { ErrorAlert };
export default ErrorAlert;