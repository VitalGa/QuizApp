const getForm = (count, forms) => {
  const pluralRules = new Intl.PluralRules('ru-RU');
  const rule = pluralRules.select(count);

  switch (rule) {
    case 'one':
      return forms[0];
    case 'few':
      return forms[1];
    default:
      return forms[2];
  }
};

export const getResultMessage = (correctAnswers, errors) => {
  if (correctAnswers === 0) {
    return {
      mainMessage: 'Ты не ответил ни на один вопрос.',
      additionalMessage: 'Попробуй еще!',
    };
  }

  if (errors === 0) {
    return {
      mainMessage: 'Ты ответил правильно',
      additionalMessage: 'на все вопросы. Так держать!',
    };
  }

  return {
    mainMessage: 'Ты ответил правильно',
    additionalMessage: {
      correctAnswers,
      correctForm: getForm(correctAnswers, ['вопрос', 'вопроса', 'вопросов']),
      errors,
      errorsForm: getForm(errors, ['ошибку', 'ошибки', 'ошибок']),
    },
  };
};

export default getResultMessage;
