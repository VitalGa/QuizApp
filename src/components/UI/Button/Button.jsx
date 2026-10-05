import styles from './Button.module.css';

function Button({
  children,
  onClick,
  className,
  type = 'button',
  disabled,
  'aria-label': ariaLabel,
  role,
}) {
  return (
    <div className={styles.buttonWrapper}>
      <button
        className={`${styles.button} ${disabled ? styles.disabled : ''} ${className || ''}`}
        onClick={onClick}
        type={type}
        disabled={disabled}
        role={role}
        aria-label={ariaLabel}>
        {children}
      </button>
      <p className={`${styles.enterText} ${disabled ? styles.disabled : ''}`}>
        или нажми
        <span>
          Enter <span className={styles.enterSymbol}>↵</span>
        </span>
      </p>
    </div>
  );
}

export default Button;
