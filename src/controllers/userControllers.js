const { logger } = require("../utils/logger");
const { cartDao } = require("../dao/index");
const { handleEmail } = require("../utils/nodemailer");

//LOGIN//////////////////////////////////////////////////////////////////////////////////////////////
const getLogin = async (req, res, next) => {
  res.render("login");
};

const postLogin = async (req, res, next) => {
  res.render("logged", { email: req.user.email });
};

//SIGNUP//////////////////////////////////////////////////////////////////////////////////////////////
const getSignup = async (req, res, next) => {
  const fs = require("fs/promises");
  const data = fs
    .readFile("./src/mocks/countryCodes.json", "utf-8")
    .then((info) => {
      res.render("signup", { data: JSON.parse(info) });
    })
    .catch((error) => {
      logger.error(
        `No pude encontrar o leer el archivo con Prefijos internacionales ${error}`
      );
    });
};

const postSignup = async (req, res, next) => {
  const data = req.user;
  const message ="Datos del Nuevo Usuario creado"
  await handleEmail([data.email, data.nickname, data.address, data.phone], process.env.USERNM, message);
  res.render("logged", { email: req.user.email });
};

//FAILURES////////////////////////////////////////////////////////////////////////////////////////////
const getFailLogin = (req, res, next) => {
  res.render("failLogin");
};

const getFailSignUp = (req, res, next) => {
  res.render("failSignup");
};

const getItsLogged = (req, res, next) => {
  res.render("itsLogged", { email: req.user.email });
};
//LOGGED//////////////////////////////////////////////////////////////////////////////////////////////
const getLogged = async (req, res, next) => {
  res.render("logged", { email: req.user.email });
};

//LOGOUT//////////////////////////////////////////////////////////////////////////////////////////////
const getLogout = async (req, res, next) => {
  let email;
  if (!req.user?.email) logger.error(`No hay un usuario registrado`);
  else email = req.user.email;
  req.session.destroy((err) => {
    if (!err) {
      res.render("logout", { email });
    } else {
      logger.error(err);
      res.send({ error: "Error al cerrar la sesión", body: err });
    }
  });
};
//PROFILE//////////////////////////////////////////////////////////////////////////////////////////////
const getProfile = async (req, res) => {
  let cart = await cartDao.save();
  req.session.cart = cart;
  res.render("profile", { data: req.user });
};

module.exports = {
  getLogin,
  postLogin,
  getSignup,
  postSignup,
  getFailLogin,
  getFailSignUp,
  getLogout,
  getProfile,
  getLogged,
  getItsLogged,
};
