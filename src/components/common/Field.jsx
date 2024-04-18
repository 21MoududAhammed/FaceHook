export default function Field({label, htmlFor, children, error}){
    return (
        <div className="from-control">
            {label && <label htmlFor={htmlFor} className="auth-label">{label}</label>}
            {children}
            {error && <div role='alert' className='text-red-500 text-xs'>{error?.message}</div>}
        </div>
    );
}

