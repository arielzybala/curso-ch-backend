const express = require("express");
const { Router } = express;
const userRouter = new Router();
const userController = require('../controllers/userControllers');
const {checkedLogin, alreadyLogged} = require("./middleware/auth");
const uploader = require("./middleware/multer");
const passport = require('./middleware/passport');

userRouter.get('/login', alreadyLogged, userController.getLogin)
userRouter.post('/login', passport.authenticate('login', {failureRedirect: '/failLogin'}),  userController.postLogin)

userRouter.get('/signup',alreadyLogged, userController.getSignup)
userRouter.post('/signup', uploader.single("avatar"), passport.authenticate('signup', {failureRedirect: '/failSignup'}),  userController.postSignup)

userRouter.get('/failLogin', userController.getFailLogin)
userRouter.get('/failSignup', userController.getFailSignUp);

userRouter.get('/control', checkedLogin, userController.getControl);

userRouter.get('/logged', checkedLogin, userController.getLogged)

userRouter.get('/logout', checkedLogin, userController.getLogout);

module.exports = userRouter