const cluster = require("cluster");
const express = require("express");
const os = require("os");
const PORT = Number(process.argv[2]) || process.env.PORT || 8080;

const numCPUS = os.cpus().length;
const pid = process.pid;
const isPrimary = cluster.isPrimary;

if (isPrimary) {
  console.log(`Proceso Primario: ${isPrimary}. Corre con este id: ${pid} `);
} else {
  console.log(`Clon del proceseso Primario. Corre con este id: ${pid} `);
}

if (isPrimary) {
  for (let i = 0; i < numCPUS; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log("Se cerró el proceso con id: " + worker.process.pid);
  });
} else {
  const app = express();
  app.get("/", (_req, res) => {
    res.send(
      `Servidor express en ${PORT}, Proceso ID: ${
        process.pid
      }, Date: (${new Date().toLocaleString()})`
    );
  });
  app.listen(PORT, (err) => {
    //!err ? console.log(PORT) : console.log("error server not run " + err);
  });
}
