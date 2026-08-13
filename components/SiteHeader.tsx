"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MenuIcon, XIcon } from "lucide-react";
import HomeLink from "@/components/HomeLink";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { AppLinks } from "@/lib/apps-data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DynamicIcon } from "@/components/ui/DynamicIcon";

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-40 -mx-3 border-b border-border/70 bg-background/90 px-3 backdrop-blur-xl md:-mx-6 md:px-6">
      <div className="mx-auto flex h-[3.75rem] w-full max-w-7xl items-center justify-between gap-3">
        <HomeLink
          className="min-w-0 border-border/80 bg-background px-3 py-2 text-foreground shadow-sm hover:border-foreground hover:bg-foreground hover:text-background"
          textClassName="hidden truncate text-sm font-semibold tracking-tight sm:inline md:text-[15px]"
        />

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {AppLinks.map((app) => {
            const active = pathname === app.href || pathname.startsWith(`${app.href}/`);
            return (
              <Link
                key={app.id}
                href={app.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-xs font-medium tracking-wide text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
                  active &&
                    "bg-foreground text-background shadow-sm hover:bg-foreground hover:text-background"
                )}
              >
                {app.shortLabel ?? app.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <XIcon className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-nav"
          className="border-t border-border bg-background px-2 py-3 lg:hidden"
          aria-label="Mobile"
        >
          <ul className="space-y-1">
            {AppLinks.map((app) => {
              const active = pathname === app.href || pathname.startsWith(`${app.href}/`);
              return (
                <li key={app.id}>
                  <Link
                    href={app.href}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium",
                      active
                        ? "bg-foreground text-background"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                  >
                    <DynamicIcon
                      name={app.icon}
                      defaultIcon="BoxIcon"
                      className="h-4 w-4 shrink-0"
                    />
                    {app.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
