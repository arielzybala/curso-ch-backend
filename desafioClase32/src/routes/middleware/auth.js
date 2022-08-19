const checkedLogin = (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.redirect("/api");
    }
    next();
  };

  const alreadyLogged = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect("/api/logged")
    }
    next();
  };
  
  module.exports = {checkedLogin, alreadyLogged}