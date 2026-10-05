import Card from '@/components/UI/Card/Card';
import Button from '@/components/UI/Button/Button';
import Counter from '@/components/Counter/Counter';
import { useStartPage } from '@/hooks/useStartPage';
import Preloader from '@/components/UI/Preloader/Preloader';
import styles from './StartPage.module.css';

function StartPage({ onDataFromStartPage, onStart, questionsCount }) {
  const {
    counter,
    startQuiz,
    setCounter,
    handleStart,
    handleInputBlur,
    showLoader,
    setShowLoader,
  } = useStartPage({
    onDataFromStartPage,
    onStart,
    questionsCount,
  });

  const handleStartClick = () => {
    setShowLoader(true);
    handleStart();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className={styles.startPage} aria-labelledby='start-page-title'>
      <h2 id='start-page-title' className={styles.visuallyHidden}>
        Страница начала викторины
      </h2>
      <div
        className={styles.illustrationIcon}
        role='img'
        aria-label='Иллюстрация викторины по странам и столицам'
      />
      <Card className={styles.card}>
        <form
          onSubmit={handleFormSubmit}
          className={styles.content}
          aria-label='Форма начала викторины'>
          <div className={styles.contentWrapper}>
            <h1 className={`${styles.pageTitle} ${styles.mainHeading}`}>
              Добро пожаловать
              <span className={styles.descriptionText}>на викторину по странам</span>
              <span className={styles.descriptionText}>и столицам!</span>
            </h1>
          </div>

          <div className={styles.subtitleAndCounter}>
            <h2>Выбери количество вопросов:</h2>
            <Counter
              startQuiz={startQuiz}
              counter={counter}
              onCounterChange={setCounter}
              onBlur={handleInputBlur}
            />
          </div>
          <Button
            className={styles.buttonWrapper}
            onClick={handleStartClick}
            disabled={!counter || startQuiz || counter === '' || counter < 1}
            aria-label='Начать викторину'>
            {showLoader ? (
              <>
                <div className={styles.loaderWrapper}>
                  <Preloader className={styles.preloader} />
                </div>
                <span className='visually-hidden'>Начать</span>
              </>
            ) : (
              'Начать'
            )}
          </Button>
        </form>
      </Card>
    </section>
  );
}

export default StartPage;
