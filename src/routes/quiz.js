const router = require('express').Router();
const quizController = require('../controllers/quiz');
const asyncWrapper = require('../../utils/asyncWrapper');

router.get('/:id', asyncWrapper(quizController.getByID));
router.post('/create', asyncWrapper(quizController.create));

module.exports = router;