import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

const Badge = forwardRef(({ className, variant = 'default', ...props }, ref) => {
    const variants = {
        default: 'badge-primary',
        secondary: 'badge-secondary',
        outline: 'badge-outline',
        destructive: 'badge bg-destructive/10 text-destructive border-destructive/20',
        success: 'badge bg-green-500/10 text-green-500 border-green-500/20',
        warning: 'badge bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    };

    return (
        <span ref={ref} className={cn(variants[variant], className)} {...props} />
    );
});

Badge.displayName = 'Badge';

export { Badge };