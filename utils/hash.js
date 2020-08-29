const crypto = require('crypto');

const generateID = (length) => crypto.createHash('sha1').update(crypto.randomBytes(32)).digest('hex').substr(0, length);

module.exports = {
  generateID,
};
