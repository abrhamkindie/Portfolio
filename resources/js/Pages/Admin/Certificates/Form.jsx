import AdminLayout from '@/Layouts/AdminLayout';
import Field from '@/Components/Admin/Field';
import FlashMessage from '@/Components/Admin/FlashMessage';
import FormSection from '@/Components/Admin/FormSection';
import PageHeader from '@/Components/Admin/PageHeader';
import { btn, btnPrimary } from '@/Components/Admin/styles';
import { Head, Link, useForm } from '@inertiajs/react';
import { Award, CalendarRange } from 'lucide-react';

export default function CertificateForm({ certificate }) {
    const isEdit = !!certificate;

    const form = useForm({
        title: certificate?.title ?? '',
        issuer: certificate?.issuer ?? '',
        credential_id: certificate?.credential_id ?? '',
        credential_url: certificate?.credential_url ?? '',
        image: certificate?.image ?? '',
        description: certificate?.description ?? '',
        issued_at: certificate?.issued_at ? certificate.issued_at.substring(0, 10) : '',
        expires_at: certificate?.expires_at ? certificate.expires_at.substring(0, 10) : '',
        sort_order: certificate?.sort_order ?? 0,
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            form.put(route('admin.certificates.update', certificate.id));
        } else {
            form.post(route('admin.certificates.store'));
        }
    };

    return (
        <AdminLayout title={isEdit ? 'Edit certificate' : 'New certificate'}>
            <Head title={`Admin · ${isEdit ? 'Edit' : 'New'} certificate`} />

            <FlashMessage />

            <PageHeader
                title={isEdit ? 'Edit certificate' : 'New certificate'}
                backHref={route('admin.certificates.index')}
                backLabel="Back to certificates"
            />

            <form onSubmit={submit} className="mx-auto max-w-2xl space-y-5 pb-6">
                <FormSection title="Certificate" description="The award and where to verify it." icon={Award}>
                    <div className="grid gap-5 sm:grid-cols-2">
                        <Field label="Title" name="title" value={form.data.title} error={form.errors.title} onChange={(e) => form.setData('title', e.target.value)} />
                        <Field label="Issuer" name="issuer" value={form.data.issuer} error={form.errors.issuer} onChange={(e) => form.setData('issuer', e.target.value)} />
                        <Field label="Credential ID" name="credential_id" value={form.data.credential_id} error={form.errors.credential_id} onChange={(e) => form.setData('credential_id', e.target.value)} />
                        <Field label="Credential URL" name="credential_url" value={form.data.credential_url} error={form.errors.credential_url} onChange={(e) => form.setData('credential_url', e.target.value)} placeholder="https://..." />
                    </div>
                    <div className="mt-5 space-y-5">
                        <Field label="Image URL" name="image" value={form.data.image} error={form.errors.image} onChange={(e) => form.setData('image', e.target.value)} placeholder="https://..." />
                        <Field label="Description" name="description" as="textarea" value={form.data.description} error={form.errors.description} onChange={(e) => form.setData('description', e.target.value)} />
                    </div>
                </FormSection>

                <FormSection title="Validity" description="Issue and expiry dates." icon={CalendarRange}>
                    <div className="grid gap-5 sm:grid-cols-3">
                        <Field label="Issued at" name="issued_at" type="date" value={form.data.issued_at} error={form.errors.issued_at} onChange={(e) => form.setData('issued_at', e.target.value)} />
                        <Field label="Expires at" name="expires_at" type="date" value={form.data.expires_at} error={form.errors.expires_at} onChange={(e) => form.setData('expires_at', e.target.value)} />
                        <Field label="Sort order" name="sort_order" type="number" value={form.data.sort_order} error={form.errors.sort_order} onChange={(e) => form.setData('sort_order', e.target.value)} />
                    </div>
                </FormSection>

                <div className="flex items-center gap-3 pt-1">
                    <button type="submit" className={btnPrimary} disabled={form.processing}>
                        {isEdit ? 'Update certificate' : 'Create certificate'}
                    </button>
                    <Link href={route('admin.certificates.index')} className={btn}>
                        Cancel
                    </Link>
                </div>
            </form>
        </AdminLayout>
    );
}
