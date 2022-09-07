let Joi = require("joi");

const email = Joi.string().required();
const password = Joi.string().required();
const nickname = Joi.string().required();
const age = Joi.number().required();
const address = Joi.string().required();
const codesCountry = Joi.required();
const phone = Joi.number().min(5).required();
const avatar = Joi.string().required();
const role = Joi.string().required();

module.exports = {
  email,
  password,
  nickname,
  age,
  address,
  codesCountry,
  phone,
  avatar,
  role,
};
