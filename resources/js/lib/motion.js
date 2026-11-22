import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const isOnScreen = (el) => {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
};

/**
 * Fade + rise elements into view as soon as they reach the viewport.
 *
 * This intentionally uses IntersectionObserver rather than ScrollTrigger: the
 * observer re-measures whenever lazy images or webfonts shift the layout, so a
 * reveal can never be left stranded at opacity 0. Elements that are already on
 * screen animate immediately (nothing is hidden while the page settles), and a
 * short failsafe re-checks anything the observer missed.
 */
export function useReveal({ selector = null, y = 24, stagger = 0.08, duration = 0.55 } = {}) {
    const ref = useRef(null);

    useEffect(() => {
        const root = ref.current;
        if (!root) return;

        const targets = selector ? Array.from(root.querySelectorAll(selector)) : [root];
        if (targets.length === 0 || prefersReducedMotion()) return;

        // Keep the whole cascade short, however many items a section has.
        const step = Math.min(stagger, 0.5 / targets.length);

        const reveal = (el, index = 0) =>
            gsap.to(el, {
                y: 0,
                opacity: 1,
                duration,
                delay: index * step,
                ease: 'power2.out',
                overwrite: 'auto',
                clearProps: 'willChange',
            });

        const hide = (el) => gsap.set(el, { y, opacity: 0, willChange: 'opacity, transform' });

        const observer = new IntersectionObserver(
            (entries) => {
                const entering = entries.filter((entry) => entry.isIntersecting);
                entering.forEach((entry) => observer.unobserve(entry.target));
                entering.forEach((entry, index) => reveal(entry.target, index));
            },
            { threshold: 0.05, rootMargin: '0px 0px -6% 0px' }
        );

        const onScreen = [];
        targets.forEach((el) => {
            if (isOnScreen(el)) {
                onScreen.push(el);
            } else {
                hide(el);
                observer.observe(el);
            }
        });
        onScreen.forEach((el, index) => reveal(el, index));

        // Never leave visible content dark, even if an observer callback is missed.
        const failsafe = window.setTimeout(() => {
            targets.forEach((el) => {
                if (isOnScreen(el) && Number(gsap.getProperty(el, 'opacity')) < 0.99) {
                    observer.unobserve(el);
                    reveal(el);
                }
            });
        }, 1200);

        return () => {
            window.clearTimeout(failsafe);
            observer.disconnect();
            gsap.killTweensOf(targets);
        };
    }, [selector, y, stagger, duration]);

    return ref;
}

/** Wipe-in for horizontal rules: each row's top border draws from left to right. */
export function useRuleDraw({ selector = 'li' } = {}) {
    const ref = useRef(null);

    useEffect(() => {
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
