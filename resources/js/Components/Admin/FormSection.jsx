import { cn } from '@/lib/utils';
import IconTile from './IconTile';

/**
 * A titled panel that groups related form fields.
 */
export default function FormSection({ title, description, icon: Icon, className, children }) {
    return (
        <section className={cn('panel p-5 sm:p-6', className)}>
            {(title || description) && (
                <div className="mb-5 flex items-start gap-3 border-b border-border/60 pb-4">
                    {Icon && <IconTile icon={Icon} />}
                    <div>
                        {title && <h2 className="text-sm font-semibold text-foreground">{title}</h2>}
                        {description && <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>}
                    </div>
                </div>
            )}
            {children}
        </section>
    );
}
