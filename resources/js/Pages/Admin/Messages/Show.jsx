import AdminLayout from '@/Layouts/AdminLayout';
import DeleteButton from '@/Components/Admin/DeleteButton';
import FlashMessage from '@/Components/Admin/FlashMessage';
import PageHeader from '@/Components/Admin/PageHeader';
import StatusPill from '@/Components/Admin/StatusPill';
import { btnPrimary, iconBtn } from '@/Components/Admin/styles';
import { formatDate, getInitials } from '@/lib/utils';
import { Head, router } from '@inertiajs/react';
import { Inbox, MailOpen, Reply } from 'lucide-react';

export default function MessageShow({ message }) {
    return (
        <AdminLayout title="Message">
            <Head title="Admin · Message" />

            <FlashMessage />

            <PageHeader
                title={message.subject || '(No subject)'}
                backHref={route('admin.messages.index')}
                backLabel="Back to messages"
                action={
                    <div className="flex items-center gap-2">
                        <a
                            href={`mailto:${message.email}?subject=${encodeURIComponent('Re: ' + (message.subject || ''))}`}
                            className={btnPrimary}
                        >
                            <Reply className="h-4 w-4" />
                            Reply
                        </a>
                        {message.is_read ? (
                            <button
                                type="button"
                                onClick={() => router.patch(route('admin.messages.unread', message.id))}
                                className={iconBtn}
                                title="Mark unread"
                                aria-label="Mark unread"
                            >
                                <Inbox className="h-4 w-4" />
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={() => router.patch(route('admin.messages.read', message.id))}
                                className={iconBtn}
                                title="Mark read"
                                aria-label="Mark read"
                            >
                                <MailOpen className="h-4 w-4" />
                            </button>
                        )}
                        <DeleteButton
                            url={route('admin.messages.destroy', message.id)}
                            label={`the message from ${message.name}`}
                        />
                    </div>
                }
            />

            <div className="mx-auto max-w-3xl space-y-5">
                <div className="panel flex flex-wrap items-center justify-between gap-4 p-5">
                    <div className="flex items-center gap-3">
                        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-white/[0.03] text-sm font-semibold text-foreground">
                            {getInitials(message.name || '?')}
                        </span>
                        <div className="min-w-0">
                            <div className="truncate font-medium text-foreground">{message.name}</div>
                            <div className="truncate text-xs text-muted-foreground">{message.email}</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <StatusPill tone={message.is_read ? 'neutral' : 'green'} dot={!message.is_read}>
                            {message.is_read ? 'Read' : 'New'}
                        </StatusPill>
                        <span className="text-xs text-muted-foreground">
                            {formatDate(message.created_at, { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>
                </div>

                <div className="panel p-6">
                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">{message.message}</p>
                </div>
            </div>
        </AdminLayout>
    );
}
