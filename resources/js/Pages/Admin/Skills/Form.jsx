import AdminLayout from '@/Layouts/AdminLayout';
import Field from '@/Components/Admin/Field';
import FlashMessage from '@/Components/Admin/FlashMessage';
import FormSection from '@/Components/Admin/FormSection';
import PageHeader from '@/Components/Admin/PageHeader';
import { btn, btnPrimary } from '@/Components/Admin/styles';
import { Head, Link, useForm } from '@inertiajs/react';
import { SlidersHorizontal, Wrench } from 'lucide-react';

export default function SkillForm({ skill }) {
    const isEdit = !!skill;

    const form = useForm({
        name: skill?.name ?? '',
        category: skill?.category ?? 'General',
        icon: skill?.icon ?? '',
        proficiency: skill?.proficiency ?? 50,
        years_of_experience: skill?.years_of_experience ?? '',
        sort_order: skill?.sort_order ?? 0,
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            form.put(route('admin.skills.update', skill.id));
        } else {
            form.post(route('admin.skills.store'));
        }
    };

    return (
        <AdminLayout title={isEdit ? 'Edit skill' : 'New skill'}>
            <Head title={`Admin · ${isEdit ? 'Edit' : 'New'} skill`} />

            <FlashMessage />

            <PageHeader
                title={isEdit ? 'Edit skill' : 'New skill'}
                backHref={route('admin.skills.index')}
                backLabel="Back to skills"
            />

            <form onSubmit={submit} className="mx-auto max-w-2xl space-y-5 pb-6">
                <FormSection title="Details" description="What the skill is called and where it belongs." icon={Wrench}>
                    <div className="grid gap-5 sm:grid-cols-2">
                        <Field label="Name" name="name" value={form.data.name} error={form.errors.name} onChange={(e) => form.setData('name', e.target.value)} />
                        <Field label="Category" name="category" value={form.data.category} error={form.errors.category} onChange={(e) => form.setData('category', e.target.value)} />
                    </div>
                    <div className="mt-5">
                        <Field label="Icon (optional)" name="icon" value={form.data.icon} error={form.errors.icon} onChange={(e) => form.setData('icon', e.target.value)} placeholder="e.g. laravel, react" />
                    </div>
                </FormSection>

                <FormSection title="Proficiency" description="How advanced you are and for how long." icon={SlidersHorizontal}>
                    <div className="space-y-6">
                        <div>
                            <div className="mb-2 flex items-center justify-between">
                                <span className="text-xs font-medium uppercase tracking-[0.04em] text-muted-foreground">Level</span>
                                <span className="text-sm font-semibold tabular-nums text-[#22c55e]">{form.data.proficiency}%</span>
                            </div>
                            <input
                                id="proficiency"
                                type="range"
                                min="0"
                                max="100"
                                value={form.data.proficiency}
                                onChange={(e) => form.setData('proficiency', e.target.value)}
                                className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-[#22c55e]"
                            />
                            {form.errors.proficiency && <p className="mt-1.5 text-xs text-[#ef4444]">{form.errors.proficiency}</p>}
                        </div>
                        <div className="grid gap-5 sm:grid-cols-2">
                            <Field label="Years of experience" name="years_of_experience" type="number" value={form.data.years_of_experience} error={form.errors.years_of_experience} onChange={(e) => form.setData('years_of_experience', e.target.value)} />
                            <Field label="Sort order" name="sort_order" type="number" value={form.data.sort_order} error={form.errors.sort_order} onChange={(e) => form.setData('sort_order', e.target.value)} />
                        </div>
                    </div>
                </FormSection>

                <div className="flex items-center gap-3 pt-1">
                    <button type="submit" className={btnPrimary} disabled={form.processing}>
                        {isEdit ? 'Update skill' : 'Create skill'}
                    </button>
                    <Link href={route('admin.skills.index')} className={btn}>
                        Cancel
                    </Link>
                </div>
            </form>
        </AdminLayout>
    );
}
