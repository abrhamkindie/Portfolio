import { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';

const navItems = [
    { href: '#projects', label: 'Work' },
    { href: '#skills', label: 'Services' },
    { href: '#process', label: 'Process' },
    { href: '#about', label: 'About' },
];

const EASE = 'cubic-bezier(0.22,1,0.36,1)';

/**
 * Header modelled on the site: bold logo on the left, spaced nav links and a
 * black pill "Let's talk" button on the right. On small screens a round toggle
 * opens a full-screen dark menu whose links rise in one after another.
 */
export function Navbar({ profile }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const name = profile?.full_name || 'Portfolio';

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 20);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Lock page scroll while the mobile menu is open.
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
                    'fixed inset-x-0 top-0 z-50 bg-white transition-shadow duration-300',
                    isScrolled && 'shadow-[0_1px_0_rgba(38,38,38,0.08)]'
                )}
            >
                <div className="mx-auto flex h-[clamp(70px,8vh,97px)] w-[90%] max-w-[min(1800px,95vw)] items-center justify-between">
                    <Link
                        href="/"
                        data-cursor="hover"
                        className="z-[5001] text-[clamp(20px,1.4vw,26px)] tracking-[-0.02em] text-[#000]"
                    >
                        <span className="font-bold">{name}</span>
                    </Link>

                    <nav aria-label="Main navigation" className="hidden flex-1 items-center justify-end md:flex">
                        <ul className="flex items-center gap-[clamp(30px,4vw,50px)]">
                            {navItems.map((item) => (
                                <li key={item.href}>
                                    <a
                                        href={item.href}
                                        data-cursor="hover"
                                        className="nav-link text-[clamp(16px,1.2vw,18px)] font-medium leading-none tracking-[-0.01em] text-[#000]"
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <a
                            href="#contact"
                            data-cursor="hover"
                            className="btn-primary ml-[clamp(20px,2.5vw,30px)] h-[clamp(32px,3.5vw,37px)] w-[clamp(120px,12vw,140px)]"
                        >
                            Let&apos;s talk
                        </a>
                    </nav>

                    <button
                        type="button"
                        onClick={() => setIsOpen((v) => !v)}
                        aria-expanded={isOpen}
                        aria-label={isOpen ? 'Close menu' : 'Open menu'}
                        data-cursor="hover"
                        className="relative z-[5001] flex h-[clamp(40px,8vw,50px)] w-[clamp(40px,8vw,50px)] items-center justify-center rounded-full bg-black text-white transition-transform duration-300 hover:scale-110 md:hidden"
                    >
                        <span className="relative block h-3.5 w-5" aria-hidden="true">
                            <span
                                className={cn(
                                    'absolute left-0 top-0 h-[1.5px] w-full bg-white transition-transform duration-300',
                                    isOpen && 'translate-y-[6.5px] rotate-45'
                                )}
                                style={{ transitionTimingFunction: EASE }}
                            />
                            <span
                                className={cn(
                                    'absolute bottom-0 left-0 h-[1.5px] w-full bg-white transition-transform duration-300',
                                    isOpen && '-translate-y-[6.5px] -rotate-45'
                                )}
                                style={{ transitionTimingFunction: EASE }}
                            />
                        </span>
                    </button>
                </div>
            </header>

            {/* Mobile menu: full-screen dark panel with staggered links */}
            <div
                className={cn(
                    'fixed inset-0 z-[4999] flex items-center justify-center bg-[#262626] transition-[transform,opacity] duration-500 md:hidden',
                    isOpen ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-full opacity-0'
                )}
                style={{ transitionTimingFunction: EASE }}
                aria-hidden={!isOpen}
            >
                <nav aria-label="Mobile navigation" className="w-full px-[clamp(20px,5vw,40px)]">
                    <ul className="flex flex-col items-start gap-[clamp(30px,6vw,40px)]">
                        {[...navItems, { href: '#contact', label: "Let's talk" }].map((item, i) => (
                            <li key={item.href} className="overflow-hidden">
                                <a
                                    href={item.href}
                                    onClick={close}
                                    tabIndex={isOpen ? 0 : -1}
                                    className={cn(
                                        'block text-[clamp(24px,6vw,40px)] font-medium leading-[120%] tracking-[-0.02em] text-white transition-[opacity,transform,color] duration-500 hover:text-[#ccc]',
                                        isOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                                    )}
                                    style={{ transitionTimingFunction: EASE, transitionDelay: isOpen ? `${0.15 + i * 0.07}s` : '0s' }}
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </>
    );
}
