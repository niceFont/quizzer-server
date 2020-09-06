const { generateID } = require('../../utils/hash');

const createQuiz = async (mysql, quiz) => {
  const quizID = generateID(12);
  // Splits Questions into questions and options for the Database
  const { questionValues, optionValues } = quiz.questions.reduce((acc, curr) => {
    const questionID = generateID(8);
    if (curr.type === 'choice') {
      return {
        ...acc,
        questionValues: [
          ...acc.questionValues,
          [
            quizID,
            questionID,
            curr.question,
            curr.answer,
            curr.type,
          ],
        ],
        optionValues: [...acc.optionValues, ...curr.options.map((option) => [
          questionID,
          generateID(8),
          option])],
      };
    }
    return {
      ...acc,
      questionValues: [
        ...acc.questionValues,
        [
          quizID,
          questionID,
          curr.question,
          curr.answer,
          curr.type,
        ],
      ],
    };
  }, { questionValues: [], optionValues: [] });
  console.log(questionValues, optionValues);
  await mysql.beginTransaction();
  try {
    console.log(questionValues, optionValues);
    await mysql.query('INSERT INTO quizzes(quiz_id, name, description) VALUES(?, ?, ?)', [quizID, quiz.name, quiz.description]);
    await mysql.query('INSERT INTO questions(quiz_id, question_id,question, answer, type) VALUES ?', [questionValues]);
    if (optionValues.length) {
      await mysql.query('INSERT INTO options(question_id, option_id, option_value) VALUES ?', [optionValues]);
    }
    await mysql.commit();
    return quizID;
  } catch (error) {
    await mysql.rollback();
    throw error;
  }
};

const get = async (mysql, id) => mysql.query(`
    SELECT 
      name, description, question, option_value, type, answer, questions.question_id, quizzes.quiz_id
    FROM 
      quizzes 
    JOIN
      questions
    ON
      quizzes.quiz_id = questions.quiz_id
    LEFT JOIN
      options
    ON
      questions.question_id = options.question_id
    WHERE 
      questions.quiz_id = ? 
  `, [id]);

const calcResults = async (mysql, { id, userAnswers }) => {
  const quiz = await get(mysql, id);
  return userAnswers.reduce((acc, answer) => {
    const question = quiz.find((questionItem) => questionItem.question_id === answer.id);
    return [...acc, {
      id: question.question_id,
      question: question.question,
      answer: question.answer,
      entered: answer.userAnswer,
      correct: answer.userAnswer === question.answer,
    }];
  }, []);
};

const getQuiz = async (mysql, quizID) => {
  const quiz = await get(mysql, quizID);
  if (!quiz.length) return undefined;

  // Formats the queried data to a model that is easier to work with
  /* {
    name: "test",
    description: "desc",
    questions: [
      {
        question: "Question 1?",
        answer: "answer",
        type: "input"
      },
      {
        question: "Question 2?",
        answer: "answer",
        options: [1,2,34]
        type: "choice"
      }
    ]
  } */

  return quiz.reduce((acc, item) => {
    if (item.option_value && !!acc.questions
      .find((question) => question.question === item.question)) {
      return {
        ...acc,
        questions: acc.questions.map((question) => {
          if (question.question === item.question) {
            return {
              ...question,
              options: [...question.options, item.option_value],
            };
          }
          return question;
        }),
      };
    }
    return {
      ...acc,
      questions: [...acc.questions,
        {
          id: item.question_id,
          question: item.question,
          options: item.type === 'choice' ? [item.option_value] : undefined,
          type: item.type,
        },
      ],
    };
  }, {
    id: quiz[0].quiz_id,
    name: quiz[0].name,
    description: quiz[0].description,
    questions: [],
  });
};
module.exports = {
  getQuiz,
  createQuiz,
  calcResults,
};
