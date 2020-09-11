const Joi = require('joi');

const questionSchema = Joi.object({
  question: Joi.string().max(254).required(),
  answer: Joi.alternatives(Joi.string().max(254).required(), Joi.number().max(254).required()),
  type: Joi.string().valid('choice', 'input'),
  options: Joi.array().when('type', {
    is: 'choice',
    then: Joi.array().items(Joi.string()).min(2).unique()
      .required(),
  }),
}).required();

const createQuiz = {
  body: Joi.object({
    name: Joi.string().max(32).required(),
    description: Joi.string().max(254).required(),
    questions: Joi.array().items(questionSchema.required()).required(),
  }),
};

const userAnswersSchema = Joi.object({
  id: Joi.string().length(8).required(),
  answer: Joi.alternatives(Joi.string().max(254).required(), Joi.number().max(254).required()),
});

const getResults = {
  body: Joi.object({
    userAnswers: Joi.array().items(userAnswersSchema).required(),
  }),
  params: Joi.object({
    id: Joi.string().length(12).required(),
  }),
};
const getByID = {
  params: Joi.object({
    id: Joi.string().length(12).required(),
  }),
};

module.exports = {
  createQuiz,
  getByID,
  getResults,
};
