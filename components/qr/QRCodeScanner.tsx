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
    DialogFooter,
} from "@/components/ui/dialog";

interface QRCodeScannerProps {
    setQrData: (data: string) => void;
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

    const onNewScanResult = (decodedText: string) => {
        if (!decodedText) return;
        setQrData(decodedText);
        setErrorMessage(null);
        setDialogOpen(false);
    };

    const handleOpenDialog = async () => {
        if (!navigator.mediaDevices?.getUserMedia) {
            setErrorMessage("Camera is not available in this browser.");
            return;
        }
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            stream.getTracks().forEach((track) => track.stop());
            setErrorMessage(null);
            setDialogOpen(true);
        } catch (error) {
            setErrorMessage("Camera permission denied or not available.");
            console.error("Camera permission error:", error);
        }
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    return (
        <div>
            <Button
                type="button"
                variant="outline"
                className={cn("rounded-full bg-foreground text-background hover:bg-background hover:text-foreground", buttonClassName)}
                onClick={() => void handleOpenDialog()}
            >
                <CameraIcon className="h-4 w-4" />
                <span className="ml-2 hidden sm:inline">{children || "Scan QR Code"}</span>
            </Button>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="bg-background sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Scan QR Code</DialogTitle>
                        <DialogDescription>
                            Point your camera at a QR code to scan it.
                        </DialogDescription>
                    </DialogHeader>

                    {dialogOpen && (
                        <Html5QrcodePlugin
                            fps={10}
                            qrbox={250}
                            disableFlip={false}
                            qrCodeSuccessCallback={onNewScanResult}
                        />
                    )}

                    {errorMessage && (
                        <p className="flex items-center gap-2 text-xs text-destructive sm:text-sm">
                            <TriangleAlertIcon className="h-4 w-4" />
                            {errorMessage}
                        </p>
                    )}

                    <DialogFooter>
                        <Button type="button" size="sm" variant="destructive" className="border" onClick={handleCloseDialog}>
                            Close
                        </Button>
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
    const successCallbackRef = React.useRef(props.qrCodeSuccessCallback);
    const errorCallbackRef = React.useRef(props.qrCodeErrorCallback);

    successCallbackRef.current = props.qrCodeSuccessCallback;
    errorCallbackRef.current = props.qrCodeErrorCallback;

    useEffect(() => {
        const config = createConfig(props);
        const verbose = props.verbose === true;
        const html5QrcodeScanner = new Html5QrcodeScanner(qrcodeRegionId, config, verbose);
        html5QrcodeScanner.render(
            (decodedText, decodedResult) => successCallbackRef.current(decodedText, decodedResult),
            (error) => errorCallbackRef.current?.(error)
        );

        return () => {
            html5QrcodeScanner.clear().catch((error) => {
                console.error("Failed to clear Html5QrcodeScanner. ", error);
            });
        };
        // Initialize once when the scanner mounts.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
