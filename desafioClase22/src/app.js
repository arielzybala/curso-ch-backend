const express = require("express");
const app = express();
const path = require('path');
const http = require("http");
const server = http.createServer(app);
const PORT = process.env.PORT || 8080;
const router = require("./routes/main.cjs")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));


app.set("view engine", "ejs");
app.set("views", path.join(__dirname + "/views"));

app.use("/", router)


server.listen(PORT, (err) => {
  !err
    ? console.log("Server RUN ON PORT: ", PORT)
    : console.log("Server NOT RUN");
});