const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const { database, errors } = require('./src/middlewares');
const router = require('./src/routes');

const app = express();
const PORT = process.env.PORT || 3000;

// TODO add authentification
// TODO add validation
// TODO build automatic deployment
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(database);
app.use(router);
app.use(errors);
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
