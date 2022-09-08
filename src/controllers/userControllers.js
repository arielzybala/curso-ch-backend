const { logger } = require("../utils/logger");
const { handleEmail } = require("../utils/nodemailer");
const { usersDao } = require("../dao/index");
const phoneCodes = require("../utils/countryCodes");
const { genNewJWToken, verifyJWToken } = require("../utils/handleJWT");
//LOGIN//////////////////////////////////////////////////////////////////////////////////////////////
const getLogin = async (req, res, next) => {
  res.render("login");
};

/**
 * 
 const postLogin = async (req, res, next) => {
   res.render("logged", { email: req.user.email });
  };
*/
const postLogin = async (req, res, next) => {

  const token = genNewJWToken({user: req.user.id})
  console.log(token)
  const check = verifyJWToken(token)
  console.log(check.user)
}

//SIGNUP//////////////////////////////////////////////////////////////////////////////////////////////
const getSignup = async (req, res, next) => {
  const data = await phoneCodes();
  res.render("signup", { data: data });
};
/**
 *  
 const postSignup = async (req, res, next) => {
   console.log(req.header('jwt-token'))
   const data = await usersDao.listById(req.user.id);
  const token = await generateJwt(req.user.id)
  const message = "Datos del Nuevo Usuario creado";
  await handleEmail(
    [data.email, data.nickname, data.address, data.phone],
    process.env.USERNM,
    message
  );
  res.header('jwt-token', token).render("logged", { email: req.user.email });
};
*/

const postSignup = async (req, res, next) => {
  res.json(req.user);
};

//FAILURES////////////////////////////////////////////////////////////////////////////////////////////
const getFailLogin = (req, res, next) => {
  res.render("failLogin");
};

const getFailSignUp = (req, res, next) => {};

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
  const user = await usersDao.findById(req.user.id);
  res.render("profile", { data: user });
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
