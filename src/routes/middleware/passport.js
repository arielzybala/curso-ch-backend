const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { usersDao } = require("../../dao/index");
const { hashPassword, matchPassword } = require("../../utils/implements");
const { logger } = require("../../utils/logger");

const fields = {
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true,
};

passport.use(
  "signup",
  new LocalStrategy(fields, async (req, email, password, done) => {
    try {
      const checkUserEmail = await usersDao.listByEmail(email);
      if (checkUserEmail) {
        return done(
          null,
          false,
          logger.error({
            message: `El usuario ya existe`,
          })
        );
      } else {
        //ESTE ES EL PUNTO DONDE SE CREA AL USUARIO
        let user = req.body;
        user.avatar = req.file.filename;
        user.password = await hashPassword(password);
        user.repeatPassword = user.password;
        user.role = "user";
        await usersDao.save(user);
        ///////////////////////////////////////////
        return done(null, user);
      }
    } catch (error) {
      logger.error({
        message: `Ha ocurrido un error al ingresar los datos ${error}`,
      });
    }
  })
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
        const user = await usersDao.listByEmail(email);
        if (!user) {
          return done(
            null,
            false,
            logger.warn({
              message: `El email no se corresponde con un usuario en la base de datos`,
            })
          );
        }
        const validate = await matchPassword(password, user.password);
        if (!validate) {
          return done(
            null,
            false,
            logger.warn({
              message: `El Password ingresado no es correcto`,
            })
          );
        }
        return done(null, user);
      } catch (error) {
        logger.error({
          message: `Ha ocurrido un error al ingresar los datos ${error}`,
        });

        return done(error);
      }
    }
  )
);

module.exports = passport;
