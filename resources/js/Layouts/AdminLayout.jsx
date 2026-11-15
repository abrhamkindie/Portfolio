import { Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { getInitials } from '@/lib/utils';
import {
    Award,
    Bell,
    Briefcase,
    ExternalLink,
    FolderKanban,
    GraduationCap,
    LayoutDashboard,
    LogOut,
    Mail,
    Menu,
    Search,
    User,
    Wrench,
    X,
} from 'lucide-react';

const navGroups = [
    {
        label: 'Overview',
        items: [
            { label: 'Dashboard', routeName: 'admin.dashboard', match: 'admin.dashboard', icon: LayoutDashboard },
        ],
    },
    {
        label: 'Content',
        items: [
            { label: 'Projects', routeName: 'admin.projects.index', match: 'admin.projects.*', icon: FolderKanban },
            { label: 'Skills', routeName: 'admin.skills.index', match: 'admin.skills.*', icon: Wrench },
            { label: 'Experience', routeName: 'admin.experiences.index', match: 'admin.experiences.*', icon: Briefcase },
            { label: 'Education', routeName: 'admin.educations.index', match: 'admin.educations.*', icon: GraduationCap },
            { label: 'Certificates', routeName: 'admin.certificates.index', match: 'admin.certificates.*', icon: Award },
        ],
    },
    {
        label: 'Inbox',
        items: [
            { label: 'Messages', routeName: 'admin.messages.index', match: 'admin.messages.*', icon: Mail, badge: true },
            { label: 'Profile', routeName: 'admin.profile.edit', match: 'admin.profile.*', icon: User },
        ],
    },
];

export default function AdminLayout({ title, header, children }) {
    const { auth, unreadMessages } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [query, setQuery] = useState('');
    const user = auth?.user;

    const submitSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.projects.index'), query ? { search: query } : {}, { preserveState: true, replace: true });
    };

    return (
        <div className="dark min-h-screen bg-background font-sans text-foreground">
            <aside
                className={`admin-sidebar fixed inset-y-0 left-0 z-40 flex w-[248px] transform flex-col transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* Brand */}
                <div className="flex h-[72px] shrink-0 items-center justify-between px-5">
                    <Link
                        href={route('admin.dashboard')}
                        className="group flex items-center gap-3 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                    >
                        <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/[0.05]">
                            <span className="h-2.5 w-2.5 rounded-full bg-[#e7b7a6] shadow-[0_0_12px_rgba(231,183,166,0.75)]" />
                        </span>
                        <span className="flex flex-col leading-none">
                            <span className="font-serif text-[22px] leading-none tracking-[0.01em] text-foreground">Aerium</span>
                            <span className="mt-1.5 text-[9px] uppercase tracking-[0.22em] text-white/40">Console</span>
                        </span>
                    </Link>
                    <button
                        type="button"
                        onClick={() => setSidebarOpen(false)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/5 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 lg:hidden"
                        aria-label="Close navigation"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Nav */}
                <nav className="flex-1 space-y-6 overflow-y-auto px-3 pb-4 pt-2">
                    {navGroups.map((group) => (
                        <div key={group.label}>
                            <p className="px-3 pb-2 text-[10px] font-medium uppercase tracking-[0.16em] text-white/35">
                                {group.label}
                            </p>
                            <div className="space-y-1">
                                {group.items.map((item) => {
                                    const Icon = item.icon;
                                    const active = route().current(item.match);
                                    return (
                                        <Link
                                            key={item.label}
                                            href={route(item.routeName)}
                                            aria-current={active ? 'page' : undefined}
                                            className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 ${active
                                                ? 'border border-white/10 bg-white/[0.07] text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]'
                                                : 'border border-transparent text-white/55 hover:bg-white/[0.035] hover:text-foreground'
                                                }`}
                                        >
                                            {active && (
                                                <span className="absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-full bg-[#e7b7a6]" />
                                            )}
                                            <Icon
                                                className={`h-[17px] w-[17px] shrink-0 transition-colors ${active ? 'text-[#e7b7a6]' : 'text-white/45 group-hover:text-white/75'
                                                    }`}
                                            />
                                            <span className="flex-1">{item.label}</span>
                                            {item.badge && unreadMessages > 0 && (
                                                <span className="rounded-full bg-[#ef4444]/15 px-1.5 py-0.5 text-[10px] font-semibold tabular-nums text-[#f87171]">
                                                    {unreadMessages}
                                                </span>
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>

                {/* Footer: site link + account */}
                <div className="shrink-0 space-y-2 border-t border-white/[0.07] p-3">
                    <Link
                        href={route('home')}
                        className="flex items-center justify-between rounded-xl px-3 py-2 text-[12px] font-medium text-white/45 transition-colors hover:bg-white/[0.035] hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                    >
                        <span>View public site</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                    </Link>

                    <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-2.5">
                        <Link
                            href={route('admin.profile.edit')}
                            className="flex min-w-0 flex-1 items-center gap-3 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                        >
                            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/12 bg-white/[0.06] text-xs font-semibold text-foreground">
                                {user?.avatar ? (
                                    <img src={user.avatar} alt="" className="h-full w-full object-cover" />
                                ) : (
                                    getInitials(user?.name ?? 'Admin')
                                )}
                            </span>
                            <span className="min-w-0 flex-1">
                                <span className="block truncate text-[13px] font-medium text-foreground">{user?.name}</span>
                                <span className="block truncate text-[11px] text-white/40">{user?.email}</span>
                            </span>
                        </Link>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            title="Log out"
                            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/45 transition-colors hover:bg-[#ef4444]/10 hover:text-[#ef4444] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ef4444]/30"
                            aria-label="Log out"
                        >
                            <LogOut className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </aside>

            {sidebarOpen && (
                <button
                    type="button"
                    aria-label="Close navigation"
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 z-30 bg-black/70 backdrop-blur-sm lg:hidden"
                />
            )}

            <div className="lg:pl-[248px]">
                <div className="admin-canvas flex min-h-screen flex-col">
                    <header className="admin-topbar sticky top-0 z-20 flex h-[72px] items-center gap-4 px-4 lg:px-8">
                        <button
                            type="button"
                            onClick={() => setSidebarOpen(true)}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/5 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 lg:hidden"
                            aria-label="Open navigation"
                        >
                            <Menu className="h-5 w-5" />
                        </button>

                        <div className="min-w-0">
                            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/35">Console</p>
                            <h2 className="truncate text-[15px] font-medium leading-tight text-foreground">{title}</h2>
                        </div>

                        <div className="ml-auto flex items-center gap-2">
                            <form onSubmit={submitSearch} className="relative hidden md:block">
                                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                                <input
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    type="text"
                                    placeholder="Search projects…"
                                    aria-label="Search projects"
                                    className="h-10 w-60 rounded-full border border-white/10 bg-white/[0.045] pl-10 pr-4 text-[13px] text-foreground placeholder:text-white/35 focus:border-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/15"
                                />
                            </form>

                            <Link
                                href={route('admin.messages.index')}
                                className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.045] text-white/55 transition-colors hover:border-white/20 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                                aria-label="Messages"
                            >
                                <Bell className="h-[17px] w-[17px]" />
                                {unreadMessages > 0 && (
                                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#ef4444] ring-2 ring-[#0a0c0e]" />
                                )}
                            </Link>

                            <Link
                                href={route('admin.profile.edit')}
                                className="inline-flex h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] py-1 pl-1 pr-3 transition-colors hover:border-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                                aria-label="Profile settings"
                            >
                                <span className="inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-white/[0.08] text-[11px] font-semibold text-foreground">
                                    {user?.avatar ? (
                                        <img src={user.avatar} alt="" className="h-full w-full object-cover" />
                                    ) : (
                                        getInitials(user?.name ?? 'Admin')
                                    )}
                                </span>
                                <span className="hidden text-[12px] font-medium text-white/70 lg:block">
                                    {user?.name?.split(' ')[0] ?? 'Admin'}
                                </span>
                            </Link>
                        </div>
                    </header>

                    <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-8 lg:px-8">
                        {header}
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
