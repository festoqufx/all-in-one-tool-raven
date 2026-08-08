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
        <Link href={HOME_ROUTE} className={cn('flex items-center justify-center gap-2 bg-black text-white py-2 px-4 hover:rounded-xl', className)}>
            {!textOnly && <LogoIcon className={iconClassName} />}
            {!iconOnly && <h1 className={cn("text-xl font-semibold", textClassName)}>
                Tools
            </h1>}
        </Link>
    )
}

export default HomeLink