module.exports = checkAuthentication = (req, res, next) =>{
    if(req.isAuthenticated()) {
        //req te devuelve true si esta autenticado
        next()
    }else{
        res.redirect("/login")
        //si da false, dedirecciona al login
    }
}