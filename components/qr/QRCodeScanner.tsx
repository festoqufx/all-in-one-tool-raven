/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CameraIcon, TriangleAlertIcon } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";

interface QRCodeScannerProps {
    setQrData: (data: string | null) => void;
    errorMessage?: string | null;
    setErrorMessage: (message: string | null) => void;
    buttonClassName?: string;
    children?: React.ReactNode;
}

const QRCodeScanner: React.FC<QRCodeScannerProps> = ({
    setQrData,
    errorMessage,
    setErrorMessage,
    buttonClassName,
    children,
}) => {
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    const onNewScanResult = (text: any, decodedResult: any) => {
        console.log("QR Code Scanner [text]: ", decodedResult);
        console.log("QR Code Scanner [result]: ", decodedResult);
        setQrData(decodedResult);
    };

    const handleOpenDialog = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            stream.getTracks().forEach(track => track.stop()); // Stop the video stream as we only need permission
            setDialogOpen(true);
        } catch (error) {
            setErrorMessage('Camera permission denied or not available.');
            console.error('Camera permission error:', error);
        }
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    return (
        <div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                    <Button
                        variant="outline"
                        className={cn('rounded hover:bg-gray-100 bg-black text-white', buttonClassName)}
                        onClick={handleOpenDialog}
                    >
                        <CameraIcon className="w-4 h-4" />
                        <span className="hidden sm:inline ml-2">{children || 'Scan QR Code'}</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-white">
                    <DialogHeader>
                        <DialogTitle>Scan QR Code</DialogTitle>
                        <DialogDescription>
                            Point your camera at a QR code to scan it.
                        </DialogDescription>
                    </DialogHeader>

                    <Html5QrcodePlugin
                        fps={10}
                        qrbox={250}
                        disableFlip={false}
                        qrCodeSuccessCallback={onNewScanResult}
                    />

                    {errorMessage && (
                        <p className="text-red-500 text-xs sm:text-sm flex items-center gap-2">
                            <TriangleAlertIcon className="w-4 h-4" />
                            {errorMessage}
                        </p>
                    )}

                    <DialogFooter>
                        <Button type="button" size="sm" variant="destructive" className='border' onClick={handleCloseDialog}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};



// Define a type for the props
interface Html5QrcodePluginProps {
    fps?: number;
    qrbox?: number | { width: number; height: number };
    aspectRatio?: number;
    disableFlip?: boolean;
    verbose?: boolean;
    qrCodeSuccessCallback: (decodedText: string, decodedResult: any) => void;
    qrCodeErrorCallback?: (error: any) => void;
}

const qrcodeRegionId = "html5qr-code-full-region";

// Creates the configuration object for Html5QrcodeScanner.
const createConfig = (props: Html5QrcodePluginProps) => {
    // eslint-disable-next-line prefer-const
    let config: any = {};
    if (props.fps) {
        config.fps = props.fps;
    }
    if (props.qrbox) {
        config.qrbox = props.qrbox;
    }
    if (props.aspectRatio) {
        config.aspectRatio = props.aspectRatio;
    }
    if (props.disableFlip !== undefined) {
        config.disableFlip = props.disableFlip;
    }
    return config;
};

const Html5QrcodePlugin: React.FC<Html5QrcodePluginProps> = (props) => {
    useEffect(() => {
        const config = createConfig(props);
        const verbose = props.verbose === true;

        if (!props.qrCodeSuccessCallback) {
            throw new Error("qrCodeSuccessCallback is a required callback.");
        }

        const html5QrcodeScanner = new Html5QrcodeScanner(qrcodeRegionId, config, verbose);
        html5QrcodeScanner.render(props.qrCodeSuccessCallback, props.qrCodeErrorCallback);

        // Apply styles after component mounts
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            .html5-qrcode-element {
                border: 1px solid #cbcbcb;
                background-color: #f5f5f5;
                border-radius: 5px;
                margin: 20px auto;
                padding: 5px 10px;
                text-decoration: none !important;
            }
            .html5-qrcode-element:hover {
                background-color: #000000;
                color: #f5f5f5;
                text-decoration: underline !important;
                text-underline-offset: 0.3rem;
            }
            #html5qr-code-full-region__scan_region {
                display: flex;
                justify-content: center;
                align-items: center;
            }
                #html5qr-code-full-region > div:first-child {
    display: none; /* Hides the first child div */
}

            #html5-qrcode-button-camera-start {
                background-color: #FF5722;
                color: white;
                border: none;
                padding: 10px;
                border-radius: 5px;
                cursor: pointer;
            }
        `;
        document.head.appendChild(styleElement);

        return () => {
            html5QrcodeScanner.clear().catch(error => {
                console.error("Failed to clear Html5QrcodeScanner. ", error);
            });
            document.head.removeChild(styleElement);
        };
    }, [props]);

    return (
        <div id={qrcodeRegionId} />
    );
};


export { 
    QRCodeScanner,
    QRCodeScanner as ScanQR,
    QRCodeScanner as Scanner,
    QRCodeScanner as QRScanner,
    QRCodeScanner as ScanQRCode,
};
export default QRCodeScanner;
