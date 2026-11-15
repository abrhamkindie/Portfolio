import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function PageHeader({ title, description, action, backHref, backLabel = 'Back', className, eyebrow = 'Console' }) {
    return (
        <div className={cn('mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between', className)}>
            <div className="min-w-0">
                {backHref && (
                    <Link
                        href={backHref}
                        className="mb-3 inline-flex items-center gap-1.5 text-[12px] font-medium text-white/40 transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        {backLabel}
                    </Link>
                )}
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/35">{eyebrow}</p>
                <h1 className="mt-1.5 font-serif text-[2.15rem] font-normal leading-[1.05] tracking-[-0.01em] text-foreground sm:text-[2.65rem]">
                    {title}
                </h1>
                {description && (
                    <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-white/50">{description}</p>
                )}
            </div>
            {action && <div className="flex shrink-0 items-center gap-2">{action}</div>}
        </div>
    );
}
