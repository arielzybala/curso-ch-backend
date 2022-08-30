let Joi = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const { mongoAtlas } = require("../config");
const { logger } = require("../utils/logger");

const email = Joi.string().required();
const password = Joi.string().required();
const nickname = Joi.string().required();
const age = Joi.number().required();
const address = Joi.string().required();
const codesCountry = Joi.required();
const phone = Joi.number().min(5).required();
const avatar = Joi.string().required();
const rol = Joi.string().required();



const UserSchema = new Schema({
  email,
  password,
  nickname,
  age,
  address,
  codesCountry,
  phone,
  avatar,
  rol,
});

let uri = mongoAtlas.uri
let advancedOptions = mongoAtlas.advancedOptions

mongoose.connect(uri, advancedOptions, (err) => {
  !err
    ? logger.info("Conectado a la Base de Datos de los Usuarios")
    : logger.error("No Conectado a la Base de Datos de los usuarios");
});

module.exports = mongoose.model("Users", UserSchema);
