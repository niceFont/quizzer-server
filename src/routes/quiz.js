const router = require('express').Router();
const quizController = require('../controllers/quiz');
const asyncWrapper = require('../../utils/asyncWrapper');
const { validation } = require('../middlewares');
const quizSchema = require('../validation/quiz');

router.get('/:id', validation(quizSchema.getByID), asyncWrapper(quizController.getByID));
router.post('/:id/results', validation(quizSchema.getResults), asyncWrapper(quizController.getResults));
router.post('/create', validation(quizSchema.createQuiz), asyncWrapper(quizController.create));

module.exports = router;
