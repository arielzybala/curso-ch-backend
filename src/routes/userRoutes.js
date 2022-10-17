const express = require("express");
const controller = require("../controllers/userControllers");
const passport = require("./middleware/passport");
const validatorJoi = require("./middleware/validatorJoi");
const { uploader } = require("./middleware/multer");
const { Router } = express;
const { logUserSchema } = require("../utils/handleJoi");
const {
  valuesToCheck,
  validatorExpress,
} = require("./middleware/validatorExpress");
const {
  generateToken,
  validatorToken,
  tokenInspect,
} = require("./middleware/jsonWebToken");
const { openCart } = require("./middleware/openCart");
const { userRole, verifyRole, userRoleSignUp, userRoleLogin } = require("./middleware/onlyAdmin");
const router = new Router();

/////////////////////////////////////////////////////////////
router.get("/login", tokenInspect, controller.getLogin);

router.post(
  "/login",
  validatorJoi(logUserSchema),
  passport.authenticate("login", {
    session: false,
    failureRedirect: "/failLogin",
  }),
  generateToken,
  openCart,
  userRoleLogin,
  controller.postLogin
);

router.get("/failLogin", controller.getFailLogin);

/////////////////////////////////////////////////////////////
router.get("/signup", tokenInspect, controller.getSignup);

router.post(
  "/signup",
  uploader.single("avatar"),
  valuesToCheck,
  validatorExpress,
  passport.authenticate("signup", {
    session: false,
    failureRedirect: "/failSignup",
  }),
  generateToken,
  openCart,
  userRoleSignUp,
  controller.postSignup
);

router.get("/failSignup", controller.getFailSignUp);

/////////////////////////////////////////////////////////////

router.get("/profile", validatorToken, controller.getProfile);

router.get("/logged", verifyRole, validatorToken, controller.getLogged);

router.get("/logout", controller.getLogout);

router.get("/onlyUser", controller.onlyUser);

module.exports = router;
