const getRoot = (_req, res, _next) => {res.send("acá se renderiza el front de la home")}

const getLogin = (req, res, _next) => {
    if(req.isAuthenticated()) {
        console.log('user logueado');
        res.status(200).send('aca se renderiza el profile del User')
    } else{
        console.log('user No logueado')
        res.send("acá se renderiza el front del login")
    }
}

const postLogin = (req, res, _next) => {
    res.send("aca se renderiza el profile del usuario -mismo contenido que postSignup(el render puede tener un include)-")
}

const getSignup = (_req, res, _next) => {
    res.send("acá se renderiza el front para registrarse")
}

const postSignup = (req, res, _next) => {
    const user = req.user
    res.send("aca se renderiza el profile del usuario -mismo contenido que postLogin(el render puede tener un include)-")
}

const getFailLogin = (req, res, next) => {
    console.log('error al loguearse')
    res.send("Acá se renderiza en la pagina un ERROR LOGIN")
}

const getFailSignUp = (req, res, next) => {res.send("ERROR SIGNUP")}

const getLogout = (req, res, next) => {
    req.logout((err) =>{
        if (err) { return next(err); }
        res.redirect('/');
      });
}

const failRoute = (req, res, next) => {res.status(404).send("Dirección que renderiza el error 404")}

const getPrivate = (_req, res, _next) => {
    res.send("Lo ves porque estas logueado")
}

module.exports = {getRoot, getLogin, postLogin, getSignup, postSignup, getFailLogin, getFailSignUp, getLogout, getPrivate, failRoute}

