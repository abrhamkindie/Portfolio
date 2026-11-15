import { SectionHeader } from '@/components/ui/SectionHeader';
import { groupBy } from '@/lib/utils';
import { useReveal } from '@/lib/motion';

export function Skills({ skills = [] }) {
    const grouped = groupBy(skills || [], 'category');
    const entries = Object.entries(grouped);
    const ref = useReveal({ selector: '[data-reveal]', y: 40, stagger: 0.1 });

    return (
        <section id="skills" className="bg-background section-pad relative overflow-hidden">
            <div className="section-container relative z-10">
                <SectionHeader 
                    label="Toolkit"
                    title={<>Expertise <span className="border-text">& Stack</span></>}
                />

                {entries.length > 0 ? (
                    <div ref={ref} className="grid gap-x-20 gap-y-32 md:grid-cols-2 lg:grid-cols-3">
                        {entries.map(([category, items]) => (
                            <div key={category} data-reveal className="flex flex-col group">
                                <div className="flex items-center gap-6 mb-8">
                                    <h3 className="text-xl font-bold text-white tracking-tight uppercase">
                                        {category}
                                    </h3>
                                    <div className="h-[1px] flex-1 bg-white/5 group-hover:bg-primary/40 transition-colors duration-700" />
                                </div>

                                <div className="flex flex-wrap gap-x-6 gap-y-4">
                                    {items.map((skill) => (
                                        <div key={skill.id} className="flex flex-col">
                                            <span className="text-base font-medium text-white/40 hover:text-white transition-colors cursor-default tracking-tight">
                                                {skill.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] text-center py-20">No data found.</p>
                )}
            </div>
        </section>
    );
}
