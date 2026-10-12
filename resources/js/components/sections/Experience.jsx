import { SectionHeader } from "@/components/ui/SectionHeader";
import { formatDate } from "@/lib/utils";
import { useRuleDraw } from "@/lib/motion";

export function Experience({ experiences }) {
    const sorted = [...experiences].sort(
        (a, b) => new Date(b.start_date) - new Date(a.start_date),
    );
    const listRef = useRuleDraw({ selector: "li" });

    return (
        <section
            id="experience"
            className="dark-section bg-[#262626] py-24 text-white lg:py-40"
        >
            <div className="section-container">
                <SectionHeader
                    dark
                    label="Career"
                    title="Experience"
                    subtitle="Roles and teams I have built with."
                />

                <ul ref={listRef}>
                    {sorted.map((exp, index) => (
                        <li
                            key={exp.id}
                            className="grid gap-4 border-t border-white/15 py-8 md:grid-cols-[80px_1fr_1fr] md:gap-10 lg:py-12 last:border-b"
                        >
                            <span className="text-sm text-white/40">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <div>
                                <h3 className="text-2xl font-semibold tracking-[-0.02em] text-white lg:text-[32px]">
                                    {exp.position}
                                </h3>
                                <p className="mt-2 text-base text-white/70">
                                    {exp.company}
                                    {exp.location && (
                                        <span className="text-white/50">
                                            {" "}
                                            · {exp.location}
                                        </span>
                                    )}
                                </p>
                            </div>
                            <div className="space-y-3">
                                <p className="text-sm text-white/50">
                                    {formatDate(exp.start_date, {
                                        month: "short",
                                        year: "numeric",
                                    })}
                                    {" — "}
                                    {exp.is_current
                                        ? "Present"
                                        : formatDate(exp.end_date, {
                                              month: "short",
                                              year: "numeric",
                                          })}
                                </p>
                                {exp.description && (
                                    <p className="text-base leading-relaxed text-white/70">
                                        {exp.description}
                                    </p>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>

                {sorted.length === 0 && (
                    <p className="text-sm text-white/50">
                        No experience records yet.
                    </p>
                )}
            </div>
        </section>
    );
}
