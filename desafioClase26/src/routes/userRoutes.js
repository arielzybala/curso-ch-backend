const express = require("express");
const { Router } = express;
const userRouter = new Router();
const userController = require('../controllers/userControllers')
const passport = require('./middleware/passport');

userRouter.get('/login', userController.getLogin)
userRouter.post('/login', passport.authenticate('login', {failureRedirect: '/api/failLogin'}), userController.postLogin)

userRouter.get('/signup', userController.getSignup)
userRouter.post('/signup', passport.authenticate('signup', {failureRedirect: '/api/failSignup'}), userController.postSignup)

userRouter.get('/failLogin', userController.getFailLogin)
userRouter.get('/failSignup', userController.getFailSignUp);

userRouter.get('/control', userController.getControl);


userRouter.get('/logout', userController.getLogout);





module.exports = userRouter