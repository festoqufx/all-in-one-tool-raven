import Link from 'next/link';
import { HOME_ROUTE } from '@/lib/routes';
import { LogoIcon } from "@/components/Logo";
import HomeLink from "@/components/HomeLink";

const NotFoundPage = () => {
    return (
        <main className="flex flex-col items-center justify-between min-h-screen relative overflow-hidden pb-16">
            <HomeLink
                className="bg-transparent text-gray-950 border border-transparent hover:border-black my-4"
                textClassName="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl my-4"
            />

            {/* Background Logo */}
            <section className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none z-0">
                <LogoIcon className="w-[500px] h-auto" />
            </section>

            {/* Message */}
            <section className="relative z-10 text-center p-4">
                <h1 className="text-4xl font-bold" aria-label="404 Error">
                    404 - Page Not Found
                </h1>
                <p className="mt-4 text-lg text-gray-700">
                    Requested tool page is unavailable!
                </p>
            </section>

            {/* Home Link */}
            <Link href={HOME_ROUTE} className="mt-6 cursor-pointer inline-block px-6 py-3 text-white bg-black hover:bg-blue-700 rounded-md transition">
                Go back to Home
            </Link>
        </main>
    );
};

export default NotFoundPage;
