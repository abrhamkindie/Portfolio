import { useState } from 'react';
import { useReveal } from '@/lib/motion';

export function Contact({ profile }) {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState('idle');
    const [errors, setErrors] = useState({});
    const revealRef = useReveal({ selector: '[data-reveal]', y: 30, stagger: 0.12 });

    const email = profile?.email || 'hello@example.com';
    const phone = profile?.phone || '';
    const busy = status === 'submitting';

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
        <section id="contact" className="bg-[#262626] py-24 text-white lg:py-40">
            <div ref={revealRef} className="section-container grid gap-16 lg:grid-cols-2 lg:gap-24">
                <div>
                    <p data-reveal className="text-xs font-normal uppercase tracking-[0.04em] text-white/60">Get in touch</p>
                    <h2 data-reveal className="mt-4 text-[clamp(32px,4.5vw,64px)] font-semibold leading-[1.1] tracking-[-0.03em]">
                        Ready to create something together?
                    </h2>
                    <div data-reveal className="mt-10 space-y-2 text-lg">
                        <a href={`mailto:${email}`} data-cursor="hover" className="block underline underline-offset-4 hover:opacity-70">{email}</a>
                        {phone && <a href={`tel:${phone.replace(/[^\d+]/g, '')}`} data-cursor="hover" className="block text-white/70">{phone}</a>}
                    </div>
                </div>

                <form data-reveal onSubmit={handleSubmit} className="space-y-8" noValidate>
                    <div className="grid gap-8 sm:grid-cols-2">
                        <Field id="name" label="Name" value={formData.name} onChange={handleChange} error={errors.name} disabled={busy} placeholder="What's your name?" />
                        <Field id="email" label="Email" type="email" value={formData.email} onChange={handleChange} error={errors.email} disabled={busy} placeholder="you@company.com" />
                    </div>

                    <Field id="subject" label="Subject" value={formData.subject} onChange={handleChange} error={errors.subject} disabled={busy} placeholder="Project, collaboration, or hello" />

                    <div>
                        <label htmlFor="message" className="block text-xs uppercase tracking-[0.04em] text-white/60">Message</label>
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
                        {errors.message && <p className="mt-2 text-xs text-white/80" role="alert">{errors.message}</p>}
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        <button type="submit" disabled={busy} data-cursor="hover" className="btn-white">
                            {busy ? 'Sending...' : status === 'success' ? 'Message sent' : 'Get in touch'}
                        </button>
                        {status === 'error' && <p className="text-sm text-white/80" role="alert">Failed to send. Please try again later.</p>}
                    </div>
                </form>
            </div>
        </section>
    );
}

function Field({ id, label, error, ...inputProps }) {
    return (
        <div>
            <label htmlFor={id} className="block text-xs uppercase tracking-[0.04em] text-white/60">{label}</label>
            <input id={id} name={id} className="input-dark mt-2" {...inputProps} />
            {error && <p className="mt-2 text-xs text-white/80" role="alert">{error}</p>}
        </div>
    );
}
