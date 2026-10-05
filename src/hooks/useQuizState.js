import { useState } from 'react';

export function useQuizState() {
  const [quizState, setQuizState] = useState({
    currentPage: 'start',
    correctAnswersCount: 0,
    errorsCount: 0,
    questionsCount: 1,
  });

  const handleDataFromStartPage = (data) => {
    setQuizState((prev) => ({
      ...prev,
      questionsCount: data,
    }));
  };

  const handleStart = () => {
    setQuizState((prev) => ({
      ...prev,
      currentPage: 'question',
      correctAnswersCount: 0,
      errorsCount: 0,
    }));
  };

  const handleReturnToStart = () => {
    setQuizState((prev) => ({
      currentPage: 'start',
      correctAnswersCount: 0,
      errorsCount: 0,
      questionsCount: prev.questionsCount,
    }));
  };

  const handleAnswerSelect = (quizResults) => {
    setQuizState((prev) => ({
      ...prev,
      correctAnswersCount: quizResults.results.correct.length,
      errorsCount: quizResults.results.incorrect.length,
      currentPage: 'result',
    }));
  };

  return {
    quizState,
    handleDataFromStartPage,
    handleStart,
    handleReturnToStart,
    handleAnswerSelect,
  };
}
