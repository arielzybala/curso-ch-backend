const jwt = require("jsonwebtoken");
const { logger } = require("./logger");

const genNewJWToken = (payload) =>
  jwt.sign(payload, process.env.JWTSECRET, {
    algorithm: "HS256",
    expiresIn: "1h",
  });
const verifyJWToken = (token) =>
  jwt.verify(
    token,
    process.env.JWTSECRET,
    { algorithm: "HS256" },
    (err, content) => {
      if (err) throw new Error(logger.warn("Error al verificar", err));
      return content;
    }
  );

module.exports = { genNewJWToken, verifyJWToken };
