import { SectionHeader } from '@/components/ui/SectionHeader';
import { formatMonthYear } from '@/lib/utils';
import { useReveal } from '@/lib/motion';

export function Education({ educations }) {
    const sorted = [...educations].sort((a, b) => new Date(b.start_date) - new Date(a.start_date));
    const ref = useReveal({ selector: '[data-reveal]', y: 40, stagger: 0.1 });

    return (
        <section id="education" className="bg-night section-pad relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none opacity-30" />

            <div className="section-container relative z-10">
                <SectionHeader 
                    label="Academic Background"
                    title={<>Education <span className="text-primary italic">& Foundation.</span></>}
                />

                {sorted.length > 0 ? (
                    <div ref={ref} className="flex flex-col">
                        {sorted.map((edu) => (
                            <div key={edu.id} data-reveal className="group relative border-t border-white/5 py-12 transition-all duration-700 hover:bg-white/[0.01]">
                                <div className="grid grid-cols-1 lg:grid-cols-[0.25fr_1fr_0.3fr] gap-10 lg:gap-24 items-baseline">
                                    {/* Duration */}
                                    <div className="flex flex-col gap-2">
                                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">
                                            {formatMonthYear(edu.start_date)}
                                        </span>
                                        <div className="h-px w-8 bg-white/10" />
                                        <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">
                                            {edu.is_current ? 'Present' : formatMonthYear(edu.end_date)}
                                        </span>
                                    </div>

                                    {/* Degree & Institution */}
                                    <div className="flex flex-col">
                                        <div className="flex flex-col lg:flex-row lg:items-baseline gap-4 lg:gap-8 mb-6">
                                            <h3 className="text-3xl lg:text-4xl font-bold text-white tracking-tighter uppercase group-hover:text-primary transition-colors duration-700">
                                                {edu.degree}
                                            </h3>
                                            <span className="text-lg font-bold text-white/20 uppercase tracking-widest">
                                                {edu.institution}
                                            </span>
                                        </div>
                                        
                                        {edu.field_of_study && (
                                            <div className="text-[10px] font-black text-primary/40 uppercase tracking-[0.3em] mb-6">
                                                Specializing in {edu.field_of_study}
                                            </div>
                                        )}

                                        {edu.description && (
                                            <p className="text-base text-white/40 leading-relaxed font-medium max-w-3xl group-hover:text-white/60 transition-colors duration-700">
                                                {edu.description}
                                            </p>
                                        )}
                                    </div>

                                    {/* Foundation Marker */}
                                    <div className="flex lg:justify-end">
                                        <span className="text-[9px] font-black text-white/5 uppercase tracking-[0.4em] group-hover:text-white/20 transition-colors duration-700">
                                            Academic Foundation
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="border-t border-white/5" />
                    </div>
                ) : (
                    <p className="text-xl font-bold text-white/20 uppercase tracking-[0.2em] text-center py-20">No education records yet.</p>
                )}
            </div>
        </section>
    );
}
