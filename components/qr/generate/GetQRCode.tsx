"use client";

import { QrCodeIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react';

/**
 * `MissingQRData` component displays a message indicating that the QR code content is missing.
 */
const MissingQRData = () => (
    <div className="flex flex-col items-center space-y-4 my-8">
        <QrCodeIcon strokeWidth={1.5} size={250} className="text-gray-300 border border-slate-300 border-dashed rounded-md mt-4" />
        <p className="bg-black/70 text-white font-bold py-2 px-4 rounded text-sm my-4 w-full text-center">
            Missing QR Content
        </p>
    </div>
);


interface QRCodeDownloadProps {
    /**
     * The content to encode into the QR code.
     */
    value: string;

    /**
     * The size of the QR code in pixels.
     */
    size: number;

    /**
     * Background color of the QR code.
     * @default '#ffffff'
     */
    bgColor?: string;

    /**
     * Foreground color of the QR code.
     * @default '#000000'
     */
    fgColor?: string;

    /**
     * Error correction level of the QR code.
     * - 'L' (Low): 7% or less errors can be corrected.
     * - 'M' (Medium): 15% or less errors can be corrected.
     * - 'Q' (Quartile): 25% or less errors can be corrected.
     * - 'H' (High): 30% or less errors can be corrected.
     * @default 'L'
     */
    level?: 'L' | 'M' | 'Q' | 'H';

    /**
     * The margin size around the QR code.
     * @default 1
     */
    marginSize?: number;
}

/**
 * `QRCode` component generates a QR code based on the provided `value` and configuration.
 * 
 * This component utilizes `QRCodeSVG` from the `qrcode.react` library to render the QR code.
 * It also includes a button to download the QR code as a PNG image.
 * 
 * @component
 * @example
 * <QRCode 
 *   value="https://example.com" 
 *   size={250} 
 *   bgColor="#ffffff" 
 *   fgColor="#000000" 
 *   level="H" 
 *   marginSize={2} 
 * />
 */
const QRCode: React.FC<QRCodeDownloadProps> = (props) => {
    const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);

    // Effect to capture the canvas after rendering
    useEffect(() => {
        // Find the canvas element used for QR code rendering
        const canvasElement = document.querySelector('canvas');
        if (canvasElement) {
            setCanvas(canvasElement as HTMLCanvasElement);
        }
    }, [props.value, props.size, props.bgColor, props.fgColor, props.level, props.marginSize]);

    /**
     * Initiates the download of the QR code image.
     * 
     * @param fileName - The name of the file to be downloaded.
     */
    const downloadQRCode = (fileName: string) => {
        if (canvas) {
            const dataURL = canvas.toDataURL('image/png');
            const a = document.createElement('a');
            a.download = fileName;
            a.href = dataURL;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };

    return (
        <section className="flex flex-col items-center space-y-4 my-8">
            {/* Render the QR code */}
            {/* for download */}
            <QRCodeCanvas
                {...props}
                size={1000}
                bgColor={props.bgColor || '#ffffff'}
                fgColor={props.fgColor || '#000000'}
                level={props.level || 'L'}
                marginSize={2}
                className='hidden'
            />
            {/* for preview */}
            <QRCodeSVG
                {...props}
                size={props.size || 200}
                bgColor={props.bgColor || '#ffffff'}
                fgColor={props.fgColor || '#000000'}
                level={props.level || 'L'}
                marginSize={props.marginSize || 1}
                className='border border-slate-300 rounded-md'
            />
            {/* Button to download the QR code */}
            <button
                className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm my-4 w-full text-center"
                onClick={() => downloadQRCode('qr-code.png')}
            >
                Download QR Code
            </button>
        </section>
    );
};

export {
    QRCode,
    QRCode as GetQRCode,
    MissingQRData,
    MissingQRData as NoQRData,
    MissingQRData as NoQR
};
export default QRCode;
