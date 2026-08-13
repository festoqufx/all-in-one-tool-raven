'use client'

import vCard from 'vcard-creator';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import React, { useState, useMemo, useCallback } from 'react';
import { MissingQRData, QRCode } from "@/components/qr/generate/GetQRCode";

interface GenerateVcardQRCodeProps {
    name: string;
    title: string;
    organization: string;
    email: string;
    phone: string;
    website: string;
    address: string;
}

export default function GenerateVcardQRCode() {
    const [contact, setContact] = useState<GenerateVcardQRCodeProps>({
        name: '',
        title: '',
        organization: '',
        email: '',
        phone: '',
        website: '',
        address: '',
    });

    /**
     * Validates the format of an email address.
     * 
     * The function uses a regular expression to ensure the email address follows the general pattern
     * of local part, "@" symbol, and domain part.
     * 
     * @param {string} email - The email address to validate.
     * @returns {boolean} True if the email address is valid, false otherwise.
     */
    const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    /**
     * Validates a phone number using a regex pattern.
     * 
     * The pattern supports international phone numbers with an optional plus sign (+)
     * followed by up to 15 digits.
     * 
     * @param {string} number - The phone number string to validate.
     * @returns {boolean} True if the phone number is valid, false otherwise.
     */
    const isValidPhoneNumber = (number: string) => /^(\+?[1-9]\d{1,14}|[1-9]\d{0,14})$/.test(number);

    /**
     * Handles changes in input fields and updates the state with new values.
     * 
     * This function is used as an event handler for input field changes, updating the corresponding
     * field in the `contact` state.
     * 
     * @param {React.ChangeEvent<HTMLInputElement>} e - The change event from the input field.
     */
    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setContact(prev => ({ ...prev, [name]: value }));
    }, []);

    /**
     * Creates a vCard string representation from the current contact state.
     * 
     * This function constructs a vCard string using the `vCard` library, incorporating all contact
     * information into a standardized vCard format.
     * 
     * @returns {string} The generated vCard string.
     */
    const createVCard = useCallback((): string => {
        const vcard = new vCard();
        vcard
            .addName(contact.name)
            .addJobtitle(contact.title)
            .addCompany(contact.organization)
            .addPhoneNumber(contact.phone)
            .addEmail(contact.email)
            .addURL(contact.website)
            .addAddress(contact.address);
        return vcard.toString();
    }, [contact]);


    const fields = [
        {
            id: 'name',
            name: 'name',
            type: 'text',
            placeholder: 'John Doe',
            label: 'Name'
        },
        {
            id: 'title',
            name: 'title',
            type: 'text',
            placeholder: 'Software Engineer or n/a',
            label: 'Title'
        },
        {
            id: 'organization',
            name: 'organization',
            type: 'text',
            placeholder: 'Company Inc. or n/a',
            label: 'Organization'
        },
        {
            id: 'email',
            name: 'email',
            type: 'email',
            placeholder: 'email@example.com',
            label: 'Email',
            isValid: contact.email ? isValidEmail(contact.email) : true,
            errorMessage: 'Please enter a valid email address.'
        },
        {
            id: 'phone',
            name: 'phone',
            type: 'tel',
            placeholder: '+1 234 567 890',
            label: 'Phone',
            isValid: contact.phone ? isValidPhoneNumber(contact.phone) : true,
            errorMessage: 'Please enter a valid phone number with country code.'
        },
        {
            id: 'website',
            name: 'website',
            type: 'url',
            placeholder: 'https://example.com or n/a',
            label: 'Website'
        },
        {
            id: 'address',
            name: 'address',
            type: 'text',
            placeholder: '123 Main St, City, Country',
            label: 'Address'
        }
    ]

    // Memoize the vCard string to avoid recalculating it on every render
    const vCardString = useMemo(() => createVCard(), [createVCard]);

    return (
        <>
            <article className="grid w-full grid-cols-1 md:grid-cols-2">
                <section className='w-full md:min-h-80 '>
                    <p className='mb-2.5 flex gap-2 text-xs font-medium text-muted-foreground'>
                        <InfoCircledIcon />
                        Fill all necessary information to generate VCARD QR Code
                    </p>
                    {/* Render input fields for contact information */}
                    {fields.map(({ id, name, type, placeholder, label, isValid = true, errorMessage }) => (
                        <div key={id} className="space-y-2">
                            <label htmlFor={id} className='field-label'>{label}</label>
                            <input
                                id={id}
                                name={name}
                                type={type}
                                value={contact[name as keyof GenerateVcardQRCodeProps]}
                                onChange={handleInputChange}
                                className="field-input"
                                placeholder={placeholder}
                            />
                            {!isValid && errorMessage && (
                                <p className="text-xs text-destructive lg:text-sm">{errorMessage}</p>
                            )}
                        </div>
                    ))}
                </section>
                <section className='w-full min-h-80 flex flex-col items-center justify-center'>
                    {/* Generate QR Code */}
                    {Object.values(contact).some(value => value) ? (
                        <QRCode
                            value={vCardString}
                            size={250}
                        />
                    ) : (
                        <MissingQRData />
                    )}
                </section>
            </article>
        </>
    );
}

export {
    GenerateVcardQRCode,
    GenerateVcardQRCode as ContactQRCode,
    GenerateVcardQRCode as GenerateVcardQR,
    GenerateVcardQRCode as VcardQRCode,
};
