const quizService = require('../services/quiz.js');

const create = async ({
  body,
}, res) => {
  const quizID = await quizService.createQuiz(res.locals.mysql, body);
  return {
    status: 200,
    quizID,
  };
};

const getByID = async ({
  params: { id },
}, res) => {
  const quiz = await quizService.getQuiz(res.locals.mysql, id);
  console.log(quiz);
  if (quiz) return quiz;
  return {
    status: 204,
  };
};
module.exports = {
  getByID,
  create,
};
