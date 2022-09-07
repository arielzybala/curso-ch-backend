const { jwt } = require("jsonwebtoken");
const { logger } = require("./logger");

const generateJwt = async (uid = "") => {
  try {
    const payload = { uid };
    await jwt.sign(
      payload,
      process.env.JWTSECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) {
          logger.error(`Error al generar la firma del token: ${err}`);
        } else {
          return token;
        }
      }
    );
  } catch {
    logger.error(`Error al generar la firma del token: ${err}`);
  }
};

const validateJwt = (req, res, next) => {
  const token = req.header("jwt-token");
  if (!token) {
    return res.status(401).json({ msg: "No hay un token en la petición" });
  }
  try {
    const payload = jwt.verify(token, process.env.JWTSECRET);
    req.user.id = payload.id;
    next();
  } catch (error) {
    logger.error(`El token no es válido: ${error}`);
    res.status(401);
  }
};


const genNewJWToken = (payload) => jwt.sign(payload, process.env.JWTSECRET, {expiresIn:'1h'});
const verifyJWToken = (token) => jwt.verify(token, process.env.JWTSECRET, (err, content)=>{
  if(err) throw new Error('Token Invalido');
  return content;
})

module.exports = { generateJwt, validateJwt, genNewJWToken, verifyJWToken };
