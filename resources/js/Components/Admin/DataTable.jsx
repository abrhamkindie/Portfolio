import { cn } from '@/lib/utils';
import { Inbox } from 'lucide-react';

/**
 * Reusable dark table shell.
 * columns: [{ key, label, align?, render?(row), className?, cellClassName? }]
 */
export default function DataTable({
    columns,
    rows = [],
    rowKey = (row) => row.id,
    empty = 'Nothing here yet.',
    emptyIcon: EmptyIcon = Inbox,
}) {
    return (
        <div className="panel overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead>
                        <tr className="border-b border-border bg-white/[0.02]">
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    className={cn(
                                        'px-5 py-3 text-[11px] font-medium uppercase tracking-[0.06em] text-muted-foreground',
                                        col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left',
                                        col.className,
                                    )}
                                >
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                        {rows.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} className="px-5 py-16">
                                    <div className="flex flex-col items-center justify-center text-center">
                                        <EmptyIcon className="h-6 w-6 text-muted-foreground/60" />
                                        <p className="mt-3 text-sm text-muted-foreground">{empty}</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            rows.map((row) => (
                                <tr key={rowKey(row)} className="transition-colors hover:bg-white/[0.025]">
                                    {columns.map((col) => (
                                        <td
                                            key={col.key}
                                            className={cn(
                                                'px-5 py-3.5 align-middle text-muted-foreground',
                                                col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left',
                                                col.cellClassName,
                                            )}
                                        >
                                            {col.render ? col.render(row) : row[col.key]}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
