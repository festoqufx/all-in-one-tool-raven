import "./globals.css";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { META_INFO } from "@/lib/meta";
import { fontVariables } from "@/lib/fonts";
import { Footer } from "@/components/footer";
import { SchemaMarkup } from "@/lib/schema-markup";

export const metadata: Metadata = META_INFO;


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SchemaMarkup) }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen flex flex-col antialiased bg-gray-50 px-2 md:px-4",
          ...Object.values(fontVariables) // Spread the values of fontVariables
        )}
        style={{ minHeight: '100vh' }}
      >
        <div className="flex-grow">
          {children}
        </div>

        <Footer />
      </body>
    </html>
  );
}
