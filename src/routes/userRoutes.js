const express = require("express");
const { Router } = express;
const userRouter = new Router();
const userController = require("../controllers/userControllers");
const { logUserSchema } = require("../utils/handleJoi");
const {
  genNewJwt,
  itsValidToken,
  haveAlreadyToken,
} = require("./middleware/jsonWebToken");
const uploader = require("./middleware/multer");
const passport = require("./middleware/passport");
const validatorJoi = require("./middleware/validatorJoi");
const {
  valuesToCheck,
  validatorExpress,
} = require("./middleware/validatorExpress");

/////////////////////////////////////////////////////////////
userRouter.get("/login", haveAlreadyToken, userController.getLogin);

userRouter.post(
  "/login",
  validatorJoi(logUserSchema),
  passport.authenticate("login", {
    session: false,
    failureRedirect: "/failLogin",
  }),
  genNewJwt,
  userController.postLogin
);
userRouter.get("/failLogin", userController.getFailLogin);

/////////////////////////////////////////////////////////////
userRouter.get("/signup", haveAlreadyToken, userController.getSignup);

userRouter.post(
  "/signup",
  uploader.single("avatar"),
  valuesToCheck,
  validatorExpress,
  passport.authenticate("signup", {
    session: false,
    failureRedirect: "/failSignup",
  }),
  genNewJwt,
  userController.postSignup
);

userRouter.get("/failSignup", userController.getFailSignUp);

/////////////////////////////////////////////////////////////
userRouter.get("/profile", itsValidToken, userController.getProfile);

userRouter.get("/logged", itsValidToken, userController.getLogged);

userRouter.get("/logout", userController.getLogout);

module.exports = userRouter;
