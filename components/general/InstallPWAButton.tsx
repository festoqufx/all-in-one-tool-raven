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
                <Button onClick={handleInstallClick} className='flex items-center justify-center gap-2 border-black/20 bg-white text-xs text-black hover:border-black hover:bg-black hover:text-white'>
                    <ArrowBigDownDashIcon className="w-4 h-4 mr-2" />
                    Install App
                </Button>
            )}
            {isIOS && (
                <Dialog>
                    <DialogTrigger className='inline-flex items-center justify-center gap-2 rounded-full border border-black/20 bg-white px-4 py-2 text-xs font-medium text-black hover:border-black hover:bg-black hover:text-white'>
                        <ArrowBigDownDashIcon className="w-4 h-4 mr-2" />
                        Install App
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogDescription className='py-4 text-center text-black/80'>
                                To install this app, tap the share icon and select <span className='font-bold'>Add to Home Screen</span>.
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}
