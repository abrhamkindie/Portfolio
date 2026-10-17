import { cn } from '@/lib/utils';

export default function Checkbox({ label, className, ...props }) {
    return (
        <label
            className={cn(
                'inline-flex cursor-pointer select-none items-center gap-2.5 text-sm text-foreground',
                className,
            )}
        >
            <input
                type="checkbox"
                className="h-4 w-4 shrink-0 cursor-pointer rounded-[5px] border border-border bg-white/[0.04] accent-[#e5e5e5] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                {...props}
            />
            {label}
        </label>
    );
}
