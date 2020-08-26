const sendCheck = async (mysql) => {
  const [user] = await mysql.query('SELECT username, email FROM users LIMIT 1');
  return user;
};

module.exports = {
  sendCheck,
};
