const jwt = require("jsonwebtoken");
const { logger } = require("../../utils/logger");
const { UserService } = require("../../services/userService");
const service = new UserService();


const userRoleLogin = async (req, res, next) => {
  const data = req.headers.authorization;
  jwt.verify(data, process.env.JWTSECRET, async (err, content) => {
    if (err) {
      return res.redirect("/");
    }
    const user = await service.takeUserById(content.id);
    if (user.role == "admin") {
      return res
        .cookie("jwt", data, { maxAge: 3600 * 1000 })
        .status(200)
        .render("loggedAdmin", { email: user.email });
    }
    return next();
  });
};

const userRoleSignUp = async (req, res, next) => {
  const data = req.headers.authorization;
  jwt.verify(data, process.env.JWTSECRET, async (err, content) => {
    if (err) {
      return res.redirect("/");
    }
    const user = await service.takeUserById(content.id);
    if (user.role == "admin") {
      await service.sendEmailToAdmin(user.email, "Datos del Nuevo Usuario");
      return res
        .cookie("jwt", data, { maxAge: 3600 * 1000 })
        .status(200)
        .render("loggedAdmin", { email: user.email });
    }
    return next();
  });
};


const onlyAdmin = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.redirect("/");
  }
  jwt.verify(token, process.env.JWTSECRET, async (err, content) => {
    const data = await service.takeUserById(content.id);
    if (data.role == "admin") {
      return next();
    }
    return res.redirect("/");
  });
};

const verifyRole = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next();
  }
  jwt.verify(token, process.env.JWTSECRET, async (err, content) => {
    if (err) {
      logger.warn("Token invalido", { err });
      return next();
    }
    const user = await service.takeUserById(content.id);
    if (user.role == "admin") {
      return res.status(200).render("loggedAdmin", { email: user.email });
    }
    return next();
  });
};

module.exports = { onlyAdmin, userRoleLogin, userRoleSignUp, verifyRole };
