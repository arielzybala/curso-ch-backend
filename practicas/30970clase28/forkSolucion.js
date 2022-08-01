const http = require("http");
const {fork} = require('child_process')

let visitas = 0;
const server = http.createServer();
server.on("request", (req, res) => {
  let { url } = req;
  if (url == "/calcular") {
    const computo = fork('./computo.js')
    computo.send('start')
    computo.on('message', sum =>{
      res.end(`la suma es ${sum}`);
    })
  } else if (url == "/") {
    res.end("ok " + ++visitas);
  }
});
const PORT = 8080;
server.listen(PORT, (err) => {
  if (err) throw new Error(`Error server ${err}`);
  console.log(`Servidor http, escuchado en puerto: ${PORT}`);
});


/**
 * FORK
 * Es una función, permite comunicar entre el proceso principal y el hijo.
 *
 * Además de recuperar los datos como (SPAWN, EXEC y EXECFILE), además permite enviar mensajes al proceso secundario en ejecución. y viceversa
 *
 * FORK TOMA LOS PROCESOS BLOQUEANTES EN UN FLUJO SECUNDARIO Y PERMITE QUE EL CANAL PRINCIPAL DEL SERVIDOR SE ACLARE Y CORRA BIEN SIN LAGS
 *
 */
