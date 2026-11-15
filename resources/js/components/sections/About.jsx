import { Globe, Mail, Phone, MapPin, Download, ArrowUpRight } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useReveal } from '@/lib/motion';

const values = ['Clean code', 'Collaboration', 'Excellence', 'Passion', 'Impact', 'Growth'];

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

export function About({ profile }) {
    const bio =
        profile?.bio ||
        'Passionate full-stack developer with 5+ years of experience building web applications.';
    const location = profile?.location || 'San Francisco, USA';
    const email = profile?.email;
    const resume = profile?.resume;
    const bodyRef = useReveal({ selector: '[data-reveal]', y: 30, stagger: 0.1 });

    const socials = [
        { key: 'github', label: 'GitHub', url: profile?.github, icon: GithubIcon },
        { key: 'linkedin', label: 'LinkedIn', url: profile?.linkedin, icon: LinkedinIcon },
        { key: 'twitter', label: 'Twitter', url: profile?.twitter, icon: TwitterIcon },
        { key: 'website', label: 'Website', url: profile?.website, icon: Globe },
    ].filter((s) => s.url);

    return (
        <section id="about" className="bg-background section-pad relative overflow-hidden">
            <div className="section-container relative z-10">
                <SectionHeader 
                    label="The Narrative"
                    title={<>Restraint <span className="border-text">in service</span> of the craft.</>}
                    className="mb-20"
                />
                <div ref={bodyRef} className="grid gap-24 lg:grid-cols-[1.2fr_0.8fr] items-start">
                    <div>
                        <div className="space-y-12 text-2xl lg:text-3xl leading-[1.2] text-white/40 font-medium" data-reveal>
                            <p className="text-white">{bio}</p>
                            <p>
                                I specialize in building robust backend architectures and sleek, responsive frontend interfaces. My approach combines technical precision with a deep understanding of user needs.
                            </p>
                        </div>

                        <div className="mt-24 flex flex-wrap gap-12" data-reveal>
                            {resume && (
                                <a href={resume} target="_blank" rel="noopener noreferrer" className="text-[10px] font-black uppercase tracking-[0.4em] text-white hover:text-primary transition-colors flex items-center gap-4">
                                    Download CV
                                    <Download size={16} />
                                </a>
                            )}
                            <a href="#contact" className="text-[10px] font-black uppercase tracking-[0.4em] text-white hover:text-primary transition-colors flex items-center gap-4">
                                Let's Talk
                                <ArrowUpRight size={16} />
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-col gap-20" data-reveal>
                        <div className="flex flex-col border-t border-white/5 pt-12">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-12 block">Philosophy</span>
                            <ul className="space-y-6">
                                {values.map((value, i) => (
                                    <li key={value} className="flex items-center gap-6 text-xl font-bold text-white/80 group/item">
                                        <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">
                                            {String(i + 1).padStart(2, '0')}
                                        </span>
                                        <span className="group-hover/item:text-primary transition-colors uppercase tracking-tight">{value}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="grid gap-12 border-t border-white/5 pt-12">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-4">Location</span>
                                <span className="text-white font-bold text-2xl uppercase tracking-tighter">{location}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-4">Inquiries</span>
                                <a href={`mailto:${email}`} className="text-white font-bold text-2xl uppercase tracking-tighter hover:text-primary transition-colors truncate block">{email}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
