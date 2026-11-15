import { useMemo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/Badge';
import { useReveal } from '@/lib/motion';

export function Projects({ projects }) {
    const categories = useMemo(
        () => ['All', ...new Set(projects.map((p) => p.category).filter(Boolean))],
        [projects]
    );
    const [active, setActive] = useState('All');
    const listRef = useReveal({ selector: '[data-reveal]', y: 40, stagger: 0.1 });

    const visible = active === 'All' ? projects : projects.filter((p) => p.category === active);

    return (
        <section id="projects" className="bg-[#050505] section-pad relative overflow-hidden">
            {/* Ambient Background Light */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/[0.02] rounded-full blur-[150px] pointer-events-none" />
            
            <div className="section-container relative z-10">
                <SectionHeader 
                    label="Selected Work"
                    title={<>Featured <span className="border-text">Projects</span></>}
                    className="mb-24"
                />

                <div ref={listRef} className="flex flex-col">
                    {visible.map((project, index) => (
                        <article
                            key={project.id}
                            data-reveal
                            className="group relative border-t border-white/5 py-20 transition-all duration-700 hover:bg-white/[0.01]"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-16 lg:gap-24 items-center">
                                {/* Large Image Area */}
                                <div className="relative aspect-[16/9] overflow-hidden rounded-[2.5rem] bg-[#0a0a0a] border border-white/5 shadow-2xl">
                                    {project.image_url ? (
                                        <img 
                                            src={project.image_url} 
                                            alt={project.title}
                                            className="h-full w-full object-cover grayscale transition-all duration-1000 ease-out group-hover:scale-105 group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center">
                                            <span className="text-[10vw] font-bold border-text opacity-5">{String(index + 1).padStart(2, '0')}</span>
                                        </div>
                                    )}
                                    
                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                </div>

                                {/* Content Details */}
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-6 mb-8">
                                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">
                                            Project {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <div className="h-px w-12 bg-primary/20" />
                                        {project.category && (
                                            <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">
                                                {project.category}
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="text-4xl lg:text-6xl font-bold text-white tracking-tighter uppercase mb-8 group-hover:text-primary transition-colors duration-700 leading-none">
                                        {project.title}
                                    </h3>

                                    {project.description && (
                                        <p className="text-xl text-white/40 leading-relaxed font-medium mb-12 max-w-lg group-hover:text-white/60 transition-colors duration-700">
                                            {project.description}
                                        </p>
                                    )}

                                    <div className="flex flex-wrap gap-4 mb-12">
                                        {project.technologies?.map((tech) => (
                                            <span key={tech} className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] px-4 py-2 border border-white/5 rounded-full group-hover:border-primary/20 group-hover:text-primary/60 transition-all duration-500">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {project.live_url && (
                                        <a
                                            href={project.live_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-white hover:text-primary transition-all duration-500 group/link"
                                        >
                                            View Case Study
                                            <div className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center group-hover/link:border-primary group-hover/link:bg-primary group-hover/link:text-black transition-all duration-500">
                                                <ArrowUpRight size={18} />
                                            </div>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </article>
                    ))}
                    <div className="border-t border-white/5" />
                </div>
            </div>
        </section>
    );
}
