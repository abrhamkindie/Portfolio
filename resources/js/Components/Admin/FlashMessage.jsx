import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

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
            className={`mb-6 flex items-center gap-2.5 rounded-[10px] border px-4 py-3 text-sm ${isError
                    ? 'border-[#ef4444]/30 bg-[#ef4444]/10 text-[#ef4444]'
                    : 'border-[#22c55e]/30 bg-[#22c55e]/10 text-[#22c55e]'
                }`}
        >
            {isError ? <AlertCircle className="h-4 w-4 shrink-0" /> : <CheckCircle2 className="h-4 w-4 shrink-0" />}
            <span>{error || success}</span>
        </div>
    );
}
