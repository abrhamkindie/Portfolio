import { useState } from 'react';
import { Globe, ArrowUpRight, Mail } from 'lucide-react';
import { useReveal } from '@/lib/motion';
import { cn } from '@/lib/utils';

function GithubIcon({ size = 16 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
    );
}

function LinkedinIcon({ size = 16 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
    );
}

function TwitterIcon({ size = 16 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    );
}

export function Contact({ profile }) {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState('idle');
    const [errors, setErrors] = useState({});
    const revealRef = useReveal({ selector: '[data-reveal]', y: 40, stagger: 0.1 });

    const email = profile?.email || 'hello@example.com';
    const busy = status === 'submitting';

    const socials = [
        { key: 'github', label: 'GitHub', url: profile?.github, icon: GithubIcon },
        { key: 'linkedin', label: 'LinkedIn', url: profile?.linkedin, icon: LinkedinIcon },
        { key: 'twitter', label: 'Twitter', url: profile?.twitter, icon: TwitterIcon },
        { key: 'website', label: 'Website', url: profile?.website, icon: Globe },
    ].filter((s) => s.url);

    const validateForm = () => {
        const next = {};
        if (!formData.name.trim()) next.name = 'Name is required';
        if (!formData.email.trim()) next.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) next.email = 'Invalid email format';
        if (!formData.subject.trim()) next.subject = 'Subject is required';
        if (!formData.message.trim()) next.message = 'Message is required';
        else if (formData.message.trim().length < 10) next.message = 'Message must be at least 10 characters';
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setStatus('submitting');
        try {
            const response = await fetch('/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    return (
        <section id="contact" className="bg-night section-pad overflow-hidden relative">
            {/* Background Decoration */}
            <div className="absolute bottom-0 right-0 translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none opacity-50" />
            <div className="absolute top-0 left-0 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none opacity-30" />

            <div className="section-container relative z-10">
                <div ref={revealRef} className="grid gap-24 lg:grid-cols-[0.8fr_1.2fr] items-start">
                    <div>
                        <span className="section-label" data-reveal>Get In Touch</span>
                        <h2 className="section-title text-white mb-10 tracking-tighter" data-reveal>
                            Let's make something<br /><span className="text-primary italic">extraordinary.</span>
                        </h2>
                        
                        <p className="text-xl text-white/50 mb-16 leading-relaxed font-medium" data-reveal>
                            I'm currently available for freelance work and full-time opportunities. If you have a project in mind, don't hesitate to reach out.
                        </p>

                        <div className="space-y-10" data-reveal>
                            <div className="flex items-center gap-8 group">
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-white group-hover:rotate-6 shadow-lg shadow-primary/5">
                                    <Mail size={28} />
                                </div>
                                <div>
                                    <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-2">Email Me</span>
                                    <a href={`mailto:${email}`} className="text-2xl font-bold text-white hover:text-primary transition-colors">{email}</a>
                                </div>
                            </div>

                            {socials.length > 0 && (
                                <div className="pt-12 border-t border-white/5">
                                    <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-10">Social Networks</span>
                                    <div className="flex gap-5">
                                        {socials.map(({ key, label, url, icon: Icon }) => (
                                            <a
                                                key={key}
                                                href={url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={label}
                                                className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/5 bg-white/[0.03] text-white/40 transition-all duration-500 hover:border-primary/40 hover:bg-primary hover:text-white hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20"
                                            >
                                                <Icon size={22} />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="card bg-white/[0.02] border-white/5 p-12 lg:p-16 rounded-[2.5rem] shadow-2xl backdrop-blur-md relative overflow-hidden group" data-reveal>
                        {/* Glow effect */}
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-700" />
                        
                        <form onSubmit={handleSubmit} className="space-y-10 relative z-10" noValidate>
                            <div className="grid gap-10 sm:grid-cols-2">
                                <div className="space-y-3">
                                    <label htmlFor="name" className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">Full Name</label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        disabled={busy}
                                        className={cn(
                                            "w-full rounded-2xl border-white/5 bg-white/[0.03] px-8 py-5 text-white placeholder:text-white/10 transition-all focus:border-primary/50 focus:bg-white/[0.05] focus:ring-1 focus:ring-primary/20 outline-none font-medium",
                                            errors.name && "border-destructive/50 focus:border-destructive/50 focus:ring-destructive/20"
                                        )}
                                    />
                                    {errors.name && <p className="text-[10px] font-bold text-destructive uppercase tracking-widest mt-2 ml-1">{errors.name}</p>}
                                </div>
                                <div className="space-y-3">
                                    <label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">Email Address</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        disabled={busy}
                                        className={cn(
                                            "w-full rounded-2xl border-white/5 bg-white/[0.03] px-8 py-5 text-white placeholder:text-white/10 transition-all focus:border-primary/50 focus:bg-white/[0.05] focus:ring-1 focus:ring-primary/20 outline-none font-medium",
                                            errors.email && "border-destructive/50 focus:border-destructive/50 focus:ring-destructive/20"
                                        )}
                                    />
                                    {errors.email && <p className="text-[10px] font-bold text-destructive uppercase tracking-widest mt-2 ml-1">{errors.email}</p>}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label htmlFor="subject" className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">Subject</label>
                                <input
                                    id="subject"
                                    name="subject"
                                    type="text"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="Project Inquiry"
                                    disabled={busy}
                                    className={cn(
                                        "w-full rounded-2xl border-white/5 bg-white/[0.03] px-8 py-5 text-white placeholder:text-white/10 transition-all focus:border-primary/50 focus:bg-white/[0.05] focus:ring-1 focus:ring-primary/20 outline-none font-medium",
                                        errors.subject && "border-destructive/50 focus:border-destructive/50 focus:ring-destructive/20"
                                    )}
                                />
                                {errors.subject && <p className="text-[10px] font-bold text-destructive uppercase tracking-widest mt-2 ml-1">{errors.subject}</p>}
                            </div>

                            <div className="space-y-3">
                                <label htmlFor="message" className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Tell me about your project..."
                                    disabled={busy}
                                    className={cn(
                                        "w-full rounded-2xl border-white/5 bg-white/[0.03] px-8 py-5 text-white placeholder:text-white/10 transition-all focus:border-primary/50 focus:bg-white/[0.05] focus:ring-1 focus:ring-primary/20 outline-none resize-none font-medium",
                                        errors.message && "border-destructive/50 focus:border-destructive/50 focus:ring-destructive/20"
                                    )}
                                />
                                {errors.message && <p className="text-[10px] font-bold text-destructive uppercase tracking-widest mt-2 ml-1">{errors.message}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={busy}
                                className="w-full btn-primary btn-lg shadow-2xl shadow-primary/30 group/btn h-16 rounded-2xl"
                            >
                                {busy ? 'Sending...' : 'Send Message'}
                                <ArrowUpRight size={22} className="transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 ml-2" />
                            </button>

                            {status === 'success' && (
                                <p className="text-center text-xs font-black text-green-400 uppercase tracking-[0.3em] animate-pulse">
                                    Message sent successfully!
                                </p>
                            )}
                            {status === 'error' && (
                                <p className="text-center text-xs font-black text-destructive uppercase tracking-[0.3em]">
                                    Something went wrong. Please try again.
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
