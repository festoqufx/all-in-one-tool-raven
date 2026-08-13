"use client";

import { cn } from '@/lib/utils';
import { useEffect, useState } from "react";


// Define the structure of the network connection details
interface Connection {
    effectiveType: string;
    downlink: number;
}

// Define the structure of visitor information data
interface VisitorInfo {
    operatingSystem?: string;  // Visitor's operating system, e.g., "Windows", "macOS"
    language: string;          // Language of the visitor's browser
    screenResolution: string;  // Screen resolution, e.g., "1920x1080"
    viewportSize: string;      // Browser viewport size, e.g., "1024x768"
    timeZone: string;          // Visitor's time zone, e.g., "America/New_York"
    referrer: string;          // URL of the page that referred the visitor
    connectionType?: string;   // Type of network connection, e.g., "4g"
    downlink?: number;         // Estimated downlink speed in Mbps
    latitude?: number;         // Visitor's latitude (if location access is allowed)
    longitude?: number;        // Visitor's longitude (if location access is allowed)
}

// Function to parse the operating system from the user agent string
const getOperatingSystem = (userAgent: string): string | undefined => {
    if (/windows nt/i.test(userAgent)) return "Windows";
    if (/mac os x/i.test(userAgent)) return "macOS";
    if (/android/i.test(userAgent)) return "Android";
    if (/iphone|ipad|ipod/i.test(userAgent)) return "iOS";
    if (/linux/i.test(userAgent)) return "Linux";
    return "Other";  // Return undefined if no OS match is found
};

// Function to collect visitor information
const getVisitorInfo = async (): Promise<VisitorInfo> => {
    const userAgent = navigator.userAgent;  // Get user agent string from the browser
    const visitorInfo: VisitorInfo = {
        operatingSystem: getOperatingSystem(userAgent),  // Parse OS from user agent
        language: navigator.language,  // Get the browser language
        screenResolution: `${window.screen.width}x${window.screen.height}`,  // Screen resolution
        viewportSize: `${window.innerWidth}x${window.innerHeight}`,  // Viewport size
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,  // Visitor's time zone
        referrer: document.referrer,  // Referring URL
    };

    // Check if the Network Information API is supported for connection details
    const navigatorWithConnection = navigator as Navigator & { connection?: Connection };
    if (navigatorWithConnection.connection) {
        visitorInfo.connectionType = navigatorWithConnection.connection.effectiveType;
        visitorInfo.downlink = navigatorWithConnection.connection.downlink;
    }

    return visitorInfo;
};

interface GetVisitorInfoProps {
    className?: string;     // Custom class for styling the component
    showLoading?: boolean;  // Boolean to show a loading message while data is fetched
}


/**
 * Component to display visitor information (e.g., operating system, language, screen resolution, viewport size, time zone, referrer, connection type, downlink speed, latitude, longitude)
 * @param className Custom class for styling the component
 * @param showLoading Boolean to show a loading message while data is fetched
 * @returns A JSX element containing a table with the visitor information
 */
export const GetVisitorInfo: React.FC<GetVisitorInfoProps> = ({ className, showLoading = false }) => {
    const [visitorInfo, setVisitorInfo] = useState<VisitorInfo | null>(null);  // State to hold visitor data

    useEffect(() => {
        // Function to fetch visitor information and update state
        async function fetchVisitorInfo() {
            const info = await getVisitorInfo();  // Retrieve visitor info
            setVisitorInfo(info);  // Update state with retrieved data
        }

        fetchVisitorInfo();  // Invoke data fetching on component mount
    }, []);

    // Map for displaying labels in a user-friendly way in the table
    const labelMap: Record<keyof VisitorInfo, string> = {
        operatingSystem: "Operating System",
        language: "Language",
        screenResolution: "Screen Resolution",
        viewportSize: "Viewport Size",
        timeZone: "Time Zone",
        referrer: "Referrer",
        connectionType: "Connection Type",
        downlink: "Downlink Speed (Mbps)",
        latitude: "Latitude",
        longitude: "Longitude",
    };

    return (
        <div className={cn("text-base md:text-md lg:text-lg xl:text-xl 2xl:text-2xl flex items-center justify-center gap-2", className)}>
            {visitorInfo ? (
                // Render a table with visitor data if available
                <table className="data-table my-4">
                    <tbody>
                        {Object.entries(visitorInfo).map(([key, value]) => (
                            value && (
                                <tr key={key}>
                                    <td>{labelMap[key as keyof VisitorInfo]}</td>
                                    <td>{String(value)}</td>
                                </tr>
                            )
                        ))}
                    </tbody>
                </table>
            ) : (
                // Show loading message if data is being fetched
                <p>{showLoading && "Loading visitor information..."}</p>
            )}
        </div>
    );
}

export default GetVisitorInfo;
