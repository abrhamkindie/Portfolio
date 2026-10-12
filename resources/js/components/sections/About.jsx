import { Globe, Mail, Phone, MapPin, Download } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useReveal, useRuleDraw } from "@/lib/motion";

const values = [
    "Clean code",
    "Collaboration",
    "Excellence",
    "Passion",
    "Impact",
    "Growth",
];

function GithubIcon({ size = 18 }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
        >
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
    );
}

function LinkedinIcon({ size = 18 }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
        >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
    );
}

function TwitterIcon({ size = 18 }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
        >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    );
}

export function About({ profile }) {
    const bio =
        profile?.bio ||
        "Passionate full-stack developer with 5+ years of experience building web applications.";
    const location = profile?.location || "San Francisco, USA";
    const email = profile?.email;
    const phone = profile?.phone;
    const resume = profile?.resume;
    const bodyRef = useReveal({
        selector: "[data-reveal]",
        y: 30,
        stagger: 0.15,
    });
    const rulesRef = useRuleDraw({ selector: "li" });

    const socials = [
        { key: "github", label: "GitHub", url: profile?.github, icon: GithubIcon },
        {
            key: "linkedin",
            label: "LinkedIn",
            url: profile?.linkedin,
            icon: LinkedinIcon,
        },
        {
            key: "twitter",
            label: "Twitter",
            url: profile?.twitter,
            icon: TwitterIcon,
        },
        {
            key: "website",
            label: "Website",
            url: profile?.website,
            icon: Globe,
        },
    ].filter((s) => s.url);

    return (
        <section id="about" className="section-container py-24 lg:py-40">
            <SectionHeader label="About me" title="Get to know me." />

            <div ref={bodyRef} className="grid gap-16 lg:grid-cols-2 lg:gap-24">
                <div>
                    <p
                        data-reveal
                        className="text-[clamp(22px,2.4vw,36px)] font-medium leading-[1.3] tracking-[-0.02em] text-[#262626]"
                    >
                        {bio}
                    </p>

                    <div
                        data-reveal
                        className="mt-10 flex flex-wrap items-center gap-4"
                    >
                        {resume && (
                            <a
                                href={resume}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-cursor="hover"
                                className="btn-outline"
                            >
                                <Download size={16} />
                                Download CV
                            </a>
                        )}
                        {email && (
                            <a
                                href={`mailto:${email}`}
                                data-cursor="hover"
                                className="btn-outline"
                            >
                                <Mail size={16} />
                                Email me
                            </a>
                        )}
                    </div>

                    {socials.length > 0 && (
                        <div data-reveal className="mt-10">
                            <p className="section-label mb-4">Find me on</p>
                            <div className="flex flex-wrap gap-3">
                                {socials.map(
                                    ({ key, label, url, icon: Icon }) => (
                                        <a
                                            key={key}
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            data-cursor="hover"
                                            aria-label={label}
                                            className="flex h-12 w-12 items-center justify-center border border-[#262626]/20 text-[#262626] transition-all duration-300 hover:border-[#262626] hover:bg-[#262626] hover:text-white"
                                        >
                                            <Icon size={18} />
                                        </a>
                                    ),
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div data-reveal>
                    <p className="section-label mb-4">Values</p>
                    <ul ref={rulesRef}>
                        {values.map((value) => (
                            <li
                                key={value}
                                className="border-t border-[#262626] py-4 text-lg font-medium text-[#262626] last:border-b"
                            >
                                {value}
                            </li>
                        ))}
                    </ul>

                    <div className="mt-10 space-y-4">
                        {location && (
                            <div className="flex items-center gap-3 text-sm text-[#373737]">
                                <MapPin
                                    size={16}
                                    className="shrink-0 text-[#7b7b7b]"
                                />
                                <span>{location}</span>
                            </div>
                        )}
                        {email && (
                            <a
                                href={`mailto:${email}`}
                                data-cursor="hover"
                                className="flex items-center gap-3 text-sm text-[#373737] hover:text-[#262626]"
                            >
                                <Mail
                                    size={16}
                                    className="shrink-0 text-[#7b7b7b]"
                                />
                                <span>{email}</span>
                            </a>
                        )}
                        {phone && (
                            <a
                                href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                                data-cursor="hover"
                                className="flex items-center gap-3 text-sm text-[#373737] hover:text-[#262626]"
                            >
                                <Phone
                                    size={16}
                                    className="shrink-0 text-[#7b7b7b]"
                                />
                                <span>{phone}</span>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
