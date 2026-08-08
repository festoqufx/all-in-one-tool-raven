"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ReactCountryFlag from "react-country-flag";
import { LoaderIcon, SearchIcon } from "lucide-react";
import { LoadingDots } from "@/components/ui/LoadingDots";
import { GetVisitorInfo } from "@/components/ip/GetVisitorInfo";
import { CopyToClipboardButton } from "@/components/ui/CopyToClipboardButton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface IPInfo {
    ip: string; // IP address
    city?: string; // City based on IP geolocation
    region?: string; // Region or state based on IP geolocation
    country?: string; // Country code (ISO 3166-1 alpha-2) based on IP geolocation
    timezone?: string; // Timezone based on IP geolocation
    org?: string; // ISP or organization name associated with the IP
}

// Fetch IP address using api64.ipify.org
const fetchIpOnly = async (): Promise<string | null> => {
    try {
        const res = await fetch("https://api64.ipify.org?format=json");
        const data = await res.json();
        return data.ip;
    } catch (error) {
        console.error("Failed to fetch IP:", error);
        return null;
    }
};

// Fetch detailed IP information using ipinfo.io
const fetchIpDetails = async (ip: string): Promise<IPInfo | null> => {
    const token = process.env.NEXT_PUBLIC_IPINFO_API_TOKEN;
    try {
        const res = await fetch(`https://ipinfo.io/${ip}/json?token=${token}`);
        const data = await res.json();
        return { ...data, ip };
    } catch (error) {
        console.error("Failed to fetch IP details:", error);
        return null;
    }
};

// Fetch IP address of a domain using a DNS lookup API
const fetchDomainIP = async (domain: string): Promise<string | null> => {
    try {
        const res = await fetch(`https://dns.google/resolve?name=${domain}`);
        const data = await res.json();
        const ip = data?.Answer?.[0]?.data; // Extract the IP address from the response
        return ip || null;
    } catch (error) {
        console.error("Failed to fetch domain IP:", error);
        return null;
    }
};

// Component 1: Show Visitor's IP Details Automatically
const VisitorIPDetails: React.FC = () => {
    const [ipInfo, setIpInfo] = useState<IPInfo | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function initializeIpInfo() {
            setLoading(true);
            const ip = await fetchIpOnly();
            if (ip) {
                const details = await fetchIpDetails(ip);
                if (details) setIpInfo(details);
            }
            setLoading(false);
        }

        initializeIpInfo();
    }, []);

    if (loading) {
        return <LoadingDots size={6} />;
    }

    if (!ipInfo) {
        return <p className="text-red-600">Failed to load IP information. Please try again later.</p>;
    }

    return (
        <article className="flex flex-col items-center justify-center gap-4">
            <section className="flex gap-2 font-extrabold text-2xl">
                {ipInfo.ip}
                <CopyToClipboardButton data={ipInfo.ip} />
            </section>
            <IPDetailsTable ipInfo={ipInfo} />
        </article>
    );
};

// Component 2: Allow User to Input and Find IP Details
const FindAnyIPDetails: React.FC = () => {
    const [inputIP, setInputIP] = useState<string>("");
    const [ipInfo, setIpInfo] = useState<IPInfo | null>(null);
    const [loading, setLoading] = useState(false);

    const handleIpSearch = async () => {
        if (inputIP.trim() === "") return;
        setLoading(true);
        const details = await fetchIpDetails(inputIP.trim());
        if (details) setIpInfo(details);
        setLoading(false);
    };

    return (
        <article className="flex flex-col items-center justify-center gap-4">
            <div className="flex gap-2 items-center my-4">
                <Input
                    type="text"
                    value={inputIP}
                    onChange={(e) => setInputIP(e.target.value)}
                    placeholder="Enter an IP address"
                    className="border border-black"
                />
                <Button
                    onClick={handleIpSearch}
                    disabled={loading}
                >
                    {loading ? <LoaderIcon className="animate-spin h-4 w-4 mr-2" /> : <SearchIcon className="h-4 w-4 mr-2" />}
                    Search
                </Button>
            </div>
            {loading && <LoadingDots size={6} />}
            {ipInfo && <IPDetailsTable ipInfo={ipInfo} />}
        </article>
    );
};

// Component 3: Find Website or Domain IP Address with Normalized Inputs
const FindWebsiteIPDetails: React.FC = () => {
    const [domain, setDomain] = useState<string>(""); // Input domain
    const [normalizedDomain, setNormalizedDomain] = useState<string | null>(null); // Normalized domain
    const [domainIP, setDomainIP] = useState<string | null>(null); // Resolved IP address
    const [ipInfo, setIpInfo] = useState<IPInfo | null>(null); // IP details
    const [loading, setLoading] = useState(false); // Loading state for domain resolution
    const [detailsLoading, setDetailsLoading] = useState(false); // Loading state for IP details
    const [domainError, setDomainError] = useState<string | null>(null); // Error message for domain resolution

    /**
     * Normalize the input to extract the main domain.
     * @param input User's input (e.g., URL or domain name)
     * @returns Normalized domain name or null if invalid
     */
    const normalizeInput = (input: string): string | null => {
        try {
            // If the input includes a protocol, use the URL API to parse it
            if (input.startsWith("http://") || input.startsWith("https://")) {
                const url = new URL(input);
                return url.hostname; // Extract the hostname (e.g., sub.example.com → example.com)
            }

            // Handle inputs without protocol, e.g., "sub.example.com"
            const domainParts = input.split(".");
            if (domainParts.length < 2) {
                throw new Error("Invalid domain format");
            }

            // Extract the main domain (e.g., sub.example.com → example.com)
            const tld = domainParts[domainParts.length - 1]; // Top-level domain
            const secondLevel = domainParts[domainParts.length - 2]; // Second-level domain
            return `${secondLevel}.${tld}`;
        } catch (error) {
            console.error("Failed to normalize input:", error);
            return null;
        }
    };

    const handleDomainSearch = async () => {
        if (domain.trim() === "") return;

        setLoading(true);
        setDomainError(null); // Clear previous errors
        setDomainIP(null); // Reset previous IP
        setIpInfo(null); // Reset IP info
        setNormalizedDomain(null); // Reset normalized domain

        // Normalize the input
        const normalized = normalizeInput(domain.trim());
        if (!normalized) {
            setDomainError("Invalid domain. Please enter a valid domain or URL.");
            setLoading(false);
            return;
        }
        setNormalizedDomain(normalized);

        try {
            const ip = await fetchDomainIP(normalized); // Fetch IP from the normalized domain
            if (!ip) {
                throw new Error("No IP address found for the domain.");
            }
            setDomainIP(ip);

            // Fetch additional details about the resolved IP
            setDetailsLoading(true);
            const details = await fetchIpDetails(ip);
            setIpInfo(details || null);
            setDetailsLoading(false);
        } catch (error) {
            console.error("Domain resolution failed:", error);
            setDomainError("Failed to resolve the domain to an IP address. Please check your input.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <article className="flex flex-col items-center justify-center gap-4">
            {/* Input for domain */}
            <div className="flex gap-2 items-center my-4 w-full">
                <Input
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="Enter a domain name or URL"
                    className="border border-black w-full"
                />
                <Button
                    onClick={handleDomainSearch}
                    disabled={loading}
                >
                    {loading ? <LoaderIcon className="animate-spin h-4 w-4 mr-2" /> : <SearchIcon className="h-4 w-4 mr-2" />}
                    Search
                </Button>
            </div>

            {/* Loading state */}
            {loading && <LoadingDots size={6} />}

            {/* Error message for domain resolution */}
            {domainError && (
                <p className="text-red-600">{domainError}</p>
            )}

            {/* Display normalized domain */}
            {normalizedDomain && (
                <p className="text-gray-600">
                    Searching for IP of <span className="font-bold">{normalizedDomain}</span>...
                </p>
            )}

            {/* Display resolved IP */}
            {domainIP && (
                <>
                    <p>
                        IP Address for{" "}
                        <a
                            href={domain.startsWith("http") ? domain : `http://${domain}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600"
                        >
                            {normalizedDomain}
                        </a>
                        :
                    </p>
                    <section className="flex gap-2 font-extrabold text-2xl">
                        {domainIP}
                        <CopyToClipboardButton data={domainIP} />
                    </section>
                </>
            )}

            {/* Show IP details */}
            {detailsLoading && <LoadingDots size={6} />}
            {domainIP && ipInfo && <IPDetailsTable ipInfo={ipInfo} />}
        </article>
    );
};



// Reusable Table Component to Display IP Details
const IPDetailsTable: React.FC<{ ipInfo: IPInfo }> = ({ ipInfo }) => {
    return (
        <table className="text-base md:text-md lg:text-lg xl:text-xl 2xl:text-2xl my-4 border border-gray-300">
            <thead>
                <tr className="border border-gray-300">
                    <th colSpan={2} className="px-4 py-2">IP Details</th>
                </tr>
            </thead>
            <tbody>
                {ipInfo.city && (
                    <tr className="border border-gray-300">
                        <td className="px-4 py-2 font-semibold text-gray-600">City</td>
                        <td className="px-4 py-2 bg-gray-100">{ipInfo.city}</td>
                    </tr>
                )}
                {ipInfo.region && (
                    <tr className="border border-gray-300">
                        <td className="px-4 py-2 font-semibold text-gray-600">Region</td>
                        <td className="px-4 py-2 bg-gray-100">{ipInfo.region}</td>
                    </tr>
                )}
                {ipInfo.country && (
                    <tr className="border border-gray-300">
                        <td className="px-4 py-2 font-semibold text-gray-600">Country</td>
                        <td className="px-4 py-2 bg-gray-100 flex items-center gap-2">
                            {ipInfo.country}
                            <ReactCountryFlag countryCode={ipInfo.country} svg />
                        </td>
                    </tr>
                )}
                {ipInfo.timezone && (
                    <tr className="border border-gray-300">
                        <td className="px-4 py-2 font-semibold text-gray-600">Time Zone</td>
                        <td className="px-4 py-2 bg-gray-100">{ipInfo.timezone}</td>
                    </tr>
                )}
                {ipInfo.org && (
                    <tr className="border border-gray-300">
                        <td className="px-4 py-2 font-semibold text-gray-600">ISP</td>
                        <td className="px-4 py-2 bg-gray-100">{ipInfo.org}</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

// Main Component with Tabs to Switch Between VisitorIP, FindIP, and FindWebsiteIP
export const IPAddressTool: React.FC = () => {
    return (
        <Tabs defaultValue="visitor" className="w-full max-w-2xl mx-auto">
            <TabsList className="flex justify-center">
                <TabsTrigger value="visitor">Your IP</TabsTrigger>
                <TabsTrigger value="find">Find Any IP</TabsTrigger>
                <TabsTrigger value="find-domain">Find Website IP</TabsTrigger>
            </TabsList>
            <TabsContent value="visitor" className="text-center space-y-4">
                <h3 className="scroll-m-20 text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-extrabold tracking-tight text-center text-gray-600 my-4">
                    Your public IP address is
                </h3>
                <VisitorIPDetails />
                <GetVisitorInfo />
            </TabsContent>
            <TabsContent value="find">
                <FindAnyIPDetails />
            </TabsContent>
            <TabsContent value="find-domain">
                <FindWebsiteIPDetails />
            </TabsContent>
        </Tabs>
    );
};

export default IPAddressTool;
