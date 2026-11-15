import { SectionHeader } from '@/components/ui/SectionHeader';
import { formatMonthYear, cn } from '@/lib/utils';
import { useReveal } from '@/lib/motion';

export function Experience({ experiences }) {
    const sorted = [...experiences].sort((a, b) => new Date(b.start_date) - new Date(a.start_date));
    const ref = useReveal({ selector: '[data-reveal]', y: 40, stagger: 0.1 });

    return (
        <section id="experience" className="bg-night section-pad relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none opacity-30" />

            <div className="section-container relative z-10">
                <SectionHeader 
                    label="Career"
                    title={<>Professional <span className="text-primary italic">Journey.</span></>}
                    subtitle="A timeline of my professional experience and the teams I've collaborated with to build impactful products."
                />

                {sorted.length > 0 ? (
                    <div ref={ref} className="flex flex-col">
                        {sorted.map((exp, index) => (
                            <div
                                key={exp.id}
                                data-reveal
                                className="group relative border-t border-white/5 py-16 transition-all duration-700 hover:bg-white/[0.01]"
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-[0.25fr_1fr_0.3fr] gap-12 lg:gap-24 items-baseline">
                                    {/* Timeline/Duration */}
                                    <div className="flex flex-col gap-2">
                                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">
                                            {formatMonthYear(exp.start_date)}
                                        </span>
                                        <div className="h-px w-8 bg-white/10" />
                                        <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">
                                            {exp.is_current ? 'Present' : formatMonthYear(exp.end_date)}
                                        </span>
                                    </div>

                                    {/* Role & Details */}
                                    <div className="flex flex-col">
                                        <div className="flex flex-col lg:flex-row lg:items-baseline gap-4 lg:gap-8 mb-8">
                                            <h3 className="text-4xl lg:text-5xl font-bold text-white tracking-tighter uppercase group-hover:text-primary transition-colors duration-700">
                                                {exp.position}
                                            </h3>
                                            <span className="text-xl font-bold text-white/20 uppercase tracking-widest">
                                                at {exp.company}
                                            </span>
                                        </div>
                                        
                                        {exp.description && (
                                            <p className="text-lg text-white/40 leading-relaxed font-medium max-w-3xl group-hover:text-white/60 transition-colors duration-700">
                                                {exp.description}
                                            </p>
                                        )}
                                    </div>

                                    {/* Location */}
                                    <div className="flex lg:justify-end">
                                        <span className="text-[10px] font-black text-white/10 uppercase tracking-[0.3em] group-hover:text-white/30 transition-colors duration-700">
                                            {exp.location}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="border-t border-white/5" />
                    </div>
                ) : (
                    <p className="text-xl font-bold text-white/20 uppercase tracking-[0.2em] text-center py-20">No experience records yet.</p>
                )}
            </div>
        </section>
    );
}
