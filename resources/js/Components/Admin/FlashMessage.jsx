import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { statusTones } from './StatusPill';

export default function FlashMessage() {
    const { flash } = usePage().props;
    const [visible, setVisible] = useState(true);

    const success = flash?.success;
    const error = flash?.error;

    useEffect(() => {
        setVisible(true);
        if (success || error) {
            const timer = setTimeout(() => setVisible(false), 4000);
            return () => clearTimeout(timer);
        }
    }, [success, error]);

    if (!visible || (!success && !error)) return null;

    const isError = !!error;

    return (
        <div
            role="status"
            className={`mb-6 flex items-center gap-2.5 rounded-xl border px-4 py-3 text-sm ${isError ? statusTones.red : statusTones.green}`}
        >
            {isError ? <AlertCircle className="h-4 w-4 shrink-0" /> : <CheckCircle2 className="h-4 w-4 shrink-0" />}
            <span>{error || success}</span>
        </div>
    );
}
