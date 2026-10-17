import AdminLayout from '@/Layouts/AdminLayout';
import DeleteButton from '@/Components/Admin/DeleteButton';
import FlashMessage from '@/Components/Admin/FlashMessage';
import PageHeader from '@/Components/Admin/PageHeader';
import Pagination from '@/Components/Admin/Pagination';
import StatusPill from '@/Components/Admin/StatusPill';
import { btnPrimary, iconBtn } from '@/Components/Admin/styles';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowDown, ArrowUp, ChevronDown, FolderKanban, Pencil, Plus, Search, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

const sortOptions = [
    { value: 'order', label: 'Custom order' },
    { value: 'newest', label: 'Newest first' },
    { value: 'oldest', label: 'Oldest first' },
    { value: 'title', label: 'Title (A–Z)' },
    { value: 'featured', label: 'Featured first' },
];

const moveBtn =
    'inline-flex h-8 w-8 items-center justify-center rounded-[8px] border border-border bg-white/[0.03] text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground disabled:pointer-events-none disabled:opacity-40';

function ProjectCard({ project, canReorder, onMove }) {
    return (
        <div className="panel group flex flex-col overflow-hidden transition-colors hover:border-white/20">
            <div className="relative aspect-[16/9] overflow-hidden border-b border-border/60 bg-white/[0.02]">
                {project.thumbnail ? (
                    <img
                        src={project.thumbnail}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                        <FolderKanban className="h-8 w-8" />
                    </div>
                )}

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/0" />

                <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                    {project.featured && <StatusPill tone="brand">Featured</StatusPill>}
                </div>
                <div className="absolute right-3 top-3">
                    <StatusPill tone={project.published ? 'green' : 'neutral'} dot>
                        {project.published ? 'Published' : 'Draft'}
                    </StatusPill>
                </div>
            </div>

            <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <h3 className="truncate text-[15px] font-bold leading-tight tracking-[-0.011em] text-foreground">
                            {project.title}
                        </h3>
                        <p className="mt-1 truncate font-mono text-[11px] text-muted-foreground">/{project.slug}</p>
                    </div>
                    {project.category && (
                        <span className="shrink-0 rounded-md border border-border bg-white/[0.05] px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                            {project.category}
                        </span>
                    )}
                </div>

                <p className="mt-3 line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">{project.description}</p>

                {project.technologies?.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 4).map((tech) => (
                            <span
                                key={tech}
                                className="rounded-full border border-border bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-foreground/80"
                            >
                                {tech}
                            </span>
                        ))}
                        {project.technologies.length > 4 && (
                            <span className="px-1 py-1 text-[11px] font-medium text-muted-foreground">
                                +{project.technologies.length - 4}
                            </span>
                        )}
                    </div>
                )}

                <div className="mt-auto flex items-center justify-between border-t border-border/60 pt-4">
                    {canReorder ? (
                        <div className="flex items-center gap-1.5">
                            <button
                                type="button"
                                onClick={() => onMove(project, 'up')}
                                className={moveBtn}
                                aria-label={`Move ${project.title} up`}
                                title="Move up in display order"
                            >
                                <ArrowUp className="h-4 w-4" />
                            </button>
                            <button
                                type="button"
                                onClick={() => onMove(project, 'down')}
                                className={moveBtn}
                                aria-label={`Move ${project.title} down`}
                                title="Move down in display order"
                            >
                                <ArrowDown className="h-4 w-4" />
                            </button>
                            <span className="ml-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
                                <span className="font-mono text-foreground">#{project.sort_order}</span>
                            </span>
                        </div>
                    ) : (
                        <span className="text-xs text-muted-foreground">Switch to “Custom order” to reorder</span>
                    )}
                    <div className="flex items-center gap-2">
                        <Link
                            href={route('admin.projects.edit', project.id)}
                            className={iconBtn}
                            aria-label={`Edit ${project.title}`}
                        >
                            <Pencil className="h-4 w-4" />
                        </Link>
                        <DeleteButton url={route('admin.projects.destroy', project.id)} label={`"${project.title}"`} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ProjectsIndex({ projects, filters }) {
    const [search, setSearch] = useState(filters.search ?? '');
    const sort = filters.sort ?? 'order';

    const navigate = (params) =>
        router.get(
            route('admin.projects.index'),
            { search, sort, ...params },
            { preserveState: true, replace: true },
        );

    const submitSearch = (e) => {
        e.preventDefault();
        navigate({ search });
    };

    const move = (project, direction) =>
        router.patch(route('admin.projects.order', project.id), { direction }, { preserveScroll: true });

    return (
        <AdminLayout title="Projects">
            <Head title="Admin · Projects" />

            <FlashMessage />

            <PageHeader
                title="Projects"
                description="Create, edit and publish the projects shown on your portfolio."
                action={
                    <Link href={route('admin.projects.create')} className={btnPrimary}>
                        <Plus className="h-4 w-4" />
                        New project
                    </Link>
                }
            />

            <div className="mb-4 flex flex-wrap items-center gap-3">
                <form onSubmit={submitSearch} className="w-full max-w-xs">
                    <div className="relative">
                        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by title or category…"
                            className="input !pl-9"
                        />
                    </div>
                </form>

                <div className="ml-auto flex items-center gap-2">
                    <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                    <div className="relative">
                        <select
                            value={sort}
                            onChange={(e) => navigate({ sort: e.target.value })}
                            className="input h-9 !pl-3 !pr-9 appearance-none text-sm"
                            aria-label="Order projects by"
                        >
                            {sortOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    </div>
                </div>
            </div>

            {projects.data.length === 0 ? (
                <div className="panel flex flex-col items-center justify-center py-16 text-center">
                    <FolderKanban className="h-6 w-6 text-muted-foreground" />
                    <p className="mt-3 text-sm text-muted-foreground">No projects found.</p>
                </div>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {projects.data.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            canReorder={sort === 'order'}
                            onMove={move}
                        />
                    ))}
                </div>
            )}

            <Pagination paginator={projects} />
        </AdminLayout>
    );
}
