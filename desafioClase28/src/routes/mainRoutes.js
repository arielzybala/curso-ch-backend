const express = require("express");
const { fork } = require("child_process");
const { createMocks } = require("../mocks/dataMock");
const { Router } = express;
const router = new Router();
const GV = process;

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
  });
});



router.get("/randoms/", (req, res) => {
  const amount = req.query.cant;
  const child = fork('./src/routes/child.js') 
  child.send({amount})
  child.on('message', (message)=>{
    res.json(message)
  })
});

module.exports = router;
