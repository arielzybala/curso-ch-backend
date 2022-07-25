const express = require("express");
const { Router } = express;
const userRouter = new Router();
const userController = require('../controllers/userControllers')
const passport = require('./middleware/passport');
const checkAuth = require("./middleware/auth");



userRouter.get('/', userController.getRoot)
userRouter.get('/login', userController.getLogin)
userRouter.post('/login', passport.authenticate('login', {failureRedirect: '/failLogin'}), userController.postLogin)
userRouter.get('/failLogin', userController.getFailLogin)
userRouter.get('/signup', userController.getSignup)
userRouter.post('/signup', passport.authenticate('signup', {failureRedirect: '/failSignup'}), userController.postSignup)
userRouter.get('/failSignup', userController.getFailSignUp);

userRouter.get('/onlylog', checkAuth, userController.getPrivate);

userRouter.post('/logout', userController.getLogout);

userRouter.get('*', userController.failRoute)



module.exports = userRouter