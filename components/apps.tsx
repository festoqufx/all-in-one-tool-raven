import Link from "next/link";
import { AppLinks } from "@/lib/apps-data";
import { AppLinkProps } from "@/lib/type-interface";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { ArrowUpRightIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

// Reusable Link component
const AppLink: React.FC<AppLinkProps> = ({ id, href, icon, label, description }) => (
  <Link href={href} id={id} className="group block h-full">
    <Card className="h-full border-black/10 bg-white/85 shadow-sm backdrop-blur-sm transition-all duration-200 group-hover:-translate-y-1 group-hover:border-black group-hover:shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="inline-flex rounded-full border border-black/15 bg-black p-2 text-white">
            <DynamicIcon name={icon} defaultIcon="BoxIcon" className="h-4 w-4" />
          </div>
          <ArrowUpRightIcon className="h-4 w-4 text-black/40 transition-colors group-hover:text-black" />
        </div>
      </CardHeader>
      <CardContent className="space-y-2 pt-0">
        <h2 className="text-sm font-semibold tracking-tight text-black md:text-base">
          {label}
        </h2>
        <p className="text-xs leading-relaxed text-black/65 md:text-sm">
          {description ?? "Open this tool"}
        </p>
      </CardContent>
    </Card>
  </Link>
);

export default function Apps() {
  return (
    <section className="container relative w-full py-8 md:py-10">
      <div className="mb-4 flex items-end justify-between gap-3 md:mb-6">
        <h2 className="text-lg font-semibold tracking-tight text-black md:text-xl">Choose a tool</h2>
        <p className="text-xs uppercase tracking-[0.2em] text-black/50">{AppLinks.length} modules</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {AppLinks.map(({ id, href, icon, label, description }) => (
          <AppLink
            id={id}
            key={href}
            href={href}
            icon={icon}
            label={label}
            description={description}
          />
        ))}
      </div>
    </section>
  );
}
