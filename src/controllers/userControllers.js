const { logger } = require("../utils/logger");
const { handleEmail } = require("../utils/nodemailer");
const { usersDao } = require("../dao/index");
const phoneCodes = require("../utils/countryCodes");
const { checkTokenJwt } = require("../routes/middleware/jsonWebToken");

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
  const data = await phoneCodes();
  res.render("signup", { data: data });
};

const postSignup = async (req, res, next) => {
  const data = await usersDao.listById(req.user.id);
  const message = "Datos del Nuevo Usuario creado";
  await handleEmail(
    [data.email, data.nickname, data.address, data.phone],
    process.env.USERNM,
    message
  );
  const content = req.headers.authorization;
  res
    .cookie("jwt", content, { maxAge: 3600 * 1000 })
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
  const userCookie = await checkTokenJwt(req.cookies.jwt);
  const user = await usersDao.listById(userCookie.id);
  res.render("profile", { data: user });
};

//LOGGED////////////////////////////////////////////////////

const getLogged = async (req, res, next) => {
  const userCookie = await checkTokenJwt(req.cookies.jwt);
  const user = await usersDao.listById(userCookie.id);
  res.render("logged", { data: user });
};

//LOGOUT///////////////////////////////////////////////////

const getLogout = async (req, res, next) => {
  const userCookie = await checkTokenJwt(req.cookies.jwt);
  const user = await usersDao.listById(userCookie.id);
  if (!user?.email) logger.error(`No hay un usuario registrado`);
  req.session.destroy((err) => {
    if (!err) {
      res.clearCookie("jwt").render("logout", { email: user.email });
    } else {
      logger.error(err);
      res
        .clearCookie("jwt")
        .send({ error: "Error al cerrar la sesión", body: err });
    }
  });
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
};
