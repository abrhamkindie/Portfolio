import { useRef, useState } from 'react';

export function Avatar({ profile, onChange, size = 'lg', editable = false }) {
    const inputRef = useRef(null);
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState('');
    const src = profile?.avatar;
    const initials = (profile?.full_name || 'Abrham')
        .split(' ')
        .map((p) => p[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

    const dims = size === 'lg' ? 'h-full w-full' : 'h-20 w-20';

    const upload = async (file) => {
        if (!file) return;
        if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
            setError('Use a JPG, PNG or WebP image.');
            return;
        }
        if (file.size > 4 * 1024 * 1024) {
            setError('Image must be 4 MB or smaller.');
            return;
        }

        setError('');
        setStatus('uploading');
        const body = new FormData();
        body.append('avatar', file);

        try {
            const response = await fetch(`/api/profile/${profile.id}/avatar`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                credentials: 'same-origin',
                body,
            });

            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                throw new Error(data.message || 'Upload failed.');
            }

            const data = await response.json();
            onChange?.(data.data || data);
            setStatus('idle');
        } catch (err) {
            setError(err.message || 'Upload failed.');
            setStatus('idle');
        } finally {
            if (inputRef.current) inputRef.current.value = '';
        }
    };

    return (
        <div className="flex h-full w-full flex-col gap-3">
            <div className={`group relative flex-1 overflow-hidden rounded-[24px] bg-[#eceae5] ${dims}`}>
                {src ? (
                    <img
                        src={src}
                        alt={profile?.full_name || 'Profile picture'}
                        className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-5xl font-semibold tracking-[-0.04em] text-[#161616]">
                        {initials}
                    </div>
                )}
                {status === 'uploading' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/70 text-[11px] uppercase tracking-[0.18em]">
                        Uploading…
                    </div>
                )}
            </div>

            {editable && profile?.id && (
                <div className="flex flex-col gap-2">
                    <input
                        ref={inputRef}
                        id="avatar-input"
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="sr-only"
                        onChange={(e) => upload(e.target.files?.[0])}
                    />
                    <label htmlFor="avatar-input" className="btn-outline btn-sm cursor-pointer self-start">
                        {src ? 'Change photo' : 'Upload photo'}
                    </label>
                    {error && <p className="text-xs text-[#161616]" role="alert">{error}</p>}
                </div>
            )}
        </div>
    );
}
