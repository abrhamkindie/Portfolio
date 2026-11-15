import AdminLayout from '@/Layouts/AdminLayout';
import EmptyState from '@/Components/Admin/EmptyState';
import FlashMessage from '@/Components/Admin/FlashMessage';
import StatusPill from '@/Components/Admin/StatusPill';
import { btn, btnPrimary, iconBtn, meta, segmentBtn, successText } from '@/Components/Admin/styles';
import { cn } from '@/lib/utils';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { formatRelativeTime, getInitials } from '@/lib/utils';
import {
    ArrowDownRight,
    ArrowUpRight,
    Clock,
    Copy,
    ExternalLink,
    FolderKanban,
    MessageSquare,
    Paperclip,
    Plus,
    Search,
    Send,
    SlidersHorizontal,
    Trophy,
    Wrench,
} from 'lucide-react';

const GREEN = '#22c55e';

function greeting() {
    const hour = new Date().getHours();
    if (hour < 5) return 'Good night';
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
}

function StatTile({ icon: Icon, label, value, hint, tone = 'neutral', accent }) {
    return (
        <div className="panel flex flex-col gap-3 p-5">
            <div className="flex items-center justify-between">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/60">
                    <Icon className="h-[17px] w-[17px]" />
                </span>
                {hint && <span className="text-[11px] font-medium text-white/35">{hint}</span>}
            </div>
            <div>
                <p className="text-[28px] font-semibold leading-none tabular-nums tracking-[-0.02em] text-foreground">
                    {value}
                </p>
                <p className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-white/40">{label}</p>
            </div>
            {accent && <div className="mt-auto h-[2px] w-10 rounded-full" style={{ background: accent }} />}
        </div>
    );
}

function ProjectCard({ project }) {
    const techs = project.technologies?.length ?? 0;
    const gallery = project.images?.length ?? 0;

    return (
        <div className="panel group flex flex-col overflow-hidden transition-colors hover:border-white/20">
            <div className="relative aspect-[16/9] overflow-hidden border-b border-white/[0.06] bg-white/[0.02]">
                {project.thumbnail ? (
                    <img
                        src={project.thumbnail}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-white/25">
                        <FolderKanban className="h-9 w-9" />
                    </div>
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0" />
                <div className="absolute left-3 top-3">
                    {project.featured && <StatusPill tone="brand">Featured</StatusPill>}
                </div>
                <div className="absolute right-3 top-3">
                    <StatusPill tone={project.published ? 'green' : 'neutral'} dot>
                        {project.published ? 'Live' : 'Draft'}
                    </StatusPill>
                </div>
            </div>

            <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <h3 className="truncate text-[15px] font-semibold leading-tight tracking-[-0.01em] text-foreground">
                            {project.title}
                        </h3>
                        <p className="mt-0.5 truncate font-mono text-[11px] text-white/40">/{project.slug}</p>
                    </div>
                    {project.category && (
                        <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.05] px-2 py-0.5 text-[10px] font-medium text-white/55">
                            {project.category}
                        </span>
                    )}
                </div>

                <p className="mt-3 line-clamp-2 text-[13px] leading-relaxed text-white/50">{project.description}</p>

                {project.technologies?.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 4).map((tech) => (
                            <span
                                key={tech}
                                className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] font-medium text-white/65"
                            >
                                {tech}
                            </span>
                        ))}
                        {project.technologies.length > 4 && (
                            <span className="px-1 py-0.5 text-[11px] font-medium text-white/35">
                                +{project.technologies.length - 4}
                            </span>
                        )}
                    </div>
                )}

                <div className="mt-5 grid grid-cols-3 gap-2 rounded-xl border border-white/[0.06] bg-black/25 p-3 text-center">
                    <div>
                        <p className={cn('mb-0.5', meta)}>Techs</p>
                        <p className={cn('text-sm font-semibold tabular-nums', successText)}>{techs}</p>
                    </div>
                    <div className="border-x border-white/[0.06]">
                        <p className={cn('mb-0.5', meta)}>Gallery</p>
                        <p className="text-sm font-semibold tabular-nums text-foreground">{gallery}</p>
                    </div>
                    <div>
                        <p className={cn('mb-0.5', meta)}>Year</p>
                        <p className="text-sm font-semibold tabular-nums text-white/70">
                            {project.completed_at ? new Date(project.completed_at).getFullYear() : '—'}
                        </p>
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-4">
                    <span className="inline-flex items-center gap-1.5 text-[11px] text-white/40">
                        <Clock className="h-3.5 w-3.5" />
                        Updated {formatRelativeTime(project.created_at)}
                    </span>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => navigator.clipboard?.writeText(project.slug)}
                            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-[11px] font-medium text-white/55 transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                        >
                            <Copy className="h-3.5 w-3.5" />
                            Copy
                        </button>
                        <Link
                            href={route('admin.projects.edit', project.id)}
                            className="rounded-full bg-white/[0.08] px-3 py-1.5 text-[11px] font-medium text-foreground transition-colors hover:bg-white/[0.14] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                        >
                            Edit
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ProjectsSection({ projects }) {
    const [q, setQ] = useState('');
    const [sort, setSort] = useState('recent');

    let list = projects.filter((p) => (p.title ?? '').toLowerCase().includes(q.toLowerCase()));
    if (sort === 'title') list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    if (sort === 'techs') list = [...list].sort((a, b) => (b.technologies?.length ?? 0) - (a.technologies?.length ?? 0));

    return (
        <section>
            <div className="mb-4 flex flex-wrap items-center gap-3">
                <h2 className="text-[13px] font-semibold text-foreground">Projects</h2>
                <span className="text-[11px] text-white/35">{list.length} total</span>
                <div className="ml-auto flex items-center gap-2">
                    <div className="relative">
                        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/35" />
                        <input
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder="Search…"
                            aria-label="Filter projects"
                            className="h-9 w-40 rounded-full border border-white/10 bg-white/[0.04] pl-8 pr-3 text-[13px] text-foreground placeholder:text-white/35 focus:border-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/15"
                        />
                    </div>
                    <div className="relative">
                        <SlidersHorizontal className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/35" />
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            aria-label="Sort projects"
                            className="h-9 appearance-none rounded-full border border-white/10 bg-white/[0.04] pl-8 pr-3 text-[13px] text-foreground focus:border-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/15"
                        >
                            <option value="recent">Recent</option>
                            <option value="title">Title</option>
                            <option value="techs">Techs</option>
                        </select>
                    </div>
                </div>
            </div>

            {list.length === 0 ? (
                <div className="panel overflow-hidden">
                    <EmptyState icon={FolderKanban} title="No projects found." description="Create a project or clear the search to see your work here." />
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2">
                    {list.map((p) => (
                        <ProjectCard key={p.id} project={p} />
                    ))}
                </div>
            )}
        </section>
    );
}

function Leaderboard({ skills }) {
    const [dir, setDir] = useState('high');
    const rows = [...skills]
        .sort((a, b) => (dir === 'high' ? (b.proficiency ?? 0) - (a.proficiency ?? 0) : (a.proficiency ?? 0) - (b.proficiency ?? 0)))
        .slice(0, 6);

    const levelColor = (v) => (v >= 80 ? GREEN : v >= 50 ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.4)');

    return (
        <div className="panel">
            <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
                <h2 className="inline-flex items-center gap-2 text-[13px] font-semibold text-foreground">
                    <Trophy className="h-4 w-4 text-white/40" />
                    Leaderboard
                </h2>
                <div className="flex items-center rounded-full border border-white/10 bg-white/[0.03] p-0.5 text-[11px]">
                    {[
                        { id: 'high', label: 'Highest' },
                        { id: 'low', label: 'Lowest' },
                    ].map((t) => (
                        <button
                            key={t.id}
                            type="button"
                            onClick={() => setDir(t.id)}
                            aria-pressed={dir === t.id}
                            className={cn(
                                segmentBtn,
                                'px-2.5 py-1 text-[11px]',
                                dir === t.id ? 'bg-white/10 text-foreground' : 'text-white/45 hover:text-foreground',
                            )}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="px-5 py-3">
                <div className={cn('grid grid-cols-[1fr_auto_auto] gap-3 border-b border-white/[0.06] py-2', meta)}>
                    <span>Skill</span>
                    <span className="text-right">Yrs</span>
                    <span className="text-right">Level</span>
                </div>
                {rows.length === 0 ? (
                    <p className="py-8 text-center text-[13px] text-white/40">No skills yet.</p>
                ) : (
                    rows.map((s) => (
                        <div key={s.id} className="grid grid-cols-[1fr_auto_auto] items-center gap-3 border-b border-white/[0.04] py-3 last:border-0">
                            <div className="flex min-w-0 items-center gap-2.5">
                                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[10px] font-semibold text-foreground">
                                    {getInitials(s.name)}
                                </span>
                                <div className="min-w-0">
                                    <p className="truncate text-[13px] font-medium text-foreground">{s.name}</p>
                                    {s.category && <p className="truncate text-[11px] text-white/40">{s.category}</p>}
                                </div>
                            </div>
                            <span className="text-right text-[13px] tabular-nums text-white/45">{s.years_of_experience ?? 0}</span>
                            <span
                                className="inline-flex items-center justify-end gap-1 text-[13px] font-semibold tabular-nums"
                                style={{ color: levelColor(s.proficiency ?? 0) }}
                            >
                                {s.proficiency ?? 0}%
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

function LiveMessages({ messages }) {
    const [tab, setTab] = useState('live');
    const rows = tab === 'new' ? messages.filter((m) => !m.is_read) : tab === 'read' ? messages.filter((m) => m.is_read) : messages;

    return (
        <div className="panel flex flex-col">
            <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
                <h2 className="inline-flex items-center gap-2 text-[13px] font-semibold text-foreground">
                    <MessageSquare className="h-4 w-4 text-white/40" />
                    Live Messages
                </h2>
                <span className="inline-flex items-center gap-1.5 text-[11px] text-white/40">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#22c55e]" />
                    {messages.filter((m) => !m.is_read).length} new
                </span>
            </div>

            <div className="flex items-center gap-1 px-4 py-2.5">
                {[
                    { id: 'live', label: 'All' },
                    { id: 'new', label: 'New' },
                    { id: 'read', label: 'Read' },
                ].map((t) => (
                    <button
                        key={t.id}
                        type="button"
                        onClick={() => setTab(t.id)}
                        aria-pressed={tab === t.id}
                        className={cn(
                            segmentBtn,
                            'px-3 py-1 text-[11px]',
                            tab === t.id ? 'bg-white/10 text-foreground' : 'text-white/45 hover:text-foreground',
                        )}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            <div className="max-h-[360px] space-y-3 overflow-y-auto px-5 pb-5">
                {rows.length === 0 ? (
                    <p className="py-8 text-center text-[13px] text-white/40">No messages.</p>
                ) : (
                    rows.map((m) => (
                        <div key={m.id} className="flex gap-2.5">
                            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[10px] font-semibold text-foreground">
                                {getInitials(m.name || '?')}
                            </span>
                            <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between gap-2">
                                    <span className="truncate text-[12px] font-semibold text-foreground">{m.name}</span>
                                    <span className="shrink-0 text-[10px] text-white/35">{formatRelativeTime(m.created_at)}</span>
                                </div>
                                <p className="mt-0.5 line-clamp-2 text-[11px] leading-relaxed text-white/45">
                                    {m.subject ? <span className="text-white/70">{m.subject}: </span> : null}
                                    {m.message}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="flex items-center gap-2 border-t border-white/[0.06] p-4">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-[11px] text-white/45">
                    <Paperclip className="h-3.5 w-3.5" />
                    Attachments
                </span>
                <Link
                    href={route('admin.messages.index')}
                    className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-white/[0.08] px-3 py-1.5 text-[11px] font-medium text-foreground transition-colors hover:bg-white/[0.14] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                >
                    <Send className="h-3.5 w-3.5" />
                    Open Inbox
                </Link>
            </div>
        </div>
    );
}

export default function Dashboard({ stats, projects, skills, messages }) {
    const { auth } = usePage().props;
    const name = auth?.user?.name ?? 'you';
    const firstName = name.split(' ')[0];

    const dateLabel = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    });

    return (
        <AdminLayout title="Dashboard">
            <Head title="Admin · Dashboard" />
            <FlashMessage />

            {/* Greeting + actions */}
            <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/35">Overview</p>
                    <h2 className="mt-1.5 font-serif text-[2.2rem] font-normal leading-[1.05] tracking-[-0.01em] text-foreground sm:text-[2.8rem]">
                        {greeting()}, {firstName}.
                    </h2>
                    <p className="mt-2 text-[13px] text-white/45">{dateLabel} · your portfolio at a glance.</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                    <Link href={route('home')} className={btn}>
                        <ExternalLink className="h-4 w-4" />
                        View Site
                    </Link>
                    <Link href={route('admin.projects.create')} className={btnPrimary}>
                        <Plus className="h-4 w-4" />
                        New Project
                    </Link>
                </div>
            </div>

            {/* Stat tiles */}
            <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
                <StatTile icon={FolderKanban} label="Projects" value={stats.projects} hint={`${stats.published_projects} live`} accent="#e7b7a6" />
                <StatTile icon={Wrench} label="Skills" value={stats.skills} hint="tracked" accent="#22c55e" />
                <StatTile icon={MessageSquare} label="Unread" value={stats.unread_messages} hint={`${stats.messages} total`} accent="#f87171" />
                <StatTile icon={Trophy} label="Certificates" value={stats.certificates} hint={`${stats.experiences} roles`} accent="rgba(255,255,255,0.4)" />
            </div>

            <div className="flex flex-col gap-6 xl:flex-row">
                <div className="min-w-0 flex-1 space-y-6">
                    <ProjectsSection projects={projects} />
                </div>
                <aside className="w-full shrink-0 space-y-6 xl:w-[340px]">
                    <Leaderboard skills={skills} />
                    <LiveMessages messages={messages} />
                </aside>
            </div>
        </AdminLayout>
    );
}
