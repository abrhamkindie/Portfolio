import AdminLayout from '@/Layouts/AdminLayout';
import DataTable from '@/Components/Admin/DataTable';
import DeleteButton from '@/Components/Admin/DeleteButton';
import FlashMessage from '@/Components/Admin/FlashMessage';
import PageHeader from '@/Components/Admin/PageHeader';
import StatusPill from '@/Components/Admin/StatusPill';
import { btnPrimary, iconBtn } from '@/Components/Admin/styles';
import { formatDate } from '@/lib/utils';
import { Head, Link } from '@inertiajs/react';
import { GraduationCap, Pencil, Plus } from 'lucide-react';

const shortDate = (value) => (value ? formatDate(value, { month: 'short' }) : '');

export default function EducationsIndex({ educations }) {
    const columns = [
        {
            key: 'degree',
            label: 'Degree',
            render: (e) => (
                <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-border bg-white/[0.03] text-muted-foreground">
                        <GraduationCap className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                        <div className="truncate font-medium text-foreground">{e.degree}</div>
                        {e.field_of_study && <div className="truncate text-xs text-muted-foreground">{e.field_of_study}</div>}
                    </div>
                </div>
            ),
        },
        { key: 'institution', label: 'Institution', render: (e) => e.institution || '—' },
        {
            key: 'period',
            label: 'Period',
            render: (e) => `${shortDate(e.start_date)} — ${e.is_current ? 'Present' : shortDate(e.end_date) || '—'}`,
        },
        {
            key: 'status',
            label: 'Status',
            render: (e) => (
                <StatusPill tone={e.is_current ? 'green' : 'neutral'} dot={e.is_current}>
                    {e.is_current ? 'Ongoing' : 'Completed'}
                </StatusPill>
            ),
        },
        {
            key: 'actions',
            label: '',
            align: 'right',
            render: (e) => (
                <div className="flex items-center justify-end gap-2">
                    <Link href={route('admin.educations.edit', e.id)} className={iconBtn} aria-label="Edit">
                        <Pencil className="h-4 w-4" />
                    </Link>
                    <DeleteButton url={route('admin.educations.destroy', e.id)} label={`"${e.degree}"`} />
                </div>
            ),
        },
    ];

    return (
        <AdminLayout title="Education">
            <Head title="Admin · Education" />

            <FlashMessage />

            <PageHeader
                title="Education"
                description="Manage the education entries shown on your portfolio."
                action={
                    <Link href={route('admin.educations.create')} className={btnPrimary}>
                        <Plus className="h-4 w-4" />
                        New education
                    </Link>
                }
            />

            <DataTable columns={columns} rows={educations} empty="No education entries yet." emptyIcon={GraduationCap} />
        </AdminLayout>
    );
}
