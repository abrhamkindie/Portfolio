import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="dark flex min-h-screen flex-col items-center justify-center bg-background px-6 py-12 font-sans text-foreground">
            <Link
                href="/"
                className="mb-10 inline-flex items-baseline gap-2 font-display text-2xl font-bold uppercase tracking-tight text-foreground transition-colors hover:text-primary"
            >
                Abrham
                <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 translate-y-[-2px] rounded-full bg-primary"
                />
            </Link>

            <div className="panel w-full max-w-md p-8 sm:p-10">{children}</div>

            <Link
                href="/"
                className="mt-10 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-primary"
            >
                Back to portfolio
            </Link>
        </div>
    );
}
