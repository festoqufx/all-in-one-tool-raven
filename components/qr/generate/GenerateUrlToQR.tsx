'use client';

import { ExternalLinkIcon } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { MissingQRData, QRCode } from "@/components/qr/generate/GetQRCode";

/**
 * `GenerateUrlToQR` is a React (Next.js) component that allows users to input a URL and generates a QR code for it.
 * 
 * - Accepts a plain text input and checks for a valid URL.
 * - Automatically normalizes domains missing protocol (e.g., adds `http://` to `example.com`).
 * - Displays a clickable preview of the validated URL.
 * - Renders a QR code for the valid URL or an appropriate fallback if invalid.
 * - Uses native `URL` parsing for validation.
 * - Avoids injecting invalid URLs into QR generator or anchor tags.
 * 
 * Dependencies:
 * - lucide-react (icon)
 * - GetQRCode module containing `QRCode` and `MissingQRData` components
 * 
 * @component
 * @example
 * <GenerateUrlToQR />
 */
export const GenerateUrlToQR: React.FC = () => {
  // ====== State Hooks ======
  const [url, setUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);
  const [parsedUrl, setParsedUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formattedUrl, setFormattedUrl] = useState<string>('');

  // ====== Effects ======

  /**
   * Validates and normalizes the input URL.
   * - Adds default protocol (`http://`) for bare domains.
   * - Uses `URL` constructor to ensure proper structure.
   * - Sets `parsedUrl`, `formattedUrl`, `isValid`, and error states accordingly.
   */
  useEffect(() => {
    const validateUrl = () => {
      setIsLoading(true);
      setError('');
      setParsedUrl('');

      try {
        if (!url) {
          setIsValid(false);
          setFormattedUrl('');
          setIsLoading(false);
          return;
        }

        // Accept known protocols
        const hasProtocol =
          url.startsWith('http://') ||
          url.startsWith('https://') ||
          url.startsWith('ftp://') ||
          url.startsWith('mailto:') ||
          url.startsWith('tel:');

        let normalizedUrl = url;

        // Auto-prepend protocol if missing
        if (!hasProtocol) {
          const isValidDomain = /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
          if (!isValidDomain.test(url)) {
            throw new Error('Invalid domain name');
          }
          normalizedUrl = `http://${url}`;
        }

        // Validate using URL constructor
        const parsed = new URL(normalizedUrl);
        setParsedUrl(parsed.href);
        setFormattedUrl(normalizedUrl);
        setIsValid(true);
      } catch (err) {
        console.error('Invalid URL:', err);
        setIsValid(false);
        setFormattedUrl('');
        setError('Please enter a valid URL (e.g., https://example.com).');
      } finally {
        setIsLoading(false);
      }
    };

    validateUrl();
  }, [url]);

  // ====== Render ======

  return (
    <article className="grid w-full grid-cols-1 md:grid-cols-2">
      {/* Left: URL Input */}
      <section className="w-full">
        <label htmlFor="url-input" className="font-medium text-sm text-gray-600">
          Enter a valid URL
        </label>
        <input
          type="text"
          value={url}
          id="url-input"
          placeholder="https://example.com"
          onChange={(e) => setUrl(e.target.value)}
          className="w-full border border-gray-500 p-2 rounded mt-1"
        />

        {/* URL Preview or Validation Message */}
        {isValid ? (
          <a
            className="text-xs opacity-50 hover:text-blue-800 hover:underline underline-offset-4 py-1 flex items-center"
            href={parsedUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLinkIcon className="inline h-4 w-4 mr-2" strokeWidth={1} />
            <span className="truncate" title={parsedUrl}>
              {parsedUrl}
            </span>
          </a>
        ) : url.length > 0 ? (
          <p className="text-xs text-red-500 py-1">Invalid URL</p>
        ) : null}

        {/* Full Error Message */}
        {error && <p className="text-red-500 text-xs lg:text-sm py-2">{error}</p>}
      </section>

      {/* Right: QR Code Display */}
      <section className="w-full min-h-80 flex flex-col items-center justify-center">
        {isLoading ? (
          <p>Validating URL...</p>
        ) : isValid && formattedUrl ? (
          <QRCode value={formattedUrl} size={250} />
        ) : (
          <MissingQRData />
        )}
      </section>
    </article>
  );
};
