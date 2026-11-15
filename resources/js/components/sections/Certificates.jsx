import { ArrowUpRight } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { formatMonthYear } from '@/lib/utils';
import { useReveal } from '@/lib/motion';

export function Certificates({ certificates }) {
    const sorted = [...certificates].sort((a, b) => new Date(b.issued_at) - new Date(a.issued_at));
    const ref = useReveal({ selector: '[data-reveal]', y: 40, stagger: 0.1 });

    return (
        <section id="certificates" className="bg-night section-pad relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none opacity-30" />

            <div className="section-container relative z-10">
                <SectionHeader 
                    label="Recognitions"
                    title={<>Certifications <span className="text-primary italic">& Awards.</span></>}
                />

                {sorted.length > 0 ? (
                    <div ref={ref} className="flex flex-col">
                        {sorted.map((cert) => (
                            <div key={cert.id} data-reveal className="group relative border-t border-white/5 py-10 transition-all duration-700 hover:bg-white/[0.01]">
                                <div className="grid grid-cols-1 lg:grid-cols-[0.25fr_1fr_0.3fr] gap-8 lg:gap-24 items-center">
                                    {/* Date */}
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">
                                            {formatMonthYear(cert.issued_at)}
                                        </span>
                                        <span className="text-[9px] font-bold text-white/10 uppercase tracking-[0.4em] mt-1">
                                            Issue Date
                                        </span>
                                    </div>

                                    {/* Title & Issuer */}
                                    <div className="flex flex-col">
                                        <div className="flex flex-col lg:flex-row lg:items-baseline gap-3 lg:gap-8">
                                            <h3 className="text-2xl lg:text-3xl font-bold text-white tracking-tighter uppercase group-hover:text-primary transition-colors duration-700">
                                                {cert.title}
                                            </h3>
                                            <span className="text-base font-bold text-white/20 uppercase tracking-widest">
                                                {cert.issuer}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Verification Link */}
                                    <div className="flex lg:justify-end">
                                        {cert.credential_url ? (
                                            <a
                                                href={cert.credential_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.4em] text-white/20 group-hover:text-primary transition-all duration-500 border border-white/5 group-hover:border-primary/30 px-5 py-2.5 rounded-full hover:bg-primary/5"
                                            >
                                                Verify
                                                <ArrowUpRight size={14} />
                                            </a>
                                        ) : (
                                            <span className="text-[9px] font-black text-white/5 uppercase tracking-[0.4em]">
                                                Official Award
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="border-t border-white/5" />
                    </div>
                ) : (
                    <p className="text-xl font-bold text-white/20 uppercase tracking-[0.2em] text-center py-20">No certificates yet.</p>
                )}
            </div>
        </section>
    );
}
