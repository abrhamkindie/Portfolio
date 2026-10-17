import { Link } from '@inertiajs/react';

export default function Pagination({ paginator }) {
    if (!paginator || !paginator.links || paginator.links.length <= 3) {
        return null;
    }

    const label = (raw) => {
        if (raw.includes('Previous')) return '‹';
        if (raw.includes('Next')) return '›';
        return raw;
    };

    return (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="section-label">
                Showing {paginator.from}–{paginator.to} of {paginator.total}
            </p>
            <div className="flex flex-wrap items-center gap-1.5">
                {paginator.links.map((link, index) =>
                    link.url ? (
                        <Link
                            key={index}
                            href={link.url}
                            preserveScroll
                            className={`inline-flex h-9 min-w-9 items-center justify-center rounded-full px-3 text-sm font-medium transition ${link.active
                                ? 'bg-foreground text-background'
                                : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                                }`}
                            dangerouslySetInnerHTML={{ __html: label(link.label) }}
                        />
                    ) : (
                        <span
                            key={index}
                            className="inline-flex h-9 min-w-9 items-center justify-center rounded-full px-3 text-sm text-muted-foreground/40"
                            dangerouslySetInnerHTML={{ __html: label(link.label) }}
                        />
                    ),
                )}
            </div>
        </div>
    );
}