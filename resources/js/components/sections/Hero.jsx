import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function Hero({ profile }) {
    const name = profile?.full_name || 'Abrham';
    const [firstName, ...restName] = name.trim().split(/\s+/);
    const lastName = restName.join(' ');
    const title = profile?.title || 'Full Stack Developer';
    const bio =
        profile?.bio ||
        'Transform your ideas into cutting-edge web solutions. We craft high-performance websites and applications tailored to your business.';

    const rootRef = useRef(null);

    useLayoutEffect(() => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce) return;

        const ctx = gsap.context(() => {
            // Main typographic reveal
            gsap.fromTo(
                '[data-hero-text]',
                { y: '100%', opacity: 0 },
                { 
                    y: 0, 
                    opacity: 1, 
                    duration: 1.8, 
                    ease: 'expo.out', 
                    stagger: 0.1,
                    delay: 0.5
                }
            );

            // Subtle background scale
            gsap.fromTo(
                '[data-hero-image]',
                { scale: 1.1, opacity: 0 },
                {
                    scale: 1,
                    opacity: 0.15,
                    duration: 2.5,
                    ease: 'power2.out'
                }
            );

            // Floating lines
            gsap.fromTo(
                '[data-hero-line]',
                { scaleX: 0 },
                { scaleX: 1, duration: 1.5, ease: 'expo.inOut', delay: 0.2 }
            );
        }, rootRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={rootRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-32 lg:pt-0">
            {/* Immersive Background */}
            <div 
                data-hero-image
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat grayscale pointer-events-none"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop")' }}
            />
            
            {/* Central Content */}
            <div className="section-container relative z-10 w-full text-center lg:text-left">
                <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-20 items-center">
                    <div className="flex flex-col relative">
                        <div data-hero-line className="absolute -top-12 left-0 w-24 h-[1px] bg-primary origin-left" />
                        <span data-hero-text className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-8 block opacity-0">
                            {title} · Available for projects
                        </span>
                        
                        <h1 className="flex flex-col">
                            <span
                                data-hero-text
                                className="text-[10vw] font-bold leading-[0.85] tracking-tighter text-white opacity-0 lg:text-[7rem]"
                            >
                                {firstName}
                            </span>
                            {lastName ? (
                                <span
                                    data-hero-text
                                    className="border-text text-[10vw] font-bold leading-[0.85] tracking-tighter opacity-0 lg:text-[7rem]"
                                >
                                    {lastName}
                                </span>
                            ) : null}
                        </h1>
                        <p
                            data-hero-text
                            className="mt-6 max-w-xl text-2xl font-medium leading-snug text-white/45 opacity-0 lg:text-3xl"
                        >
                            Building considered digital products with clarity and craft.
                        </p>
                    </div>

                    <div className="flex flex-col items-center lg:items-start lg:mt-40">
                        <div data-hero-text className="opacity-0 max-w-sm">
                            <p className="text-xl lg:text-2xl text-white/40 leading-tight mb-12 font-medium">
                                {bio}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6">
                                <a 
                                    href="#contact" 
                                    className="btn-primary"
                                >
                                    Start a Project
                                </a>
                                <a 
                                    href="#projects" 
                                    className="btn-outline group"
                                >
                                    View Work
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Anchor */}
            <div className="absolute bottom-12 right-12 hidden lg:flex items-center gap-6">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Scroll to explore</span>
                <div className="w-12 h-[1px] bg-white/10" />
            </div>
        </section>
    );
}
