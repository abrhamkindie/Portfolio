import { useReveal } from '@/lib/motion';
import { cn } from '@/lib/utils';

export function SectionHeader({ label, title, subtitle, dark = false }) {
    const ref = useReveal({ selector: '[data-reveal]', y: 30, stagger: 0.1 });

    return (
        <div ref={ref} className="mb-14 flex flex-col gap-4 lg:mb-20">
            {label && (
                <p
                    data-reveal
                    className={cn(
                        'section-label',
                        dark ? '!text-white/50' : 'text-muted-foreground'
                    )}
                >
                    {label}
                </p>
            )}
            <h2
                data-reveal
                className={cn(
                    'section-title',
                    dark ? 'text-white' : 'text-[#262626]'
                )}
            >
                {title}
            </h2>
            {subtitle && (
                <p
                    data-reveal
                    className={cn(
                        'max-w-xl text-base leading-relaxed',
                        dark ? 'text-white/70' : 'text-[#373737]'
                    )}
                >
                    {subtitle}
                </p>
            )}
        </div>
    );
}
