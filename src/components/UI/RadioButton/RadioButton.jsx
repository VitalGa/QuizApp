import styles from './RadioButton.module.css';
import Icon from '../Icon/Icon';

function RadioButton({
  value,
  onChange,
  name,
  children,
  index,
  isCorrect,
  showResult,
  selected,
  isAnswered,
  'aria-label': ariaLabel,
  labelRef,
}) {
  const getLabelClassName = () => {
    let className = styles.radioLabel;

    if (showResult) {
      if (isCorrect) {
        className += ` ${styles.correct}`;
      } else if (selected) {
        className += ` ${styles.incorrect}`;
      }
    }

    if (selected) {
      className += ` ${styles.disabledText}`;
    }

    return className;
  };

  return (
    <label
      className={getLabelClassName()}
      data-disabled={showResult || isAnswered}
      tabIndex={showResult || isAnswered ? -1 : 0}
      role='radio'
      aria-checked={selected}
      aria-label={ariaLabel || `Вариант ответа ${index + 1}: ${children}`}
      ref={labelRef}
      onFocus={() => {
        if (showResult || isAnswered) return;
        if (!selected) {
          onChange();
        }
      }}
      onKeyDown={(event) => {
        if (showResult || isAnswered) return;
        if (event.key === ' ' || event.key === 'Enter') {
          event.preventDefault();
          onChange();
        }
      }}>
      <input
        type='radio'
        name={name}
        value={value}
        onChange={onChange}
        checked={selected}
        disabled={showResult || isAnswered}
        className={styles.radioInput}
        role='radio'
        tabIndex={-1}
      />
      <span className={styles.radioButton}>{index + 1}</span>
      <div className={styles.radioTextWrapper}>
        <span className={`${styles.radioText} ${selected ? styles.disabledText : ''}`}>
          {children}
          {showResult && (
            <span className={styles.icon}>
              {isCorrect && <Icon name='check' size={22} className={styles.checkIcon} />}
              {selected && !isCorrect && (
                <Icon name='cross' size={22} className={styles.crossIcon} />
              )}
            </span>
          )}
        </span>
      </div>
    </label>
  );
}

export default RadioButton;
