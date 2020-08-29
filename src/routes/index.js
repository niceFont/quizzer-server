const router = require('express').Router();
const healthCheckRouter = require('./healthcheck');
const quizRouter = require('./quiz');

router.use('/hc', healthCheckRouter);
router.use('/quiz', quizRouter);
router.use('*', (_, res) => {
  res.status(404).send('404 NOT FOUND');
});

module.exports = router;
