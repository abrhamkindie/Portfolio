import { SectionHeader } from '@/components/ui/SectionHeader';
import { useReveal, useRuleDraw } from '@/lib/motion';

const values = ['Clean code', 'Collaboration', 'Excellence', 'Passion', 'Impact', 'Growth'];

export function About({ profile }) {
    const bio = profile?.bio || 'Passionate full-stack developer with 5+ years of experience building web applications.';
    const location = profile?.location || 'San Francisco, USA';
    const bodyRef = useReveal({ selector: '[data-reveal]', y: 30, stagger: 0.15 });
    const rulesRef = useRuleDraw({ selector: 'li' });

    return (
        <section id="about" className="section-container py-24 lg:py-40">
            <SectionHeader label="About us" title="Get to know me." />

            <div ref={bodyRef} className="grid gap-16 lg:grid-cols-2 lg:gap-24">
                <p data-reveal className="text-[clamp(22px,2.4vw,36px)] font-medium leading-[1.3] tracking-[-0.02em] text-[#262626]">
                    {bio}
                </p>

                <div data-reveal>
                    <p className="section-label mb-4">Values</p>
                    <ul ref={rulesRef}>
                        {values.map((value) => (
                            <li key={value} className="border-t border-[#262626] py-4 text-lg font-medium text-[#262626] last:border-b">
                                {value}
                            </li>
                        ))}
                    </ul>
                    <p className="mt-8 text-sm text-[#373737]">{location}</p>
                </div>
            </div>
        </section>
    );
}
