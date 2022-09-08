const express = require("express");
const { Router } = express;
const userRouter = new Router();
const userController = require("../controllers/userControllers");
const uploader = require("./middleware/multer");
const passport = require("./middleware/passport");

userRouter.get("/login", userController.getLogin);
userRouter.post(
  "/login",
  passport.authenticate("login", {
    session: false,
    failureRedirect: "/failLogin",
  }),
  userController.postLogin
);

userRouter.get("/signup", userController.getSignup);
userRouter.post(
  "/signup",
  uploader.single("avatar"),
  passport.authenticate("signup", {
    session: false,
    failureRedirect: "/failSignup",
  }),
  userController.postSignup
);

userRouter.get("/failLogin", userController.getFailLogin);
userRouter.get("/failSignup", userController.getFailSignUp);

userRouter.get("/profile", userController.getProfile);

userRouter.get("/itsLogged", userController.getItsLogged);

userRouter.get("/logged", userController.getLogged);
userRouter.get("/joined", userController.postSignup);

userRouter.get("/logout", userController.getLogout);

module.exports = userRouter;
