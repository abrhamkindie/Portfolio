export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p
            {...props}
            className={'text-xs text-destructive ' + className}
        >
            {message}
        </p>
    ) : null;
}
