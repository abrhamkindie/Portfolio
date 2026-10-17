import AdminLayout from '@/Layouts/AdminLayout';
import DataTable from '@/Components/Admin/DataTable';
import DeleteButton from '@/Components/Admin/DeleteButton';
import FlashMessage from '@/Components/Admin/FlashMessage';
import PageHeader from '@/Components/Admin/PageHeader';
import StatusPill from '@/Components/Admin/StatusPill';
import { btnPrimary, iconBtn } from '@/Components/Admin/styles';
import { Head, Link } from '@inertiajs/react';
import { Pencil, Plus, Wrench } from 'lucide-react';

export default function SkillsIndex({ skills }) {
    const columns = [
        {
            key: 'name',
            label: 'Skill',
            render: (s) => (
                <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-border bg-white/[0.03] text-muted-foreground">
                        <Wrench className="h-4 w-4" />
                    </span>
                    <span className="font-medium text-foreground">{s.name}</span>
                </div>
            ),
        },
        {
            key: 'category',
            label: 'Category',
            render: (s) => <StatusPill>{s.category || 'General'}</StatusPill>,
        },
        {
            key: 'proficiency',
            label: 'Proficiency',
            render: (s) => (
                <div className="flex items-center gap-3">
                    <div className="h-1.5 w-28 overflow-hidden rounded-full bg-white/10">
                        <div className="h-full rounded-full bg-[#22c55e]" style={{ width: `${s.proficiency ?? 0}%` }} />
                    </div>
                    <span className="text-xs tabular-nums text-muted-foreground">{s.proficiency ?? 0}%</span>
                </div>
            ),
        },
        {
            key: 'years_of_experience',
            label: 'Years',
            align: 'right',
            render: (s) => s.years_of_experience ?? '—',
        },
        {
            key: 'actions',
            label: '',
            align: 'right',
            render: (s) => (
                <div className="flex items-center justify-end gap-2">
                    <Link href={route('admin.skills.edit', s.id)} className={iconBtn} aria-label="Edit">
                        <Pencil className="h-4 w-4" />
                    </Link>
                    <DeleteButton url={route('admin.skills.destroy', s.id)} label={`"${s.name}"`} />
                </div>
            ),
        },
    ];

    return (
        <AdminLayout title="Skills">
            <Head title="Admin · Skills" />

            <FlashMessage />

            <PageHeader
                title="Skills"
                description="Manage the skills listed in your portfolio."
                action={
                    <Link href={route('admin.skills.create')} className={btnPrimary}>
                        <Plus className="h-4 w-4" />
                        New skill
                    </Link>
                }
            />

            <DataTable columns={columns} rows={skills} empty="No skills yet." emptyIcon={Wrench} />
        </AdminLayout>
    );
}
