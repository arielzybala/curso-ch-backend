const log4js = require("log4js");

log4js.configure({
    appenders: {
    logConsole: { type: "console" },
    fileForProduction: { type: "file", filename: "logsRegistProd.log" },
    fileForDeveloper: { type: "file", filename: "logsRegistDev.log" },
    forProduction: { type: "logLevelFilter", appender: "fileForProduction", level: "warn"},
    forDevelompent: { type: "logLevelFilter", appender: "fileForDeveloper", level: "trace"}
},
categories: {
    default: { appenders: ["logConsole"], level: "info" },
    development: { appenders: ["logConsole","forDevelompent"], level: "trace" },
    production: { appenders: ["forProduction"], level: "warn" },
},
});

const stateLevel = process.env.NODE_ENV === "production" ? "production" : "development";

module.exports = log4js.getLogger(stateLevel);
