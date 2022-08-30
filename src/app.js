const NODE_ENV = process.env.NODE_ENV || "development";
require("dotenv").config({ path: `.env.${NODE_ENV}` });//Esto es por si hay que usar un .env.production, en algún momento
const express = require("express");
const session = require("express-session");
const path = require("path");
const cp = require("cookie-parser");
const cors = require("cors")
const mongoStore = require("connect-mongo");
const http = require("http");
const yargs = require("yargs/yargs")(process.argv.slice(2));
const args = yargs.alias({ p: "PORT", m: "MODO" }).argv;
const PORT = args.PORT || process.env.PORT || 8080; //Quedo modificado así por Heroku
const app = express();
const server = http.createServer(app);
const { mongoAtlas } = require("./config");
const routerMain = require("./routes/mainRoutes");
const routerUser = require("./routes/userRoutes");
const routerCart = require("./routes/cartRoutes");
const routerProducts = require("./routes/productsRoutes");
const passport = require("./routes/middleware/passport");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "../public")));
app.use(cors())

app.set("view engine", "ejs");
app.set("views", path.join(__dirname + "/views"));

app.use(cp());
app.use(
  session({
    store: mongoStore.create({
      mongoUrl: mongoAtlas.uri,
      mongoOptions: mongoAtlas.advancedOptions,
      ttl: 60,
      retries: 0,
      touchAfter: 24 * 3600,//con esto la sesión dura 24hs
    }),
    secret: mongoAtlas.secret,
    resave: true,
    saveUninitialized: true,
    rolling: true,
    cookie: {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use("/", routerMain, routerUser);
app.use("/api/cart", routerCart);
app.use("/api/products", routerProducts)


server.listen(PORT, (err) => {
  !err
    ? console.log(`Server iniciado [${PORT}]`)
    : console.log("Server NOT RUN");
});
