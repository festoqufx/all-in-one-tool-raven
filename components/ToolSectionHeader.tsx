import HomeLink from "@/components/HomeLink";
import { getAppLinkById } from "@/lib/apps-data";
import { DynamicIcon } from "@/components/ui/DynamicIcon";

type ToolSectionHeaderProps = {
  appId: string;
};

export default function ToolSectionHeader({ appId }: ToolSectionHeaderProps) {
  const appLink = getAppLinkById(appId);

  return (
    <header className="surface-card mb-6 mt-5 flex flex-col gap-4 px-4 py-4 md:mb-8 md:flex-row md:items-center md:justify-between md:px-6 md:py-5">
      <div className="flex min-w-0 flex-1 items-start gap-3 md:items-center">
        <div className="tool-icon-wrap shrink-0">
          <DynamicIcon
            name={appLink?.icon}
            defaultIcon="BoxIcon"
            className="h-5 w-5"
            strokeWidth={2}
          />
        </div>
        <div className="min-w-0">
          <p className="page-eyebrow mb-1">Tool</p>
          <h1 className="truncate text-lg font-semibold tracking-tight md:text-xl">
            {appLink?.label}
          </h1>
          {appLink?.description && (
            <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground md:line-clamp-1">
              {appLink.description}
            </p>
          )}
        </div>
      </div>
      <HomeLink
        iconOnly
        className="hidden shrink-0 border-border bg-muted/50 px-3 py-2 text-foreground hover:border-foreground hover:bg-foreground hover:text-background md:inline-flex"
      />
    </header>
  );
}
