import AdminLayout from '@/Layouts/AdminLayout';
import FlashMessage from '@/Components/Admin/FlashMessage';
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
    Share2,
    SlidersHorizontal,
    Trophy,
} from 'lucide-react';

const GREEN = '#22c55e';
const RED = '#ef4444';

const darkBtn =
    'inline-flex items-center gap-2 rounded-[10px] border border-border bg-white/[0.04] px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-white/[0.08]';
const iconBtn =
    'inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-border bg-white/[0.04] text-muted-foreground transition-colors hover:text-foreground';

function Chip({ dot, label, value }) {
    return (
        <div className="inline-flex items-center gap-2 rounded-[10px] border border-border bg-white/[0.03] px-3 py-2 text-sm">
            <span className="h-2 w-2 rounded-full" style={{ background: dot, boxShadow: `0 0 8px ${dot}` }} />
            <span className="text-muted-foreground">{label}</span>
            <span className="font-semibold tabular-nums text-foreground">{value}</span>
        </div>
    );
}

function HexPattern() {
    const hex = (r) =>
        Array.from({ length: 6 }, (_, i) => {
            const a = (Math.PI / 180) * (60 * i - 30);
            return `${(160 + r * Math.cos(a)).toFixed(1)},${(120 + r * Math.sin(a)).toFixed(1)}`;
        }).join(' ');
    return (
        <svg viewBox="0 0 320 240" className="pointer-events-none absolute right-0 top-1/2 hidden h-full -translate-y-1/2 text-white/[0.06] sm:block">
            {[40, 70, 100, 130].map((r) => (
                <polygon key={r} points={hex(r)} fill="none" stroke="currentColor" strokeWidth="1" />
            ))}
        </svg>
    );
}

function Hero({ name }) {
    return (
        <div className="panel relative overflow-hidden p-8">
            <HexPattern />
            <div className="relative max-w-md">
                <h2 className="text-3xl font-semibold leading-[1.1] tracking-[-0.02em] sm:text-4xl">
                    Build. Ship.
                    <br />
                    Showcase.
                </h2>
                <p className="mt-3 text-sm text-muted-foreground">Powered by {name} &amp; the portfolio graph.</p>
                <Link href={route('admin.projects.create')} className={`${darkBtn} mt-6`}>
                    <Plus className="h-4 w-4" />
                    New Project
                </Link>
            </div>
        </div>
    );
}

function ProjectCard({ project }) {
    const techs = project.technologies?.length ?? 0;
    const gallery = project.images?.length ?? 0;

    return (
        <div className="panel flex flex-col p-4 transition-colors hover:border-white/20">
            <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-white/[0.03] text-muted-foreground">
                        {project.thumbnail ? (
                            <img src={project.thumbnail} alt="" className="h-full w-full object-cover" />
                        ) : (
                            <FolderKanban className="h-5 w-5" />
                        )}
                    </span>
                    <div className="min-w-0">
                        <div className="flex items-center gap-2">
                            <span className="truncate text-sm font-semibold text-foreground">{project.title}</span>
                            {project.category && (
                                <span className="shrink-0 rounded-md bg-white/[0.06] px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                                    {project.category.slice(0, 4)}
                                </span>
                            )}
                        </div>
                        <div className="truncate text-xs text-muted-foreground">/{project.slug}</div>
                    </div>
                </div>
                <div className="shrink-0 text-right">
                    <div
                        className={`inline-flex items-center gap-1 text-sm font-semibold ${project.published ? 'text-[#22c55e]' : 'text-muted-foreground'}`}
                    >
                        {project.published ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                        {project.published ? 'Live' : 'Draft'}
                    </div>
                    <div className="text-xs text-muted-foreground">
                        {project.completed_at ? new Date(project.completed_at).getFullYear() : '—'}
                    </div>
                </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 rounded-[12px] border border-border/70 bg-black/20 p-3 text-center">
                <div>
                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Techs</p>
                    <p className="mt-0.5 text-sm font-semibold tabular-nums text-[#22c55e]">{techs}</p>
                </div>
                <div className="border-x border-border/70">
                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Gallery</p>
                    <p className="mt-0.5 text-sm font-semibold tabular-nums text-foreground">{gallery}</p>
                </div>
                <div>
                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Featured</p>
                    <p className={`mt-0.5 text-sm font-semibold ${project.featured ? 'text-[#22c55e]' : 'text-muted-foreground'}`}>
                        {project.featured ? 'Yes' : 'No'}
                    </p>
                </div>
            </div>

            <p className="mt-4 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{project.description}</p>

            <div className="mt-4 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    Updated {formatRelativeTime(project.created_at)}
                </span>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => navigator.clipboard?.writeText(project.slug)}
                        className="inline-flex items-center gap-1.5 rounded-[8px] border border-border bg-white/[0.03] px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <Copy className="h-3.5 w-3.5" />
                        Copy
                    </button>
                    <Link
                        href={route('admin.projects.edit', project.id)}
                        className="rounded-[8px] bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-white/10"
                    >
                        Edit
                    </Link>
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
                <h2 className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                    <span className="h-2 w-2 rounded-full bg-[#22c55e]" />
                    Projects
                </h2>
                <div className="ml-auto flex items-center gap-2">
                    <div className="relative">
                        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                        <input
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder="Search..."
                            className="h-9 w-40 rounded-[10px] border border-border bg-white/[0.03] pl-8 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-white/25 focus:outline-none"
                        />
                    </div>
                    <div className="relative">
                        <SlidersHorizontal className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="h-9 appearance-none rounded-[10px] border border-border bg-white/[0.03] pl-8 pr-3 text-sm text-foreground focus:border-white/25 focus:outline-none"
                        >
                            <option value="recent">Recent</option>
                            <option value="title">Title</option>
                            <option value="techs">Techs</option>
                        </select>
                    </div>
                </div>
            </div>

            {list.length === 0 ? (
                <div className="panel flex flex-col items-center justify-center py-16 text-center">
                    <FolderKanban className="h-6 w-6 text-muted-foreground" />
                    <p className="mt-3 text-sm text-muted-foreground">No projects found.</p>
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

    const levelColor = (v) => (v >= 80 ? GREEN : v >= 50 ? '#e5e5e5' : '#8a8a8a');

    return (
        <div className="panel">
            <div className="flex items-center justify-between border-b border-border/70 px-4 py-3">
                <h2 className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Trophy className="h-4 w-4 text-muted-foreground" />
                    Leaderboard
                </h2>
                <div className="flex items-center rounded-[8px] border border-border bg-white/[0.03] p-0.5 text-xs">
                    {[
                        { id: 'high', label: 'Highest' },
                        { id: 'low', label: 'Lowest' },
                    ].map((t) => (
                        <button
                            key={t.id}
                            type="button"
                            onClick={() => setDir(t.id)}
                            className={`rounded-[6px] px-2.5 py-1 font-medium transition-colors ${dir === t.id ? 'bg-white/10 text-foreground' : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="px-4 py-2">
                <div className="grid grid-cols-[1fr_auto_auto] gap-3 border-b border-border/50 py-2 text-[10px] uppercase tracking-wide text-muted-foreground">
                    <span>Skill</span>
                    <span className="text-right">Yrs</span>
                    <span className="text-right">Level</span>
                </div>
                {rows.length === 0 ? (
                    <p className="py-8 text-center text-sm text-muted-foreground">No skills yet.</p>
                ) : (
                    rows.map((s) => (
                        <div key={s.id} className="grid grid-cols-[1fr_auto_auto] items-center gap-3 border-b border-border/40 py-2.5 last:border-0">
                            <div className="flex min-w-0 items-center gap-2.5">
                                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-white/[0.03] text-[10px] font-semibold text-foreground">
                                    {getInitials(s.name)}
                                </span>
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-medium text-foreground">{s.name}</p>
                                    {s.category && <p className="truncate text-[11px] text-muted-foreground">{s.category}</p>}
                                </div>
                            </div>
                            <span className="text-right text-sm tabular-nums text-muted-foreground">{s.years_of_experience ?? 0}</span>
                            <span
                                className="inline-flex items-center justify-end gap-1 text-sm font-semibold tabular-nums"
                                style={{ color: levelColor(s.proficiency ?? 0) }}
                            >
                                {(s.proficiency ?? 0) >= (dir === 'high' ? 50 : 0) ? (
                                    <ArrowUpRight className="h-3.5 w-3.5" />
                                ) : (
                                    <ArrowDownRight className="h-3.5 w-3.5" />
                                )}
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
            <div className="flex items-center justify-between border-b border-border/70 px-4 py-3">
                <h2 className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    Live Messages
                </h2>
                <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#22c55e]" />
                    {messages.filter((m) => !m.is_read).length} new
                </span>
            </div>

            <div className="flex items-center gap-1 px-3 py-2">
                {[
                    { id: 'live', label: 'Live Chat' },
                    { id: 'new', label: 'New' },
                    { id: 'read', label: 'Read' },
                ].map((t) => (
                    <button
                        key={t.id}
                        type="button"
                        onClick={() => setTab(t.id)}
                        className={`rounded-[8px] px-2.5 py-1 text-xs font-medium transition-colors ${tab === t.id ? 'bg-white/10 text-foreground' : 'text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            <div className="max-h-[360px] space-y-3 overflow-y-auto px-4 pb-4">
                {rows.length === 0 ? (
                    <p className="py-8 text-center text-sm text-muted-foreground">No messages.</p>
                ) : (
                    rows.map((m) => (
                        <div key={m.id} className="flex gap-2.5">
                            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-white/[0.03] text-[10px] font-semibold text-foreground">
                                {getInitials(m.name || '?')}
                            </span>
                            <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between gap-2">
                                    <span className="truncate text-xs font-semibold text-foreground">{m.name}</span>
                                    <span className="shrink-0 text-[10px] text-muted-foreground">{formatRelativeTime(m.created_at)}</span>
                                </div>
                                <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                                    {m.subject ? <span className="text-foreground">{m.subject}: </span> : null}
                                    {m.message}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="flex items-center gap-2 border-t border-border/70 p-3">
                <span className="inline-flex items-center gap-1.5 rounded-[8px] border border-border bg-white/[0.03] px-2.5 py-1.5 text-xs text-muted-foreground">
                    <Paperclip className="h-3.5 w-3.5" />
                    Attachments
                </span>
                <Link
                    href={route('admin.messages.index')}
                    className="ml-auto inline-flex items-center gap-1.5 rounded-[8px] bg-white/[0.08] px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-white/[0.14]"
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

    return (
        <AdminLayout title="Dashboard">
            <Head title="Admin · Dashboard" />
            <FlashMessage />

            {/* Toolbar */}
            <div className="mb-5 flex flex-wrap items-center gap-2">
                <Chip dot={GREEN} label="Projects" value={stats.projects} />
                <Chip dot="#3b82f6" label="Skills" value={stats.skills} />
                <Chip dot={RED} label="Unread" value={stats.unread_messages} />
                <div className="ml-auto flex items-center gap-2">
                    <Link href={route('home')} className={darkBtn}>
                        <ExternalLink className="h-4 w-4" />
                        View Site
                    </Link>
                    <button type="button" onClick={() => window.print()} className={iconBtn} aria-label="Export">
                        <Share2 className="h-[18px] w-[18px]" />
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-6 xl:flex-row">
                <div className="min-w-0 flex-1 space-y-6">
                    <Hero name={name} />
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
