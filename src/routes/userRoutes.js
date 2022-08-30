const express = require("express");
const { Router } = express;
const userRouter = new Router();
const userController = require("../controllers/userControllers");
const { isAuth , itsLogged} = require("./middleware/auth");
const uploader = require("./middleware/multer");
const passport = require("./middleware/passport");

userRouter.get("/login", itsLogged, userController.getLogin);
userRouter.post(
  "/login",
  passport.authenticate("login", {
    successRedirect: "/logged",
    failureRedirect: "/failLogin",
  }),
  userController.postLogin
);

userRouter.get("/signup", itsLogged, userController.getSignup);
userRouter.post(
  "/signup",
  uploader.single("avatar"),
  passport.authenticate("signup", {
    successRedirect: "/joined",
    failureRedirect: "/failSignup",
  }),
  userController.postSignup
);

userRouter.get("/failLogin", userController.getFailLogin);
userRouter.get("/failSignup", userController.getFailSignUp);

userRouter.get("/profile", isAuth, userController.getProfile);

userRouter.get("/itsLogged", userController.getItsLogged);

userRouter.get("/logged", isAuth, userController.getLogged);
userRouter.get("/joined", isAuth, userController.postSignup);

userRouter.get("/logout", isAuth, userController.getLogout);

module.exports = userRouter;
