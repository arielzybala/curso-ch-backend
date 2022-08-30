const { createLogger, transports } = require("winston");

const logDev = createLogger({
  level: "info",
  transports: [
    new transports.Console({ level: "info" }),
    new transports.File({ filename: "./public/logs/warn.log", level: "warn" }),
    new transports.File({ filename: "./public/logs/error.log", level: "error" }),
  ],
});

const logProd = createLogger({
  level: "warn",
  transports: [
    new transports.File({ filename: "./public/logs/warn.log", level: "warn" }),
    new transports.File({ filename: "./public/logs/error.log", level: "error" }),
  ],
});

const logChat = logDev.child({ api: "Chat" });
const logProducts = logDev.child({ api: "Products" });

const logger = process.env.NODE_ENV === "production" ? logProd : logDev;

module.exports = { logger, logProducts, logChat };
