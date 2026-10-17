import { router } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import { iconBtn } from './styles';

export default function DeleteButton({ url, label = 'this item' }) {
    const handleDelete = () => {
        if (window.confirm(`Delete ${label}? This cannot be undone.`)) {
            router.delete(url, { preserveScroll: true });
        }
    };

    return (
        <button
            type="button"
            onClick={handleDelete}
            title="Delete"
            aria-label="Delete"
            className={`${iconBtn} hover:border-[#ef4444]/40 hover:bg-[#ef4444]/10 hover:text-[#ef4444]`}
        >
            <Trash2 className="h-4 w-4" />
        </button>
    );
}
