const express = require('express');
const path = require("path");
const http = require("http");
const yargs = require('yargs/yargs')(process.argv.slice(2))
const args = yargs
.alias({p: 'PORT', m: 'MODO' }).argv 
const PORT = args.PORT || process.env.PORT || 8080;
const app = express()
const server = http.createServer(app);
const routerMain = require("./routes/mainRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.set('json spaces', 1)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname + "/views"));

app.use("/", routerMain);

server.listen(PORT, (err) => {
    !err
      ? console.log(`Server iniciado [${PORT}]`)
      : console.log("Server NOT RUN");
});