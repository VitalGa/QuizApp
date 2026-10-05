export const useCounter = (counter, onCounterChange, startQuiz, maxCounter, minCounter) => {
  const handleInputChange = (e) => {
    if (startQuiz) return;

    const value = e.target.value;
    if (value === '') {
      onCounterChange('');
    } else {
      const numValue = parseInt(value);
      if (!isNaN(numValue)) {
        if (numValue < minCounter) {
          onCounterChange(minCounter);
        } else if (numValue > maxCounter) {
          onCounterChange(maxCounter);
        } else {
          onCounterChange(numValue);
        }
      } else {
        onCounterChange(minCounter);
      }
    }
  };

  const handleBlur = () => {
    if (startQuiz) return;
    if (counter === '' || isNaN(counter) || counter < minCounter) {
      onCounterChange(minCounter);
    }
  };

  const minusCounter = () => {
    if (startQuiz) return;
    if (counter > minCounter) {
      onCounterChange((prevCounter) => prevCounter - 1);
    }
  };

  const plusCounter = () => {
    if (startQuiz) return;
    if (counter < maxCounter) {
      onCounterChange((prevCounter) => prevCounter + 1);
    }
  };

  return {
    handleInputChange,
    handleBlur,
    minusCounter,
    plusCounter,
  };
};
