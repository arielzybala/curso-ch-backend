const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;

app.get("/", (_req, res) => {
  res.send(
    `Servidor express en ${PORT}, Proceso ID: ${
      process.pid
    }, Date: (${new Date().toLocaleString()})`
  );
});

app.listen(PORT, (err) => {
  !err ? console.log(PORT) : console.log("error server not run " + err);
});
