const checkAuth = (req, res, next) => {
    if(req.isAuthenticated()) {
        next()
    } else{
        res.redirect('/api/login')
    }
};
module.exports = checkAuth;
