import { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Work' },
    { href: '#services', label: 'Services' },
    { href: '#experience', label: 'Career' },
    { href: '#contact', label: 'Contact' },
];

/**
 * Fixed editorial navbar: brand mark, primary links, and a contact CTA.
 */
export function Navbar({ profile }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    const brandName = profile?.full_name?.split(' ')[0] || 'Abrham';

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 50);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        const sections = navItems
            .filter((item) => item.href.startsWith('#'))
            .map((item) => document.querySelector(item.href))
            .filter(Boolean);

        if (sections.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
                if (visible[0]) setActiveSection(`#${visible[0].target.id}`);
            },
            { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
        );

        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const close = () => setIsOpen(false);

    return (
        <>
            <header
                className={cn(
                    'fixed inset-x-0 top-0 z-[60] transition-all duration-500',
                    isScrolled
                        ? 'border-b border-white/5 bg-background/85 py-4 backdrop-blur-xl'
                        : 'bg-transparent py-6'
                )}
            >
                <div className="section-container">
                    <div className="grid grid-cols-[1fr_auto] items-center gap-6 lg:grid-cols-[auto_1fr_auto]">
                        <Link
                            href="/"
                            className="group flex items-baseline gap-2 font-display text-2xl font-bold uppercase tracking-tight text-white"
                        >
                            <span>{brandName}</span>
                            <span
                                aria-hidden="true"
                                className="h-1.5 w-1.5 translate-y-[-2px] rounded-full bg-primary transition-transform duration-300 group-hover:scale-125"
                            />
                        </Link>

                        <nav
                            aria-label="Main navigation"
                            className="hidden items-center justify-center lg:flex"
                        >
                            <ul className="flex items-center gap-10">
                                {navItems.map((item) => {
                                    const isActive = activeSection === item.href;
                                    return (
                                        <li key={item.href}>
                                            <a
                                                href={item.href}
                                                className={cn(
                                                    'relative text-[11px] font-bold uppercase tracking-[0.22em] transition-colors duration-300',
                                                    isActive
                                                        ? 'text-primary'
                                                        : 'text-white/45 hover:text-white'
                                                )}
                                            >
                                                {item.label}
                                                <span
                                                    aria-hidden="true"
                                                    className={cn(
                                                        'absolute -bottom-2 left-0 h-px w-full origin-left bg-primary transition-transform duration-300',
                                                        isActive ? 'scale-x-100' : 'scale-x-0'
                                                    )}
                                                />
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>

                        <div className="flex items-center justify-end gap-4">
                            <a
                                href="#contact"
                                className="hidden items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition-colors hover:text-primary lg:inline-flex"
                            >
                                Start a Project
                                <ArrowUpRight size={15} />
                            </a>

                            <button
                                type="button"
                                onClick={() => setIsOpen((v) => !v)}
                                aria-expanded={isOpen}
                                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                                className="flex h-10 w-10 items-center justify-center border border-white/10 text-white lg:hidden"
                            >
                                <span className="relative block h-3 w-4" aria-hidden="true">
                                    <span
                                        className={cn(
                                            'absolute left-0 top-0 h-0.5 w-full bg-current transition-transform duration-300',
                                            isOpen ? 'translate-y-[5px] rotate-45' : ''
                                        )}
                                    />
                                    <span
                                        className={cn(
                                            'absolute bottom-0 left-0 h-0.5 w-full bg-current transition-transform duration-300',
                                            isOpen ? '-translate-y-[5px] -rotate-45' : ''
                                        )}
                                    />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div
                className={cn(
                    'fixed inset-0 z-[55] flex flex-col justify-between bg-background px-6 pb-10 pt-28 transition-[opacity,transform] duration-500 lg:hidden',
                    isOpen
                        ? 'pointer-events-auto translate-y-0 opacity-100'
                        : 'pointer-events-none -translate-y-3 opacity-0'
                )}
                aria-hidden={!isOpen}
            >
                <nav aria-label="Mobile navigation">
                    <ul className="flex flex-col gap-2">
                        {navItems.map((item) => {
                            const isActive = activeSection === item.href;
                            return (
                                <li key={item.href} className="border-b border-white/5 pb-4 pt-2">
                                    <a
                                        href={item.href}
                                        onClick={close}
                                        tabIndex={isOpen ? 0 : -1}
                                        className={cn(
                                            'block font-display text-4xl font-bold tracking-tight transition-colors',
                                            isActive ? 'text-primary' : 'text-white'
                                        )}
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            );
                        })}
                        <li className="pt-8">
                            <a
                                href="#contact"
                                onClick={close}
                                tabIndex={isOpen ? 0 : -1}
                                className="btn-primary w-full"
                            >
                                Start a Project
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}
