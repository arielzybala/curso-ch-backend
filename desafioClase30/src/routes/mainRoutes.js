const express = require("express");
const { fork } = require("child_process");
const { createMocks } = require("../mocks/dataMock");
const yargs = require('yargs/yargs')(process.argv.slice(2))
const args = yargs
.alias({p: 'PORT', m: 'MODO' }).default({ PORT: 8080, MODO:"FORK" }).argv 
const PORT = args.PORT;
const {cpus} =require('node:os')
const { Router } = express;
const router = new Router();

const GV = process; // G de Global - V de variable (a diferencia de EV en config que son EV: E=Environment V=Variables)

router.get("/", (_req, res) => {
  let data = [];
  createMocks(5, data);
  res.render("index", { mocks: data });
});

router.get("/info", (_req, res) => {
  res.json({
    ArgumetosEntrada: GV.argv,
    NombrePlataforma: GV.platform,
    VersionNodeJS: GV.version,
    MemoriaTotalReservada: GV.memoryUsage().rss,
    PathEjecucion: GV.execPath,
    ProcessID: GV.pid,
    CarpetaProyecto: GV.cwd(),
    NumeroDeCPUS: cpus().length,
  });
});


//RUTA DE EJEMPLO http://localhost:8080/api/randoms/?amount=12
router.get("/randoms/", (req, res) => {
  const amount = req.query.amount;
  const child = fork('./src/routes/child.js')
  amount == undefined || amount == NaN 
  ?child.send({amount:10000000})
  :child.send({amount})
  child.on('message', (message)=>{
    res.render("randoms", {text: `El servidor express (Nginx) en ${PORT} en PID ${process.pid} - ${new Date().toLocaleString()}`, message})
  })
});

module.exports = router;
