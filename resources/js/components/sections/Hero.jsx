import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Avatar } from '@/components/sections/Avatar';

const marqueeWords = ['Web development', 'Design', 'Web deployment', 'Management', 'Laravel', 'React', 'Cloud', 'Product'];

const highlights = [
    { value: '5+', label: 'Years building' },
    { value: '50+', label: 'Projects shipped' },
    { value: '30+', label: 'Technologies' },
];

export function Hero({ profile, onProfileChange, editable = false }) {
    const name = profile?.full_name || 'John Doe';
    const title = profile?.title || 'Full Stack Developer';
    const bio = profile?.bio || 'I design, build and run websites and web apps, from the first wireframe to ongoing maintenance.';
    const location = profile?.location;

    const rootRef = useRef(null);
    const trackRef = useRef(null);

    useLayoutEffect(() => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const ctx = gsap.context(() => {
            if (reduce) return;

            const tl = gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.25 });
            tl.fromTo('[data-hero-eyebrow]', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
                .fromTo('[data-line]', { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.12 }, '-=0.3')
                .fromTo('[data-hero-fade]', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 }, '-=0.7')
                .fromTo('[data-hero-photo]', { scale: 0.94, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2 }, '-=1');

            gsap.to('[data-hero-photo-inner]', {
                yPercent: 6,
                ease: 'none',
                scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: true },
            });
        }, rootRef);

        const track = trackRef.current;
        const marquee = !reduce && track ? gsap.to(track, { xPercent: -50, duration: 40, ease: 'none', repeat: -1 }) : null;

        return () => {
            marquee?.kill();
            ctx.revert();
        };
    }, []);

    return (
        <>
            <section ref={rootRef} className="section-container relative flex min-h-[calc(100vh-76px)] items-center pt-[76px]">
                <div className="grid w-full items-center gap-12 py-16 lg:grid-cols-12 lg:gap-16 lg:py-24">
                    <div className="lg:col-span-7">
                        <p data-hero-eyebrow className="inline-flex items-center gap-2 rounded-full border border-[#262626]/20 px-3 py-1 text-xs font-medium text-[#373737]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#262626]" />
                            {location ? `Based in ${location}` : 'Available for new projects'}
                        </p>

                        <h1 className="mt-8 text-[clamp(44px,6.4vw,104px)] font-semibold leading-[1.02] tracking-[-0.045em] text-[#262626]">
                            <span className="block overflow-hidden pb-[0.08em]">
                                <span data-line className="block">{name}</span>
                            </span>
                            <span className="block overflow-hidden pb-[0.08em]">
                                <span data-line className="block text-[#7b7b7b]">{title}.</span>
                            </span>
                        </h1>

                        <p data-hero-fade className="mt-8 max-w-xl text-[clamp(16px,1.4vw,20px)] leading-relaxed text-[#373737]">
                            {bio}
                        </p>

                        <div data-hero-fade className="mt-10 flex flex-wrap items-center gap-4">
                            <a href="#contact" data-cursor="hover" className="btn-primary">Start a project</a>
                            <a href="#projects" data-cursor="hover" className="btn-outline">View work</a>
                        </div>

                        <dl data-hero-fade className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-[#262626] pt-6">
                            {highlights.map((h) => (
                                <div key={h.label}>
                                    <dt className="order-2 text-xs text-[#7b7b7b]">{h.label}</dt>
                                    <dd className="order-1 text-3xl font-semibold tracking-[-0.03em] text-[#262626] sm:text-4xl">{h.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                    <div data-hero-photo className="lg:col-span-5 lg:justify-self-end">
                        <div data-hero-photo-inner className="relative">
                            <Avatar profile={profile} onChange={onProfileChange} editable={editable} />
                            <div className="pointer-events-none absolute -bottom-4 -left-4 hidden h-full w-full -z-10 border border-[#262626]/20 sm:block" aria-hidden="true" />
                        </div>
                    </div>
                </div>
            </section>

            <div className="overflow-hidden border-y border-[#262626]/10 py-6">
                <div ref={trackRef} className="flex w-max gap-12 whitespace-nowrap text-[clamp(20px,3vw,40px)] font-medium text-[#262626] will-change-transform">
                    {[...marqueeWords, ...marqueeWords].map((word, i) => (
                        <span key={i} className="flex items-center gap-12">
                            {word}
                            <span className="text-[#7b7b7b]">•</span>
                        </span>
                    ))}
                </div>
            </div>
        </>
    );
}
