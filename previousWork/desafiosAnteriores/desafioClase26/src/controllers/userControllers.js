const { createMocks } = require("../mocks/dataMock");
const { asPOJO } = require("../utils/implements");

//LOGIN//////////////////////////////////////////////////////////////////////////////////////////////
const getLogin = (req, res, _next) => {
  let data = [];
  createMocks(5, data);
  res.render("indexLogin", { mocks: data });
};

const postLogin = (req, res, next) => {
  let data = [];
  createMocks(5, data);
  res.render("logged", { mocks: data, email: req.body.email });
};
//SIGNUP//////////////////////////////////////////////////////////////////////////////////////////////
const getSignup = (req, res, next) => {
  let data = [];
  createMocks(5, data);
  res.render("indexSignup", { mocks: data });
};

const postSignup = async (req, res, next) => {
  let data = [];
  createMocks(5, data);
  res.render("logged", { mocks: data, email: req.body.email });
};

//FAILURES//////////////////////////////////////////////////////////////////////////////////////////////
const getFailLogin = (req, res, next) => {
  res.render("failLogin");
};

const getFailSignUp = (req, res, next) => {
  res.render("failSignup");
};
//LOGOUT//////////////////////////////////////////////////////////////////////////////////////////////
const getLogout = async (req, res, next) => {
  let user = req.body.user;
  req.session.destroy((err) => {
    if (!err) {
      res.render("logout", { email: user.email });
    } else {
      res.send({ error: "Error al cerrar la sesión", body: err });
    }
  });
};
//CONTRO//////////////////////////////////////////////////////////////////////////////////////////////
const getControl = async (req, res, next) => {
  let dataUser = asPOJO({
    sessionID: req.sessionID,
    auth: req.isAuthenticated(),
    expiration: req.session.cookie.expires,
  });
  console.log(req);
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
};
