import HomeLink from "@/components/HomeLink";
import { getAppLinkById } from "@/lib/apps-data";
import { DynamicIcon } from "@/components/ui/DynamicIcon";

type ToolSectionHeaderProps = {
  appId: string;
};

export default function ToolSectionHeader({ appId }: ToolSectionHeaderProps) {
  const appLink = getAppLinkById(appId);

  return (
    <header className="mb-4 mt-3 flex items-center justify-between rounded-2xl border border-black/10 bg-white/80 px-3 py-3 shadow-sm backdrop-blur-sm md:px-5">
      <HomeLink iconOnly={true} className="border-black/10 bg-black text-white" />
      <h1 className="flex items-center gap-2 text-base font-semibold tracking-tight text-black md:text-lg">
        <DynamicIcon
          name={appLink?.icon}
          defaultIcon="BoxIcon"
          className="h-5 w-5"
          strokeWidth={1.8}
        />
        {appLink?.label}
      </h1>
    </header>
  );
}
