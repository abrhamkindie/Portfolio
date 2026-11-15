import { cn } from '@/lib/utils';
import { Inbox } from 'lucide-react';

export default function EmptyState({ icon: Icon = Inbox, title, description, className }) {
    return (
        <div className={cn('flex flex-col items-center justify-center px-6 py-16 text-center', className)}>
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white/[0.03] text-muted-foreground">
                <Icon className="h-5 w-5" />
            </span>
            {title && <p className="mt-4 text-sm font-medium text-foreground">{title}</p>}
            {description && (
                <p className="mt-1 max-w-xs text-xs leading-relaxed text-muted-foreground">{description}</p>
            )}
        </div>
    );
}
