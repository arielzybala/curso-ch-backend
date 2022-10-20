const { logger } = require("../utils/logger");
const { UserService } = require("../services/userService");
const service = new UserService();

//LOGIN///////////////////////////////////////////////////
const getLogin = async (req, res, next) => {
  res.render("login");
};

const postLogin = async (req, res, next) => {
  const content = req.headers.authorization;
  res
    .cookie("jwt", content, { maxAge: 3600 * 1000 })
    .render("logged", { email: req.user.email });
};

//SIGNUP///////////////////////////////////////////////////

const getSignup = async (req, res, next) => {
  const data = await service.bringsCodesPhone();
  res.render("signup", { data: data });
};

const postSignup = async (req, res, next) => {
  await service.sendEmailToAdmin(req.user.email, "Datos del Nuevo Usuario");
  const token = req.headers.authorization;
  res
    .cookie("jwt", token, { maxAge: 3600 * 1000 })
    .render("logged", { email: req.user.email });
};

//FAILURES/////////////////////////////////////////////////

const getFailLogin = (req, res, next) => {
  res.render("failLogin");
};

const getFailSignUp = (req, res, next) => {
  res.render("failSignup");
};

//PROFILE///////////////////////////////////////////////////

const getProfile = async (req, res) => {
  const user = await service.takeUserFromCookie(req.cookies.jwt);
  res.render("profile", { data: user });
};

//LOGGED////////////////////////////////////////////////////

const getLogged = async (req, res, next) => {
  const user = await service.takeUserFromCookie(req.cookies.jwt);
  res.render("logged", { email: user.email });
};

//LOGOUT///////////////////////////////////////////////////

const getLogout = async (req, res, next) => {
  if (!req.cookies.jwt) {
    return res
      .status(401)
      .render("error", { message: "No tiene una sesión iniciada" });
  }
  const user = await service.takeUserFromCookie(req.cookies.jwt);
  if (!user.email) {
    logger.error(`No hay un usuario conectado`);
    return req
      .status(401)
      .render("error", { message: "Su Token no es correcto" });
  }

  //
  req.session.destroy(() => {
    res
      .clearCookie("jwt")
      .clearCookie("cart")
      .render("logout", { email: user.email });
  });
};

//OnlyUser///////////////////////////////////////////////////

const onlyUser = async (_req, res, _next) => {
  await res.render("onlyUsersView");
};

////////////////////////////////////////////////////////////
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
  onlyUser,
};
