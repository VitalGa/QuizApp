import styles from './App.module.css';
import { useQuizState } from '@/hooks/useQuizState';
import { StartPage, QuestionPage } from '@/pages';
import { Header } from '@/components';
import ResultPage from '@/pages/ResultPage/ResultPage';
import Footer from '@/components/Footer/Footer';

function App() {
  const {
    quizState,
    handleDataFromStartPage,
    handleStart,
    handleReturnToStart,
    handleAnswerSelect,
  } = useQuizState();

  const pages = {
    start: (
      <StartPage
        onStart={handleStart}
        onDataFromStartPage={handleDataFromStartPage}
        questionsCount={quizState.questionsCount}
      />
    ),
    question: (
      <QuestionPage
        quizCount={quizState.questionsCount}
        onReturn={handleReturnToStart}
        onAnswerSelect={handleAnswerSelect}
      />
    ),
    result: (
      <ResultPage
        correctAnswers={quizState.correctAnswersCount}
        errors={quizState.errorsCount}
        onReturn={handleReturnToStart}
      />
    ),
  };

  return (
    <div className={styles.app}>
      <Header currentPage={quizState.currentPage} onReturnToStart={handleReturnToStart} />
      <main className={styles.main}>{pages[quizState.currentPage]}</main>
      <Footer />
    </div>
  );
}

export default App;
