import React from 'react';
import Link from 'next/link';
import { cn } from "@/lib/utils";
import { HOME_ROUTE } from '@/lib/routes';
import { LogoIcon } from "@/components/Logo";

type Props = {
    className?: string,
    textOnly?: boolean,
    iconOnly?: boolean,
    iconClassName?: string,
    textClassName?: string
}

export const HomeLink: React.FC<Props> = ({ className, textOnly, iconOnly, iconClassName, textClassName }) => {
    return (
        <Link href={HOME_ROUTE} className={cn('group inline-flex items-center justify-center gap-2 rounded-full border border-black/20 bg-white px-4 py-2 text-black hover:border-black hover:bg-black hover:text-white', className)}>
            {!textOnly && <LogoIcon className={iconClassName} />}
            {!iconOnly && <h1 className={cn("text-xl font-semibold tracking-tight", textClassName)}>
                All in one Tools
            </h1>}
        </Link>
    )
}

export default HomeLink