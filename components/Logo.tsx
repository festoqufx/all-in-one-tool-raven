import Link from "next/link";
import { cn } from "@/lib/utils";
import { BoxesIcon } from "lucide-react";

import React from 'react';

export const LogoIcon = ({ className }: { className?: string }) => {
    return (
        <BoxesIcon className={cn("h-5 w-5", className)} strokeWidth={1.8} />
    )
}

export const LogoLink = ({ className }: { className?: string }) => {
    return (
        <Link href="/" className={cn("", className)} aria-label="Home">
            <LogoIcon className={className} />
        </Link>
    )
}

export {
    LogoLink as Logo,
}
export default LogoLink;
