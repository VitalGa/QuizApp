import mockData from '../mock/quizz_questions.json';

const questionsData = mockData.questions.map((item) => ({
  question: item.question.trim(),
  correctAnswer: item.correctAnswer,
  flag: item.flag,
}));

function generateQuiz(count) {
  const questions = [];
  const usedCorrectAnswers = new Set();

  while (questions.length < count) {
    const randomIndex = Math.floor(Math.random() * questionsData.length);

    const question = questionsData[randomIndex];

    if (usedCorrectAnswers.has(question.correctAnswer)) {
      continue;
    }

    questions.push({ ...question });

    usedCorrectAnswers.add(question.correctAnswer);
  }

  return { questions };
}

function generateOptions(question) {
  const possibleWrongAnswers = questionsData.reduce((acc, q) => {
    if (q.correctAnswer !== question.correctAnswer) {
      acc.push(q.correctAnswer);
    }
    return acc;
  }, []);

  const shuffledWrongAnswers = possibleWrongAnswers.sort(() => Math.random() - 0.5);
  const wrongAnswers = shuffledWrongAnswers.slice(0, 3);

  return [...wrongAnswers, question.correctAnswer].sort(() => Math.random() - 0.5);
}

export { generateQuiz, generateOptions };
