import { useEffect, useRef, useState } from 'react';
import { Code, Palette, Rocket, Settings } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';

/**
 * Circular services orbit, modelled on the site's /service page: service
 * nodes sit on a ring that slowly rotates, with a rotating text ring at the
 * centre. Clicking a node stops the rotation, brings it to the front, and
 * opens a card listing its items.
 */
const iconMap = { code: Code, palette: Palette, rocket: Rocket, settings: Settings };

export const defaultServices = [
    {
        id: 'web-development',
        title: 'Web Development',
        icon: 'code',
        items: ['Laravel & PHP', 'React & Inertia', 'APIs & integrations', 'Performance & security'],
    },
    {
        id: 'design',
        title: 'Design',
        icon: 'palette',
        items: ['UI / UX design', 'Design systems', 'Prototyping', 'Brand identity'],
    },
    {
        id: 'deployment',
        title: 'Web Deployment',
        icon: 'rocket',
        items: ['CI/CD pipelines', 'Cloud hosting', 'Docker & containers', 'Domain & SSL setup'],
    },
    {
        id: 'management',
        title: 'Management',
        icon: 'settings',
        items: ['Maintenance & updates', 'Monitoring & backups', 'Hosting support', 'Ongoing improvements'],
    },
];

const RING_RADIUS = 200;
const ROTATE_STEP = 0.3; // degrees per tick
const TICK_MS = 50;

export function ServiceOrbit({ services = defaultServices }) {
    const [angle, setAngle] = useState(0);
    const [paused, setPaused] = useState(false);
    const [activeId, setActiveId] = useState(null);
    const timer = useRef(null);

    useEffect(() => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce || paused) return;
        timer.current = setInterval(() => {
            setAngle((a) => Number(((a + ROTATE_STEP) % 360).toFixed(3)));
        }, TICK_MS);
        return () => clearInterval(timer.current);
    }, [paused]);

    const count = services.length;
    const open = (id) => {
        if (activeId === id) {
            setActiveId(null);
            setPaused(false);
            return;
        }
        setActiveId(id);
        setPaused(true);
    };

    return (
        <section id="services" className="section-container py-24 lg:py-40">
            <SectionHeader
                label="What we do"
                title="Services"
                subtitle="Web development, design, deployment and management, all in one place."
            />

            <div className="relative mx-auto h-[min(560px,90vw)] w-[min(560px,90vw)]">
                {/* Orbit guide ring */}
                <div className="absolute inset-[8%] rounded-full border border-[#262626]/15" aria-hidden="true" />
                <div className="absolute inset-[24%] rounded-full border border-dashed border-[#262626]/10" aria-hidden="true" />

                {/* Centre: rotating text ring (SVG textPath, like the site) */}
                <div className="absolute left-1/2 top-1/2 h-[34%] w-[34%] -translate-x-1/2 -translate-y-1/2">
                    <svg viewBox="0 0 130 130" className="h-full w-full animate-[spin_24s_linear_infinite]" style={{ animationPlayState: paused ? 'paused' : 'running' }} aria-hidden="true">
                        <defs>
                            <path id="orbit-text-path" d="M 65,65 m -52,0 a 52,52 0 1,1 104,0 a 52,52 0 1,1 -104,0" />
                        </defs>
                        <text fontSize="8.5" fill="#7b7b7b" fontWeight="600" letterSpacing="1.5">
                            <textPath href="#orbit-text-path" textLength="326" lengthAdjust="spacing">
                                WEB · DESIGN · DEPLOYMENT · MANAGEMENT ·
                            </textPath>
                        </text>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="rounded-full bg-[#262626] px-4 py-2 text-xs font-medium uppercase tracking-[0.06em] text-white">
                            {activeId ? 'Selected' : 'Click'}
                        </span>
                    </div>
                </div>

                {/* Nodes on the ring */}
                {services.map((service, i) => {
                    const base = (i / count) * 360;
                    const rad = ((base + angle) % 360) * (Math.PI / 180);
                    const x = Math.cos(rad) * RING_RADIUS;
                    const y = Math.sin(rad) * RING_RADIUS;
                    const depth = (1 + Math.sin(rad)) / 2;
                    const isActive = activeId === service.id;
                    const Icon = iconMap[service.icon] || Code;

                    return (
                        <button
                            key={service.id}
                            type="button"
                            onClick={() => open(service.id)}
                            data-cursor="hover"
                            aria-expanded={isActive}
                            className="absolute left-1/2 top-1/2 flex flex-col items-center gap-2 transition-[opacity] duration-300"
                            style={{
                                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${isActive ? 1 : 0.75 + 0.35 * depth})`,
                                zIndex: isActive ? 200 : Math.round(100 + 60 * Math.sin(rad)),
                                opacity: isActive ? 1 : 0.3 + 0.7 * depth,
                            }}
                        >
                            <span
                                className={
                                    'flex h-14 w-14 items-center justify-center rounded-full border border-[#262626] transition-colors duration-300 ' +
                                    (isActive ? 'bg-[#262626] text-white' : 'bg-white text-[#262626]')
                                }
                            >
                                <Icon size={20} />
                            </span>
                            <span className="whitespace-nowrap text-xs font-medium text-[#262626]">{service.title}</span>
                        </button>
                    );
                })}
            </div>

            {/* Detail card for the selected service */}
            <div className="mx-auto mt-12 max-w-xl min-h-[140px]" aria-live="polite">
                {services
                    .filter((s) => s.id === activeId)
                    .map((service) => (
                        <div key={service.id} className="border-t border-[#262626] pt-6">
                            <p className="section-label">{service.title}</p>
                            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                                {service.items.map((item) => (
                                    <li key={item} className="flex items-center gap-3 text-base text-[#262626]">
                                        <span className="h-px w-4 bg-[#262626]" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
            </div>
        </section>
    );
}
