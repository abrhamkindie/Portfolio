import AdminLayout from '@/Layouts/AdminLayout';
import DataTable from '@/Components/Admin/DataTable';
import DeleteButton from '@/Components/Admin/DeleteButton';
import FlashMessage from '@/Components/Admin/FlashMessage';
import PageHeader from '@/Components/Admin/PageHeader';
import Pagination from '@/Components/Admin/Pagination';
import StatusPill from '@/Components/Admin/StatusPill';
import { iconBtn } from '@/Components/Admin/styles';
import { formatRelativeTime, getInitials } from '@/lib/utils';
import { Head, Link, router } from '@inertiajs/react';
import { Eye, Inbox, MailOpen } from 'lucide-react';

const tabs = [
    { label: 'All', value: undefined },
    { label: 'Unread', value: '0' },
    { label: 'Read', value: '1' },
];

export default function MessagesIndex({ messages, unreadCount, filters }) {
    const current = filters.is_read;

    const applyFilter = (value) => {
        router.get(
            route('admin.messages.index'),
            value === undefined ? {} : { is_read: value },
            { preserveState: true, replace: true },
        );
    };

    const columns = [
        {
            key: 'name',
            label: 'From',
            render: (m) => (
                <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-white/[0.03] text-[11px] font-semibold text-foreground">
                        {getInitials(m.name || '?')}
                    </span>
                    <div className="min-w-0">
                        <div className="truncate font-medium text-foreground">{m.name}</div>
                        <div className="truncate text-xs text-muted-foreground">{m.email}</div>
                    </div>
                </div>
            ),
        },
        {
            key: 'subject',
            label: 'Subject',
            render: (m) => (
                <Link
                    href={route('admin.messages.show', m.id)}
                    className={`inline-flex items-center gap-2 transition-opacity hover:opacity-70 ${m.is_read ? 'text-muted-foreground' : 'font-medium text-foreground'
                        }`}
                >
                    {!m.is_read && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#22c55e]" />}
                    <span className="truncate">{m.subject || '(No subject)'}</span>
                </Link>
            ),
        },
        {
            key: 'status',
            label: 'Status',
            render: (m) => (
                <StatusPill tone={m.is_read ? 'neutral' : 'green'} dot={!m.is_read}>
                    {m.is_read ? 'Read' : 'New'}
                </StatusPill>
            ),
        },
        {
            key: 'created_at',
            label: 'Received',
            render: (m) => formatRelativeTime(m.created_at),
        },
        {
            key: 'actions',
            label: '',
            align: 'right',
            render: (m) => (
                <div className="flex items-center justify-end gap-2">
                    <Link href={route('admin.messages.show', m.id)} className={iconBtn} aria-label="View">
                        <Eye className="h-4 w-4" />
                    </Link>
                    {m.is_read ? (
                        <button
                            type="button"
                            onClick={() => router.patch(route('admin.messages.unread', m.id), {}, { preserveScroll: true })}
                            className={iconBtn}
                            aria-label="Mark unread"
                            title="Mark unread"
                        >
                            <Inbox className="h-4 w-4" />
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={() => router.patch(route('admin.messages.read', m.id), {}, { preserveScroll: true })}
                            className={iconBtn}
                            aria-label="Mark read"
                            title="Mark read"
                        >
                            <MailOpen className="h-4 w-4" />
                        </button>
                    )}
                    <DeleteButton url={route('admin.messages.destroy', m.id)} label={`the message from ${m.name}`} />
                </div>
            ),
        },
    ];

    return (
        <AdminLayout title="Messages">
            <Head title="Admin · Messages" />

            <FlashMessage />

            <PageHeader
                title="Messages"
                description={
                    unreadCount > 0 ? (
                        <span className="inline-flex items-center gap-2">
                            <StatusPill tone="green" dot>
                                {unreadCount} unread
                            </StatusPill>
                        </span>
                    ) : (
                        'You are all caught up.'
                    )
                }
            />

            <div className="mb-4 inline-flex items-center gap-1 rounded-[10px] border border-border bg-white/[0.03] p-1 text-sm">
                {tabs.map((tab) => {
                    const isActive =
                        current === tab.value ||
                        (tab.value === undefined && (current === null || current === undefined));
                    return (
                        <button
                            key={tab.label}
                            type="button"
                            onClick={() => applyFilter(tab.value)}
                            className={`inline-flex items-center gap-1.5 rounded-[7px] px-3 py-1.5 font-medium transition-colors ${isActive ? 'bg-white/10 text-foreground' : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            {tab.label}
                            {tab.value === '0' && unreadCount > 0 && (
                                <span className="rounded-full bg-[#22c55e]/15 px-1.5 text-[10px] font-semibold text-[#22c55e]">
                                    {unreadCount}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>

            <DataTable columns={columns} rows={messages.data} empty="No messages found." emptyIcon={Inbox} />

            <Pagination paginator={messages} />
        </AdminLayout>
    );
}
