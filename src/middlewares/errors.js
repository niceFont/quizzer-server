module.exports = (err, _req, res) => {
  const { message } = err;
  switch (message) {
    case 'Unauthorized':
      res.status(401).send('Unauthorized');
      break;
    default:
      res.status(500).send('Internal Server Error');
      break;
  }
};
