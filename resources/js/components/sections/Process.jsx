import { Fragment, useLayoutEffect, useRef, useState } from 'react';
import { useReveal, gsap } from '@/lib/motion';

// Stage copy shown in the left column. `pill` is the label on the curve.
const stages = [
    {
        step: 'Step 1',
        title: 'Understanding Client Needs',
        pill: 'Discovery',
        description:
            'The initial briefing phase involves a series of meetings with the client to thoroughly understand their requirements, desired functionalities, and design preferences. This step is crucial for aligning our vision with the client\u2019s expectations and setting the foundation for the entire project.',
    },
    {
        step: 'Step 2',
        title: 'Concept',
        pill: 'Concept',
        description:
            'We develop strategic wireframes to define the project\u2019s structure, user flow, and functionality from the very beginning. This process helps align the visual direction and user experience, ensuring a solid foundation before moving into the creative design phase.',
    },
    {
        step: 'Step 3',
        title: 'Creative Design',
        pill: 'Creative Design',
        description:
            'We create visually engaging, modern, and user-centered interfaces that seamlessly align with the client\u2019s brand identity and business objectives. Every design is carefully crafted to deliver an intuitive user experience while enhancing the overall visual impact of the project.',
    },
    {
        step: 'Step 4',
        title: 'Development',
        pill: 'Development',
        description:
            'The development phase focuses on transforming the design into a fully functional digital experience using robust, scalable, and high-performance technologies. Our approach ensures reliability, speed, and seamless performance across all devices and platforms.',
    },
    {
        step: 'Step 5',
        title: 'Testing',
        pill: 'Testing',
        description:
            'We rigorously test the project to ensure it meets the highest quality standards and functions seamlessly across all platforms.',
    },
    {
        step: 'Step 6',
        title: 'Project Launch',
        pill: 'Project Launch',
        description:
            'The final phase involves launching the project and ensuring a smooth transition to the live environment, ready for users.',
    },
    {
        step: 'Step 7',
        title: 'Ongoing Support',
        pill: 'Ongoing Support',
        description:
            'We provide ongoing support and maintenance to ensure the project continues to perform optimally and meets evolving needs.',
    },
];

// Timeline spacing: each stage occupies STEP units. Stage i's pill appears at i*STEP
// and the curve reaches pillFractions[i] at the same moment.
const STEP = 0.65;
const pillFractions = [0, 0.12, 0.33, 0.48, 0.64, 0.76, 0.98];
// Small rotation per pill, in degrees, matching the site's hand-placed labels.
const pillRotations = [0, 0, 0, -4, 1, 4, 0];
const CURVE_PATH = 'M0,30 C800,0 630,112 500,115 C50,100 -250,190 90,220 C1060,250 300,350 310,340';

/** Split text into word spans so each word can animate on its own. */
function Words({ text }) {
    return text.split(' ').map((word, i, all) => (
        <Fragment key={`${word}-${i}`}>
            <span className="word inline-block">{word}</span>
            {i < all.length - 1 && ' '}
        </Fragment>
    ));
}

/**
 * Process section mirroring escolhadigital.com/process. On desktop the section
 * pins while the user scrolls. A single timeline drives the curve, the pill
 * reveals and the left-hand stage copy, so they stay in step. Changing stage
 * animates the old words out and the new words in. Below 1024px the stages
 * render as a plain list.
 */
export function Process() {
    const introRef = useReveal({ selector: '[data-reveal]', y: 30, stagger: 0.1 });
    const sectionRef = useRef(null);
    const curveRef = useRef(null);
    const pillRefs = useRef([]);
    const copyRef = useRef(null);
    const [active, setActive] = useState(0); // stage the scroll position points at
    const [shown, setShown] = useState(-1); // stage currently rendered in the copy block
    const [isDesktop, setIsDesktop] = useState(() =>
        typeof window !== 'undefined' ? window.matchMedia('(min-width: 1025px)').matches : true
    );

    useLayoutEffect(() => {
        const media = window.matchMedia('(min-width: 1025px)');
        const onChange = () => setIsDesktop(media.matches);
        media.addEventListener('change', onChange);
        return () => media.removeEventListener('change', onChange);
    }, []);

    // Pinned, scrubbed timeline: curve, pills and active stage share one clock.
    useLayoutEffect(() => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const section = sectionRef.current;
        const curve = curveRef.current;
        const pills = pillRefs.current.filter(Boolean);
        if (!isDesktop || reduce || !section || !curve || pills.length === 0) return;

        const length = curve.getTotalLength();
        const ctx = gsap.context(() => {
            gsap.set(curve, { strokeDasharray: length, strokeDashoffset: length * (1 - pillFractions[0]) });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    pin: true,
                    start: 'center center',
                    end: () => `+=${Math.max(2200, 1200 * stages.length)}`,
                    scrub: 1,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        const time = self.progress * tl.duration();
                        const index = Math.min(stages.length - 1, Math.floor(time / STEP + 1e-6));
                        setActive(Math.max(0, index));
                    },
                },
            });

            stages.forEach((_, i) => {
                const start = i * STEP;
                const nextFraction = pillFractions[Math.min(i + 1, pillFractions.length - 1)];
                tl.to(curve, { strokeDashoffset: length * (1 - nextFraction), duration: 0.5, ease: 'none' }, start);
                tl.to(
                    pills[i],
                    {
                        opacity: 1,
                        duration: 0.25,
                        ease: 'power2.out',
                        onStart: () => {
                            pills[i].style.visibility = 'visible';
                        },
                        onReverseComplete: () => {
                            pills[i].style.visibility = 'hidden';
                        },
                    },
                    start
                );
            });
        }, section);

        return () => ctx.revert();
    }, [isDesktop]);

    // Place pills on the curve at their path fractions. Re-run on resize.
    useLayoutEffect(() => {
        if (!isDesktop) return;
        const curve = curveRef.current;
        if (!curve) return;

        const place = () => {
            const svg = curve.ownerSVGElement;
            const ctm = curve.getScreenCTM();
            if (!svg || !ctm) return;
            const parent = svg.parentElement.getBoundingClientRect();
            const length = curve.getTotalLength();

            pillRefs.current.forEach((pill, index) => {
                if (!pill) return;
                const point = curve.getPointAtLength(length * pillFractions[index]);
                const screen = new DOMPoint(point.x, point.y).matrixTransform(curve.getScreenCTM());
                pill.style.left = `${screen.x - parent.left}px`;
                pill.style.top = `${screen.y - parent.top}px`;
                pill.style.transform = `translate(-50%, -50%) rotate(${pillRotations[index]}deg)`;
            });
        };

        place();
        const observer = new ResizeObserver(place);
        observer.observe(curve.ownerSVGElement.parentElement);
        window.addEventListener('resize', place);
        return () => {
            observer.disconnect();
            window.removeEventListener('resize', place);
        };
    }, [isDesktop]);

    // Out-then-in text swap, following the site: words fade up out (.25s), the
    // new stage is rendered, then words rise in (.5s, staggered).
    useLayoutEffect(() => {
        const el = copyRef.current;
        if (shown < 0) {
            setShown(active);
            return;
        }
        if (!el || active === shown) {
            if (el) gsap.to(el.querySelectorAll('.word'), { opacity: 1, y: 0, duration: 0.2 });
            return;
        }
        const out = gsap.to(el.querySelectorAll('.word'), {
            opacity: 0,
            y: -20,
            duration: 0.25,
            stagger: 0.02,
            ease: 'power2.in',
            onComplete: () => setShown(active),
        });
        return () => out.kill();
    }, [active]);

    useLayoutEffect(() => {
        const el = copyRef.current;
        if (shown < 0 || !el) return;
        const tween = gsap.fromTo(
            el.querySelectorAll('.word'),
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.04, ease: 'power2.out' }
        );
        return () => tween.kill();
    }, [shown]);

    const current = shown >= 0 ? stages[shown] : null;

    return (
        <section id="process" className="bg-white text-[#0b001a]">
            <div
                ref={introRef}
                className="mx-auto flex w-full max-w-[1920px] flex-col items-center gap-[clamp(30px,4vh,60px)] px-[clamp(20px,3vw,80px)] pb-[clamp(30px,4vh,60px)] pt-[clamp(40px,5vh,80px)] text-center"
            >
                <p data-reveal className="text-[clamp(10px,0.8vw,16px)] uppercase leading-none">
                    Our process
                </p>
                <h2 data-reveal className="max-w-[1100px] text-[clamp(32px,3.8vw,72px)] font-semibold leading-[1.1] tracking-[-0.02em]">
                    Explore our journey and how we turn ideas into incredible results.
                </h2>
            </div>

            {isDesktop ? (
                <div
                    ref={sectionRef}
                    className="mx-auto grid w-full max-w-[1920px] place-items-center gap-[clamp(60px,8vw,100px)] px-[clamp(20px,3vw,60px)] py-[clamp(60px,8vw,100px)]"
                    style={{ minHeight: 'clamp(400px,50vh,586px)' }}
                >
                    <div className="flex w-full max-w-[1640px] items-center justify-between gap-[clamp(40px,5vw,70px)]">
                        <div className="flex min-h-[clamp(300px,35vh,386px)] w-[52%] flex-col justify-center">
                            {current && (
                                <div ref={copyRef} className="flex flex-col gap-3">
                                    <p className="text-[clamp(12px,1.2vw,14px)] uppercase">
                                        <Words text={current.step} />
                                    </p>
                                    <h3 className="max-w-[clamp(300px,80%,567px)] text-[clamp(18px,2vw,22px)] font-medium leading-[160%]">
                                        <Words text={current.title} />
                                    </h3>
                                    <p className="text-[clamp(14px,1.5vw,16px)] leading-[187.5%] tracking-[-0.75px] text-[#373737]">
                                        <Words text={current.description} />
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="relative flex min-h-[clamp(260px,30vh,340px)] w-[44%] flex-col items-end justify-center">
                            <svg
                                className="pointer-events-none absolute left-0 top-0 h-full w-full overflow-visible"
                                viewBox="-35 -6 623 376"
                                preserveAspectRatio="none"
                                aria-hidden="true"
                            >
                                <path
                                    ref={curveRef}
                                    d={CURVE_PATH}
                                    stroke="black"
                                    fill="none"
                                    strokeWidth="2"
                                    vectorEffect="non-scaling-stroke"
                                />
                            </svg>

                            {stages.map((stage, index) => (
                                <div
                                    key={stage.pill}
                                    ref={(el) => (pillRefs.current[index] = el)}
                                    className="absolute flex cursor-default items-center justify-center whitespace-nowrap rounded-[50px] border border-white bg-[#262626] px-[clamp(16px,1.8vw,20px)] py-[clamp(8px,1vw,10px)] text-[clamp(16px,1.6vw,18px)] font-medium leading-none text-white"
                                    style={{
                                        height: 'clamp(50px,5vw,60px)',
                                        opacity: 0,
                                        visibility: 'hidden',
                                        zIndex: 3,
                                    }}
                                >
                                    {stage.pill}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <ol className="mx-auto flex w-full max-w-[1440px] flex-col px-5 sm:px-8">
                    {stages.map((stage) => (
                        <li key={stage.pill} className="border-t border-[#262626] py-6 last:border-b">
                            <p className="text-xs uppercase">{stage.step}</p>
                            <h3 className="mt-2 text-xl font-medium">{stage.title}</h3>
                            <p className="mt-3 text-sm leading-[187.5%] text-[#373737]">{stage.description}</p>
                        </li>
                    ))}
                </ol>
            )}
        </section>
    );
}
