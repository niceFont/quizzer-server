module.exports = (fn) => async (req, res, next) => {
  try {
    const response = await fn.call(fn, req, res);
    res.status(response.status ? response.status : 200).send(response.body);
  } catch (error) {
    next(error);
  }
};
