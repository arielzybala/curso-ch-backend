const express = require('express');
const session = require('express-session');
const router = require('./routes');
const passport = require('./passport2');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'ValorSecreto',
    cookie:{
        httpOnly: false,
        secure: true,
        maxAge: 60000
    },
    rolling: true,
    resave: true,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());


app.use("/", router);

app.listen(8080, (err)=>{
    if(!err){console.log("ANDA")}
})