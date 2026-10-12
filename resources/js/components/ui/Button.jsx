import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

const Button = forwardRef(({ className, variant = 'primary', size = 'default', asChild = false, ...props }, ref) => {
    const variants = {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        outline: 'btn-outline',
        ghost: 'btn-ghost',
        glass: 'btn-glass',
        destructive: 'btn bg-destructive text-destructive-foreground hover:bg-destructive/90',
        link: 'btn underline-offset-4 hover:underline bg-transparent',
    };

    const sizes = {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3 text-xs',
        lg: 'h-11 rounded-lg px-8 text-base',
        xl: 'h-12 rounded-lg px-10 text-lg',
        icon: 'h-10 w-10',
    };

    const Comp = asChild ? 'span' : 'button';

    return (
        <Comp
            className={cn(variants[variant], sizes[size], className)}
            ref={ref}
            {...props}
        />
    );
});

Button.displayName = 'Button';

export { Button };