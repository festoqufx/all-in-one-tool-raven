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
    ip: string;
    city?: string;
    region?: string;
    country?: string;
    timezone?: string;
    org?: string;
}

const fetchIpOnly = async (): Promise<string | null> => {
    try {
        const res = await fetch("/api/ip", { cache: "no-store" });
        if (!res.ok) throw new Error("IP lookup failed");
        const data = await res.json();
        return data.ip ?? null;
    } catch (error) {
        console.error("Failed to fetch IP:", error);
        return null;
    }
};

const fetchIpDetails = async (ip: string): Promise<IPInfo | null> => {
    try {
        const res = await fetch(`/api/ip/lookup?ip=${encodeURIComponent(ip)}`, { cache: "no-store" });
        if (!res.ok) throw new Error("IP details lookup failed");
        return { ip };
    } catch (error) {
        console.error("Failed to fetch IP details:", error);
        return null;
    }
};

const fetchDomainIP = async (domain: string): Promise<string | null> => {
    try {
        const res = await fetch(`/api/dns?name=${encodeURIComponent(domain)}`, { cache: "no-store" });
        if (!res.ok) return null;
        const data = await res.json();
        return data.ip || null;
    } catch (error) {
        console.error("Failed to fetch domain IP:", error);
        return null;
    }
};

const VisitorIPDetails: React.FC = () => {
    const [ipInfo, setIpInfo] = useState<IPInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const load = async () => {
        setLoading(true);
        setError(false);
        const ip = await fetchIpOnly();
        if (ip) {
            const details = await fetchIpDetails(ip);
            if (details) {
                setIpInfo(details);
                setLoading(false);
                return;
            }
        }
        setIpInfo(null);
        setError(true);
        setLoading(false);
    };

    useEffect(() => {
        void load();
    }, []);

    if (loading) {
        return <LoadingDots size={6} />;
    }

    if (error || !ipInfo) {
        return (
            <div className="flex flex-col items-center gap-3">
                <p className="text-destructive">Failed to load IP information.</p>
                <Button type="button" variant="outline" size="sm" onClick={() => void load()}>
                    Retry
                </Button>
            </div>
        );
    }

    return (
        <article className="flex flex-col items-center justify-center gap-4">
            <section className="flex gap-2 text-2xl font-extrabold">
                {ipInfo.ip}
                <CopyToClipboardButton data={ipInfo.ip} />
            </section>
            <IPDetailsTable ipInfo={ipInfo} />
        </article>
    );
};

const FindAnyIPDetails: React.FC = () => {
    const [inputIP, setInputIP] = useState<string>("");
    const [ipInfo, setIpInfo] = useState<IPInfo | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleIpSearch = async () => {
        if (inputIP.trim() === "") return;
        setLoading(true);
        setError(null);
        const details = await fetchIpDetails(inputIP.trim());
        if (details) {
            setIpInfo(details);
        } else {
            setError("Could not find details for that IP address.");
        }
        setLoading(false);
    };

    return (
        <article className="flex flex-col items-center justify-center gap-4">
            <form
                className="my-4 flex w-full items-center gap-2"
                onSubmit={(event) => {
                    event.preventDefault();
                    void handleIpSearch();
                }}
            >
                <Input
                    type="text"
                    value={inputIP}
                    onChange={(e) => setInputIP(e.target.value)}
                    placeholder="Enter an IP address"
                    aria-label="IP address"
                />
                <Button type="submit" disabled={loading}>
                    {loading ? <LoaderIcon className="mr-2 h-4 w-4 animate-spin" /> : <SearchIcon className="mr-2 h-4 w-4" />}
                    Search
                </Button>
            </form>
            {loading && <LoadingDots size={6} />}
            {error && <p className="text-sm text-destructive">{error}</p>}
            {ipInfo && <IPDetailsTable ipInfo={ipInfo} />}
        </article>
    );
};

const FindWebsiteIPDetails: React.FC = () => {
    const [domain, setDomain] = useState<string>("");
    const [normalizedDomain, setNormalizedDomain] = useState<string | null>(null);
    const [domainIP, setDomainIP] = useState<string | null>(null);
    const [ipInfo, setIpInfo] = useState<IPInfo | null>(null);
    const [loading, setLoading] = useState(false);
    const [detailsLoading, setDetailsLoading] = useState(false);
    const [domainError, setDomainError] = useState<string | null>(null);

    const normalizeInput = (input: string): string | null => {
        try {
            if (input.startsWith("http://") || input.startsWith("https://")) {
                const url = new URL(input);
                return url.hostname;
            }

            const hostname = input.split("/")[0];
            const domainParts = hostname.split(".").filter(Boolean);
            if (domainParts.length < 2) {
                throw new Error("Invalid domain format");
            }

            return hostname;
        } catch (error) {
            console.error("Failed to normalize input:", error);
            return null;
        }
    };

    const handleDomainSearch = async () => {
        if (domain.trim() === "") return;

        setLoading(true);
        setDomainError(null);
        setDomainIP(null);
        setIpInfo(null);
        setNormalizedDomain(null);

        const normalized = normalizeInput(domain.trim());
        if (!normalized) {
            setDomainError("Invalid domain. Please enter a valid domain or URL.");
            setLoading(false);
            return;
        }
        setNormalizedDomain(normalized);

        try {
            const ip = await fetchDomainIP(normalized);
            if (!ip) {
                throw new Error("No IP address found for the domain.");
            }
            setDomainIP(ip);

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
            <form
                className="my-4 flex w-full items-center gap-2"
                onSubmit={(event) => {
                    event.preventDefault();
                    void handleDomainSearch();
                }}
            >
                <Input
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="Enter a domain name or URL"
                    aria-label="Domain or URL"
                    className="w-full"
                />
                <Button type="submit" disabled={loading}>
                    {loading ? <LoaderIcon className="mr-2 h-4 w-4 animate-spin" /> : <SearchIcon className="mr-2 h-4 w-4" />}
                    Search
                </Button>
            </form>

            {loading && <LoadingDots size={6} />}
            {domainError && <p className="text-destructive">{domainError}</p>}
            {normalizedDomain && !domainIP && !domainError && (
                <p className="text-muted-foreground">
                    Searching for IP of <span className="font-bold">{normalizedDomain}</span>...
                </p>
            )}
            {domainIP && (
                <>
                    <p>
                        IP Address for{" "}
                        <a
                            href={domain.startsWith("http") ? domain : `https://${normalizedDomain}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline underline-offset-4"
                        >
                            {normalizedDomain}
                        </a>
                        :
                    </p>
                    <section className="flex gap-2 text-2xl font-extrabold">
                        {domainIP}
                        <CopyToClipboardButton data={domainIP} />
                    </section>
                </>
            )}
            {detailsLoading && <LoadingDots size={6} />}
            {domainIP && ipInfo && <IPDetailsTable ipInfo={ipInfo} />}
        </article>
    );
};

const IPDetailsTable: React.FC<{ ipInfo: IPInfo }> = ({ ipInfo }) => {
    const rows = [
        ["City", ipInfo.city],
        ["Region", ipInfo.region],
        ["Country", ipInfo.country],
        ["Time Zone", ipInfo.timezone],
        ["ISP", ipInfo.org],
    ].filter(([, value]) => Boolean(value));

    if (rows.length === 0) {
        return <p className="text-sm text-muted-foreground">No additional location details were returned.</p>;
    }

    return (
        <table className="data-table my-4 max-w-xl">
            <thead>
                <tr>
                    <th colSpan={2}>IP Details</th>
                </tr>
            </thead>
            <tbody>
                {ipInfo.city && (
                    <tr>
                        <td>City</td>
                        <td>{ipInfo.city}</td>
                    </tr>
                )}
                {ipInfo.region && (
                    <tr>
                        <td>Region</td>
                        <td>{ipInfo.region}</td>
                    </tr>
                )}
                {ipInfo.country && (
                    <tr>
                        <td>Country</td>
                        <td className="flex items-center gap-2">
                            {ipInfo.country}
                            <ReactCountryFlag countryCode={ipInfo.country} svg />
                        </td>
                    </tr>
                )}
                {ipInfo.timezone && (
                    <tr>
                        <td>Time Zone</td>
                        <td>{ipInfo.timezone}</td>
                    </tr>
                )}
                {ipInfo.org && (
                    <tr>
                        <td>ISP</td>
                        <td>{ipInfo.org}</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export const IPAddressTool: React.FC = () => {
    return (
        <Tabs defaultValue="visitor" className="mx-auto w-full max-w-2xl">
            <TabsList className="grid h-auto w-full grid-cols-1 gap-1 rounded-2xl p-1 sm:grid-cols-3">
                <TabsTrigger value="visitor">Your IP</TabsTrigger>
                <TabsTrigger value="find">Find Any IP</TabsTrigger>
                <TabsTrigger value="find-domain">Find Website IP</TabsTrigger>
            </TabsList>
            <TabsContent value="visitor" className="space-y-4 text-center">
                <h3 className="my-4 scroll-m-20 text-center text-lg font-extrabold tracking-tight text-muted-foreground md:text-2xl">
                    Your public IP address is
                </h3>
                <VisitorIPDetails />
                <GetVisitorInfo showLoading />
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
