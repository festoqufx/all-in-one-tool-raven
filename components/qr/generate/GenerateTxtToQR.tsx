'use client'

import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { MissingQRData, QRCode } from "@/components/qr/generate/GetQRCode";

/**
 * `GenerateTxtToQR` is a React component that generates a QR code from user-entered text.
 * 
 * This component includes a text input field where users can enter any text. The text is then used to generate
 * a QR code which can be scanned by QR code readers to retrieve the text content.
 * 
 * @component
 * @example
 * <GenerateTxtToQR />
 */
export const GenerateTxtToQR: React.FC = () => {
  const [text, setText] = useState<string>(''); // State to hold the user-entered text

  return (
    <>
      <article className="grid w-full grid-cols-1 md:grid-cols-2">
        <section className='w-full md:min-h-80 '>
          <label htmlFor="text-input" className='font-medium text-sm text-gray-600'>
            Text to generate QR code
          </label>
          <Textarea
            id="text-input"
            className="w-full border border-gray-500 bg-white p-2 rounded h-full"
            value={text}
            onChange={(e) => setText(e.target.value)} // Update state with user input
            placeholder="Enter text here"
          />
        </section>
        <section className='w-full min-h-80 flex flex-col items-center justify-center'>
          {text ? (
            <QRCode
              value={text} // Pass the text entered by the user as the QR code value
              size={250} // Set the size of the QR code
            />
          ) : (
            <MissingQRData />
          )}
        </section>
      </article>
    </>
  );
};

export {
  GenerateTxtToQR as GenerateTextToQR,
  GenerateTxtToQR as TxtToQR,
  GenerateTxtToQR as TextToQR,
  GenerateTxtToQR as GenerateTxtToQRCode,
  GenerateTxtToQR as TxtToQRCode,
  GenerateTxtToQR as TextToQRCode,
}
export default GenerateTxtToQR;