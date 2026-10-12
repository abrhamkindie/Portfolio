import { useLayoutEffect, useRef } from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { groupBy } from '@/lib/utils';
import { gsap, ScrollTrigger } from '@/lib/motion';

/**
 * Services section, modelled on the site's pinned stack: each category is a
 * card that slides up over the previous one while the list is pinned. The
 * previous card's description collapses as the next one arrives.
 */
export function Skills({ skills }) {
    const grouped = groupBy(skills, 'category');
    const entries = Object.entries(grouped);
    const wrapRef = useRef(null);
    const cardRefs = useRef([]);

    useLayoutEffect(() => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const cards = cardRefs.current.filter(Boolean);
        if (reduce || cards.length < 2 || !wrapRef.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: wrapRef.current,
                    pin: true,
                    start: 'top top+=90',
                    end: () => `+=${cards.length * 60}%`,
                    scrub: 1,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });

            cards.forEach((card, i) => {
                if (i === 0) return;
                tl.fromTo(
                    card,
                    { y: 200, opacity: 0 },
                    { y: -(20 * i), opacity: 1, duration: 0.5 },
                    i * 0.5
                );
            });
        }, wrapRef);

        return () => ctx.revert();
    }, [skills]);

    return (
        <section id="skills" className="section-container py-24 lg:py-40">
            <SectionHeader
                label="Our services"
                title="Skills"
                subtitle="Where creativity meets engineering. The disciplines and tools I use to ship."
            />

            <div ref={wrapRef} className="relative min-h-[60vh]">
                {entries.map(([category, items], i) => (
                    <div
                        key={category}
                        ref={(el) => (cardRefs.current[i] = el)}
                        className="border-t border-[#262626] bg-white py-10 lg:py-14"
                        style={{ position: 'relative', zIndex: i + 1 }}
                    >
                        <div className="grid gap-6 lg:grid-cols-[80px_1fr_1fr]">
                            <span className="text-sm text-[#7b7b7b]">{String(i + 1).padStart(2, '0')}</span>
                            <h3 className="text-[clamp(24px,3vw,44px)] font-semibold tracking-[-0.02em] text-[#262626]">
                                {category}
                            </h3>
                            <ul className="flex flex-wrap gap-x-6 gap-y-3 text-base text-[#373737]">
                                {items.map((skill) => (
                                    <li key={skill.id} className="flex items-baseline gap-2">
                                        <span>{skill.name}</span>
                                        <span className="text-xs text-[#7b7b7b]">{skill.proficiency}%</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
