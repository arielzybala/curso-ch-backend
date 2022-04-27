const express = require("express");
const {engine} = require("express-handlebars");
const app = express();
const PORT = process.env.PORT || 8080;


let arr = [
    {
        name:"Cable",
        price:1000
    },
    {
        name:"Cable2",
        price:1002
    },
    {
        name:"Cable3",
        price:1003
    }
]


app.set("views", "./views");
app.set("view engine", "hbs");
app.engine("hbs", engine({
    extname: "hbs",
    layoutsDir: __dirname + "/views/layouts",
    defaultLayout: "index",
    partialsDis: __dirname + "/views/partials",
  })
);

app.get("/", (req, res)=>{
    res.render("main")
})
app.get("/products", (req, res)=>{
    res.render("products", {data:arr})
})



app.listen(PORT, () => {
  console.log("Server Run on port: " + PORT);
});
