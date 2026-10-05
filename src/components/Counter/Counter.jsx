import React, { useState } from 'react';
import Icon from '@/components/UI/Icon/Icon';
import mockData from '@/mock/quizz_questions.json';
import { useCounter } from '@/hooks/useCounter';
import CounterButton from './CounterButton/CounterButton';
import styles from './Counter.module.css';

export const minCounter = 1;

function Counter({ startQuiz, onCounterChange, counter }) {
  const maxCounter = mockData.questions.length;
  const [isMouseDown, setIsMouseDown] = useState(false);

  const { minusCounter, plusCounter, handleBlur } = useCounter(
    counter,
    onCounterChange,
    startQuiz,
    maxCounter,
    minCounter,
  );

  const [isInputFocused, setInputFocused] = useState(false);
  const [isBlurring, setIsBlurring] = useState(false);

  const handleMouseDown = () => {
    setIsMouseDown(true);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handlePlusClick = () => {
    if (!isMouseDown) {
      plusCounter();
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      e.target.blur();
    }
  };

  const sanitizeInput = (value) => {
    const sanitized = value
      .toString()
      .replace(/[^0-9]/g, '')
      .replace(/^0+/, '');
    const numericValue = parseInt(sanitized, 10);

    if (isNaN(numericValue)) return '';
    if (numericValue < minCounter) return minCounter;
    if (numericValue > maxCounter) return maxCounter;

    return numericValue;
  };

  const handleInputValidation = (e) => {
    const sanitizedValue = sanitizeInput(e.target.value);
    onCounterChange(sanitizedValue);
  };

  const handleFocus = (e) => {
    setInputFocused(true);
    e.target.type = 'text';
    e.target.setSelectionRange(0, e.target.value.length);
    e.target.type = 'number';
  };

  const handleInputBlur = (e) => {
    const relatedTarget = e.relatedTarget;
    const isButtonClick = relatedTarget?.dataset?.counterButton;

    if (isButtonClick && e.type === 'click') {
      if (isButtonClick === 'minus') {
        minusCounter();
      } else if (isButtonClick === 'plus') {
        plusCounter();
      }
      return;
    }

    setIsBlurring(true);
    setInputFocused(false);
    handleInputValidation(e);
    handleBlur();
    setTimeout(() => setIsBlurring(false), 300);
  };

  return (
    <div className={styles.counter}>
      <CounterButton
        className={styles.minusWrapper}
        onClick={minusCounter}
        data-counter-button='minus'
        disabled={counter <= minCounter}>
        <Icon
          name='minus'
          size={50}
          fill='none'
          className={`${styles.minusIcon} ${counter <= minCounter ? styles.disabled : ''}`}
        />
        <span className='visually-hidden'>Уменьшить количество вопросов</span>
      </CounterButton>
      <div className={styles.counterItemWrapper}>
        <label htmlFor='questions-count' className='visually-hidden'>
          Выбери количество вопросов:
        </label>
        <input
          id='questions-count'
          name='questionsCount'
          type='number'
          min={minCounter}
          max={maxCounter}
          pattern='[0-9]*'
          className={styles.counterItem}
          value={counter}
          onChange={handleInputValidation}
          onBlur={handleInputBlur}
          onFocus={handleFocus}
          onKeyDown={handleInputKeyDown}
          disabled={startQuiz}
          role='spinbutton'
        />
      </div>
      <CounterButton
        className={styles.plusWrapper}
        onClick={handlePlusClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        data-counter-button='plus'
        disabled={counter === maxCounter}>
        <Icon
          name='plus'
          size={50}
          fill='none'
          className={`${styles.plusIcon} ${counter === maxCounter ? styles.disabled : ''}`}
        />
        <span className='visually-hidden'>Увеличить количество вопросов</span>
      </CounterButton>
    </div>
  );
}

export default Counter;
