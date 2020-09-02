const { generateID } = require('../../utils/hash');

const createQuiz = async (mysql, quiz) => {
  const quizID = generateID(12);
  const questionValues = quiz.questions
    .map((quizItem) => [quizID, generateID(8), quizItem.question, quizItem.answer]);
  await mysql.beginTransaction();
  try {
    await mysql.query('INSERT INTO quizzes(quiz_id, name, description) VALUES(?, ?, ?)', [quizID, quiz.name, quiz.description]);
    await mysql.query('INSERT INTO questions(quiz_id, question_id,question, answer) VALUES ?', [questionValues]);
    await mysql.commit();
    return quizID;
  } catch (error) {
    await mysql.rollback();
    throw error;
  }
};

const getQuiz = async (mysql, quizID) => {
  console.log('request');
  const quiz = await mysql.query(`
    SELECT 
      name, description, question 
    FROM 
      quizzes 
    JOIN
      questions
    ON
      quizzes.quiz_id = questions.quiz_id
    WHERE 
      questions.quiz_id = ? 
  `, [quizID]);
  console.log('noresult end');
  if (!quiz.length) return undefined;
  console.log('result end');
  return quiz.reduce((acc, item) => ({
    ...acc,
    questions: [...acc.questions,
      {
        question: item.question,
      },
    ],
  }), {
    name: quiz[0].name,
    description: quiz[0].description,
    questions: [],
  });
};
module.exports = {
  getQuiz,
  createQuiz,
};
