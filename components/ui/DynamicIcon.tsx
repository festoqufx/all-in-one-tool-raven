// components/ui/DynamicIcon.tsx
import React from 'react';
import * as LucideIcons from 'lucide-react';

// Define the props for the DynamicIcon component
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface BaseIconProps extends React.SVGProps<SVGSVGElement> {}

interface NameIconProps extends BaseIconProps {
    name: string;
    defaultIcon?: string;
}

interface DefaultIconProps extends BaseIconProps {
    name?: string;
    defaultIcon: string;
}

// Union type to ensure that one of the props is always required
type DynamicIconProps = NameIconProps | DefaultIconProps;

/**
 * DynamicIcon component renders a Lucide icon based on the provided `name` or `defaultIcon`.
 * If neither is valid, it falls back to a hardcoded default icon.
 *
 * @param name: string - The name of the icon to render
 * @param defaultIcon: string - The name of the default icon to render
 * @param props: React.SVGProps<SVGSVGElement> - The props to pass to the Lucide icon
 * @returns JSX.Element | null
 */
const DynamicLucidIcon: React.FC<DynamicIconProps> = ({ name, defaultIcon, ...props }) => {
    // Determine the icon name to use, prioritizing 'name' over 'defaultIcon'
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const iconName = name || defaultIcon;

    // Check if the iconName is a valid Lucide icon
    const isValidIcon = (iconName?: string): iconName is keyof typeof LucideIcons =>
        iconName !== undefined && Object.keys(LucideIcons).includes(iconName);

    // Resolve the icon component based on the iconName
    const IconComponent = isValidIcon(name)
        ? LucideIcons[name as keyof typeof LucideIcons]
        : isValidIcon(defaultIcon)
        ? LucideIcons[defaultIcon as keyof typeof LucideIcons]
        : LucideIcons.Asterisk; // Fallback to a hardcoded default icon

    // Assert the type to ensure it's treated as a valid React component
    const Icon = IconComponent as React.ElementType;

    // If the icon component exists, render it; otherwise, render null
    return Icon ? <Icon {...props} /> : null;
};


export {
    DynamicLucidIcon,
    DynamicLucidIcon as DynamicIcon,
    DynamicLucidIcon as LucidIcon,
    DynamicLucidIcon as Icon
};
export default DynamicLucidIcon;
