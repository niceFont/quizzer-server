const router = require('express').Router();
const healthCheckRouter = require('./healthcheck');

router.use('/hc', healthCheckRouter);
router.use('*', (_, res) => {
  res.status(404).send('404 NOT FOUND');
});

module.exports = router;
