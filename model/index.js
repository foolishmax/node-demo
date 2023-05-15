const mongoose = require('mongoose');
const { MONGODB } = require('../config/config.default');

async function main() {
  mongoose.connect(MONGODB);
}

main()
  .then((res) => {
    console.log('mongodb链接成功');
  })
  .catch((err) => {
    console.log(err);
    console.log('mongodb链接失败');
  })
  .finally(() => {
    // mongoose.disconnect();
  });

module.exports = {
  User: mongoose.model('User', require('./user')),
};
