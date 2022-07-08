const express = require("express")
const session = require("express-session")

const app = express()

app.use(session({
    secret:"ariel",
    resave:true,
    saveUninitialized:true
}))



