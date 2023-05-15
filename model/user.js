const mongoose = require('mongoose');
const md5 = require('../utils/md5');

const userScheme = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    set: (password) => md5(password),
    select: false,
  },
  phone: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: null,
  },
  createTime: {
    type: Date,
    default: Date.now(),
  },
  updateTime: {
    type: Date,
    default: Date.now(),
  },
  cover: {
    type: String,
    default: null,
  },
  channel: {
    type: String,
    default: null,
  },
});

module.exports = userScheme;
