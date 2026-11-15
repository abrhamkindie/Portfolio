import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition-colors focus:outline-none ' +
                (active
                    ? 'border-primary text-foreground'
                    : 'border-transparent text-muted-foreground hover:border-white/20 hover:text-foreground') +
                className
            }
        >
            {children}
        </Link>
    );
}
