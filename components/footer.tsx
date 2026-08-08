/**
 * FILE: components/footer.tsx
 * DESC: Defines the footer component for the application.
 */

import { WEBSITE_URL } from "@/lib/constants";
import InstallPWAButton from "@/components/general/InstallPWAButton";

export function Footer() {
  return (
    <footer className="mt-auto flex flex-col items-center justify-center gap-3 py-4 text-center text-xs md:flex-row md:justify-between 2xl:py-6">
      <InstallPWAButton />
      <div className="inline-block rounded-full border border-black/20 bg-black px-4 py-2 shadow-sm transition-shadow duration-300 hover:shadow-lg">
        <p className="text-xs text-gray-200">
          &copy; {new Date().getFullYear()}{" "}
          <a
            href={WEBSITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-white underline-offset-4 transition-colors duration-300 hover:text-gray-300 hover:underline"
          >
            Ravenom
          </a>
          . All rights reserved.
        </p>
      </div>
      <div></div>
    </footer>
  );
}
