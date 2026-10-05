import React from 'react';
import styles from './ResultPage.module.css';
import Card from '@/components/UI/Card/Card';
import Button from '@/components/UI/Button/Button';
import { getResultMessage } from '@/utils';
import { useKeyPress } from '@/hooks/useKeyPress';
import resultIcon from '@/assets/images/icons/resultIcon.png';

function ResultPage({ correctAnswers = 0, errors = 0, onReturn }) {
  const { mainMessage, additionalMessage } = getResultMessage(correctAnswers, errors);

  useKeyPress(
    (event) => {
      if (event.key === 'Enter') {
        onReturn();
      }
    },
    ['Enter'],
  );

  const renderAdditionalMessage = () => {
    if (typeof additionalMessage === 'string') {
      return additionalMessage;
    }

    const { correctAnswers, correctForm, errors, errorsForm } = additionalMessage;
    return [
      'на ',
      <span key='correct' className={styles.highlight}>
        {correctAnswers}
      </span>,
      ` ${correctForm} и сделал `,
      <span key='errors' className={styles.errorHighlight}>
        {errors}
      </span>,
      ` ${errorsForm}.`,
    ];
  };

  return (
    <section className={styles.resultPage} aria-labelledby='result-page-title'>
      <h1 id='result-page-title' className={styles.visuallyHidden}>
        Страница результатов викторины
      </h1>
      <Card>
        <div className={styles.resultPageWrapper}>
          <img src={resultIcon} alt='Иконка результата викторины' className={styles.resultIcon} />
          <div className={styles.result}>
            <h1 className={styles.resultHeading}>Результат</h1>
            <div className={styles.resultTextWrapper}>
              <p className={styles.resultMessage}>
                <span className={styles.mainMessage}>{mainMessage}</span>{' '}
                {renderAdditionalMessage()}
              </p>
            </div>
          </div>
          <Button
            className={styles.resultButton}
            onClick={onReturn}
            aria-label='Начать новую викторину'>
            Попробовать еще
          </Button>
        </div>
      </Card>
    </section>
  );
}

export default ResultPage;
