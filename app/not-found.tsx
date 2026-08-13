import Link from 'next/link';
import { HOME_ROUTE } from '@/lib/routes';
import { LogoIcon } from "@/components/Logo";

const NotFoundPage = () => {
    return (
        <main className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden pb-16">
            <section className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-5">
                <LogoIcon className="h-auto w-[500px]" />
            </section>

            <section className="relative z-10 p-4 text-center">
                <p className="mb-3 text-xs uppercase tracking-[0.24em] text-muted-foreground">Error 404</p>
                <h1 className="text-4xl font-bold" aria-label="404 Error">
                    Page not found
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Requested tool page is unavailable.
                </p>
            </section>

            <Link
                href={HOME_ROUTE}
                className="relative z-10 mt-6 inline-block rounded-full border border-foreground bg-foreground px-6 py-3 text-background transition hover:bg-background hover:text-foreground"
            >
                Go back to Home
            </Link>
        </main>
    );
};

export default NotFoundPage;
