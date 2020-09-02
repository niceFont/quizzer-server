module.exports = (fn) => async (req, res, next) => {
  try {
    const response = await fn.call(fn, req, res);
    console.log('response:', response);
    res.json(response);
  } catch (error) {
    next(error);
  }
};
