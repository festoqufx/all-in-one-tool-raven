"use client";

import React from 'react';
import vCard from 'vcard-creator';
import { Download } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Defines the properties for the contact information.
 */
interface ContactProps {
  /** The name of the contact. */
  name?: string;
  /** The job title of the contact. */
  title?: string;
  /** The organization the contact is affiliated with. */
  organization?: string;
  /** The email address of the contact. */
  email?: string;
  /** The phone number of the contact. */
  phone?: string;
  /** The website URL of the contact. */
  website?: string;
  /** The physical address of the contact. */
  address?: string;
}

/**
 * Props for the ContactQRCode component.
 */
interface ContactQRCodeProps {
  /** The contact information used to generate the vCard. */
  contact: ContactProps;
  /** Optional additional CSS class names for the button. */
  className?: string;
  /** Optional children to display inside the button, typically for custom button text or icons. */
  children?: React.ReactNode;
}

/**
 * A React component that generates a vCard file from provided contact information
 * and allows the user to download it.
 * 
 * @param {ContactQRCodeProps} props - The props for the component.
 * @param {ContactProps} props.contact - The contact information to be included in the vCard.
 * @param {string} [props.className] - Optional CSS class names for styling the button.
 * @param {React.ReactNode} [props.children] - Optional children to display inside the button.
 * 
 * @example
 * ```tsx
 * <ContactQRCode
 *   contact={{ name: 'John Doe', email: 'john.doe@example.com' }}
 *   className="bg-blue-500 text-white"
 * >
 *   Download Contact
 * </ContactQRCode>
 * ```
 */
export const ContactQRCode: React.FC<ContactQRCodeProps> = ({ contact, className, children }) => {
  /**
   * Creates a vCard string based on the contact information.
   * 
   * @returns {string} - The vCard string representation.
   */
  const createVCard = (): string => {
    const vcard = new vCard();
    vcard
      .addName(contact.name || '')
      .addJobtitle(contact.title || '')
      .addCompany(contact.organization || '')
      .addPhoneNumber(contact.phone || '')
      .addEmail(contact.email || '')
      .addURL(contact.website || '')
      .addAddress(contact.address || '');
    return vcard.toString();
  };

  /**
   * Triggers the download of the vCard file.
   * 
   * @returns {void}
   */
  const downloadVCard = (): void => {
    const vCardString = createVCard();
    const blob = new Blob([vCardString], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${contact.name || 'contact'}.vcf`; // Fallback name if contact.name is not provided
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <button
        type="button"
        onClick={downloadVCard}
        className={cn(
          "border rounded min-w-28 px-4 py-2 my-2 text-sm font-bold",
          "flex items-center justify-center gap-2",
          "hover:underline underline-offset-4",
          className
        )}
      >
        <Download className="w-4 h-4" />
        <span>{children ? children : 'vCard'}</span>
      </button>
    </div>
  );
};

export default ContactQRCode;
