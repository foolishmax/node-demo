// @ts-nocheck
const { User } = require('../model/index');
const { createToken } = require('../utils/jwt');
const fs = require('node:fs');
const { promisify } = require('util');
const rename = promisify(fs.rename);

/** 用户注册 */
exports.register = async (req, res) => {
  const userModel = new User(req.body);
  const iUser = await userModel.save();

  const { password, ...user } = iUser.toJSON();

  res.status(201).json(user);
};

/** 用户登陆 */
exports.login = async (req, res) => {
  let result = await User.findOne(req.body);

  if (!result) {
    res.status(402).json({ error: '邮箱或者密码不正确' });
  }

  result = result?.toJSON();
  result.token = await createToken(result);

  res.status(200).json(result);
};

exports.list = async (req, res) => {
  res.status(200).send('/user-list');
};

exports.update = async (req, res) => {
  const updateUser = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
  });

  res.status(200).json(updateUser);
};

exports.avatar = async (req, res) => {
  const fileType = req.file.originalname.split('.').at(-1);

  try {
    await rename(
      './public/' + req.file.filename,
      './public/' + req.file.filename + '.' + fileType
    );
    res.status(201).json({ filepath: req.file.filename + '.' + fileType });
  } catch (error) {
    res.status(500).json(error);
  }

  res.status(200).json({});
};
