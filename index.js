const express = require('express');
const helmet = require('helmet');
const { database, errors } = require('./src/middlewares');
const router = require('./src/routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(database);
app.use(router);
app.use(errors);
app.listen(PORT, () => console.log(`Server is running on localhost: ${PORT}`));
