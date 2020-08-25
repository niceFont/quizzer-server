const express = require('express');
const helmet = require('helmet');
const { database } = require('./src/middlewares');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(database);

app.get('/hc', async (_, res) => {
  try {
    const { locals: { mysql } } = res;
    const [user] = await mysql.query('SELECT username, email FROM users LIMIT 1');
    res.send(user);
  } catch (error) {
    res.statusCode = 500;
    res.send(error);
  }
});

app.listen(PORT, () => console.log(`Server is running on localhost: ${PORT}`));
