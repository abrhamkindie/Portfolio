import AdminLayout from '@/Layouts/AdminLayout';
import DataTable from '@/Components/Admin/DataTable';
import DeleteButton from '@/Components/Admin/DeleteButton';
import FlashMessage from '@/Components/Admin/FlashMessage';
import PageHeader from '@/Components/Admin/PageHeader';
import StatusPill from '@/Components/Admin/StatusPill';
import { btnPrimary, iconBtn } from '@/Components/Admin/styles';
import { formatDate } from '@/lib/utils';
import { Head, Link } from '@inertiajs/react';
import { Award, Pencil, Plus } from 'lucide-react';

const shortDate = (value) => (value ? formatDate(value, { month: 'short' }) : '—');

export default function CertificatesIndex({ certificates }) {
    const columns = [
        {
            key: 'title',
            label: 'Certificate',
            render: (c) => (
                <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-border bg-white/[0.03] text-muted-foreground">
                        <Award className="h-4 w-4" />
                    </span>
                    <span className="font-medium text-foreground">{c.title}</span>
                </div>
            ),
        },
        { key: 'issuer', label: 'Issuer', render: (c) => c.issuer || '—' },
        { key: 'issued_at', label: 'Issued', render: (c) => shortDate(c.issued_at) },
        { key: 'expires_at', label: 'Expires', render: (c) => shortDate(c.expires_at) },
        {
            key: 'status',
            label: 'Status',
            render: (c) => {
                const expired = c.expires_at && new Date(c.expires_at) < new Date();
                return (
                    <StatusPill tone={expired ? 'red' : 'green'} dot>
                        {expired ? 'Expired' : 'Active'}
                    </StatusPill>
                );
            },
        },
        {
            key: 'actions',
            label: '',
            align: 'right',
            render: (c) => (
                <div className="flex items-center justify-end gap-2">
                    <Link href={route('admin.certificates.edit', c.id)} className={iconBtn} aria-label="Edit">
                        <Pencil className="h-4 w-4" />
                    </Link>
                    <DeleteButton url={route('admin.certificates.destroy', c.id)} label={`"${c.title}"`} />
                </div>
            ),
        },
    ];

    return (
        <AdminLayout title="Certificates">
            <Head title="Admin · Certificates" />

            <FlashMessage />

            <PageHeader
                title="Certificates"
                description="Manage your professional certifications."
                action={
                    <Link href={route('admin.certificates.create')} className={btnPrimary}>
                        <Plus className="h-4 w-4" />
                        New certificate
                    </Link>
                }
            />

            <DataTable columns={columns} rows={certificates} empty="No certificates yet." emptyIcon={Award} />
        </AdminLayout>
    );
}
