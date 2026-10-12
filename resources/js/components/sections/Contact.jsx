import { useState } from "react";
import { Globe, ArrowUpRight } from "lucide-react";
import { useReveal } from "@/lib/motion";

function GithubIcon({ size = 16 }) {
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

function LinkedinIcon({ size = 16 }) {
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

function TwitterIcon({ size = 16 }) {
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

export function Contact({ profile }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [status, setStatus] = useState("idle");
    const [errors, setErrors] = useState({});
    const revealRef = useReveal({
        selector: "[data-reveal]",
        y: 30,
        stagger: 0.12,
    });

    const email = profile?.email || "hello@example.com";
    const phone = profile?.phone || "";
    const busy = status === "submitting";

    const socials = [
        {
            key: "github",
            label: "GitHub",
            url: profile?.github,
            icon: GithubIcon,
        },
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

    const validateForm = () => {
        const next = {};
        if (!formData.name.trim()) next.name = "Name is required";
        if (!formData.email.trim()) next.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
            next.email = "Invalid email format";
        if (!formData.subject.trim()) next.subject = "Subject is required";
        if (!formData.message.trim()) next.message = "Message is required";
        else if (formData.message.trim().length < 10)
            next.message = "Message must be at least 10 characters";
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setStatus("submitting");
        try {
            const response = await fetch("/api/messages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN":
                        document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute("content") || "",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", subject: "", message: "" });
                setTimeout(() => setStatus("idle"), 5000);
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    return (
        <section
            id="contact"
            className="dark-section bg-[#262626] py-24 text-white lg:py-40"
        >
            <div
                ref={revealRef}
                className="section-container grid gap-16 lg:grid-cols-2 lg:gap-24"
            >
                <div>
                    <p
                        data-reveal
                        className="text-xs font-normal uppercase tracking-[0.04em] text-white/60"
                    >
                        Get in touch
                    </p>
                    <h2
                        data-reveal
                        className="mt-4 text-[clamp(32px,4.5vw,64px)] font-semibold leading-[1.1] tracking-[-0.03em]"
                    >
                        Ready to create something together?
                    </h2>
                    <div data-reveal className="mt-10 space-y-2 text-lg">
                        <a
                            href={`mailto:${email}`}
                            data-cursor="hover"
                            className="block underline underline-offset-4 hover:opacity-70"
                        >
                            {email}
                        </a>
                        {phone && (
                            <a
                                href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                                data-cursor="hover"
                                className="block text-white/70"
                            >
                                {phone}
                            </a>
                        )}
                    </div>

                    {socials.length > 0 && (
                        <div data-reveal className="mt-8 flex flex-wrap gap-3">
                            {socials.map(({ key, label, url, icon: Icon }) => (
                                <a
                                    key={key}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    data-cursor="hover"
                                    aria-label={label}
                                    className="flex h-11 w-11 items-center justify-center border border-white/20 text-white transition-all duration-300 hover:bg-white hover:text-[#262626]"
                                >
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    )}
                </div>

                <form
                    data-reveal
                    onSubmit={handleSubmit}
                    className="space-y-8"
                    noValidate
                >
                    <div className="grid gap-8 sm:grid-cols-2">
                        <Field
                            id="name"
                            label="Name"
                            value={formData.name}
                            onChange={handleChange}
                            error={errors.name}
                            disabled={busy}
                            placeholder="What's your name?"
                        />
                        <Field
                            id="email"
                            label="Email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={errors.email}
                            disabled={busy}
                            placeholder="you@company.com"
                        />
                    </div>

                    <Field
                        id="subject"
                        label="Subject"
                        value={formData.subject}
                        onChange={handleChange}
                        error={errors.subject}
                        disabled={busy}
                        placeholder="Project, collaboration, or hello"
                    />

                    <div>
                        <label
                            htmlFor="message"
                            className="block text-xs uppercase tracking-[0.04em] text-white/60"
                        >
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows={4}
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Let's know what you have in mind..."
                            disabled={busy}
                            className="input-dark mt-2 min-h-[120px] resize-y py-3"
                        />
                        {errors.message && (
                            <p
                                className="mt-2 text-xs text-white/80"
                                role="alert"
                            >
                                {errors.message}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        <button
                            type="submit"
                            disabled={busy}
                            data-cursor="hover"
                            className="btn-white"
                        >
                            {busy
                                ? "Sending..."
                                : status === "success"
                                  ? "Message sent"
                                  : "Get in touch"}
                        </button>
                        {status === "error" && (
                            <p className="text-sm text-white/80" role="alert">
                                Failed to send. Please try again later.
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </section>
    );
}

function Field({ id, label, error, ...inputProps }) {
    return (
        <div>
            <label
                htmlFor={id}
                className="block text-xs uppercase tracking-[0.04em] text-white/60"
            >
                {label}
            </label>
            <input
                id={id}
                name={id}
                className="input-dark mt-2"
                {...inputProps}
            />
            {error && (
                <p className="mt-2 text-xs text-white/80" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
}
