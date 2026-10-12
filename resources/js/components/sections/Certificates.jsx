import { SectionHeader } from '@/components/ui/SectionHeader';
import { formatDate } from '@/lib/utils';
import { useRuleDraw } from '@/lib/motion';

export function Certificates({ certificates }) {
    const sorted = [...certificates].sort((a, b) => new Date(b.issued_at) - new Date(a.issued_at));
    const listRef = useRuleDraw({ selector: 'li' });

    return (
        <section id="certificates" className="section-container py-24 lg:py-40">
            <SectionHeader label="Recognitions" title="Certificates" subtitle="Credentials that back up the work." />

            <ul ref={listRef}>
                {sorted.map((cert, index) => (
                    <li
                        key={cert.id}
                        data-cursor={cert.credential_url ? 'Verify' : undefined}
                        className="grid gap-4 border-t border-[#262626] py-8 md:grid-cols-[80px_1fr_auto] md:items-center md:gap-10 lg:py-10 last:border-b"
                    >
                        <span className="text-sm text-[#7b7b7b]">{String(index + 1).padStart(2, '0')}</span>
                        <div>
                            <h3 className="text-xl font-semibold tracking-[-0.01em] text-[#262626] lg:text-2xl">{cert.title}</h3>
                            <p className="mt-1 text-sm text-[#373737]">
                                {cert.issuer}
                                <span className="text-[#7b7b7b]"> · {formatDate(cert.issued_at, { month: 'short', year: 'numeric' })}</span>
                            </p>
                        </div>
                        {cert.credential_url && (
                            <a
                                href={cert.credential_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-cursor="hover"
                                className="btn-outline !py-2 justify-self-start md:justify-self-end"
                            >
                                Verify
                            </a>
                        )}
                    </li>
                ))}
            </ul>

            {certificates.length === 0 && <p className="text-sm text-[#7b7b7b]">No certificates yet.</p>}
        </section>
    );
}
