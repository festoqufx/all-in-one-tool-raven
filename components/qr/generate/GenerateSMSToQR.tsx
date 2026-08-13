'use client'

import React, { useState } from 'react';
import { MissingQRData, QRCode } from "@/components/qr/generate/GetQRCode";
import { InfoCircledIcon } from '@radix-ui/react-icons';

/**
 * `GenerateSMSToQR` is a React component that generates a QR code containing SMS information.
 * 
 * This component allows users to input a phone number and an optional message. The provided information is then
 * used to generate a QR code that, when scanned, will create a new SMS message with the specified phone number
 * and message content.
 * 
 * @component
 * @example
 * <GenerateSMSToQR />
 */
export const GenerateSMSToQR: React.FC = () => {
  const [sms, setSMS] = useState<{ number: string; message: string }>({ number: '', message: '' });

  /**
   * Validates a phone number using a regex pattern.
   * 
   * The pattern checks for international phone number formats, starting with an optional plus sign (+)
   * followed by up to 15 digits.
   * 
   * @param number - The phone number string to validate.
   * @returns True if the phone number is valid, otherwise false.
   */
  const isValidPhoneNumber = (number: string): boolean => {
    return /^(\+?[1-9]\d{1,14}|[1-9]\d{0,14})$/.test(number);
  };

  /**
   * Generates the SMS URI content based on the provided phone number and message.
   * 
   * If a phone number is provided, it creates an `sms:` URI scheme with optional message content.
   * 
   * @returns The formatted SMS URI string.
   */
  const generateSMSContent = (): string => {
    const phoneNumber = sms.number.startsWith("+") ? sms.number : `+${sms.number}`;
    const params = new URLSearchParams();
    if (sms.message.trim()) params.set("body", sms.message.trim());
    const query = params.toString();
    return query ? `sms:${phoneNumber}?${query}` : `sms:${phoneNumber}`;
  };


  // Render the component
  return (
    <>
      <article className="grid w-full grid-cols-1 md:grid-cols-2">
        <section className='w-full md:min-h-80 '>
          <p className='mb-2.5 flex gap-2 text-xs font-medium text-muted-foreground'>
            <InfoCircledIcon />
            Fill all necessary information to generate SMS QR code
          </p>

          <div className="space-y-2">
            <label htmlFor="sms-number" className='field-label'>Phone Number</label>
            <input
              id="sms-number"
              type="tel"
              className="field-input"
              value={sms.number}
              onChange={(e) => setSMS({ ...sms, number: e.target.value })}
              placeholder="+1234567890"
            />
            {!isValidPhoneNumber(sms.number) && sms.number && (
              <p className="text-xs text-destructive lg:text-sm">Please enter a valid phone number with <strong>country code</strong>.</p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="sms-message" className='field-label'>Message</label>
            <textarea
              id="sms-message"
              value={sms.message}
              placeholder="SMS Message"
              className="field-input"
              onChange={(e) => setSMS({ ...sms, message: e.target.value })}
            />
          </div>
        </section>
        <section className='w-full min-h-80 flex flex-col items-center justify-center'>
          {/* Generate QR Code */}
          {isValidPhoneNumber(sms.number) ? (
            <QRCode
              value={generateSMSContent()}
              size={250}
            />
          ) : (
            <MissingQRData />
          )}
        </section>
      </article>
    </>
  );
};
