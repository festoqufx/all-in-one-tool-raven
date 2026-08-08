import { cn } from '@/lib/utils';

interface LoadingDotsProps {
    className?: string;
    bgColor?: string;
    size?: number;
}

/**
 * `LoadingDots` is a React functional component that renders a set of animated dots,
 * typically used to indicate loading status in a UI.
 *
 * @param {string} [className] - Optional custom class names to style the component.
 * @param {string} [bgColor='bg-gray-600'] - Background color class for the dots.
 * @param {number} [size=8] - Size of the dots, determining their height and width.
 */
export const LoadingDots: React.FC<LoadingDotsProps> = ({ className, bgColor = 'bg-gray-600', size = 8 }) => {
    const sizeClass = `h-${size} w-${size}`;

    return (
        <div className={cn('flex space-x-2 justify-center items-center dark:invert', className)}>
            <span className='sr-only'>Loading...</span>
            <div className={cn('rounded-full animate-bounce [animation-delay:-0.3s]', bgColor, sizeClass)}></div>
            <div className={cn('rounded-full animate-bounce [animation-delay:-0.15s]', bgColor, sizeClass)}></div>
            <div className={cn('rounded-full animate-bounce', bgColor, sizeClass)}></div>
        </div>
    );
};

export default LoadingDots;