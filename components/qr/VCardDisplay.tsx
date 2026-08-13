import React from 'react';
import { IVCardField, IFormattedVCardData } from "@/lib/type-interface";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { CopyToClipboardButton } from '@/components/ui/CopyToClipboardButton';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

interface VCardDisplayProps {
    data: IFormattedVCardData;
}

const VCardDisplay: React.FC<VCardDisplayProps> = ({ data }) => {
    if (!data) {
        return <p>Data can not be formatted.</p>;
    }

    const { fields, errors } = data;

    const getHref = (item: IVCardField) => {
        if (item.link === 'web') {
            // Ensure URL is properly formatted
            const url = item.value.startsWith('http') ? item.value : `http://${item.value}`;
            return url;
        } else if (item.link === 'tel') {
            return `tel:${item.value}`;
        } else if (item.link === 'email') {
            return `mailto:${item.value}`;
        } else {
            return '#'; // Fallback for unsupported link types
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">vCard Content</h2>
            <div className="space-y-4">
                {fields.map((item, index) => (
                    <Alert key={index} variant="default" className="mb-2 rounded-xl p-4 shadow-sm">
                        <AlertTitle className="font-semibold">{item.label}:</AlertTitle>
                        <AlertDescription className="mt-1 flex items-center gap-1">
                            {item.link ? (
                                <a
                                    href={getHref(item)}
                                    className="underline underline-offset-4"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={item.label}
                                >
                                    {item.value}
                                </a>
                            ) : (
                                <span>{item.value}</span>
                            )}
                            {item.copy && (
                                <CopyToClipboardButton data={item.value} copyIconClassName='w-4 h-4' />
                            )}
                        </AlertDescription>
                    </Alert>
                ))}
                {errors && (
                    <Accordion type="single" className='text-sm' collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>View errors</AccordionTrigger>
                            <AccordionContent className="mt-4 rounded border border-destructive p-2 text-destructive">
                                {errors.map((error, index) => (
                                    <p key={index} className="text-sm">
                                        Error: {error.description} ({error.attributes.property} - {error.attributes.line})
                                    </p>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                )}
            </div>
        </div>
    );
};

export {
    VCardDisplay,
    VCardDisplay as VCard,
}
export default VCardDisplay;
