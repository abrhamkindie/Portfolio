import AdminLayout from '@/Layouts/AdminLayout';
import Checkbox from '@/Components/Admin/Checkbox';
import Field from '@/Components/Admin/Field';
import FlashMessage from '@/Components/Admin/FlashMessage';
import FormSection from '@/Components/Admin/FormSection';
import PageHeader from '@/Components/Admin/PageHeader';
import { btn, btnPrimary } from '@/Components/Admin/styles';
import { Head, Link, useForm } from '@inertiajs/react';
import { Briefcase, CalendarRange } from 'lucide-react';

export default function ExperienceForm({ experience }) {
    const isEdit = !!experience;

    const form = useForm({
        company: experience?.company ?? '',
        position: experience?.position ?? '',
        location: experience?.location ?? '',
        description: experience?.description ?? '',
        start_date: experience?.start_date ? experience.start_date.substring(0, 10) : '',
        end_date: experience?.end_date ? experience.end_date.substring(0, 10) : '',
        is_current: experience?.is_current ?? false,
        sort_order: experience?.sort_order ?? 0,
    });

    const submit = (e) => {
        e.preventDefault();
        form.transform((data) => ({
            ...data,
            end_date: data.is_current ? null : data.end_date,
        }));

        if (isEdit) {
            form.put(route('admin.experiences.update', experience.id));
        } else {
            form.post(route('admin.experiences.store'));
        }
    };

    return (
        <AdminLayout title={isEdit ? 'Edit experience' : 'New experience'}>
            <Head title={`Admin · ${isEdit ? 'Edit' : 'New'} experience`} />

            <FlashMessage />

            <PageHeader
                title={isEdit ? 'Edit experience' : 'New experience'}
                backHref={route('admin.experiences.index')}
                backLabel="Back to experience"
            />

            <form onSubmit={submit} className="mx-auto max-w-2xl space-y-5 pb-6">
                <FormSection title="Role" description="The position and where you held it." icon={Briefcase}>
                    <div className="grid gap-5 sm:grid-cols-2">
                        <Field label="Position" name="position" value={form.data.position} error={form.errors.position} onChange={(e) => form.setData('position', e.target.value)} />
                        <Field label="Company" name="company" value={form.data.company} error={form.errors.company} onChange={(e) => form.setData('company', e.target.value)} />
                        <Field label="Location" name="location" value={form.data.location} error={form.errors.location} onChange={(e) => form.setData('location', e.target.value)} />
                    </div>
                    <div className="mt-5">
                        <Field label="Description" name="description" as="textarea" value={form.data.description} error={form.errors.description} onChange={(e) => form.setData('description', e.target.value)} />
                    </div>
                </FormSection>

                <FormSection title="Timeline" description="When it started and whether it is ongoing." icon={CalendarRange}>
                    <div className="grid gap-5 sm:grid-cols-2">
                        <Field label="Start date" name="start_date" type="date" value={form.data.start_date} error={form.errors.start_date} onChange={(e) => form.setData('start_date', e.target.value)} />
                        <Field label="End date" name="end_date" type="date" disabled={form.data.is_current} value={form.data.end_date} error={form.errors.end_date} onChange={(e) => form.setData('end_date', e.target.value)} />
                    </div>
                    <div className="mt-5 flex flex-wrap items-center gap-6">
                        <Checkbox label="I currently work here" checked={form.data.is_current} onChange={(e) => form.setData('is_current', e.target.checked)} />
                        <div className="w-full sm:w-40">
                            <Field label="Sort order" name="sort_order" type="number" value={form.data.sort_order} error={form.errors.sort_order} onChange={(e) => form.setData('sort_order', e.target.value)} />
                        </div>
                    </div>
                </FormSection>

                <div className="flex items-center gap-3 pt-1">
                    <button type="submit" className={btnPrimary} disabled={form.processing}>
                        {isEdit ? 'Update experience' : 'Create experience'}
                    </button>
                    <Link href={route('admin.experiences.index')} className={btn}>
                        Cancel
                    </Link>
                </div>
            </form>
        </AdminLayout>
    );
}
