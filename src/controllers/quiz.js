const quizService = require('../services/quiz.js');

const create = async ({
  body,
}, res) => {
  const quizID = await quizService.createQuiz(res.locals.mysql, body);
  return {
    status: 200,
    body: {
      quizID,
    },
  };
};

const getResults = async ({ params, body }, res) => {
  console.log(body);
  const result = await quizService.calcResults(res.locals.mysql, { ...body, ...params });
  return {
    body: result,
  };
};

const getByID = async ({
  params: { id },
}, res) => {
  const quiz = await quizService.getQuiz(res.locals.mysql, id);
  if (quiz) {
    return {
      body: quiz,
    };
  }
  return {
    status: 204,
  };
};
module.exports = {
  getByID,
  create,
  getResults,
};
