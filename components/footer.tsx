/**
 * FILE: components/footer.tsx
 * DESC: Defines the footer component for the application.
 */

import { FK_WEBSITE } from "@/lib/constants";
import InstallPWAButton from "@/components/general/InstallPWAButton";

export function Footer() {
  return (
    <footer className="py-3 2xl:py-6 text-center text-xs mt-auto flex flex-col md:flex-row items-center justify-center md:justify-between gap-2">
      <InstallPWAButton />
      <div className="bg-black p-2 px-4 rounded-full inline-block shadow-lg hover:shadow-xl transition-shadow duration-300">
        <p className="text-gray-300 text-xs">
          &copy; {new Date().getFullYear()}{" "}
          <a
            href={FK_WEBSITE}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline underline-offset-4 transition-colors duration-300 font-medium"
          >
            RAVENOM
          </a>
          . All rights reserved.
        </p>
      </div>
      <div></div>
    </footer>
  );
}
