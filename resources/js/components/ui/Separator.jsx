import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

const Separator = forwardRef(({ className, orientation = 'horizontal', decorative = true, ...props }, ref) => {
    return (
        <hr
            ref={ref}
            aria-orientation={orientation}
            aria-hidden={decorative}
            className={cn(
                'shrink-0 bg-border',
                orientation === 'horizontal' ? 'h-[1px] w-full' : 'w-[1px] h-full',
                className
            )}
            {...props}
        />
    );
});

Separator.displayName = 'Separator';

export { Separator };