import AdminLayout from '@/Layouts/AdminLayout';
import Checkbox from '@/Components/Admin/Checkbox';
import Field from '@/Components/Admin/Field';
import FlashMessage from '@/Components/Admin/FlashMessage';
import FormSection from '@/Components/Admin/FormSection';
import PageHeader from '@/Components/Admin/PageHeader';
import { btn, btnPrimary } from '@/Components/Admin/styles';
import { Head, Link, useForm } from '@inertiajs/react';
import { FolderKanban, Image as ImageIcon, Link2 } from 'lucide-react';
import { useState } from 'react';

const slugify = (value) =>
    value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');

export default function ProjectForm({ project }) {
    const isEdit = !!project;

    const form = useForm({
        title: project?.title ?? '',
        slug: project?.slug ?? '',
        description: project?.description ?? '',
        content: project?.content ?? '',
        thumbnail: project?.thumbnail ?? '',
        thumbnail_file: null,
        category: project?.category ?? '',
        live_url: project?.live_url ?? '',
        github_url: project?.github_url ?? '',
        featured: project?.featured ?? false,
        published: project?.published ?? true,
        sort_order: project?.sort_order ?? 0,
        completed_at: project?.completed_at ? project.completed_at.substring(0, 10) : '',
    });

    const [imagesText, setImagesText] = useState((project?.images ?? []).join('\n'));
    const [technologiesText, setTechnologiesText] = useState((project?.technologies ?? []).join(', '));
    const [thumbPreview, setThumbPreview] = useState(project?.thumbnail ?? '');

    const handleThumbnailFile = (e) => {
        const file = e.target.files?.[0] ?? null;
        form.setData('thumbnail_file', file);
        setThumbPreview(file ? URL.createObjectURL(file) : form.data.thumbnail || project?.thumbnail || '');
    };

    const toArray = (text, separator) =>
        text
            .split(separator)
            .map((item) => item.trim())
            .filter(Boolean);

    const handleTitle = (value) => {
        form.setData('title', value);
        if (!isEdit) {
            form.setData('slug', slugify(value));
        }
    };

    const submit = (e) => {
        e.preventDefault();
        form.transform((data) => ({
            ...data,
            images: toArray(imagesText, '\n'),
            technologies: toArray(technologiesText, ','),
        }));

        if (isEdit) {
            form.put(route('admin.projects.update', project.id), { forceFormData: true });
        } else {
            form.post(route('admin.projects.store'), { forceFormData: true });
        }
    };

    return (
        <AdminLayout title={isEdit ? 'Edit project' : 'New project'}>
            <Head title={`Admin · ${isEdit ? 'Edit' : 'New'} project`} />

            <FlashMessage />

            <PageHeader
                title={isEdit ? 'Edit project' : 'New project'}
                backHref={route('admin.projects.index')}
                backLabel="Back to projects"
            />

            <form onSubmit={submit} className="mx-auto max-w-3xl space-y-5 pb-6">
                <FormSection title="Basics" description="Core details shown across your portfolio." icon={FolderKanban}>
                    <div className="grid gap-5 sm:grid-cols-2">
                        <Field label="Title" name="title" value={form.data.title} error={form.errors.title} onChange={(e) => handleTitle(e.target.value)} />
                        <Field label="Slug" name="slug" value={form.data.slug} error={form.errors.slug} onChange={(e) => form.setData('slug', slugify(e.target.value))} />
                        <Field label="Category" name="category" value={form.data.category} error={form.errors.category} onChange={(e) => form.setData('category', e.target.value)} />
                        <Field label="Completed at" name="completed_at" type="date" value={form.data.completed_at} error={form.errors.completed_at} onChange={(e) => form.setData('completed_at', e.target.value)} />
                    </div>
                    <div className="mt-5 space-y-5">
                        <Field label="Short description" name="description" as="textarea" value={form.data.description} error={form.errors.description} onChange={(e) => form.setData('description', e.target.value)} />
                        <Field label="Full content (optional)" name="content" as="textarea" value={form.data.content} error={form.errors.content} onChange={(e) => form.setData('content', e.target.value)} />
                    </div>
                </FormSection>

                <FormSection title="Media & stack" description="Preview image, gallery and technologies." icon={ImageIcon}>
                    <div className="space-y-5">
                        <div>
                            <label className="mb-2 block text-xs font-medium uppercase tracking-[0.04em] text-muted-foreground">
                                Thumbnail image
                            </label>
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                <div className="h-24 w-40 shrink-0 overflow-hidden rounded-[10px] border border-border bg-white/[0.02]">
                                    {thumbPreview ? (
                                        <img src={thumbPreview} alt="" className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                                            <ImageIcon className="h-6 w-6" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 space-y-2">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleThumbnailFile}
                                        className="block w-full cursor-pointer text-xs text-muted-foreground file:mr-3 file:cursor-pointer file:rounded-[8px] file:border-0 file:bg-white/10 file:px-3.5 file:py-2 file:text-xs file:font-medium file:text-foreground hover:file:bg-white/15"
                                    />
                                    <p className="text-[11px] text-muted-foreground">JPG, PNG or WEBP up to 4&nbsp;MB. An uploaded image replaces the URL below.</p>
                                    {form.errors.thumbnail_file && <p className="text-xs text-[#ef4444]">{form.errors.thumbnail_file}</p>}
                                </div>
                            </div>
                        </div>
                        <Field
                            label="…or thumbnail URL"
                            name="thumbnail"
                            value={form.data.thumbnail}
                            error={form.errors.thumbnail}
                            onChange={(e) => {
                                form.setData('thumbnail', e.target.value);
                                setThumbPreview(e.target.value);
                            }}
                            placeholder="https://..."
                        />
                        <Field label="Gallery image URLs (one per line)" name="images" as="textarea" value={imagesText} error={form.errors.images} onChange={(e) => setImagesText(e.target.value)} />
                        <Field label="Technologies (comma separated)" name="technologies" value={technologiesText} error={form.errors.technologies} onChange={(e) => setTechnologiesText(e.target.value)} placeholder="Laravel, React, MySQL" />
                    </div>
                </FormSection>

                <FormSection title="Links & visibility" description="External links and how the project appears." icon={Link2}>
                    <div className="grid gap-5 sm:grid-cols-2">
                        <Field label="Live URL" name="live_url" value={form.data.live_url} error={form.errors.live_url} onChange={(e) => form.setData('live_url', e.target.value)} placeholder="https://..." />
                        <Field label="Repository URL" name="github_url" value={form.data.github_url} error={form.errors.github_url} onChange={(e) => form.setData('github_url', e.target.value)} placeholder="https://..." />
                        <Field label="Sort order" name="sort_order" type="number" value={form.data.sort_order} error={form.errors.sort_order} onChange={(e) => form.setData('sort_order', e.target.value)} />
                    </div>
                    <div className="mt-5 flex flex-wrap gap-6">
                        <Checkbox label="Published" checked={form.data.published} onChange={(e) => form.setData('published', e.target.checked)} />
                        <Checkbox label="Featured" checked={form.data.featured} onChange={(e) => form.setData('featured', e.target.checked)} />
                    </div>
                </FormSection>

                <div className="flex items-center gap-3 pt-1">
                    <button type="submit" className={btnPrimary} disabled={form.processing}>
                        {isEdit ? 'Update project' : 'Create project'}
                    </button>
                    <Link href={route('admin.projects.index')} className={btn}>
                        Cancel
                    </Link>
                </div>
            </form>
        </AdminLayout>
    );
}
