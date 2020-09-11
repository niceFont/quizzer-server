const Joi = require('joi');

module.exports = (schemaObject) => async (req, res, next) => {
  try {
    if (!schemaObject) throw new Error('Schema Object missing!');
    const schema = Joi.object(schemaObject);
    await Promise.all(['body', 'query', 'params', 'headers'].map((part) => {
      if (schemaObject[part]) {
        return schema.validateAsync({ [part]: req[part] });
      }
      return undefined;
    }));
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
