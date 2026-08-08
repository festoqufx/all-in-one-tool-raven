/**
 * FILE: InstallPWAButton.tsx
 * DESC:: This file contains the InstallPWAButton component which is used to install the Progressive Web App (PWA) on iOS devices.
 */

"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowBigDownDashIcon } from 'lucide-react';



declare global {
    interface Window {
        MSStream: any;  // eslint-disable-line
    }
}

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{
        outcome: 'accepted' | 'dismissed';
        platform: string;
    }>;
}



export default function InstallPWAButton() {
    const [isIOS, setIsIOS] = useState(false);
    const [isInstallable, setIsInstallable] = useState(false);
    const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault();
            setInstallPrompt(e as BeforeInstallPromptEvent);
            setIsInstallable(true);
        };

        const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        setIsIOS(isIOSDevice);

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = async () => {
        if (installPrompt) {
            installPrompt.prompt();
            const { outcome } = await installPrompt.userChoice;
            if (outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            setInstallPrompt(null);
            setIsInstallable(false);
        }
    };

    return (
        <div>
            {isInstallable && (
                <Button onClick={handleInstallClick} className='flex items-center justify-center space-x-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs py-1 px-3 rounded-md'>
                    <ArrowBigDownDashIcon className="w-4 h-4 mr-2" />
                    Install App
                </Button>
            )}
            {isIOS && (
                <Dialog>
                    <DialogTrigger className='flex items-center justify-center space-x-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-medium py-1 px-3 rounded-md'>
                        <ArrowBigDownDashIcon className="w-4 h-4 mr-2" />
                        Install App
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogDescription className='text-center text-gray-800 py-4'>
                                To install this app, tap the share icon and select <span className='font-bold'>Add to Home Screen</span>.
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}
