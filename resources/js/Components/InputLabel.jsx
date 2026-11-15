export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={
                `mb-1.5 block text-xs font-medium uppercase tracking-[0.04em] text-muted-foreground ` +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}
