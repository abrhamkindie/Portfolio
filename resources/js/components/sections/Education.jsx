import { SectionHeader } from '@/components/ui/SectionHeader';
import { formatDate } from '@/lib/utils';
import { useReveal } from '@/lib/motion';

export function Education({ educations }) {
    const sorted = [...educations].sort((a, b) => new Date(b.start_date) - new Date(a.start_date));
    const gridRef = useReveal({ selector: 'li', y: 40, stagger: 0.15 });

    return (
        <section id="education" className="section-container py-24 lg:py-40">
            <SectionHeader label="Academic background" title="Education" />

            <ul ref={gridRef} className="grid gap-x-16 md:grid-cols-2">
                {sorted.map((edu) => (
                    <li key={edu.id} className="border-t border-[#262626] py-8">
                        <p className="text-sm text-[#7b7b7b]">
                            {formatDate(edu.start_date, { month: 'short', year: 'numeric' })}
                            {' — '}
                            {edu.is_current ? 'Present' : formatDate(edu.end_date, { month: 'short', year: 'numeric' })}
                        </p>
                        <h3 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-[#262626]">{edu.degree}</h3>
                        <p className="mt-1 text-base text-[#373737]">
                            {edu.institution}
                            {edu.field_of_study && <span className="text-[#7b7b7b]"> · {edu.field_of_study}</span>}
                        </p>
                        {edu.description && <p className="mt-4 text-sm leading-relaxed text-[#373737]">{edu.description}</p>}
                    </li>
                ))}
            </ul>

            {sorted.length === 0 && <p className="text-sm text-[#7b7b7b]">No education records yet.</p>}
        </section>
    );
}
