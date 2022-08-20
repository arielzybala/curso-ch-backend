const express = require("express");
//const { fork } = require("child_process");
const { createMocks } = require("../mocks/dataMock");
const yargs = require("yargs/yargs")(process.argv.slice(2));
const args = yargs
  .alias({ p: "PORT", m: "MODO" })
  .default({ PORT: 8080, MODO: "FORK" }).argv;
const PORT = args.PORT;
const { cpus } = require("node:os");
const { Router } = express;
const router = new Router();
const { logger } = require("../utils/logger");
const count = require("./child");
const GV = process; // G de Global - V de variable (a diferencia de EV en config que son EV: E=Environment V=Variables)

router.get("/", (req, res) => {
  let data = [];
  createMocks(5, data);
  logger.info(
    `El servidor express (Nginx) en ${PORT} en PID ${
      process.pid
    } - Método Http: ${JSON.stringify(req.method)}, Ruta [${JSON.stringify(
      req.path
    )}]`
  );
  res.render("index", { mocks: data });
});


router.get("/info", (req, res) => {
  logger.info(`Método Http: ${JSON.stringify(req.method)}, Ruta [${JSON.stringify(req.path)}]`);
  let info = {
  ArgumetosEntrada: GV.argv,
  NombrePlataforma: GV.platform,
  VersionNodeJS: GV.version,
  MemoriaTotalReservada: GV.memoryUsage().rss,
  PathEjecucion: GV.execPath,
  ProcessID: GV.pid,
  CarpetaProyecto: GV.cwd(),
  NumeroDeCPUS: cpus().length
  }

  res.json(info);
});

router.get("/infolog", (req, res) => {
  logger.info(`Método Http: ${JSON.stringify(req.method)}, Ruta [${JSON.stringify(req.path)}]`);
  
  let info = {
  ArgumetosEntrada: GV.argv,
  NombrePlataforma: GV.platform,
  VersionNodeJS: GV.version,
  MemoriaTotalReservada: GV.memoryUsage().rss,
  PathEjecucion: GV.execPath,
  ProcessID: GV.pid,
  CarpetaProyecto: GV.cwd(),
  NumeroDeCPUS: cpus().length
  }
  
  console.log(info)
  
  res.json(info);

});

/*
//RUTA DE EJEMPLO http://localhost:8080/api/randoms/?amount=12
router.get("/randoms/", (req, res) => {
  logger.info(`Método Http: ${JSON.stringify(req.method)}, Ruta [${JSON.stringify(req.path)}]`);
  const amount = req.query.amount;
  const child = fork("./src/routes/child.js");
  amount == undefined || amount == NaN
  ? child.send({ amount: 10000000 })
  : child.send({ amount });
  child.on("message", (message) => {
    res.render("randoms", {
      text: `El servidor express (Nginx) en ${PORT} en PID ${
        process.pid
      } - ${new Date().toLocaleString()}`,
      message,
    });
  });
});
*/
router.get("/randoms/", (req, res) => {
  logger.info(`Método Http: ${JSON.stringify(req.method)}, Ruta [${JSON.stringify(req.path)}]`);
  
  const amount = req.query.amount;
  
  amount == undefined || amount == NaN ? (amount = 10000000) : amount;
  
  const message = count(amount);
  
  res.render("randoms", { text: `Iniciado en ${PORT} con PID ${process.pid} - ${new Date().toLocaleString()}`, message });
  
});

module.exports = router;
