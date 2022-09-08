const { verifyJWToken } = require("../../utils/handleJWT");
const { logger } = require("../../utils/logger");


const validateToken = (req, res, next) =>{
  const auth = req.headers.authorization;
  const token = auth.split(' ')[1];
  try {
    verifyJWToken(token)
    next()
  } catch (error) {
    logger.info("El cliente intentó ingresar a una ruta exclusiva para usuarios/administradores.")
    next("/failLogin")
  }
}

module.exports = { validateToken };
