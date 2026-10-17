import { cn } from '@/lib/utils';

const tones = {
    green: 'border-[#22c55e]/30 bg-[#22c55e]/10 text-[#22c55e]',
    red: 'border-[#ef4444]/30 bg-[#ef4444]/10 text-[#ef4444]',
    amber: 'border-[#f59e0b]/30 bg-[#f59e0b]/10 text-[#f59e0b]',
    neutral: 'border-border bg-white/[0.04] text-muted-foreground',
    brand: 'border-white/20 bg-white/[0.10] text-foreground',
};

export default function StatusPill({ tone = 'neutral', dot = false, className, children }) {
    return (
        <span
            className={cn(
                'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-medium',
                tones[tone] ?? tones.neutral,
                className,
            )}
        >
            {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
            {children}
        </span>
    );
}
