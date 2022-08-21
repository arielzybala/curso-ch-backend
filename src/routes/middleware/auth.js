const checkedLogin = (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.redirect("/");
    }
    next();
  };

  const alreadyLogged = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect("/logged")
    }
    next();
  };
  
  module.exports = {checkedLogin, alreadyLogged}