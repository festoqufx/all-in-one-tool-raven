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
import Image from "next/image";
import { useState } from "react";
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
import { calculatePercentageDifference, cn, convertToBytes, formatFileSize } from "@/lib/utils";

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

    // Handle tab click
    const handleTabClick = (tab: string) => {
        setActiveTab(tab)
    }

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        if (!(file.type in SUPPORTED_FILE_TYPES)) {
            setError("Unsupported file type. Please upload a JPEG, PNG, or WebP image.")
            return
        }

        setError("");
        setOriginalImage(file);
        setOriginalSize(formatFileSize(file.size));
        setMaxSizeMB(file.size / 1024 / 1024 / 2);
        setMaxSizeMBLimit(file.size / 1024 / 1024);
    }

    const compressImage = async () => {
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
                setCompressionRate(calculatePercentageDifference(convertToBytes(originalSize), compressedFile.size, true))
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
    }

    const downloadCompressedImage = () => {
        if (!compressedImage) return
        const link = document.createElement("a")
        link.href = URL.createObjectURL(compressedImage)
        link.download = "compressed_" + compressedImage.name
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    const resetCompression = (file?: File | null) => {  // eslint-disable-line 
        setOriginalImage(null)
        setCompressedImage(null)
        setCompressionRate(0)
        setOriginalSize("")
        setCompressedSize("")
        setError("")
    }

    return (
        <div className={cn("container mx-auto py-8", className)}>
            {!compressedImage && (
                <Card className="max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle className="text-center">Upload an image to compress</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">

                            <div className="flex items-center justify-center min-w-full">
                                <FileUploader
                                    onFilesSelected={(files: File[]) => handleImageUpload({ target: { files } } as unknown as React.ChangeEvent<HTMLInputElement>)}
                                    multiple={false}
                                    acceptedFileTypes={SUPPORTED_FILE_TYPES}
                                    onFileRemove={resetCompression}
                                    disabled={originalImage !== null}
                                />
                            </div>

                            <div>
                                <div className="flex items-center space-x-2 my-6">
                                    <Switch
                                        id="alwaysKeepResolution"
                                        checked={alwaysKeepResolution}
                                        onCheckedChange={setAlwaysKeepResolution}
                                    />
                                    <Label htmlFor="alwaysKeepResolution">Keep Resolution</Label>
                                    <Popover>
                                        <PopoverTrigger>
                                            <InfoIcon className="h-4 w-4 text-muted-foreground" />
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
                                    <div>
                                        <div className="flex items-center space-x-2 my-6">
                                            <Label htmlFor="maxSizeMB">Maximum Size: {maxSizeMB.toFixed(1)} MB</Label>
                                            <Popover>
                                                <PopoverTrigger>
                                                    <InfoIcon className="h-4 w-4 text-muted-foreground" />
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
                                            min={0.1}
                                            max={5 > maxSizeMBLimit ? maxSizeMBLimit : 5}
                                            step={0.1}
                                            className="max-w-xs"
                                            value={[maxSizeMB]}
                                            onValueChange={(value: number[]) => setMaxSizeMB(value[0])}
                                        />
                                    </div>
                                )}
                                {error && <p className="text-sm text-red-500 p-2 border border-red-500 my-6">{error}</p>}
                            </div>
                        </div>
                    </CardContent>
                    {originalImage && (
                        <CardFooter className="flex flex-col items-start gap-2">
                            <p className="text-sm">
                                <strong>File name:</strong> {originalImage.name}
                            </p>
                            <p className="text-sm">
                                <strong>Original size:</strong> {originalSize}
                            </p>
                            {compressedImage && (
                                <p className="text-sm">
                                    <strong>Compressed size:</strong> {compressedSize}
                                </p>
                            )}

                            <Button onClick={compressImage} className={"mx-auto shadow-xl"}>
                                <Minimize2Icon className="mr-2 h-4 w-4" /> Compress Image
                            </Button>
                        </CardFooter>
                    )}
                </Card>
            )}

            {isCompressing && (
                <div className="mx-auto mt-8 text-center flex gap-1 items-center justify-center">
                    <div className="hypnotic rounded-lg"></div>
                    <div>
                        <p className="text-lg font-semibold">Compressing image...</p>
                        <p className="text-sm text-muted-foreground">This may take a few moments</p>
                    </div>
                </div>
            )}

            {originalImage && compressedImage && compressionRate > 0 && (
                <div>
                    <h2 className="text-center text-xl font-bold text-gray-700">Compression successful.</h2>
                    <h2 className="text-center text-lg font-bold text-gray-700">
                        Your image is now
                        <span className="bg-yellow-200 text-gray-800 px-2.5 py-0.5 rounded mx-1">
                            {compressionRate}%
                        </span>
                        smaller!
                    </h2>
                    <div className="flex flex-col md:flex-row justify-center items-center p-6 gap-2">
                        <Button onClick={downloadCompressedImage}>
                            <DownloadIcon className="mr-2 h-4 w-4" /> Download Compressed Image
                        </Button>
                        <Button onClick={() => resetCompression(null)} variant="outline" className="p-6 border-gray-700">
                            <Minimize2Icon className="mr-2 h-4 w-4" /> Compress Another
                        </Button>
                    </div>
                </div>
            )}

            {originalImage && compressedImage && compressionRate > 0 && (
                <div className="container mx-auto">
                    {/* Tabs for smaller screens */}
                    <div className="flex gap-1 items-center justify-center lg:hidden">
                        <Button variant={activeTab === "tab1" ? "outline" : "secondary"} onClick={() => handleTabClick("tab1")}>
                            Original
                        </Button>
                        <Button variant={activeTab === "tab2" ? "outline" : "secondary"} onClick={() => handleTabClick("tab2")}>
                            Compressed
                        </Button>
                    </div>

                    {/* Content */}
                    <div className="lg:flex lg:space-x-4">
                        <div
                            className={`p-4 ${activeTab === "tab1" ? "block" : "hidden"} lg:block lg:flex-grow lg:flex-shrink-0 lg:basis-1/2`}
                        >
                            {/* Content for Original */}
                            <ImageCard img={originalImage} size={originalSize} title="Original Image" />
                        </div>
                        <div
                            className={`p-4 ${activeTab === "tab2" ? "block" : "hidden"} lg:block lg:flex-grow lg:flex-shrink-0 lg:basis-1/2`}
                        >
                            {/* Content for Compressed */}
                            <ImageCard img={compressedImage} size={compressedSize} title="Compressed Image" />
                        </div>
                    </div>
                </div>
            )}

            {originalImage && compressedImage && compressionRate <= 0 && (
                <div className="flex flex-col gap-6 items-center justify-center">
                    <h2 className="text-center text-lg font-bold text-gray-700">
                        The image is already compressed enough; no more compression is recommended.
                    </h2>
                    <Button onClick={() => resetCompression(null)} variant="outline" className="p-6 border-gray-700">
                        <Minimize2Icon className="mr-2 h-4 w-4" /> Compress Another
                    </Button>
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
    return (
        <Card className={cn("w-full h-full", className)}>
            <CardHeader>
                <CardTitle>
                    {title} <Badge className="ml-1">{size}</Badge>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Image
                    src={img ? URL.createObjectURL(img) : "/placeholder.svg"}
                    alt={title}
                    width={400}
                    height={400}
                    className="w-full h-auto object-contain chess-pattern border rounded-lg"
                />
            </CardContent>
        </Card>
    )
}

export default ImageCompression

