export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'h-4 w-4 rounded-[5px] border-border bg-white/[0.04] text-primary accent-primary focus:ring-primary ' +
                className
            }
        />
    );
}
