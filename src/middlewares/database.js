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

pool.getConnection = promisify(pool.getConnection).bind(pool);
let connection;

pool.getConnection().then((conn) => { connection = conn; });
module.exports = async (_, res, next) => {
  try {
    connection.query = promisify(connection.query).bind(connection);
    res.locals.mysql = connection;
    next();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
