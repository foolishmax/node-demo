const crypto = require('crypto');

module.exports = (str) => {
  return crypto
    .createHash('md5')
    .update('foolishmax' + '123')
    .digest('hex');
};