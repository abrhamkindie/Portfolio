import { router } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import { iconBtnDanger } from './styles';

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
            className={iconBtnDanger}
        >
            <Trash2 className="h-4 w-4" />
        </button>
    );
}
