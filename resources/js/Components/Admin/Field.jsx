import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export default function Field({
    label,
    name,
    id,
    type = 'text',
    as = 'input',
    error,
    hint,
    className,
    children,
    ...props
}) {
    const inputId = id || name;

    let control;
    if (children !== undefined && children !== null) {
        control = children;
    } else if (as === 'textarea') {
        control = (
            <textarea
                id={inputId}
                name={name}
                className={cn('input h-auto min-h-[120px] resize-y py-2.5', className)}
                {...props}
            />
        );
    } else if (as === 'select') {
        control = (
            <div className="relative">
                <select id={inputId} name={name} className={cn('input appearance-none pr-9', className)} {...props} />
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
        );
    } else {
        control = (
            <input id={inputId} name={name} type={type} className={cn('input', className)} {...props} />
        );
    }

    return (
        <div className="flex flex-col gap-1.5">
            {label && (
                <label htmlFor={inputId} className="text-xs font-medium uppercase tracking-[0.04em] text-muted-foreground">
                    {label}
                </label>
            )}
            {control}
            {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
            {error && <p className="text-xs text-[#ef4444]">{error}</p>}
        </div>
    );
}
