import { cn } from '@/lib/utils';
import { Inbox } from 'lucide-react';
import EmptyState from './EmptyState';
import { meta } from './styles';

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
                <table className="admin-table min-w-full text-[13px]">
                    <thead>
                        <tr className="border-b border-border/70">
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    scope="col"
                                    className={cn(
                                        'px-5 py-3',
                                        meta,
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
                                <td colSpan={columns.length}>
                                    <EmptyState icon={EmptyIcon} title={empty} />
                                </td>
                            </tr>
                        ) : (
                            rows.map((row) => (
                                <tr key={rowKey(row)} className="transition-colors">
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
