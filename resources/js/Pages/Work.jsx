import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { formatMonthYear } from '@/lib/utils';

export default function Work({ project }) {
    const gallery = [project.thumbnail, ...(project.images || [])].filter(Boolean);
    const unique = [...new Set(gallery)];

    return (
        <>
            <Head title={project.title} />
            <div className="min-h-screen bg-white font-sans text-[#161616] antialiased">
                <Navbar profile={null} />

                <main className="section-container pb-24 pt-28 lg:pb-32 lg:pt-36">
                    <Link
                        href="/#showcase"
                        className="inline-flex items-center gap-2 text-[13px] text-[#8b8882] transition-colors hover:text-[#161616]"
                    >
                        <ArrowLeft size={14} />
                        Back to work
                    </Link>

                    <header className="mt-10 flex flex-col gap-5 border-b border-[#e6e4df] pb-10">
                        {project.category && <p className="section-label">{project.category}</p>}
                        <h1 className="max-w-4xl text-[clamp(36px,5vw,64px)] font-semibold leading-[1.02] tracking-[-0.04em]">
                            {project.title}
                        </h1>
                        {project.description && (
                            <p className="max-w-xl text-[15px] leading-[1.8] text-[#5f5f5f]">{project.description}</p>
                        )}
                    </header>

                    {unique.length > 0 && (
                        <div className="mt-12 grid gap-5 md:grid-cols-2">
                            {unique.map((src, i) => (
                                <img
                                    key={src}
                                    src={src}
                                    alt={`${project.title} ${i + 1}`}
                                    loading={i === 0 ? 'eager' : 'lazy'}
                                    className={`w-full rounded-[20px] border border-[#e6e4df] object-cover ${i === 0 ? 'aspect-[16/9] md:col-span-2' : 'aspect-[4/3]'}`}
                                />
                            ))}
                        </div>
                    )}

                    <div className="mt-14 grid gap-12 md:grid-cols-[1.6fr_1fr]">
                        {project.content && (
                            <div className="whitespace-pre-line text-[15px] leading-[1.85] text-[#3f3f3f]">
                                {project.content}
                            </div>
                        )}

                        <aside className="flex flex-col gap-8 text-sm md:border-l md:border-[#e6e4df] md:pl-10">
                            {project.completed_at && (
                                <div>
                                    <p className="section-label">Completed</p>
                                    <p className="mt-2 text-[#3f3f3f]">
                                        {formatMonthYear(project.completed_at)}
                                    </p>
                                </div>
                            )}
                            {project.technologies?.length > 0 && (
                                <div>
                                    <p className="section-label">Technologies</p>
                                    <p className="mt-2 leading-relaxed text-[#3f3f3f]">
                                        {project.technologies.join(', ')}
                                    </p>
                                </div>
                            )}
                            <div className="flex flex-wrap gap-2.5">
                                {project.live_url && (
                                    <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="btn-primary btn-sm">
                                        Live site
                                        <ArrowUpRight size={13} />
                                    </a>
                                )}
                                {project.github_url && (
                                    <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="btn-outline btn-sm">
                                        Source
                                    </a>
                                )}
                            </div>
                        </aside>
                    </div>
                </main>

                <Footer profile={null} />
            </div>
        </>
    );
}
