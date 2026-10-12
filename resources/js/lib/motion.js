import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Fade + rise a container's direct children (or the element itself) into view
 * when it scrolls into the viewport. Mirrors the site's staggered reveal.
 */
export function useReveal({ selector = null, y = 40, stagger = 0.12, start = 'top 85%' } = {}) {
    const ref = useRef(null);

    useLayoutEffect(() => {
        const root = ref.current;
        if (!root) return;

        const targets = selector ? root.querySelectorAll(selector) : [root];
        if (prefersReducedMotion() || targets.length === 0) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                targets,
                { y, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.9,
                    ease: 'power3.out',
                    stagger,
                    scrollTrigger: { trigger: root, start, once: true },
                }
            );
        }, root);

        return () => ctx.revert();
    }, [selector, y, stagger, start]);

    return ref;
}

/** Wipe-in for horizontal rules: each row's top border draws from left to right. */
export function useRuleDraw({ selector = 'li' } = {}) {
    const ref = useRef(null);

    useLayoutEffect(() => {
        const root = ref.current;
        if (!root) return;
        const rows = root.querySelectorAll(selector);
        if (prefersReducedMotion() || rows.length === 0) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                rows,
                { '--rule': '0%' },
                {
                    '--rule': '100%',
                    duration: 0.8,
                    ease: 'power2.out',
                    stagger: 0.1,
                    scrollTrigger: { trigger: root, start: 'top 85%', once: true },
                }
            );
        }, root);

        return () => ctx.revert();
    }, [selector]);

    return ref;
}

/** Count a numeric string up to its value when scrolled into view. */
export function countUp(el, value) {
    const match = String(value).match(/^(\d+)(.*)$/);
    if (!match || prefersReducedMotion()) return;
    const target = parseInt(match[1], 10);
    const suffix = match[2];
    const obj = { v: 0 };
    gsap.to(obj, {
        v: target,
        duration: 1.4,
        ease: 'power2.out',
        onUpdate: () => {
            el.textContent = `${Math.round(obj.v)}${suffix}`;
        },
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
}

export { gsap, ScrollTrigger };
