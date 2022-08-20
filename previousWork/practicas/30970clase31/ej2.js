const express = require("express");
const app = express();
const logger = require("./logger");


app.get("/suma", (req, res) => {
  let { num1, num2 } = req.query;
  num1 = parseInt(num1);
  num2 = parseInt(num2);
  if (isNaN(num1) || isNaN(num2)) {
    logger.error("Numero 1 o 2, no son un número");
    res.sendStatus(500).send();
    return
  }
  logger.info(`Los números ingresados estan okey`)
  const suma = num1 + num2
  logger.warn(`La suma es:${suma}`)
  res.send(String(suma))
});

app.use((_req, res, _next) => {
  logger.warn("recurso invalido");
  res.sendStatus(404);
});

app.listen(8080, (err) => {
  if (!err) {
    logger.trace(`inicio el server en puerto 8080`)
  } else {
    console.err(err, "server not run"), process.exit();
  }
});
