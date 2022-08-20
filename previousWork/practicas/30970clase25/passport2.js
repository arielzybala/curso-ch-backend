const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const users = [];

//SIGNUP
passport.use(
    "signup",
    new LocalStrategy((username, password, cb) => {
        const user = users.find((u) => u.username === username);
        if (user) return cb(new Error("Ya existe"));
        const passwordHashed = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        const userBuilt = { username, password: passwordHashed };
        users.push({ username, password: passwordHashed });
        cb(null, userBuilt);
    })
);
//LOGIN
passport.use(
  "login",
  new LocalStrategy((username, password, cb) => {
    const user = users.find((u) => u.username === username);
    console.log(user)
    console.log(bcrypt.compareSync(password, user.password))
    if (!user && bcrypt.compareSync(password, user.password)){
      return cb(new Error("Usuario no tiene registro, o la contraseña es incorrecta"));
    } else{
      return cb(null, user);
    }
  })
);
passport.serializeUser((user, cb) => {
    cb(null, user.username);
  }); 
  
  passport.deserializeUser((username, cb) => {
    const user = users.find((usr) => usr.username == username);
    cb(null, user); 
  });



module.exports = passport;
