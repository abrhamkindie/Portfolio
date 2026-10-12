import { useReveal } from '@/lib/motion';

export function SectionHeader({ label, title, subtitle }) {
    const ref = useReveal({ selector: '[data-reveal]', y: 30, stagger: 0.1 });

    return (
        <div ref={ref} className="mb-14 flex flex-col gap-4 lg:mb-20">
            {label && <p data-reveal className="section-label">{label}</p>}
            <h2 data-reveal className="section-title">{title}</h2>
            {subtitle && <p data-reveal className="max-w-xl text-base leading-relaxed text-[#373737]">{subtitle}</p>}
        </div>
    );
}
