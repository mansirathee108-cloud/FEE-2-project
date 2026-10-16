import styles from './FormField.module.css';

export default function FormField({
  id,
  label,
  as = 'input',
  className = '',
  fieldClassName = '',
  error,
  children,
  ...controlProps
}) {
  const Control = as;
  const describedBy =
    [controlProps['aria-describedby'], error ? `${id}-error` : null].filter(Boolean).join(' ') ||
    undefined;

  return (
    <div className={`${styles.field} ${fieldClassName}`}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      {as === 'input' ? (
        <input
          {...controlProps}
          id={id}
          className={className}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={describedBy}
        />
      ) : (
        <Control
          {...controlProps}
          id={id}
          className={className}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={describedBy}
        >
          {children}
        </Control>
      )}
      {error && (
        <p className={styles.error} id={`${id}-error`} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
