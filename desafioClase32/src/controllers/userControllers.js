const { createMocks } = require("../mocks/dataMock");
const { asPOJO } = require("../utils/implements");
const { logger } = require("../utils/logger");

//LOGIN//////////////////////////////////////////////////////////////////////////////////////////////
const getLogin = async (req, res, _next) => {
  logger.info(`Método Http: ${JSON.stringify(req.method)}, Ruta [${JSON.stringify(req.path)}]`);
  let data = [];
  createMocks(5, data);
  res.render("indexLogin", { mocks: data });
};

const postLogin = async (req, res, next) => {
  logger.info(`Método Http: ${JSON.stringify(req.method)}, Ruta [${JSON.stringify(req.path)}]`);
  let data = [];
  createMocks(5, data);
  res.render("logged", { mocks: data, email: req.user.email });
};
//SIGNUP//////////////////////////////////////////////////////////////////////////////////////////////
const getSignup = async (req, res, next) => {
  logger.info(`Método Http: ${JSON.stringify(req.method)}, Ruta [${JSON.stringify(req.path)}]`);
  let data = [];
  createMocks(5, data);
  res.render("indexSignup", { mocks: data });
};

const postSignup = async (req, res, next) => {
  logger.info(`Método Http: ${JSON.stringify(req.method)}, Ruta [${JSON.stringify(req.path)}]`);
  let data = [];
  createMocks(5, data);
  res.render("logged", { mocks: data, email: req.user.email });
};

//FAILURES//////////////////////////////////////////////////////////////////////////////////////////////
const getFailLogin = (req, res, next) => {
  logger.info(`Método Http: ${JSON.stringify(req.method)}, Ruta [${JSON.stringify(req.path)}]`);
  res.render("failLogin");
};

const getFailSignUp = (req, res, next) => {
  logger.info(`Método Http: ${JSON.stringify(req.method)}, Ruta [${JSON.stringify(req.path)}]`);
  res.render("failSignup");
};


//LOGGED//////////////////////////////////////////////////////////////////////////////////////////////

const getLogged = async (req, res, _next) => {
  logger.info(`Método Http: ${JSON.stringify(req.method)}, Ruta [${JSON.stringify(req.path)}]`);
  let data = [];
  createMocks(5, data);
  res.render("logged", { mocks: data, email: req.user.email });
}

//LOGOUT//////////////////////////////////////////////////////////////////////////////////////////////
const getLogout = async (req, res, next) => {
  logger.info(`Método Http: ${JSON.stringify(req.method)}, Ruta [${JSON.stringify(req.path)}]`);
  let email;
  if (!req.user?.email)
    logger.error(`No hay un usuario registrado`)
  else  
    email = req.user.email;
  req.session.destroy((err) => {
    if (!err) {
      res.render("logout", {email})
    } else {
      logger.error(err)
      res.send({ error: "Error al cerrar la sesión", body: err })
    }
  });
};
//CONTRO//////////////////////////////////////////////////////////////////////////////////////////////
const getControl = async (req, res, next) => {
  logger.info(`Método Http: ${JSON.stringify(req.method)}, Ruta [${JSON.stringify(req.path)}]`);
  let dataUser = asPOJO({
    sessionID: req.sessionID,
    auth: req.isAuthenticated(),
    expiration: req.session.cookie.expires,
  });
  let data = [];
  createMocks(5, data);
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
  getLogged
};
