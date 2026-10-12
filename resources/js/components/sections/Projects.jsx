import { useState } from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { formatDate } from '@/lib/utils';
import { useRuleDraw } from '@/lib/motion';

/**
 * Work list in the site's style: numbered rows with rules. Hovering a row
 * shows that project's thumbnail in a floating panel (the site's hover-image).
 */
export function Projects({ projects }) {
    const categories = ['All', ...new Set(projects.map((p) => p.category).filter(Boolean))];
    const [active, setActive] = useState('All');
    const [hovered, setHovered] = useState(null);
    const listRef = useRuleDraw({ selector: 'li' });

    const visible = active === 'All' ? projects : projects.filter((p) => p.category === active);

    return (
        <section id="projects" className="section-container py-24 lg:py-40">
            <SectionHeader label="Selected work" title="Projects" />

            {categories.length > 1 && (
                <div className="mb-10 flex flex-wrap gap-3" role="tablist">
                    {categories.map((category) => (
                        <button
                            key={category}
                            role="tab"
                            aria-selected={active === category}
                            onClick={() => setActive(category)}
                            data-cursor="hover"
                            className={active === category ? 'btn-primary !py-2 !text-xs' : 'btn-outline !py-2 !text-xs'}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            )}

            <div className="relative">
                <ul ref={listRef}>
                    {visible.map((project, index) => (
                        <li
                            key={project.id}
                            onMouseEnter={() => setHovered(project)}
                            onMouseLeave={() => setHovered(null)}
                            data-cursor="View"
                            className="group grid gap-6 border-t border-[#262626] py-8 md:grid-cols-[80px_1fr_1fr_auto] md:items-start md:gap-10 lg:py-12 last:border-b"
                        >
                            <span className="text-sm text-[#7b7b7b]">{String(index + 1).padStart(2, '0')}</span>

                            <div>
                                <h3 className="text-2xl font-semibold tracking-[-0.02em] text-[#262626] transition-transform duration-500 group-hover:translate-x-2 lg:text-[32px]">
                                    {project.title}
                                </h3>
                                {project.category && <p className="mt-2 text-sm text-[#7b7b7b]">{project.category}</p>}
                            </div>

                            <div className="space-y-3">
                                {project.description && (
                                    <p className="text-base leading-relaxed text-[#373737] line-clamp-3">{project.description}</p>
                                )}
                                {project.technologies?.length > 0 && (
                                    <p className="text-sm text-[#7b7b7b]">{project.technologies.slice(0, 6).join(' · ')}</p>
                                )}
                                {project.completed_at && (
                                    <p className="text-xs text-[#7b7b7b]">
                                        {formatDate(project.completed_at, { month: 'short', year: 'numeric' })}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-wrap gap-3 md:justify-end">
                                {project.live_url && (
                                    <a href={project.live_url} target="_blank" rel="noopener noreferrer" data-cursor="hover" className="btn-primary !py-2">
                                        Live demo
                                    </a>
                                )}
                                {project.github_url && (
                                    <a href={project.github_url} target="_blank" rel="noopener noreferrer" data-cursor="hover" className="btn-outline !py-2">
                                        Source
                                    </a>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>

                {hovered?.thumbnail && (
                    <div
                        aria-hidden="true"
                        className="pointer-events-none fixed left-1/2 top-1/2 hidden w-[min(360px,40vw)] -translate-x-1/2 -translate-y-1/2 lg:block"
                    >
                        <img src={hovered.thumbnail} alt="" className="aspect-[4/3] w-full object-cover shadow-[0_24px_60px_rgba(0,0,0,0.25)]" />
                    </div>
                )}
            </div>

            {visible.length === 0 && <p className="text-sm text-[#7b7b7b]">No projects yet.</p>}
        </section>
    );
}
