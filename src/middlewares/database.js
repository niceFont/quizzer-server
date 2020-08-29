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

module.exports = async (_, res, next) => {
  try {
    const connection = await pool.getConnection();
    connection.query = promisify(connection.query).bind(connection);
    connection.beginTransaction = promisify(connection.beginTransaction).bind(connection);
    connection.rollback = promisify(connection.rollback).bind(connection);
    connection.commit = promisify(connection.commit).bind(connection);
    res.locals.mysql = connection;
    next();
  } catch (error) {
    console.error(error);
  }
};
