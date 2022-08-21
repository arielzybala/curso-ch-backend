const { asPOJO } = require("../utils/implements");
const { logger } = require("../utils/logger");

//LOGIN//////////////////////////////////////////////////////////////////////////////////////////////
const getLogin = async (req, res, next) => {
  res.render("login");
};

const postLogin = async (req, res, next) => {
  res.render("logged", { email: req.user.email });
};

//SIGNUP//////////////////////////////////////////////////////////////////////////////////////////////
const getSignup = async (req, res, next) => {
  res.render("signup");
};

const postSignup = async (req, res, next) => {
  res.render("logged", { email: req.user.email });
};

//FAILURES////////////////////////////////////////////////////////////////////////////////////////////
const getFailLogin = (req, res, next) => {
  res.render("failLogin");
};

const getFailSignUp = (req, res, next) => {
  res.render("failSignup");
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
//CONTROL//////////////////////////////////////////////////////////////////////////////////////////////
const getControl = async (req, res, next) => {
  let dataUser = asPOJO({
    sessionID: req.sessionID,
    auth: req.isAuthenticated(),
    expiration: req.session.cookie.expires,
  });
  res.render("control", { mocks: data, dataUser: dataUser });
};

module.exports = {
  getLogin,
  postLogin,
  getSignup,
  postSignup,
  getFailLogin,
  getFailSignUp,
  getLogout,
  getControl,
  getLogged,
};
