const mysql = require('mysql');
const { promisify } = require('util');
const dbCred = require('config').get('localDBCredentials');

const pool = mysql.createPool({
  host: dbCred.host,
  port: dbCred.port,
  password: dbCred.password,
  user: dbCred.user,
  database: dbCred.database,
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
