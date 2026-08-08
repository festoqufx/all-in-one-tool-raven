"use client";

import { useState, useCallback } from 'react';
import { BrowserQRCodeReader } from '@zxing/browser';
import { IFormattedVCardData } from "@/lib/type-interface";
import { VCardDisplay } from '@/components/qr/VCardDisplay';
import { isVCard, getVCardData, formatVCardData } from "@/lib/utils/qr";

export const useQRCodeProcessor = () => {
    const [qrData, setQrData] = useState<string | null>(null);
    const [formattedData, setFormattedData] = useState<JSX.Element | string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'raw' | 'formatted'>('formatted');

    const processFile = useCallback(async (file: File) => {
        const reader = new FileReader();
        reader.onload = async () => {
            const img = new Image();
            img.src = reader.result as string;
            img.onload = async () => {
                const codeReader = new BrowserQRCodeReader();
                try {
                    const result = await codeReader.decodeFromImageElement(img);
                    setQrData(result.getText());
                    formatData(result.getText());
                    setErrorMessage(null);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                } catch (err) {
                    setErrorMessage('Failed to read QR code from the image.');
                }
            };
        };
        reader.readAsDataURL(file);
    }, []);

    const formatData = (data: string) => {
        if (isVCard(data)) {
            const vCardData = getVCardData(data);
            if (vCardData) {
                const formattedVCardData = formatVCardData(vCardData);
                if (!formattedVCardData) {
                    setActiveTab('raw');
                }
                setFormattedData(<VCardDisplay data={formattedVCardData as IFormattedVCardData} />);
            } else {
                setActiveTab('raw');
                setErrorMessage('Failed to parse vCard data.');
            }
        } else {
            setActiveTab('raw');
        }
    };

    return { qrData, formattedData, errorMessage, activeTab, processFile, setQrData, setErrorMessage, setActiveTab };
};