const jwt = require("jsonwebtoken");
const { usersDao } = require("../../dao/index");
const { logger } = require("../../utils/logger");


const checkItsLogged = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next();
  }
  jwt.verify(token, process.env.JWTSECRET, async (err, content) => {
    if (err) {
      logger.warn("Token invalido", { err });
      return next();
    }
    const data = await usersDao.listById(content.id);
    if (!data) {
      return next();
    }
    return res.redirect("/logged")
  });
};

module.exports = checkItsLogged;