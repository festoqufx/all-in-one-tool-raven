/**
 * File: /components/image/compressor.tsx
 * Description: A React component for image compression using browser-image-compression.
 * 
 * Features:
 * - Supports JPEG, PNG, and WebP formats.
 * - Allows users to upload an image and adjust compression settings.
 * - Provides options to retain resolution.
 * - Displays original and compressed image sizes.
 * - Allows users to download the compressed image.
 */

"use client";

import type React from "react";
import { useCallback, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import FileUploader from "../ui/DynamicFileUploader";
import imageCompression from "browser-image-compression";
import { DownloadIcon, Minimize2Icon, InfoIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { calculatePercentageDifference, cn, formatFileSize, triggerDownload } from "@/lib/utils";

interface ImageCompressionProps {
    className?: string
}

const SUPPORTED_FILE_TYPES = {
    "image/jpeg": [".jpg", ".jpeg"],
    "image/png": [".png"],
    "image/webp": [".webp"],
};

export function ImageCompression({ className }: ImageCompressionProps) {
    const [error, setError] = useState<string>("")
    const [maxSizeMB, setMaxSizeMB] = useState<number>(1)
    const [maxSizeMBLimit, setMaxSizeMBLimit] = useState<number>(1)
    const [isCompressing, setIsCompressing] = useState(false)
    const [activeTab, setActiveTab] = useState<string>("tab2")
    const [originalSize, setOriginalSize] = useState<string>("")
    const [compressedSize, setCompressedSize] = useState<string>("")
    const [originalImage, setOriginalImage] = useState<File | null>(null)
    const [compressedImage, setCompressedImage] = useState<File | null>(null)
    const [compressionRate, setCompressionRate] = useState<number>(0)
    const [alwaysKeepResolution, setAlwaysKeepResolution] = useState(false)
    const [uploadKey, setUploadKey] = useState(0)

    // Handle tab click
    const handleTabClick = (tab: string) => {
        setActiveTab(tab)
    }

    const handleImageUpload = (file?: File | null) => {
        if (!file) return

        if (!(file.type in SUPPORTED_FILE_TYPES)) {
            setError("Unsupported file type. Please upload a JPEG, PNG, or WebP image.")
            return
        }

        setError("");
        setOriginalImage(file);
        setOriginalSize(formatFileSize(file.size));
        const sizeMb = file.size / 1024 / 1024;
        setMaxSizeMBLimit(sizeMb);
        setMaxSizeMB(Math.max(0.05, Math.min(sizeMb / 2, sizeMb)));
    }

    const compressImage = useCallback(async () => {
        setIsCompressing(true)

        try {
            const options = {
                maxSizeMB: maxSizeMB,
                useWebWorker: true,
                alwaysKeepResolution: alwaysKeepResolution,
            }

            if (originalImage) {
                const compressedFile = await imageCompression(originalImage, options)
                setCompressedImage(compressedFile)
                setCompressedSize(formatFileSize(compressedFile.size))
                setCompressionRate(
                    calculatePercentageDifference(originalImage.size, compressedFile.size, true)
                )
            } else {
                setError("No image selected. Please upload an image.")
                return
            }
        } catch (error) {
            console.error("Error compressing image:", error)
            setError("Error compressing image. Please try again.")
        } finally {
            setIsCompressing(false)
        }
    }, [alwaysKeepResolution, maxSizeMB, originalImage])

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if ((event.ctrlKey || event.metaKey) && event.key === "Enter" && originalImage && !isCompressing) {
                event.preventDefault();
                void compressImage();
            }
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [compressImage, originalImage, isCompressing]);

    const downloadCompressedImage = () => {
        if (!compressedImage) return
        triggerDownload(compressedImage, `compressed_${compressedImage.name}`)
    }

    const resetCompression = () => {
        setOriginalImage(null)
        setCompressedImage(null)
        setCompressionRate(0)
        setOriginalSize("")
        setCompressedSize("")
        setError("")
        setUploadKey((key) => key + 1)
    }

    return (
        <div className={cn("container mx-auto py-6 md:py-10", className)}>
            {!compressedImage && !isCompressing && (
                <Card className="mx-auto max-w-2xl">
                    <CardHeader className="space-y-2 pb-4 text-center">
                        <CardTitle className="text-xl tracking-tight md:text-2xl">Upload an image to compress</CardTitle>
                        <p className="text-sm text-muted-foreground">JPEG, PNG, and WebP supported</p>
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full items-center gap-6">

                            <div className="flex items-center justify-center min-w-full">
                                <FileUploader
                                    key={uploadKey}
                                    onFilesSelected={(files: File[]) => {
                                        if (files[0]) handleImageUpload(files[0]);
                                        else resetCompression();
                                    }}
                                    multiple={false}
                                    acceptedFileTypes={SUPPORTED_FILE_TYPES}
                                    onFileRemove={resetCompression}
                                    disabled={isCompressing}
                                />
                            </div>

                            <div className="space-y-5 rounded-xl border border-border/80 bg-muted/20 p-4 md:p-5">
                                <div className="flex items-center gap-3">
                                    <Switch
                                        id="alwaysKeepResolution"
                                        checked={alwaysKeepResolution}
                                        onCheckedChange={setAlwaysKeepResolution}
                                    />
                                    <Label htmlFor="alwaysKeepResolution" className="font-medium">Keep resolution</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button type="button" className="text-muted-foreground hover:text-foreground" aria-label="Keep resolution info">
                                                <InfoIcon className="h-4 w-4" strokeWidth={2} />
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <ul className="list-disc p-2 pl-4 text-sm">
                                                <li>When enabled, the image dimensions will not be reduced.</li>
                                                <li>Disabling may result in smaller file sizes but lower resolution.</li>
                                                <li>When enabled, the compressed image size will be higher compared to when disabled.</li>
                                            </ul>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                {originalImage && (
                                    <div className="space-y-3 border-t border-border/70 pt-4">
                                        <div className="flex items-center gap-3">
                                            <Label htmlFor="maxSizeMB" className="font-medium">
                                                Target size: {maxSizeMB.toFixed(1)} MB
                                            </Label>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <button type="button" className="text-muted-foreground hover:text-foreground" aria-label="Target size info">
                                                        <InfoIcon className="h-4 w-4" strokeWidth={2} />
                                                    </button>
                                                </PopoverTrigger>
                                                <PopoverContent>
                                                    <ul className="list-disc p-2 pl-4 text-sm">
                                                        <li>Set the maximum file size for the compressed image.</li>
                                                        <li>The actual size may be smaller.</li>
                                                        <li>This may not work if &apos;Keep Resolution&apos; is enabled.</li>
                                                    </ul>
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                        <Slider
                                            id="maxSizeMB"
                                            min={0.05}
                                            max={Math.max(0.1, maxSizeMBLimit)}
                                            step={0.05}
                                            className="max-w-xs"
                                            value={[Math.min(maxSizeMB, Math.max(0.1, maxSizeMBLimit))]}
                                            onValueChange={(value: number[]) => setMaxSizeMB(value[0])}
                                        />
                                    </div>
                                )}
                                {error && (
                                    <p className="rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
                                        {error}
                                    </p>
                                )}
                            </div>
                        </div>
                    </CardContent>
                    {originalImage && (
                        <CardFooter className="flex flex-col gap-4 border-t border-border/70 pt-6">
                            <div className="grid w-full gap-2 text-sm sm:grid-cols-2">
                                <p>
                                    <span className="text-muted-foreground">File:</span>{" "}
                                    <span className="font-medium">{originalImage.name}</span>
                                </p>
                                <p>
                                    <span className="text-muted-foreground">Original size:</span>{" "}
                                    <span className="font-medium">{originalSize}</span>
                                </p>
                            </div>

                            <Button
                                type="button"
                                onClick={compressImage}
                                disabled={isCompressing}
                                size="lg"
                                className="mx-auto w-full sm:w-auto"
                            >
                                <Minimize2Icon className="h-4 w-4" /> Compress image
                            </Button>
                        </CardFooter>
                    )}
                </Card>
            )}

            {isCompressing && (
                <div className="surface-card mx-auto mt-8 flex max-w-md items-center gap-4 p-6">
                    <div className="hypnotic shrink-0 rounded-lg" />
                    <div className="text-left">
                        <p className="text-base font-semibold">Compressing image…</p>
                        <p className="mt-1 text-sm text-muted-foreground">This may take a few moments</p>
                    </div>
                </div>
            )}

            {originalImage && compressedImage && (
                <div className="mx-auto max-w-5xl space-y-8">
                    <div className="surface-card p-6 text-center md:p-8">
                    {compressionRate > 0 ? (
                        <>
                            <p className="page-eyebrow mb-2">Success</p>
                            <h2 className="section-title">Compression complete</h2>
                            <p className="mt-3 text-base text-muted-foreground md:text-lg">
                                Your image is now{" "}
                                <span className="inline-flex rounded-full bg-foreground px-3 py-1 text-sm font-semibold text-background">
                                    {compressionRate}% smaller
                                </span>
                            </p>
                        </>
                    ) : (
                        <>
                            <p className="page-eyebrow mb-2">Complete</p>
                            <h2 className="section-title">Already optimized</h2>
                            <p className="mt-3 text-sm text-muted-foreground md:text-base">
                                The file is already near its minimum size.
                            </p>
                        </>
                    )}

                    <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <Button type="button" onClick={downloadCompressedImage} size="lg">
                            <DownloadIcon className="h-4 w-4" /> Download compressed image
                        </Button>
                        <Button type="button" onClick={resetCompression} variant="outline" size="lg">
                            <Minimize2Icon className="h-4 w-4" /> Compress another
                        </Button>
                    </div>
                    </div>

                    <div className="flex items-center justify-center gap-2 lg:hidden">
                        <Button
                            type="button"
                            variant={activeTab === "tab1" ? "default" : "outline"}
                            onClick={() => handleTabClick("tab1")}
                        >
                            Original
                        </Button>
                        <Button
                            type="button"
                            variant={activeTab === "tab2" ? "default" : "outline"}
                            onClick={() => handleTabClick("tab2")}
                        >
                            Compressed
                        </Button>
                    </div>

                    <div className="lg:flex lg:gap-4">
                        <div
                            className={`p-2 ${activeTab === "tab1" ? "block" : "hidden"} lg:block lg:basis-1/2 lg:flex-grow`}
                        >
                            <ImageCard img={originalImage} size={originalSize} title="Original Image" />
                        </div>
                        <div
                            className={`p-2 ${activeTab === "tab2" ? "block" : "hidden"} lg:block lg:basis-1/2 lg:flex-grow`}
                        >
                            <ImageCard img={compressedImage} size={compressedSize} title="Compressed Image" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

interface ImageCardProps {
    img: File | null
    size: string
    title: string
    className?: string
}

export function ImageCard({ img, size, title, className }: ImageCardProps) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [loadError, setLoadError] = useState(false);

    useEffect(() => {
        if (!img) {
            setPreviewUrl(null);
            setLoadError(false);
            return;
        }

        setLoadError(false);
        const objectUrl = URL.createObjectURL(img);
        setPreviewUrl(objectUrl);

        return () => {
            URL.revokeObjectURL(objectUrl);
        };
    }, [img]);

    return (
        <Card className={cn("h-full w-full overflow-hidden", className)}>
            <CardHeader className="border-b border-border/70 pb-4">
                <CardTitle className="flex flex-wrap items-center gap-2 text-base md:text-lg">
                    {title}
                    <Badge variant="secondary">{size}</Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-5">
                <div className="chess-pattern flex min-h-[260px] items-center justify-center overflow-hidden rounded-xl border border-border/80">
                    {previewUrl && !loadError ? (
                        // Native img avoids next/image rejecting blob: preview URLs
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={previewUrl}
                            alt={title}
                            className="max-h-[480px] w-full object-contain"
                            onError={() => setLoadError(true)}
                        />
                    ) : (
                        <p className="p-4 text-sm text-muted-foreground">
                            {loadError ? "Unable to preview this image." : "Loading preview..."}
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

export default ImageCompression

