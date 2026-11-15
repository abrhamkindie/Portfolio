import { useReveal } from '@/lib/motion';
import { cn } from '@/lib/utils';

/**
 * Shared section heading: a small numbered eyebrow, a display title and an
 * optional deck. Keeping it in one place is what gives the page its rhythm.
 */
export function SectionHeader({ label, title, subtitle, index, className }) {
    const ref = useReveal({ selector: '[data-reveal]', y: 30, stagger: 0.1 });

    return (
        <div ref={ref} className={cn('mb-16 flex flex-col gap-6 lg:mb-24', className)}>
            {label && (
                <div data-reveal className="section-label">
                    {index && <span className="mr-2 opacity-40">{index} — </span>}
                    {label}
                </div>
            )}
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <h2 data-reveal className="section-title max-w-4xl text-gradient">
                    {title}
                </h2>
                {subtitle && (
                    <p
                        data-reveal
                        className="max-w-md text-lg font-medium leading-relaxed text-white/50 lg:pb-2 lg:text-right"
                    >
                        {subtitle}
                    </p>
                )}
            </div>
        </div>
    );
}
