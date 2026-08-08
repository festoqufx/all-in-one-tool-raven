/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from "next/link";
import { AppLinks } from "@/lib/apps-data";
import { AppLinkProps } from "@/lib/type-interface";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


// Reusable Link component
const AppLink: React.FC<AppLinkProps> = ({ id, href, icon, label }) => (
  <Link href={href} id={id} >
    <Card className="h-full w-full bg-gray-950 text-gray-100 hover:text-green-400">
      <CardHeader>
        <DynamicIcon name={icon} defaultIcon="BoxIcon" />
        {/* <CardTitle></CardTitle> */}
        {/* <CardDescription></CardDescription> */}
      </CardHeader>
      <CardContent>
        <h1 className="font-bold tracking-wide mt-2 mb-2 text-sm md:text-base">
          {label}
        </h1>
      </CardContent>
      {/* <CardFooter className="flex justify-between"></CardFooter> */}
    </Card>
  </Link>
);

export default function Apps() {
  return (
    <div className="container w-full relative">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4 py-10 z-1 gap-4">
        {AppLinks.map(({ id, href, icon, label }) => (
          <AppLink id={id} key={href} href={href} icon={icon} label={label} />
        ))}
      </div>
    </div>
  );
}
