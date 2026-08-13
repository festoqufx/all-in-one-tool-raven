"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { AppLinks } from "@/lib/apps-data";
import { AppLinkProps } from "@/lib/type-interface";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { ArrowUpRightIcon, SearchIcon, XIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const AppLink: React.FC<AppLinkProps> = ({ id, href, icon, label, description, category }) => (
  <Link href={href} id={id} className="group block h-full focus-visible:outline-none">
    <Card className="h-full border-border/80 bg-card/95 shadow-[var(--shadow-soft)] transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-foreground/40 group-hover:shadow-lg group-focus-visible:ring-2 group-focus-visible:ring-ring">
      <CardHeader className="space-y-4 pb-2">
        <div className="flex items-start justify-between gap-3">
          <div className="tool-icon-wrap transition-transform duration-200 group-hover:scale-105">
            <DynamicIcon name={icon} defaultIcon="BoxIcon" className="h-4 w-4" strokeWidth={2} />
          </div>
          <ArrowUpRightIcon
            className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
            strokeWidth={2}
          />
        </div>
        {category && (
          <p className="section-subtitle !mt-0">{category}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-2 pt-0">
        <h2 className="text-base font-semibold tracking-tight md:text-[17px]">
          {label}
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description ?? "Open this tool"}
        </p>
      </CardContent>
    </Card>
  </Link>
);

export default function Apps() {
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typingInField =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      if (event.key === "/" && !typingInField) {
        event.preventDefault();
        searchRef.current?.focus();
      }

      if (event.key === "Escape") {
        setQuery("");
        searchRef.current?.blur();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return AppLinks;
    return AppLinks.filter((app) => {
      const haystack = [
        app.label,
        app.shortLabel,
        app.description,
        app.category,
        app.keywords,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle);
    });
  }, [query]);

  return (
    <section className="container relative w-full py-10 md:py-12">
      <div className="mb-6 flex flex-col gap-4 md:mb-8 md:flex-row md:items-end md:justify-between">
        <div className="min-w-0">
          <h2 className="section-title">Choose a tool</h2>
          <p className="section-subtitle">
            {filtered.length} of {AppLinks.length} available
          </p>
        </div>
        <div className="relative w-full md:w-80 lg:w-[22rem]">
          <label htmlFor="tool-search" className="sr-only">
            Search tools
          </label>
          <SearchIcon
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            strokeWidth={2}
          />
          <input
            id="tool-search"
            ref={searchRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name or category…"
            autoComplete="off"
            className={cn(
              "h-11 w-full rounded-full border border-border bg-background/90 pl-11 text-sm shadow-sm outline-none",
              "placeholder:text-muted-foreground focus-visible:border-foreground/30 focus-visible:ring-2 focus-visible:ring-ring",
              query ? "pr-11" : "pr-14"
            )}
          />
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                searchRef.current?.focus();
              }}
              className="absolute right-2.5 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              aria-label="Clear search"
            >
              <XIcon className="h-3.5 w-3.5" strokeWidth={2} />
            </button>
          ) : (
            <kbd className="ui-kbd pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 sm:inline-flex">
              /
            </kbd>
          )}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {filtered.map((app) => (
            <AppLink key={app.href} {...app} />
          ))}
        </div>
      ) : (
        <div className="surface-card px-6 py-14 text-center">
          <p className="text-sm font-medium text-foreground">No tools match your search</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try a different keyword such as &ldquo;QR&rdquo;, &ldquo;markdown&rdquo;, or &ldquo;image&rdquo;.
          </p>
        </div>
      )}
    </section>
  );
}
