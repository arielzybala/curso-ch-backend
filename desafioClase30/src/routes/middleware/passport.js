const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../../models/userModel");
const { hashPassword, matchPassword } = require("../../utils/implements");

passport.use(
  "signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const userExists = await User.findOne({ email: email });
        if (userExists) {
          return done(null, false);
        } else {
          const hash = await hashPassword(password);
          console.log(hash);
          const user = await User.create({ email, password: hash });
          return done(null, user);
        }
      } catch (error) {
        done(error);
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
        const user = await User.findOne({ email: email });
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
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

module.exports = passport;
