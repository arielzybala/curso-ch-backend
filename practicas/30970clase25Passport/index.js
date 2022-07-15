const session = require('express-session');
const passport = require('passsport');
const LocalStategy = require ('passport-local').Strategy
const bcrypt = require('bcrypt')

const users = [];

app.use(session({
    secret:"ariel",
    resave:true,
    saveUninitialized:true
}))

passport.use('registration', new LocalStategy((username, password, callback)=>{
    const user = users.find(usuario=> usuario.username === username);
    if (user) return callback(new Error("ya exisite"));
    const passwordHasheado = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const usuarioCreado = {username, password: passwordHasheado}
    users.push(usuarioCreado)
    callback(null, usuarioCreado)
}))

passport.serializeUser((usuario, callback)=>{
    callback(null, usuario.username)
})

passport.deserializeUser((username, callback)=>{
    const user = users.find(usr => usr.username == username);
    callback(null, user)
})


passport.use('singup', new LocalStategy({passReqToCallback: ture}, (req, username, passwoed, callback)=>{
    User.findOne({'username':username})
}))