import styles from './Answer.module.css';
import RadioButton from '../RadioButton/RadioButton';
import { useEffect, useRef } from 'react';

function Answer({
  answers,
  onAnswerSelect,
  selectedAnswer,
  correctAnswer,
  showResult,
  isAnswered,
}) {
  const labelRefs = useRef([]);

  useEffect(() => {
    if (showResult || isAnswered) return;
    const selectedIndex = answers.findIndex((value) => value === selectedAnswer);
    if (selectedIndex >= 0) {
      const target = labelRefs.current[selectedIndex];
      if (target && typeof target.focus === 'function') {
        target.focus();
      }
    }
  }, [selectedAnswer, answers, showResult, isAnswered]);

  return (
    <div className={styles.answersWrapper}>
      <ul
        className={styles.answerNumber}
        role='radiogroup'
        aria-label='Варианты ответов'
        onKeyDown={(event) => {
          if (showResult || isAnswered) return;
          if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;

          event.preventDefault();

          const selectedIndex = answers.findIndex((value) => value === selectedAnswer);
          const focusedIndex = labelRefs.current.findIndex((el) => el === document.activeElement);
          const currentIndex = selectedIndex >= 0 ? selectedIndex : focusedIndex;

          let nextIndex = 0;
          if (event.key === 'ArrowDown') {
            nextIndex = currentIndex >= 0 ? currentIndex + 1 : 0;
          } else if (event.key === 'ArrowUp') {
            nextIndex = currentIndex >= 0 ? currentIndex - 1 : answers.length - 1;
          }

          if (nextIndex < 0) nextIndex = answers.length - 1;
          if (nextIndex >= answers.length) nextIndex = 0;

          const nextAnswer = answers[nextIndex];
          onAnswerSelect(nextAnswer);
          const target = labelRefs.current[nextIndex];
          if (target && typeof target.focus === 'function') {
            target.focus();
          }
        }}>
        {answers.map((answer, index) => (
          <li className={styles.answerWrapper} key={index}>
            <RadioButton
              index={index}
              name='answer'
              value={answer}
              onChange={() => onAnswerSelect(answer)}
              selected={answer === selectedAnswer}
              isCorrect={answer === correctAnswer}
              showResult={showResult}
              isAnswered={isAnswered}
              labelRef={(el) => {
                labelRefs.current[index] = el;
              }}>
              {answer}
            </RadioButton>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Answer;
