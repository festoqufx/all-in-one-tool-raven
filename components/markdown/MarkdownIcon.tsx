import React from 'react';

interface MarkdownIconProps extends React.SVGProps<SVGSVGElement> {
    className?: string; // Optional className prop
}

export const MarkdownIcon: React.FC<MarkdownIconProps> = ({ className, ...props }) => {
    return (
        <svg
            className={className} 
            width="800px"
            height="500px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <title>markdown</title>
            <rect width="24" height="24" fill="none" />
            <path d="M2,16V8H4l3,3,3-3h2v8H10V10.83l-3,3-3-3V16H2M16,8h3v4h2.5l-4,4.5-4-4.5H16Z" />
        </svg>
    );
};

export default MarkdownIcon;
