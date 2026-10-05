import styles from './CounterButton.module.css';

function CounterButton({
  children,
  onClick,
  className,
  type = 'button',
  disabled,
  'aria-label': ariaLabel,
}) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) {
        onClick();
      }
    }
  };

  return (
    <button
      className={`${styles.button} ${disabled ? styles.disabled : ''} ${className || ''}`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      type={type}
      disabled={disabled}
      role='button'
      aria-label={ariaLabel}>
      {children}
    </button>
  );
}

export default CounterButton;
