import Apps from "@/components/apps";
import HomeLink from "@/components/HomeLink";


export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">

      <HomeLink
        className="bg-transparent text-gray-950 border border-transparent hover:border-black my-4"
        textClassName="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl my-4"
      />

      <Apps />

    </main>
  );
}
