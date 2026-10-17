import AdminLayout from '@/Layouts/AdminLayout';
import Field from '@/Components/Admin/Field';
import FlashMessage from '@/Components/Admin/FlashMessage';
import FormSection from '@/Components/Admin/FormSection';
import PageHeader from '@/Components/Admin/PageHeader';
import { btn, btnPrimary } from '@/Components/Admin/styles';
import { Head, useForm } from '@inertiajs/react';
import { Camera, Link2, UserRound } from 'lucide-react';
import { useRef } from 'react';

export default function Profile({ profile }) {
    const avatarInput = useRef(null);

    const form = useForm({
        full_name: profile.full_name ?? '',
        title: profile.title ?? '',
        bio: profile.bio ?? '',
        email: profile.email ?? '',
        phone: profile.phone ?? '',
        location: profile.location ?? '',
        resume: profile.resume ?? '',
        github: profile.github ?? '',
        linkedin: profile.linkedin ?? '',
        twitter: profile.twitter ?? '',
        website: profile.website ?? '',
    });

    const avatarForm = useForm({ avatar: null });

    const submit = (e) => {
        e.preventDefault();
        form.put(route('admin.profile.update'), { preserveScroll: true });
    };

    const submitAvatar = (e) => {
        e.preventDefault();
        avatarForm.post(route('admin.profile.avatar'), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                avatarForm.reset();
                if (avatarInput.current) avatarInput.current.value = '';
            },
        });
    };

    return (
        <AdminLayout title="Profile">
            <Head title="Admin · Profile" />

            <FlashMessage />

            <PageHeader
                title="Profile"
                description="Your personal information, shown across the public site."
            />

            <div className="grid gap-5 lg:grid-cols-3">
                <div className="lg:col-span-1">
                    <FormSection title="Avatar" description="Appears next to your name." icon={Camera}>
                        <div className="flex flex-col items-center gap-4 text-center">
                            <img
                                src={
                                    profile.avatar ||
                                    'https://ui-avatars.com/api/?name=' +
                                    encodeURIComponent(profile.full_name || 'User') +
                                    '&background=1a1a1a&color=fff'
                                }
                                alt="Avatar"
                                className="h-28 w-28 rounded-full object-cover ring-1 ring-border"
                            />
                            <form onSubmit={submitAvatar} className="w-full space-y-3">
                                <input
                                    ref={avatarInput}
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => avatarForm.setData('avatar', e.target.files[0])}
                                    className="block w-full cursor-pointer text-xs text-muted-foreground file:mr-3 file:cursor-pointer file:rounded-[8px] file:border-0 file:bg-white/10 file:px-3.5 file:py-2 file:text-xs file:font-medium file:text-foreground hover:file:bg-white/15"
                                />
                                {avatarForm.errors.avatar && (
                                    <p className="text-xs text-[#ef4444]">{avatarForm.errors.avatar}</p>
                                )}
                                <button
                                    type="submit"
                                    className={`${btn} w-full`}
                                    disabled={avatarForm.processing || !avatarForm.data.avatar}
                                >
                                    Upload avatar
                                </button>
                            </form>
                        </div>
                    </FormSection>
                </div>

                <form onSubmit={submit} className="space-y-5 lg:col-span-2">
                    <FormSection title="Details" description="Your headline and contact information." icon={UserRound}>
                        <div className="grid gap-5 sm:grid-cols-2">
                            <Field label="Full name" name="full_name" value={form.data.full_name} error={form.errors.full_name} onChange={(e) => form.setData('full_name', e.target.value)} />
                            <Field label="Title" name="title" value={form.data.title} error={form.errors.title} onChange={(e) => form.setData('title', e.target.value)} placeholder="Full Stack Developer" />
                        </div>
                        <div className="mt-5">
                            <Field label="Bio" name="bio" as="textarea" value={form.data.bio} error={form.errors.bio} onChange={(e) => form.setData('bio', e.target.value)} />
                        </div>
                        <div className="mt-5 grid gap-5 sm:grid-cols-2">
                            <Field label="Email" name="email" type="email" value={form.data.email} error={form.errors.email} onChange={(e) => form.setData('email', e.target.value)} />
                            <Field label="Phone" name="phone" value={form.data.phone} error={form.errors.phone} onChange={(e) => form.setData('phone', e.target.value)} />
                            <Field label="Location" name="location" value={form.data.location} error={form.errors.location} onChange={(e) => form.setData('location', e.target.value)} />
                            <Field label="Resume URL" name="resume" value={form.data.resume} error={form.errors.resume} onChange={(e) => form.setData('resume', e.target.value)} placeholder="https://..." />
                        </div>
                    </FormSection>

                    <FormSection title="Links" description="Where people can find you online." icon={Link2}>
                        <div className="grid gap-5 sm:grid-cols-2">
                            <Field label="GitHub" name="github" value={form.data.github} error={form.errors.github} onChange={(e) => form.setData('github', e.target.value)} placeholder="https://github.com/..." />
                            <Field label="LinkedIn" name="linkedin" value={form.data.linkedin} error={form.errors.linkedin} onChange={(e) => form.setData('linkedin', e.target.value)} placeholder="https://linkedin.com/in/..." />
                            <Field label="Twitter / X" name="twitter" value={form.data.twitter} error={form.errors.twitter} onChange={(e) => form.setData('twitter', e.target.value)} placeholder="https://x.com/..." />
                            <Field label="Website" name="website" value={form.data.website} error={form.errors.website} onChange={(e) => form.setData('website', e.target.value)} placeholder="https://..." />
                        </div>
                    </FormSection>

                    <div className="flex items-center gap-3 pt-1">
                        <button type="submit" className={btnPrimary} disabled={form.processing}>
                            Save changes
                        </button>
                        {form.recentlySuccessful && (
                            <span className="text-sm text-[#22c55e]">Saved.</span>
                        )}
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
