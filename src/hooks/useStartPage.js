import { useState } from 'react';

export function useStartPage({ onDataFromStartPage, onStart, questionsCount = 1 }) {
  const [counter, setCounter] = useState(questionsCount);
  const [startQuiz, setStartQuiz] = useState(false);
  const [canPressEnter, setCanPressEnter] = useState(true);
  const [showLoader, setShowLoader] = useState(false);

  const handleStart = () => {
    setStartQuiz(true);
    setShowLoader(true);
    setTimeout(() => {
      onDataFromStartPage(counter);
      onStart();
      setShowLoader(false);
    }, 1500);
  };

  const handleInputBlur = () => {
    setCanPressEnter(false);
    setTimeout(() => {
      setCanPressEnter(true);
    }, 1000);
  };

  return {
    counter,
    startQuiz,
    setCounter,
    handleStart,
    handleInputBlur,
    showLoader,
    setShowLoader,
  };
}
