const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { SECRETKEY } = require('../config/config.default');
const sign = promisify(jwt.sign);
const verify = promisify(jwt.verify);

exports.createToken = async (user) => {
  return await sign(user, SECRETKEY, {
    expiresIn: 60 * 60 * 24,
  });
};

exports.verifyToken = function (required = true) {
  return async (ctx, next) => {
    let token = ctx.headers.authorization;
    token = token ? token.split('Bearer ')[1] : null;

    if (!token) {
      ctx.throw(402, 'token无效');
    }

    try {
      let user = await verify(token, SECRETKEY);
      ctx.user = user;
      next();
    } catch (error) {
      ctx.throw(402, error);
    }
  };
};
