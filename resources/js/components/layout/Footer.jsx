import { useReveal } from '@/lib/motion';

export function Footer({ profile }) {
    const year = new Date().getFullYear();
    const email = profile?.email || 'hello@example.com';
    const location = profile?.location || '';
    const revealRef = useReveal({ selector: '[data-reveal]', y: 24, stagger: 0.1, start: 'top 95%' });

    return (
        <footer className="bg-[#262626] text-white">
            <div ref={revealRef} className="section-container grid gap-12 py-16 md:grid-cols-2 lg:py-24">
                <div data-reveal>
                    <p className="text-[clamp(28px,3.5vw,56px)] font-semibold leading-[1.1] tracking-[-0.03em]">
                        Let&apos;s build something great.
                    </p>
                    <a
                        href={`mailto:${email}`}
                        data-cursor="hover"
                        className="mt-6 inline-block text-lg underline underline-offset-4 hover:opacity-70"
                    >
                        {email}
                    </a>
                </div>

                <div data-reveal className="flex flex-col justify-end gap-3 text-sm text-white/60 md:items-end">
                    {location && <p>{location}</p>}
                    <p>© {year} All Rights Reserved</p>
                </div>
            </div>
        </footer>
    );
}
