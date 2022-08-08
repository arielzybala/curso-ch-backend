const express = require('express');
const app = express();
const path = require("path");
const PORT = parseInt(process.argv[2]) || 8080;

//app.use(express.static(path.join(__dirname, "./public")));// - YA QUEDA COMENTADO PORQUE LO SUPLE EN ESE TRABAJO EL SERVER PROXY
// Para los static ahora va a estar el server proxy 
app.get("/datos", (_req, res)=>{
    console.log(`port: ${PORT} -> Fyh ${new Date().toLocaleString()}`)
    res.send(`El servidor express <span style="color:green;">(Nginx)</span> en ${PORT}  <b>PID ${process.pid} </b> - ${new Date().toLocaleString()}`)
})

app.listen(PORT, err=>{
    !err
    ? console.log(`Servidor expres escuchando en el puerto ${PORT} - pid Worker ${process.pid}`)
    : console.error(err);
})

