import styles from './QuestionPage.module.css';
import { useState, useMemo } from 'react';
import { Button, Icon, Question, Answer } from '@/components/UI';
import Preloader from '@/components/UI/Preloader/Preloader';
import Card from '@/components/UI/Card/Card';
import { generateQuiz, generateOptions } from '@/utils';
import { useKeyPress } from '@/hooks/useKeyPress';

const RESULT_KEYS = {
  CORRECT: 'correct',
  INCORRECT: 'incorrect',
};

const ANSWER_KEYS = {
  QUESTION: 'question',
  ANSWER: 'answer',
  USER_ANSWER: 'userAnswer',
  CORRECT_ANSWER: 'correctAnswer',
};

function QuestionPage({ quizCount, onReturn, onAnswerSelect }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [results, setResults] = useState({ correct: [], incorrect: [] });
  const [showResult, setShowResult] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  const quiz = useMemo(() => generateQuiz(quizCount), [quizCount]);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const answers = useMemo(() => generateOptions(currentQuestion), [currentQuestion]);

  const handleAnswerSelect = (answer) => {
    if (showResult) return;
    setIsDisabled(false);
    setSelectedAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[currentQuestionIndex] = answer;
      return newAnswers;
    });
  };

  const handleNextQuestion = (e) => {
    e?.preventDefault();

    const selectedAnswer = selectedAnswers[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    if (!showResult) {
      setIsDisabled(true);
      setIsAnswered(true);
      setShowLoader(true);

      setTimeout(() => {
        setShowLoader(false);
        setShowResult(true);
        setIsDisabled(false);
      }, 1500);

      return;
    }

    const newResults = {
      [RESULT_KEYS.CORRECT]: isCorrect
        ? [
            ...results[RESULT_KEYS.CORRECT],
            {
              [ANSWER_KEYS.QUESTION]: currentQuestion.question,
              [ANSWER_KEYS.ANSWER]: selectedAnswer,
            },
          ]
        : results[RESULT_KEYS.CORRECT],
      [RESULT_KEYS.INCORRECT]: !isCorrect
        ? [
            ...results[RESULT_KEYS.INCORRECT],
            {
              [ANSWER_KEYS.QUESTION]: currentQuestion.question,
              [ANSWER_KEYS.USER_ANSWER]: selectedAnswer,
              [ANSWER_KEYS.CORRECT_ANSWER]: undefined,
            },
          ]
        : results[RESULT_KEYS.INCORRECT],
    };

    setResults(newResults);

    if (currentQuestionIndex === quizCount - 1) {
      onAnswerSelect({
        answers: selectedAnswers,
        results: newResults,
      });
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setIsDisabled(true);
      setShowResult(false);
      setIsAnswered(false);
    }
  };

  useKeyPress(
    (event) => {
      const key = event.key;

      if (key >= '1' && key <= '4') {
        const answerIndex = parseInt(key, 10) - 1;
        if (answers[answerIndex] && !showLoader) {
          handleAnswerSelect(answers[answerIndex]);
        }
      } else if (key === 'Backspace' && !isDisabled && !showResult) {
        setSelectedAnswers((prev) => {
          const newAnswers = [...prev];
          newAnswers[currentQuestionIndex] = null;
          return newAnswers;
        });
        setIsDisabled(true);
      } else if (key === 'Enter' && !isDisabled) {
        handleNextQuestion(event);
      }
    },
    ['1', '2', '3', '4', 'Backspace', 'Enter'],
  );

  return (
    <section className={styles.questionPage} aria-labelledby='question-page-title'>
      <h1 id='question-page-title' className={styles.visuallyHidden}>
        Страница вопросов викторины
      </h1>
      <button
        type='button'
        className={styles.deleteButton}
        onClick={() => {
          setIsAnswered(false);
          onReturn();
        }}>
        <Icon name='delete' size={32} className={styles.deleteButtonIcon} aria-hidden='true' />
        <span className='visually-hidden'>Вернуться на страницу начала викторины</span>
      </button>
      <Card>
        <div className={styles.questionPageWrapper}>
          <Question flag={currentQuestion.flag} question={currentQuestion.question} />
          <Answer
            key={currentQuestionIndex}
            answers={answers}
            onAnswerSelect={handleAnswerSelect}
            selectedAnswer={selectedAnswers[currentQuestionIndex]}
            correctAnswer={currentQuestion.correctAnswer}
            showResult={showResult}
            isAnswered={isAnswered}
          />
          <div className={styles.countQuestionAndButton}>
            <Button
              disabled={isDisabled}
              onClick={handleNextQuestion}
              className={styles.button}
            >
              {showLoader ? (
                <>
                  <div className={styles.loaderWrapper}>
                    <Preloader className={styles.preloader} />
                  </div>
                  <span className='visually-hidden'>
                    {showResult
                      ? currentQuestionIndex === quizCount - 1
                        ? 'Перейти к результатам викторины'
                        : 'Перейти к следующему вопросу'
                      : 'Отправить ответ на текущий вопрос'}
                  </span>
                </>
              ) : showResult ? (
                currentQuestionIndex === quizCount - 1 ? (
                  'Результат'
                ) : (
                  'Дальше'
                )
              ) : (
                'Ответить'
              )}
            </Button>
            <p className={styles.countQuestion}>
              {currentQuestionIndex + 1} / {quizCount}
            </p>
          </div>
        </div>
      </Card>
    </section>
  );
}

export default QuestionPage;
