const { verifyJWToken } = require("../../utils/handleJWT");
const { logger } = require("../../utils/logger");

const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    let user = req.user;
    req.session.user = user;
    next();
  } else {
    res.redirect("/");
    logger.info(`Usuario no logueado o registrado`);
  }
};

const itsLogged = (req, res, next) => {
  if (req.isAuthenticated()) {
    let user = req.user;
    req.session.user = user;
    res.redirect("/itsLogged");
    logger.info(`El Usuario ya esta logueado`);
  } else {
    next();
  }
};

const validateToken = (req, res, next) =>{
  const auth = req.headers.authorization;
  const token = auth.split(' ')[1];
  try {
    verifyJWToken(token)
    next()
  } catch (error) {
    next("/failLogin")
  }
}

module.exports = { isAuth, itsLogged, validateToken };
