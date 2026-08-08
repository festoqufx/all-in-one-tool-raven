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
            <Card className="mx-auto w-full max-w-xl bg-white/90 shadow-sm">
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
                        <p className="text-center text-xs text-black/60 md:text-sm">
                            Drag and drop an image anywhere on the page, <br />
                            or paste an image of a QR code
                            <kbd className="mx-1 rounded border border-black/10 bg-black px-1 text-gray-300">Ctrl</kbd>
                            +
                            <kbd className="mx-1 rounded border border-black/10 bg-black px-1 text-gray-300">V</kbd>.
                        </p>
                    </div>
                    {/* Display error messages */}
                    {errorMessage && <ErrorAlert message={errorMessage} />}
                </CardContent>
            </Card>

            {/* Display QR code data */}
            {qrData && (
                <article className="mt-4 rounded-2xl border border-black/15 bg-white/90 lg:mt-8">
                    <div className="flex border-b border-black/10">
                        <button
                            onClick={() => setActiveTab('formatted')}
                            className={`px-4 py-2 text-sm font-medium ${activeTab === 'formatted' ? 'border-b-2 border-black text-black' : 'text-black/55 hover:text-black'}`}
                        >
                            Formatted Data
                        </button>
                        <button
                            onClick={() => setActiveTab('raw')}
                            className={`px-4 py-2 text-sm font-medium ${activeTab === 'raw' ? 'border-b-2 border-black text-black' : 'text-black/55 hover:text-black'}`}
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
