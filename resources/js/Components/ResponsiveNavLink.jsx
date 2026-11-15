import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${
                active
                    ? 'border-primary bg-white/[0.05] text-foreground'
                    : 'border-transparent text-muted-foreground hover:border-white/20 hover:bg-white/[0.03] hover:text-foreground'
            } text-base font-medium transition-colors focus:outline-none ${className}`}
        >
            {children}
        </Link>
    );
}
