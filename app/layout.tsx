import "./globals.css";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { META_INFO } from "@/lib/meta";
import { fontVariables } from "@/lib/fonts";
import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/SiteHeader";
import { SchemaMarkup } from "@/lib/schema-markup";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ThemeScript } from "@/components/theme/ThemeScript";

export const metadata: Metadata = META_INFO;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SchemaMarkup) }}
        />
      </head>
      <body
        className={cn(
          "flex min-h-screen flex-col antialiased px-3 md:px-6",
          ...Object.values(fontVariables)
        )}
      >
        <ThemeProvider>
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <SiteHeader />
          <div
            id="main-content"
            className="mx-auto flex w-full max-w-7xl flex-grow flex-col"
          >
            {children}
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
