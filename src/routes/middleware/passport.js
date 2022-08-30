const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Users = require("../../models/userModel");
const { hashPassword, matchPassword } = require("../../utils/implements");
const { logger } = require("../../utils/logger");

passport.use(
  "signup",
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: "email",
      passwordField: "password",
    },
    async (req, email, password, done) => {
      try {
        const userExists = await Users.findOne({ email: email });
        if (userExists) {
          logger.warn(`El usuario ya esta registrado`);
          return done(null, false);
        } else {
          let user = req.body;
          user.avatar = req.file.filename
          user.password = await hashPassword(password);
          user.rol = "user";
          await Users.create(user);
          let userData = await Users.findOne({ email: email });
          return done(null, userData);
        }
      } catch (error) {
        logger.error({message: error});
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await Users.findOne({ email: email });
        if (!user) return done(null, false);
        const isMatch = await matchPassword(password, user.password);
        if (!isMatch) return done(null, false);
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Users.findById(id, (err, user) => {
    done(err, user);
  });
});

module.exports = passport;
