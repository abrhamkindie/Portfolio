import { Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { getInitials } from '@/lib/utils';
import {
    Award,
    Bell,
    Briefcase,
    ChevronDown,
    FolderKanban,
    GraduationCap,
    LayoutDashboard,
    LogOut,
    Mail,
    Menu,
    Search,
    Settings,
    User,
    Wrench,
    X,
} from 'lucide-react';

const navGroups = [
    {
        label: 'General',
        items: [
            { label: 'Dashboard', routeName: 'admin.dashboard', match: 'admin.dashboard', icon: LayoutDashboard },
            { label: 'Projects', routeName: 'admin.projects.index', match: 'admin.projects.*', icon: FolderKanban },
            { label: 'Skills', routeName: 'admin.skills.index', match: 'admin.skills.*', icon: Wrench },
        ],
    },
    {
        label: 'Content',
        items: [
            { label: 'Experience', routeName: 'admin.experiences.index', match: 'admin.experiences.*', icon: Briefcase },
            { label: 'Education', routeName: 'admin.educations.index', match: 'admin.educations.*', icon: GraduationCap },
            { label: 'Certificates', routeName: 'admin.certificates.index', match: 'admin.certificates.*', icon: Award },
        ],
    },
    {
        label: 'Personal',
        items: [
            { label: 'Profile', routeName: 'admin.profile.edit', match: 'admin.profile.*', icon: User },
            { label: 'Messages', routeName: 'admin.messages.index', match: 'admin.messages.*', icon: Mail, badge: true },
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
                className={`fixed inset-y-0 left-0 z-40 flex w-64 transform flex-col border-r border-white/10 bg-[#0a0d0e]/80 backdrop-blur-2xl transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* Brand */}
                <div className="flex h-16 items-center justify-between px-5">
                    <Link href={route('admin.dashboard')} className="flex items-center gap-2.5">
                        <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.05]">
                            <span className="h-2.5 w-2.5 rounded-full bg-[#e7b7a6] shadow-[0_0_10px_rgba(231,183,166,0.7)]" />
                        </span>
                        <span className="flex flex-col leading-none">
                            <span className="font-serif text-xl tracking-[0.02em] text-foreground">Aerium</span>
                            <span className="mt-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Studio</span>
                        </span>
                    </Link>
                    <button
                        type="button"
                        onClick={() => setSidebarOpen(false)}
                        className="text-muted-foreground transition-colors hover:text-foreground lg:hidden"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Nav */}
                <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-4">
                    {navGroups.map((group) => (
                        <div key={group.label}>
                            <p className="px-3 pb-2 text-[10px] font-medium uppercase tracking-[0.08em] text-muted-foreground/70">
                                {group.label}
                            </p>
                            <div className="space-y-0.5">
                                {group.items.map((item) => {
                                    const Icon = item.icon;
                                    const active = route().current(item.match);
                                    return (
                                        <Link
                                            key={item.label}
                                            href={route(item.routeName)}
                                            className={`flex items-center gap-3 rounded-full px-3 py-2 text-sm font-medium transition-colors ${active
                                                ? 'bg-white/[0.07] text-foreground'
                                                : 'text-muted-foreground hover:bg-white/[0.03] hover:text-foreground'
                                                }`}
                                        >
                                            <Icon className="h-[18px] w-[18px] shrink-0" />
                                            <span className="flex-1">{item.label}</span>
                                            {active && <span className="h-1.5 w-1.5 rounded-full bg-[#e7b7a6]" />}
                                            {item.badge && unreadMessages > 0 && (
                                                <span className="rounded-full bg-[#e7b7a6]/15 px-1.5 py-0.5 text-[10px] font-semibold text-[#e7b7a6]">
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

                {/* Footer profile */}
                <div className="border-t border-border/70 p-3">
                    <Link
                        href={route('admin.profile.edit')}
                        className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-2.5 backdrop-blur-md transition-colors hover:border-white/20"
                    >
                        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-secondary text-xs font-semibold text-foreground">
                            {user?.avatar ? (
                                <img src={user.avatar} alt="" className="h-full w-full object-cover" />
                            ) : (
                                getInitials(user?.name ?? 'Admin')
                            )}
                        </span>
                        <div className="min-w-0 flex-1">
                            <div className="truncate text-sm font-medium text-foreground">{user?.name}</div>
                            <div className="truncate text-xs text-muted-foreground">{user?.email}</div>
                        </div>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            onClick={(e) => e.stopPropagation()}
                            className="shrink-0 text-muted-foreground transition-colors hover:text-[#ef4444]"
                            aria-label="Log out"
                        >
                            <LogOut className="h-4 w-4" />
                        </Link>
                    </Link>
                </div>
            </aside>

            {sidebarOpen && (
                <div className="fixed inset-0 z-30 bg-black/70 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            <div className="lg:pl-64">
                <div className="admin-canvas flex min-h-screen flex-col">
                    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-white/10 bg-background/60 px-4 backdrop-blur-2xl lg:px-6">
                        <button
                            type="button"
                            onClick={() => setSidebarOpen(true)}
                            className="text-muted-foreground transition-colors hover:text-foreground lg:hidden"
                        >
                            <Menu className="h-6 w-6" />
                        </button>

                        {/* Network-style pill */}
                        <button
                            type="button"
                            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-foreground backdrop-blur-md transition-colors hover:bg-white/[0.07]"
                        >
                            <span className="h-2 w-2 rounded-full bg-[#e7b7a6] shadow-[0_0_8px_rgba(231,183,166,0.8)]" />
                            <span className="font-medium">{title}</span>
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        </button>

                        <div className="ml-auto flex items-center gap-2">
                            <form onSubmit={submitSearch} className="relative hidden md:block">
                                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <input
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    type="text"
                                    placeholder="Search something..."
                                    className="h-10 w-56 rounded-full border border-white/10 bg-white/[0.04] pl-9 pr-4 text-sm text-foreground backdrop-blur-md placeholder:text-muted-foreground focus:border-white/25 focus:outline-none"
                                />
                            </form>
                            <Link
                                href={route('admin.messages.index')}
                                className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-muted-foreground backdrop-blur-md transition-colors hover:text-foreground"
                                aria-label="Messages"
                            >
                                <Bell className="h-[18px] w-[18px]" />
                                {unreadMessages > 0 && (
                                    <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-[#ef4444] ring-2 ring-background" />
                                )}
                            </Link>
                            <Link
                                href={route('admin.profile.edit')}
                                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-muted-foreground backdrop-blur-md transition-colors hover:text-foreground"
                                aria-label="Settings"
                            >
                                <Settings className="h-[18px] w-[18px]" />
                            </Link>
                        </div>
                    </header>

                    <main className="flex-1 px-4 py-6 lg:px-6">
                        {header}
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
