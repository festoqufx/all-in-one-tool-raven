'use client'

import React, { useState } from 'react';
import { MissingQRData, QRCode } from "@/components/qr/generate/GetQRCode";
import { InfoCircledIcon } from '@radix-ui/react-icons';

interface GenerateEmailToQRProps {
  id?: string;
  className?: string;
}

/**
 * Component for generating a QR code that encodes an email.
 * 
 * @param {GenerateEmailToQRProps} props - The properties for the component.
 * @param {string} [props.id] - Optional ID for the component.
 * @param {string} [props.className] - Optional className for custom styling.
 * 
 * @returns {JSX.Element} The rendered component.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GenerateEmailToQR: React.FC<GenerateEmailToQRProps> = ({ id, className, ...props }) => {
  // State to manage the email fields: to, subject, and body.
  const [email, setEmail] = useState({ to: '', subject: '', body: '' });

  /**
   * Validates the email address format.
   * 
   * @param {string} email - The email address to validate.
   * @returns {boolean} True if the email address is valid, false otherwise.
   */
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  /**
   * Generates the mailto URL with encoded parameters for the email.
   * 
   * @returns {string} The mailto URL.
   */
  const generateEmailContent = () => {
    return `mailto:${encodeURIComponent(email.to)}?subject=${encodeURIComponent(email.subject)}&body=${encodeURIComponent(email.body)}`;
  };

  return (
    <>
      <article className="grid w-full grid-cols-1 md:grid-cols-2">
        <section className='w-full md:min-h-80 '>
          <p className='font-medium text-xs text-gray-600 flex gap-2 mb-2.5'>
            <InfoCircledIcon />
            Fill all necessary information to generate Email QR code
          </p>
          <div className="space-y-2">
            <label htmlFor="email-to" className='font-medium text-sm text-gray-600'>To Address</label>
            <input
              id="email-to"
              type="email"
              className="w-full border border-gray-500 p-2 rounded"
              value={email.to}
              onChange={(e) => setEmail({ ...email, to: e.target.value })}
              placeholder="recipient@example.com"
              required
            />
            {email.to && !isValidEmail(email.to) && (
              <p className="text-red-500 text-xs lg:text-sm">Please enter a valid email address.</p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="email-subject" className='font-medium text-sm text-gray-600'>Subject</label>
            <input
              id="email-subject"
              type="text"
              className="w-full border border-gray-500 p-2 rounded"
              value={email.subject}
              onChange={(e) => setEmail({ ...email, subject: e.target.value })}
              placeholder="Email Subject"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email-body" className='font-medium text-sm text-gray-600'>Message</label>
            <textarea
              id="email-body"
              className="w-full border border-gray-500 p-2 rounded"
              value={email.body}
              onChange={(e) => setEmail({ ...email, body: e.target.value })}
              placeholder="Email Body"
              rows={5}
              required
            />
          </div>
        </section>
        <section className='w-full min-h-80 flex flex-col items-center justify-center'>
          {/* Generate QR Code */}
          {email.to && isValidEmail(email.to) && email.subject && email.body ? (
            <QRCode
              value={generateEmailContent()}
              size={250}
            />
          ) : <MissingQRData />}
        </section>
      </article >
    </>
  );
};

// Export the component with two names for flexibility.
export {
  GenerateEmailToQR,
  GenerateEmailToQR as GenerateEmailQR,
};
export default GenerateEmailToQR;
