const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const { database, errors } = require('./src/middlewares');
const router = require('./src/routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(database);
app.use(router);
app.use(errors);
app.listen(PORT, () => console.log(`Server is running on localhost: ${PORT}`));
