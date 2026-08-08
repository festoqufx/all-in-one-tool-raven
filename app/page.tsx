import Apps from "@/components/apps";
import HomeLink from "@/components/HomeLink";


export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col items-center pb-12 pt-6 md:pb-16 md:pt-10">

      <div className="w-full rounded-3xl border border-black/10 bg-white/80 p-6 text-center shadow-sm backdrop-blur-sm md:p-10">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.28em] text-black/60">Ravenom Toolkit</p>

        <HomeLink
          className="my-2 border-black/15 bg-transparent hover:border-black"
          textClassName="scroll-m-20 text-3xl font-extrabold tracking-tight md:text-5xl"
        />

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-black/70 md:text-base">
          A focused suite of practical tools for QR workflows, editing, IP insights, and image optimization.
          Fast, private, and built for everyday utility.
        </p>
      </div>

      <Apps />

    </main>
  );
}
