import { SectionHeader } from '@/components/ui/SectionHeader';
import { formatDate } from '@/lib/utils';
import { useRuleDraw } from '@/lib/motion';

export function Certificates({ certificates }) {
    const sorted = [...certificates].sort((a, b) => new Date(b.issued_at) - new Date(a.issued_at));
    const listRef = useRuleDraw({ selector: 'li' });

    return (
        <section id="certificates" className="dark-section bg-[#262626] py-24 text-white lg:py-40">
            <div className="section-container">
                <SectionHeader dark label="Recognitions" title="Certificates" subtitle="Credentials that back up the work." />

                <ul ref={listRef}>
                    {sorted.map((cert, index) => (
                        <li
                            key={cert.id}
                            data-cursor={cert.credential_url ? 'Verify' : undefined}
                            className="grid gap-4 border-t border-white/15 py-8 md:grid-cols-[80px_1fr_auto] md:items-center md:gap-10 lg:py-10 last:border-b"
                        >
                            <span className="text-sm text-white/40">{String(index + 1).padStart(2, '0')}</span>
                            <div>
                                <h3 className="text-xl font-semibold tracking-[-0.01em] text-white lg:text-2xl">{cert.title}</h3>
                                <p className="mt-1 text-sm text-white/70">
                                    {cert.issuer}
                                    <span className="text-white/50"> · {formatDate(cert.issued_at, { month: 'short', year: 'numeric' })}</span>
                                </p>
                            </div>
                            {cert.credential_url && (
                                <a
                                    href={cert.credential_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    data-cursor="hover"
                                    className="btn-outline-dark !py-2 justify-self-start md:justify-self-end"
                                >
                                    Verify
                                </a>
                            )}
                        </li>
                    ))}
                </ul>

                {certificates.length === 0 && <p className="text-sm text-white/50">No certificates yet.</p>}
            </div>
        </section>
    );
}
