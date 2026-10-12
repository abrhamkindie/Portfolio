import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DESKTOP_QUERY = '(min-width: 1024px)';
const EASE = 'cubic-bezier(0.25,0.46,0.45,0.94)';

const prefersReducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Temporary placeholders, used until real projects exist.
const PLACEHOLDER_IMAGES = [
    '/images/work/showcase-1.svg',
    '/images/work/showcase-2.svg',
    '/images/work/showcase-3.svg',
    '/images/work/showcase-4.svg',
];

const PLACEHOLDER_ITEMS = [
    { title: 'E-commerce Platform', description: 'Online store with catalogue, cart and secure checkout.' },
    { title: 'Booking Dashboard', description: 'Admin tool for scheduling, payments and customer records.' },
    { title: 'Brand Identity System', description: 'Logo, colour and type system applied across web and print.' },
    { title: 'Analytics Portal', description: 'Real-time reporting with exportable charts and alerts.' },
];

/**
 * Dark, pinned project showcase, modelled on the site's featured-work block.
 * On desktop the section pins and scrubs through the project list; each row
 * activates in turn, the matching image cross-fades in on the right, and a
 * dash rail follows the active row. Mobile shows stacked cards without pinning.
 */
export function ImageShowcase({ projects }) {
    const items = (
        projects.length
            ? projects.slice(0, 4).map((p, i) => ({
                  id: p.id,
                  title: p.title,
                  description: p.description,
                  src: p.thumbnail || (Array.isArray(p.images) ? p.images[0] : null) || PLACEHOLDER_IMAGES[i % 4],
                  href: p.slug ? `/work/${p.slug}` : null,
              }))
            : PLACEHOLDER_ITEMS.map((p, i) => ({
                  id: `placeholder-${i}`,
                  ...p,
                  src: PLACEHOLDER_IMAGES[i],
                  href: null,
              }))
    );

    const [isDesktop, setIsDesktop] = useState(() =>
        typeof window !== 'undefined' ? window.matchMedia(DESKTOP_QUERY).matches : true
    );
    const [activeIndex, setActiveIndex] = useState(0);

    const sectionRef = useRef(null);
    const railRef = useRef(null);
    const rowRefs = useRef([]);
    const lastIndex = useRef(0);

    // Track the breakpoint so pinning switches on/off when the window is resized.
    useEffect(() => {
        const mql = window.matchMedia(DESKTOP_QUERY);
        const onChange = (e) => setIsDesktop(e.matches);
        mql.addEventListener('change', onChange);
        return () => mql.removeEventListener('change', onChange);
    }, []);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        const rail = railRef.current;
        const count = items.length;

        if (!section || !rail || count < 2 || !isDesktop || prefersReducedMotion()) {
            setActiveIndex(0);
            lastIndex.current = 0;
            return;
        }

        const ctx = gsap.context(() => {
            let centers = [];
            let thresholds = [];

            const measure = () => {
                centers = rowRefs.current.filter(Boolean).map((el) => el.offsetTop + el.offsetHeight / 2);
                thresholds = [];
                for (let i = 0; i < centers.length - 1; i++) {
                    thresholds.push((centers[i] + centers[i + 1]) / 2);
                }
                if (centers[0] != null) gsap.set(rail, { y: centers[0] - rail.offsetHeight / 2 });
            };
            measure();

            const moveRail = gsap.quickTo(rail, 'y', { duration: 0.12, ease: 'power1.out', overwrite: 'auto' });

            const trigger = ScrollTrigger.create({
                trigger: section,
                start: 'top top',
                end: () => `+=${(count - 1) * window.innerHeight}`,
                pin: true,
                pinSpacing: true,
                scrub: 1,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onRefresh: measure,
                onUpdate: (self) => {
                    if (!self.isActive || centers.length === 0) return;
                    const start = centers[0];
                    const pos = start + (centers[centers.length - 1] - start) * self.progress;
                    moveRail(pos - rail.offsetHeight / 2);

                    let idx = 0;
                    while (idx < thresholds.length && pos >= thresholds[idx]) idx++;
                    if (idx !== lastIndex.current) {
                        lastIndex.current = idx;
                        setActiveIndex(idx);
                    }
                },
            });

            ScrollTrigger.refresh();
            return () => trigger.kill();
        }, section);

        return () => ctx.revert();
    }, [items.length, isDesktop]);

    const selectRow = (index) => {
        const section = sectionRef.current;
        if (!section || !isDesktop || prefersReducedMotion()) {
            setActiveIndex(index);
            return;
        }
        const start = section.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: start + index * window.innerHeight, behavior: 'smooth' });
    };

    if (items.length === 0) return null;

    return (
        <section
            id="showcase"
            ref={sectionRef}
            data-cursor="dot-invert"
            className="dark-section relative w-full overflow-hidden bg-[#262626] text-white"
        >
            {/* Desktop: pinned list + image */}
            <div className="hidden h-screen lg:block">
                <div className="section-container flex h-full items-center gap-[clamp(30px,6vw,120px)] pb-10 pt-28">
                    {/* Left: project list */}
                    <div className="relative flex min-w-0 basis-[44%] items-center">
                        <div className="relative w-full py-6">
                            <div
                                ref={railRef}
                                aria-hidden="true"
                                className="pointer-events-none absolute -left-2 top-0 flex h-10 w-[5%] items-center justify-center text-[20px] font-medium text-white/95"
                            >
                                -
                            </div>

                            <div className="flex flex-col">
                                {items.map((item, i) => {
                                    const active = activeIndex === i;
                                    return (
                                        <button
                                            key={item.id ?? i}
                                            type="button"
                                            ref={(el) => (rowRefs.current[i] = el)}
                                            onClick={() => selectRow(i)}
                                            data-cursor="dot-hover"
                                            className="group flex w-full cursor-pointer border-b border-white/10 py-7 text-left"
                                        >
                                            <span className="flex min-w-0 flex-1 flex-col">
                                                <span
                                                    data-text={item.title}
                                                    className={`relative text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-tight tracking-[-0.01em] transition-all duration-[800ms] ${EASE_CLASS} ${
                                                        active
                                                            ? 'translate-x-[10px] text-[#6b6b6b] silver-shine'
                                                            : 'text-white/30 group-hover:text-white/60'
                                                    }`}
                                                >
                                                    {item.title}
                                                </span>
                                                {item.description && (
                                                    <span
                                                        className={`mt-3 text-[clamp(0.95rem,1.5vw,1.125rem)] leading-relaxed transition-colors duration-[800ms] ${EASE_CLASS} ${
                                                            active ? 'text-white/80' : 'text-white/50'
                                                        }`}
                                                    >
                                                        {item.description}
                                                    </span>
                                                )}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Right: image stack, cross-faded by active index */}
                    <div className="relative flex h-full min-w-0 flex-[1.3] basis-[56%] items-center justify-center">
                        <div className="relative h-full w-full overflow-hidden rounded-[clamp(16px,2vw,20px)] bg-[#111]">
                            {items.map((item, i) => (
                                <a
                                    key={item.id ?? i}
                                    href={item.href || undefined}
                                    data-cursor={item.href ? 'project' : undefined}
                                    data-cursor-text={item.href ? 'Go to project' : undefined}
                                    className={`absolute inset-0 transition-opacity duration-[1200ms] ${EASE_CLASS} ${
                                        activeIndex === i ? 'opacity-100' : 'pointer-events-none opacity-0'
                                    }`}
                                >
                                    <img
                                        src={item.src}
                                        alt={item.title}
                                        loading={i === 0 ? 'eager' : 'lazy'}
                                        className={`h-full w-full rounded-[clamp(16px,2vw,20px)] object-cover object-center transition-transform duration-[800ms] ${EASE_CLASS} ${
                                            activeIndex === i ? 'scale-[1.03]' : 'scale-100'
                                        }`}
                                    />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile / tablet: stacked cards, no pinning */}
            <div className="section-container flex flex-col gap-10 py-20 lg:hidden">
                {items.map((item, i) => (
                    <a
                        key={`m-${item.id ?? i}`}
                        href={item.href || undefined}
                        className="block"
                    >
                        <div className="relative mb-5 h-[clamp(220px,62vw,360px)] w-full overflow-hidden rounded-[clamp(14px,3vw,18px)] bg-[#111]">
                            <img src={item.src} alt={item.title} loading="lazy" className="h-full w-full object-cover" />
                        </div>
                        <h2 className="mb-2 text-[clamp(1.4rem,6vw,1.9rem)] font-semibold text-white">{item.title}</h2>
                        {item.description && <p className="text-white/70">{item.description}</p>}
                    </a>
                ))}
            </div>
        </section>
    );
}

const EASE_CLASS = '[transition-timing-function:cubic-bezier(0.25,0.46,0.45,0.94)]';
