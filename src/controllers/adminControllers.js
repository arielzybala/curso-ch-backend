const serverData = require("../services/serverDataServices/serverData");

const getDataServer = (_req, res, _next) => {
  const data = serverData;
  res.render("serverView", { data });
};

module.exports = { getDataServer };
