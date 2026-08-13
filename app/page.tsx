import Apps from "@/components/apps";
import { AppLinks } from "@/lib/apps-data";
import { SparklesIcon, ZapIcon, ShieldCheckIcon } from "lucide-react";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col items-center pb-14 pt-8 md:pb-20 md:pt-14">
      <section className="surface-card relative w-full overflow-hidden p-8 text-center md:p-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent"
        />
        <p className="page-eyebrow mb-4">Ravenom Toolkit</p>
        <h1 className="page-title">All in one Tools</h1>
        <p className="page-lead mt-5">
          A focused suite of practical tools for QR workflows, editing, IP insights, and image
          optimization. Fast, private, and built for everyday utility.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/60 px-3 py-1.5 text-xs font-medium text-muted-foreground">
            <SparklesIcon className="h-3.5 w-3.5" strokeWidth={2} />
            {AppLinks.length} tools
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/60 px-3 py-1.5 text-xs font-medium text-muted-foreground">
            <ZapIcon className="h-3.5 w-3.5" strokeWidth={2} />
            Client-side processing
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/60 px-3 py-1.5 text-xs font-medium text-muted-foreground">
            <ShieldCheckIcon className="h-3.5 w-3.5" strokeWidth={2} />
            No account required
          </span>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          Tip: press <kbd className="ui-kbd">/</kbd> to search tools instantly
        </p>
      </section>

      <Apps />
    </main>
  );
}
