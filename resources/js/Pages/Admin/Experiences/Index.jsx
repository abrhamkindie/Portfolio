import AdminLayout from '@/Layouts/AdminLayout';
import DataTable from '@/Components/Admin/DataTable';
import DeleteButton from '@/Components/Admin/DeleteButton';
import FlashMessage from '@/Components/Admin/FlashMessage';
import PageHeader from '@/Components/Admin/PageHeader';
import StatusPill from '@/Components/Admin/StatusPill';
import { btnPrimary, iconBtn } from '@/Components/Admin/styles';
import { formatDate } from '@/lib/utils';
import { Head, Link } from '@inertiajs/react';
import { Briefcase, Pencil, Plus } from 'lucide-react';

const shortDate = (value) => (value ? formatDate(value, { month: 'short' }) : '');

export default function ExperiencesIndex({ experiences }) {
    const columns = [
        {
            key: 'position',
            label: 'Position',
            render: (x) => (
                <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-border bg-white/[0.03] text-muted-foreground">
                        <Briefcase className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                        <div className="truncate font-medium text-foreground">{x.position}</div>
                        {x.location && <div className="truncate text-xs text-muted-foreground">{x.location}</div>}
                    </div>
                </div>
            ),
        },
        { key: 'company', label: 'Company', render: (x) => x.company || '—' },
        {
            key: 'period',
            label: 'Period',
            render: (x) => `${shortDate(x.start_date)} — ${x.is_current ? 'Present' : shortDate(x.end_date) || '—'}`,
        },
        {
            key: 'status',
            label: 'Status',
            render: (x) => (
                <StatusPill tone={x.is_current ? 'green' : 'neutral'} dot={x.is_current}>
                    {x.is_current ? 'Current' : 'Past'}
                </StatusPill>
            ),
        },
        {
            key: 'actions',
            label: '',
            align: 'right',
            render: (x) => (
                <div className="flex items-center justify-end gap-2">
                    <Link href={route('admin.experiences.edit', x.id)} className={iconBtn} aria-label="Edit">
                        <Pencil className="h-4 w-4" />
                    </Link>
                    <DeleteButton
                        url={route('admin.experiences.destroy', x.id)}
                        label={`"${x.position}" at ${x.company}`}
                    />
                </div>
            ),
        },
    ];

    return (
        <AdminLayout title="Experience">
            <Head title="Admin · Experience" />

            <FlashMessage />

            <PageHeader
                title="Work experience"
                description="Manage the roles shown in your experience timeline."
                action={
                    <Link href={route('admin.experiences.create')} className={btnPrimary}>
                        <Plus className="h-4 w-4" />
                        New experience
                    </Link>
                }
            />

            <DataTable columns={columns} rows={experiences} empty="No experience yet." emptyIcon={Briefcase} />
        </AdminLayout>
    );
}
