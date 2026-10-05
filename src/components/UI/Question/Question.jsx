import styles from './Question.module.css';

function Question({ flag, question }) {
  return (
    <div>
      <figure className={styles.questionWrapper}>
        <img className={styles.flag} src={flag} alt='Флаг страны' width='90' height='60' />
        <figcaption>{question}</figcaption>
      </figure>
    </div>
  );
}

export default Question;
