import { WEBSITE_URL } from "@/lib/constants";
import InstallPWAButton from "@/components/general/InstallPWAButton";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/70 py-6 md:py-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-1 text-center md:flex-row md:text-left">
        <InstallPWAButton />
        <div className="inline-flex items-center rounded-full border border-border bg-foreground px-4 py-2 shadow-sm">
          <p className="text-xs text-background/85">
            &copy; {new Date().getFullYear()}{" "}
            <a
              href={WEBSITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-background underline-offset-4 transition-colors hover:underline"
            >
              Ravenom
            </a>
            . All rights reserved.
          </p>
        </div>
        <p className="hidden text-[11px] uppercase tracking-[0.18em] text-muted-foreground md:block">
          Light / Dark ready
        </p>
      </div>
    </footer>
  );
}
