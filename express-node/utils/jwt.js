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

exports.verifyToken = async (req, res, next) => {
  let token = req.headers.authorization;
  token = token ? token.split('Bearer ')[1] : null;

  if (!token) {
    res.status(402).json({ error: 'token无效' });
  }

  try {
    let user = await verify(token, SECRETKEY);
    req.user = user;
    next();
  } catch (error) {
    res.status(402).json({ error });
  }
};
