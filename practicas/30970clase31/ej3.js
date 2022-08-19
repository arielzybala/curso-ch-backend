const express = require("express");
const app = express();
const { logger, logProducts, logChat } = require("./loggerW");

logProducts.warn("hola")
logChat.warn("hola")
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

  logger.warn(`La suma es:${suma} ${JSON.stringify(req.method)} ${JSON.stringify(req.path)}` )
  res.send(String(suma))
});

app.use((_req, res, _next) => {
  logger.warn("recurso invalido");
  res.sendStatus(404);
});

app.listen(8081, (err) => {
  if (!err) {
    logger.silly(`inicio el server en puerto 8080`)
  } else {
    console.err(err, "server not run"), process.exit();
  }
});