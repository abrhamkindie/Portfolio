import { cn } from '@/lib/utils';
import { tile } from './styles';

export default function IconTile({ icon: Icon, className }) {
    return (
        <span className={cn(tile, className)}>
            <Icon className="h-4 w-4" />
        </span>
    );
}
