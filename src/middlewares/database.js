const mysql = require('mysql');
const { promisify } = require('util');

const pool = mysql.createPool({
  host: '0.0.0.0',
  port: 3311,
  password: 'password',
  user: 'user',
  database: 'quizzer',
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error(err);
  }
  if (connection) connection.release();
});

pool.query = promisify(pool.query).bind(pool);

module.exports = (_, res, next) => {
  res.locals.mysql = pool;
  next();
};
