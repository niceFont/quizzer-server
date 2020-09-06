module.exports = (err, _req, res, _next) => {
  const { message } = err;
  console.log(`${new Date()}: ${message}`);
  switch (message) {
    case 'Unauthorized':
      res.status(401).send('Unauthorized');
      break;
    default:
      res.status(500).send(message);
      break;
  }
};
