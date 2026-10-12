import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

/**
 * Page-load curtain, adapted from the site's TransitionProvider: a dark panel
 * covers the screen, then slides away revealing the page. Runs once per load.
 */
export function PageIntro({ onDone }) {
    const overlayRef = useRef(null);
    const [done, setDone] = useState(false);

    useLayoutEffect(() => {
        const overlay = overlayRef.current;
        if (!overlay) return;
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (reduce) {
            setDone(true);
            onDone?.();
            return;
        }

        const tl = gsap.timeline({
            onComplete: () => {
                setDone(true);
                onDone?.();
            },
        });

        tl.to(overlay.querySelector('[data-mark]'), {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power3.out',
        })
            .to(overlay.querySelector('[data-mark]'), { opacity: 0, y: -10, duration: 0.3, ease: 'power2.in' }, '+=0.25')
            .to(overlay, { yPercent: -100, duration: 0.9, ease: 'power4.inOut' });

        return () => tl.kill();
    }, [onDone]);

    if (done) return null;

    return (
        <div
            ref={overlayRef}
            aria-hidden="true"
            className="fixed inset-0 z-[90] flex items-center justify-center bg-[#262626]"
        >
            <p
                data-mark
                className="translate-y-3 text-2xl font-semibold tracking-[-0.03em] text-white opacity-0"
            >
                Portfolio
            </p>
        </div>
    );
}
