import AdminLayout from '@/Layouts/AdminLayout';
import Checkbox from '@/Components/Admin/Checkbox';
import Field from '@/Components/Admin/Field';
import FlashMessage from '@/Components/Admin/FlashMessage';
import FormSection from '@/Components/Admin/FormSection';
import PageHeader from '@/Components/Admin/PageHeader';
import { btn, btnPrimary } from '@/Components/Admin/styles';
import { Head, Link, useForm } from '@inertiajs/react';
import { CalendarRange, GraduationCap } from 'lucide-react';

export default function EducationForm({ education }) {
    const isEdit = !!education;

    const form = useForm({
        institution: education?.institution ?? '',
        degree: education?.degree ?? '',
        field_of_study: education?.field_of_study ?? '',
        location: education?.location ?? '',
        description: education?.description ?? '',
        start_date: education?.start_date ? education.start_date.substring(0, 10) : '',
        end_date: education?.end_date ? education.end_date.substring(0, 10) : '',
        is_current: education?.is_current ?? false,
        sort_order: education?.sort_order ?? 0,
    });

    const submit = (e) => {
        e.preventDefault();
        form.transform((data) => ({
            ...data,
            end_date: data.is_current ? null : data.end_date,
        }));

        if (isEdit) {
            form.put(route('admin.educations.update', education.id));
        } else {
            form.post(route('admin.educations.store'));
        }
    };

    return (
        <AdminLayout title={isEdit ? 'Edit education' : 'New education'}>
            <Head title={`Admin · ${isEdit ? 'Edit' : 'New'} education`} />

            <FlashMessage />

            <PageHeader
                title={isEdit ? 'Edit education' : 'New education'}
                backHref={route('admin.educations.index')}
                backLabel="Back to education"
            />

            <form onSubmit={submit} className="mx-auto max-w-2xl space-y-5 pb-6">
                <FormSection title="Education" description="The qualification and where you earned it." icon={GraduationCap}>
                    <div className="grid gap-5 sm:grid-cols-2">
                        <Field label="Degree" name="degree" value={form.data.degree} error={form.errors.degree} onChange={(e) => form.setData('degree', e.target.value)} />
                        <Field label="Field of study" name="field_of_study" value={form.data.field_of_study} error={form.errors.field_of_study} onChange={(e) => form.setData('field_of_study', e.target.value)} />
                        <Field label="Institution" name="institution" value={form.data.institution} error={form.errors.institution} onChange={(e) => form.setData('institution', e.target.value)} />
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
                        <Checkbox label="I currently study here" checked={form.data.is_current} onChange={(e) => form.setData('is_current', e.target.checked)} />
                        <div className="w-full sm:w-40">
                            <Field label="Sort order" name="sort_order" type="number" value={form.data.sort_order} error={form.errors.sort_order} onChange={(e) => form.setData('sort_order', e.target.value)} />
                        </div>
                    </div>
                </FormSection>

                <div className="flex items-center gap-3 pt-1">
                    <button type="submit" className={btnPrimary} disabled={form.processing}>
                        {isEdit ? 'Update education' : 'Create education'}
                    </button>
                    <Link href={route('admin.educations.index')} className={btn}>
                        Cancel
                    </Link>
                </div>
            </form>
        </AdminLayout>
    );
}
