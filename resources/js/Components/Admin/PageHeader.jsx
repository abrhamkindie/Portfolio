import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function PageHeader({ title, description, action, backHref, backLabel = 'Back', className }) {
    return (
        <div
            className={cn(
                'mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between',
                className,
            )}
        >
            <div className="min-w-0">
                {backHref && (
                    <Link
                        href={backHref}
                        className="mb-2 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        {backLabel}
                    </Link>
                )}
                <h1 className="font-serif text-[2rem] font-normal leading-[1.1] tracking-[-0.01em] text-foreground sm:text-[2.35rem]">{title}</h1>
                {description && <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>}
            </div>
            {action && <div className="flex shrink-0 items-center gap-2">{action}</div>}
        </div>
    );
}
