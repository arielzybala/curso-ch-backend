const jwt = require("jsonwebtoken");
const { usersDao } = require("../../dao");
const { logger } = require("../../utils/logger");

const genNewJwt = async (req, res, next) => {
  const user = await usersDao.listByEmail(req.user.email);
  const payload = { id: user.id, role: user.role };
  const token = jwt.sign(payload, process.env.JWTSECRET, { expiresIn: "1h" });
  if (!token) {
    throw new Error(logger.error("No pudo crear el token"));
  } else {
    req.headers.authorization = token;
    next();
  }
};

const checkTokenJwt = async (token) =>
  jwt.verify(token, process.env.JWTSECRET, (err, content) => {
    if (err) logger.warn("Token invalido", { err });
    return content;
  });

const itsValidToken = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res
      .status(400)
      .render("error", {
        message:
          "Para ingresar al sitio necesita una session activa, vuelva al inicio y haga su registro o login",
      });
  }
  try {
    checkTokenJwt(token);
    next();
  } catch (error) {
    logger.info("El token no es válido");
    const message = "El token no es válido";
    res.status(400).render("error", { message });
  }
};

const haveAlreadyToken = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next();
  } else {
    try {
      checkTokenJwt(token);
      res.redirect("/logged");
    } catch (error) {
      next();
    }
  }
};

module.exports = { genNewJwt, checkTokenJwt, haveAlreadyToken, itsValidToken };
