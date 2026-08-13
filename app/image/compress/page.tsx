import { Metadata } from "next";
import { ImageCompression } from "@/components/image/compressor";

export const metadata: Metadata = {
  title: "Image Compressor",
  description:
    "Compress images online without losing quality. Reduce image file size without compromising the quality of the image (JPEG, PNG, WebP).",
};

export default function ImageCompressorPage() {
  return (
    <>
      <h1 className="sr-only">Image Compressor: Compress images online without losing quality.</h1>
      <h2 className="sr-only">
        Reduce image file size without compromising the quality of the image (JPEG, PNG, WebP).
      </h2>
      <ImageCompression className="mx-auto max-w-6xl" />
    </>
  );
}
