import { Head, Link } from '@inertiajs/react';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Cursor } from '@/components/layout/Cursor';

export default function Work({ project }) {
    const gallery = [project.thumbnail, ...(project.images || [])].filter(Boolean);
    const unique = [...new Set(gallery)];

    return (
        <ThemeProvider>
            <Head title={project.title} />
            <div className="min-h-screen bg-white font-sans text-[#262626] antialiased">
                <Cursor />
                <Navbar profile={null} />

                <main className="section-container pb-24 pt-32 lg:pt-40">
                    <Link href="/#showcase" data-cursor="hover" className="text-sm text-[#7b7b7b] hover:text-[#262626]">
                        ← Back to work
                    </Link>

                    <header className="mt-8 flex flex-col gap-4">
                        {project.category && <p className="section-label">{project.category}</p>}
                        <h1 className="section-title max-w-4xl">{project.title}</h1>
                        {project.description && (
                            <p className="max-w-2xl text-lg leading-relaxed text-[#373737]">{project.description}</p>
                        )}
                    </header>

                    {unique.length > 0 && (
                        <div className="mt-14 grid gap-6 md:grid-cols-2">
                            {unique.map((src, i) => (
                                <img
                                    key={src}
                                    src={src}
                                    alt={`${project.title} ${i + 1}`}
                                    loading={i === 0 ? 'eager' : 'lazy'}
                                    className={`w-full rounded-[20px] object-cover ${i === 0 ? 'md:col-span-2 aspect-[16/9]' : 'aspect-[4/3]'}`}
                                />
                            ))}
                        </div>
                    )}

                    <div className="mt-14 grid gap-10 md:grid-cols-[2fr_1fr]">
                        {project.content && (
                            <div className="whitespace-pre-line text-base leading-relaxed text-[#373737]">{project.content}</div>
                        )}

                        <aside className="flex flex-col gap-6 text-sm">
                            {project.completed_at && (
                                <div>
                                    <p className="section-label">Completed</p>
                                    <p className="mt-1 text-base">{project.completed_at}</p>
                                </div>
                            )}
                            {project.technologies?.length > 0 && (
                                <div>
                                    <p className="section-label">Technologies</p>
                                    <p className="mt-1 text-base">{project.technologies.join(', ')}</p>
                                </div>
                            )}
                            <div className="flex flex-wrap gap-3">
                                {project.live_url && (
                                    <a href={project.live_url} target="_blank" rel="noopener noreferrer" data-cursor="hover" className="btn-primary !py-2">
                                        Live site
                                    </a>
                                )}
                                {project.github_url && (
                                    <a href={project.github_url} target="_blank" rel="noopener noreferrer" data-cursor="hover" className="btn-outline !py-2">
                                        Source
                                    </a>
                                )}
                            </div>
                        </aside>
                    </div>
                </main>

                <Footer profile={null} />
            </div>
        </ThemeProvider>
    );
}
