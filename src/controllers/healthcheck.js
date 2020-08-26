const healthCheckService = require('../services/healthcheck');

const get = async (_, res) => healthCheckService.sendCheck(res.locals.mysql);

module.exports = {
  get,
};
