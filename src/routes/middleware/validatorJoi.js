const { logger } = require("../../utils/logger");
//joi al ser ejecutado toma el schema que le viene servido del archivo en /utils/handlejoi.js
module.exports = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body);

      next();
    } catch (error) {
      logger.warn(error);
      res.render("errorValidation", { error: error.message });
    }
  };
};
