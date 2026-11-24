import { Link } from '@inertiajs/react';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useReveal } from '@/lib/motion';

export function Projects({ projects = [] }) {
    const listRef = useReveal({ selector: '[data-reveal]', y: 24, stagger: 0.08 });

    return (
        <section id="projects" className="bg-background section-pad relative overflow-hidden">
            {/* Ambient Background Light */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/[0.02] rounded-full blur-[150px] pointer-events-none" />

            <div className="section-container relative z-10">
                <SectionHeader
                    label="Selected Work"
                    title={
                        <>
                            Featured <span className="border-text">Projects</span>
                        </>
                    }
                />

                <div ref={listRef} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
                    {projects.map((project, index) => {
                        const thumbnail = project.thumbnail || project.images?.[0] || null;
                        const caseStudyUrl = project.slug ? `/work/${project.slug}` : null;
                        const ImageWrapper = caseStudyUrl ? Link : 'div';
                        const TitleWrapper = caseStudyUrl ? Link : 'div';

                        return (
                            <article
                                key={project.id}
                                data-reveal
                                className="group flex flex-col overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.02] transition-colors duration-500 hover:border-primary/25"
                            >
                                <ImageWrapper
                                    {...(caseStudyUrl
                                        ? { href: caseStudyUrl, 'aria-label': `${project.title} case study` }
                                        : {})}
                                    className="relative block aspect-[16/10] overflow-hidden bg-[#0a0a0a]"
                                >
                                    {/* Placeholder sits behind the image so a missing or broken thumbnail still looks intentional */}
                                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white/[0.06] via-transparent to-primary/[0.05]">
                                        <span className="border-text text-[6rem] font-bold opacity-30">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                    </div>
                                    {thumbnail && (
                                        <img
                                            src={thumbnail}
                                            alt={project.title}
                                            loading={index < 2 ? 'eager' : 'lazy'}
                                            decoding="async"
                                            onError={(event) => {
                                                event.currentTarget.remove();
                                            }}
                                            className="relative h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                                        />
                                    )}
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                                </ImageWrapper>

                                <div className="flex flex-1 flex-col p-7 lg:p-9">
                                    <div className="mb-5 flex items-center gap-4">
                                        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-primary">
                                            Project {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <div className="h-px w-8 bg-primary/20" />
                                        {project.category && (
                                            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/25">
                                                {project.category}
                                            </span>
                                        )}
                                    </div>

                                    <TitleWrapper
                                        {...(caseStudyUrl ? { href: caseStudyUrl } : {})}
                                        className="mb-4 block text-2xl font-bold uppercase leading-tight tracking-tighter text-white transition-colors duration-500 group-hover:text-primary lg:text-3xl"
                                    >
                                        {project.title}
                                    </TitleWrapper>

                                    {project.description && (
                                        <p className="line-clamp-3 mb-6 text-sm font-medium leading-relaxed text-white/40 transition-colors duration-500 group-hover:text-white/60">
                                            {project.description}
                                        </p>
                                    )}

                                    {project.technologies?.length > 0 && (
                                        <div className="mb-8 flex flex-wrap gap-2">
                                            {project.technologies.slice(0, 4).map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="rounded-full border border-white/5 px-3 py-1.5 text-[8px] font-black uppercase tracking-[0.25em] text-white/30 transition-colors duration-500 group-hover:border-primary/20 group-hover:text-primary/60"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <div className="mt-auto flex flex-wrap items-center gap-6">
                                        {caseStudyUrl && (
                                            <Link
                                                href={caseStudyUrl}
                                                className="group/link inline-flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.35em] text-white transition-colors duration-500 hover:text-primary"
                                            >
                                                View Case Study
                                                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 transition-all duration-500 group-hover/link:border-primary group-hover/link:bg-primary group-hover/link:text-black">
                                                    <ArrowUpRight size={16} />
                                                </span>
                                            </Link>
                                        )}
                                        {project.live_url && (
                                            <a
                                                href={project.live_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.35em] text-white/35 transition-colors duration-500 hover:text-primary"
                                            >
                                                Live Site
                                                <ArrowUpRight size={13} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
