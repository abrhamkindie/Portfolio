import { ArrowUpRight, Globe } from 'lucide-react';
import { useReveal } from '@/lib/motion';

function GithubIcon({ size = 16 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
    );
}

function LinkedinIcon({ size = 16 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
    );
}

function TwitterIcon({ size = 16 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    );
}

export function Footer({ profile }) {
    const year = new Date().getFullYear();
    const email = profile?.email || 'hello@example.com';
    const location = profile?.location || '';
    const revealRef = useReveal({ selector: '[data-reveal]', y: 20, stagger: 0.08, start: 'top 95%' });

    const socials = [
        { key: 'github', label: 'GitHub', url: profile?.github, icon: GithubIcon },
        { key: 'linkedin', label: 'LinkedIn', url: profile?.linkedin, icon: LinkedinIcon },
        { key: 'twitter', label: 'Twitter', url: profile?.twitter, icon: TwitterIcon },
        { key: 'website', label: 'Website', url: profile?.website, icon: Globe },
    ].filter((s) => s.url);

    return (
        <footer className="bg-night border-t border-white/5 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div ref={revealRef} className="section-container py-24 lg:py-40 relative z-10">
                <div className="flex flex-col gap-20 lg:flex-row lg:items-start lg:justify-between">
                    <div className="max-w-3xl" data-reveal>
                        <div className="section-label">Stay Connected</div>
                        <h2 className="text-6xl font-black tracking-tighter text-white sm:text-8xl lg:text-9xl mb-12 leading-[0.8] text-gradient">
                            READY TO<br />
                            <span className="text-primary italic">COLLABORATE?</span>
                        </h2>
                        <p className="text-2xl text-white/50 mb-16 max-w-xl font-medium leading-relaxed">
                            I'm currently available for new ventures. If you have a visionary idea, let's build it.
                        </p>
                        <a
                            href={`mailto:${email}`}
                            className="inline-flex items-center gap-6 text-3xl font-black text-white hover:text-primary transition-all duration-500 group"
                        >
                            {email}
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 transition-transform group-hover:scale-125 group-hover:rotate-45">
                                <ArrowUpRight size={28} className="text-primary" />
                            </div>
                        </a>
                    </div>

                    <div className="flex flex-col gap-12 lg:text-right" data-reveal>
                        <div>
                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-8">Navigation</h3>
                            <ul className="space-y-6">
                                {[
                                    { label: 'About', href: '#about' },
                                    { label: 'Work', href: '#projects' },
                                    { label: 'Services', href: '#services' },
                                    { label: 'Contact', href: '#contact' },
                                ].map((item) => (
                                    <li key={item.href}>
                                        <a href={item.href} className="text-xl font-bold text-white/40 hover:text-white transition-all duration-300">
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div data-reveal className="mt-32 flex flex-col gap-10 pt-12 border-t border-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-white/20 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap items-center gap-x-12 gap-y-4">
                        <span>© {year} {profile?.full_name || 'Abrham'}.</span>
                        {location && <span className="flex items-center gap-3"><Globe size={14} className="text-primary/40" /> {location}</span>}
                    </div>
                    {socials.length > 0 && (
                        <div className="flex items-center gap-4">
                            {socials.map(({ key, label, url, icon: Icon }) => (
                                <a
                                    key={key}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="h-12 w-12 flex items-center justify-center rounded-xl bg-white/[0.03] border border-white/5 text-white/40 transition-all duration-500 hover:bg-primary hover:text-white hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20"
                                >
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </footer>
    );
}
