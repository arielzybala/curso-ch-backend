const jwt = require("jsonwebtoken");
const { logger } = require("../../utils/logger");

const genNewJwt = async (req, res, next) => {
  const payload = { id: req.user.id, role: req.user.role };
  const token = jwt.sign(payload, process.env.JWTSECRET, { expiresIn: "1h" });
  req.headers.authorization = token
  if(!token){
    throw new Error(logger.error("No pudo crear el token"))
  } else{
    next()
  }
};

const checkTokenJwt = async (token) =>
  jwt.verify(token, process.env.JWTSECRET, (err, content) => {
    if (err) throw new Error(logger.warn("Token invalido"));
    return content;
  });

const itsValidToken = async (req, res, next) => {
  const token = req.cookies.jwt;
  try {
    checkTokenJwt(token);
    next();
  } catch (error) {
    logger.info("No pudo encontrar el token");
    next(error);
  }
};

const haveAlreadyToken = async (req, res, next) => {
  const token = req.cookies.jwt;
  if(!token){
    next()
  } else{

    try {
      checkTokenJwt(token);
      res.redirect('/logged');
    } catch (error) {
      next();
    }
  }
};

module.exports = { genNewJwt, checkTokenJwt, haveAlreadyToken, itsValidToken };
