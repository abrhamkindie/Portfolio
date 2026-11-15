import { Link } from '@inertiajs/react';
import { btn, btnPrimary } from './styles';

export default function FormActions({ submitLabel, cancelHref, processing = false, hint }) {
    return (
        <div className="flex flex-wrap items-center gap-3 pt-1">
            <button type="submit" className={btnPrimary} disabled={processing}>
                {submitLabel}
            </button>
            <Link href={cancelHref} className={btn}>
                Cancel
            </Link>
            {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
        </div>
    );
}
