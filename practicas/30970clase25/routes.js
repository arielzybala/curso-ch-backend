const express = require("express");
const { Router } = express;
const router = new Router();
const views = require('./renderViews')
const passport = require('./passport2');
const checkAuthentication = require("./auth");



router.get('/', views.getRoot)
router.get('/login', views.getLogin)
router.post('/login', passport.authenticate('login', {failureRedirect: '/failLogin'}), views.postLogin)
router.get('/failLogin', views.getFailLogin)
router.get('/signup', views.getSignup)
router.post('/signup', passport.authenticate('signup', {failureRedirect: '/failSignup'}), views.postSignup)
router.get('/failSignup', views.getFailSignUp)

router.get('/onlylog', checkAuthentication, views.getPrivate)

router.post('/logout', views.getLogout);

router.get('*', views.failRoute)



module.exports = router