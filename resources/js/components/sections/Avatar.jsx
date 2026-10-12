import { useRef, useState } from 'react';

export function Avatar({ profile, onChange, size = 'lg', editable = false }) {
    const inputRef = useRef(null);
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState('');
    const src = profile?.avatar;
    const initials = (profile?.full_name || 'JD')
        .split(' ')
        .map((p) => p[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

    const dims = size === 'lg' ? 'h-44 w-44 sm:h-56 sm:w-56 lg:h-64 lg:w-64' : 'h-20 w-20';

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
        <div className="flex flex-col items-start gap-3">
            <div className={`group relative overflow-hidden border-2 border-[#262626] bg-[#f2f2f2] ${dims}`}>
                {src ? (
                    <img
                        src={src}
                        alt={profile?.full_name || 'Profile picture'}
                        className="h-full w-full object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-4xl font-semibold tracking-[-0.03em] text-[#262626]">
                        {initials}
                    </div>
                )}
                {status === 'uploading' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/70 text-xs uppercase tracking-[0.04em]">
                        Uploading…
                    </div>
                )}
                {/* Hover overlay for non-editable state */}
                {src && !editable && (
                    <div className="pointer-events-none absolute inset-0 bg-[#262626] opacity-0 transition-opacity duration-500 group-hover:opacity-5" />
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
                    <label
                        htmlFor="avatar-input"
                        data-cursor="hover"
                        className="btn-outline !py-2 !text-xs cursor-pointer"
                    >
                        {src ? 'Change photo' : 'Upload photo'}
                    </label>
                    {error && <p className="text-xs text-[#262626]" role="alert">{error}</p>}
                </div>
            )}
        </div>
    );
}
