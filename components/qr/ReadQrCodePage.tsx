// pages/ReadQrCodePage.tsx
"use client";

import { QrCodeIcon } from 'lucide-react';
import AutoLinkText from '../general/AutoLinkText';
import { PasteFile } from '@/components/ui/PasteFile';
import { ErrorAlert } from '@/components/ui/ErrorAlert';
import { ImageUpload } from '@/components/ui/FileUpload';
import { DragAndDrop } from '@/components/ui/DragAndDrop';
import { useQRCodeProcessor } from '@/components/qr/QRCodeProcessor';
import { CopyToClipboardButton } from '@/components/ui/CopyToClipboardButton';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * ReadQrCodePage component allows users to upload, paste, or scan QR codes.
 * It handles processing and displaying QR code data and errors.
 * 
 * @returns {JSX.Element} The rendered component.
 */
export default function ReadQrCodePage() {
    // Destructure state and handlers from the custom hook
    const {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        qrData, formattedData, errorMessage, activeTab, processFile, setQrData, setErrorMessage, setActiveTab
    } = useQRCodeProcessor();

    return (
        <div className="p-4 max-w-4xl w-full mx-auto">
            <Card className="w-full max-w-xl mx-auto bg-white/90">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <QrCodeIcon className="w-6 h-6" />
                        Read QR Code
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {/* Buttons for uploading and pasting */}
                        <div className="flex items-center justify-center gap-2">
                            <ImageUpload processFile={processFile} />
                            <PasteFile processFile={processFile} setErrorMessage={setErrorMessage} />
                        </div>
                        {/* Instructions */}
                        <p className="text-xs md:text-sm text-gray-500 text-center">
                            Drag and drop an image anywhere on the page, <br />
                            or paste an image of a QR code
                            <kbd className="bg-black mx-1 rounded px-1 text-gray-300">Ctrl</kbd>
                            +
                            <kbd className="bg-black mx-1 rounded px-1 text-gray-300">V</kbd>.
                        </p>
                    </div>
                    {/* Display error messages */}
                    {errorMessage && <ErrorAlert message={errorMessage} />}
                </CardContent>
            </Card>

            {/* Display QR code data */}
            {qrData && (
                <article className="mt-4 lg:mt-8 rounded-xl border border-gray-300">
                    <div className="flex border-b border-gray-300">
                        <button
                            onClick={() => setActiveTab('formatted')}
                            className={`py-2 px-4 text-sm font-medium ${activeTab === 'formatted' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
                        >
                            Formatted Data
                        </button>
                        <button
                            onClick={() => setActiveTab('raw')}
                            className={`py-2 px-4 text-sm font-medium ${activeTab === 'raw' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
                        >
                            Raw Data
                        </button>
                    </div>
                    <section className="p-4">
                        {activeTab === 'raw' ? (
                            <>
                                <AutoLinkText text={qrData} />
                                <CopyToClipboardButton
                                    data={qrData}
                                    buttonText="Copy"
                                    className="my-2 border-gray-500 hover:bg-black hover:text-white py-2 px-4 items-center"
                                    textClassName="text-xs lg:text-sm font-normal"
                                    copyIconClassName="w-2 lg:w-3 h-2 lg:h-3"
                                />
                            </>
                        ) : (
                            formattedData
                        )}
                    </section>
                </article>
            )}

            {/* Drag and drop for uploading QR code images */}
            <DragAndDrop processFile={processFile} setErrorMessage={setErrorMessage} />
        </div>
    );
}
