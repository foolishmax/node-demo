const { User } = require('../model');
const { createToken } = require('../util/jwt');

module.exports.getUser = async (ctx, next) => {
  ctx.body = ctx.user;
};

exports.register = async (ctx, next) => {
  const user = new User(ctx.request.body);
  const dbUser = await user.save();

  ctx.body = dbUser;
};

exports.login = async (ctx, next) => {
  const dbUser = await User.findOne(ctx.request.body);
  if (!dbUser) {
    return ctx.throw(402, '邮箱或者密码不正确');
  }

  const token = await createToken(dbUser['_doc']);

  dbUser['_doc'].token = token;
  ctx.body = dbUser['_doc'];
};
