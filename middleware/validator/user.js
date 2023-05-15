const { body } = require('express-validator');
const validate = require('./validate');
const { User } = require('../../model');

exports.register = validate([
  body('username')
    .notEmpty()
    .withMessage('用户名不能为空')
    .bail()
    .isLength({ min: 3 })
    .withMessage('用户名长度不能少于3')
    .bail(),
  body('password')
    .notEmpty()
    .withMessage('密码不能为空')
    .isLength({ min: 3 })
    .withMessage('密码不能少于三位')
    .bail(),
  body('email')
    .notEmpty()
    .withMessage('邮箱不能为空')
    .bail()
    .isEmail()
    .withMessage('邮箱格式不正确')
    .bail()
    .custom(async (email) => {
      const emailValidate = await User.findOne({ email });

      if (emailValidate) {
        return Promise.reject('邮箱已被注册');
      }
    })
    .bail(),
  body('phone')
    .notEmpty()
    .withMessage('手机不能为空')
    .bail()
    .custom(async (phone) => {
      const phoneValidate = await User.findOne({ phone });

      if (phoneValidate) {
        return Promise.reject('手机已被注册');
      }
    })
    .bail(),
]);

exports.login = validate([
  body('email')
    .notEmpty()
    .withMessage('邮箱不能为空')
    .bail()
    .isEmail()
    .withMessage('邮箱格式不正确')
    .bail()
    .custom(async (email) => {
      const emailValidate = await User.findOne({ email });

      if (!emailValidate) {
        return Promise.reject('邮箱未注册');
      }
    })
    .bail(),
  body('password').notEmpty().withMessage('密码不能为空').bail(),
]);

exports.update = validate([
  body('email')
    .custom(async (email) => {
      const emailValidate = await User.findOne({ email });

      if (emailValidate) {
        return Promise.reject('邮箱已经被注册');
      }
    })
    .bail(),
  body('username')
    .custom(async (username) => {
      const usernameValidate = await User.findOne({ username });

      if (usernameValidate) {
        return Promise.reject('用户已经被注册');
      }
    })
    .bail(),
  body('phone')
    .custom(async (phone) => {
      const phoneValidate = await User.findOne({ phone });

      if (phoneValidate) {
        return Promise.reject('手机号已经被注册');
      }
    })
    .bail(),
]);
