module.exports.userRole = (req, res, next) => {
        if(req._passport.instance._userProperty === "user")
        next()
        else
        res.redirect("api/products/stock")
    }

module.exports.onlyAdmin = (req, res, next) => {
        if(req._passport.instance._userProperty === "admin")
        next()
        else
        res.redirect("/api/products")
    }
