import Link from "next/link";
import { cn } from "@/lib/utils";
import { BoxesIcon } from "lucide-react";

import React from 'react';

export const LogoIcon = ({ className }: { className?: string }) => {
    return (
        <BoxesIcon className={cn("w-12 h-14", className)} strokeWidth={1} />
    )

}
export const LogoLink = ({ className }: { className?: string }) => {
    return (
        <Link href="/" className={cn("", className)}>
            <LogoIcon className={cn("fill-gray-950 text-gray-950", className)} />
        </Link>
    )
}

export {
    LogoLink as Logo,
}
export default LogoLink;