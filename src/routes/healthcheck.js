const router = require('express').Router();
const healthcheckController = require('../controllers/healthcheck');
const asyncWrapper = require('../../utils/asyncWrapper');

router.get('/', asyncWrapper(healthcheckController.get));

module.exports = router;
