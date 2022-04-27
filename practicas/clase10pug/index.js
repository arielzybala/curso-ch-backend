const express = require("express");
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


app.set("views", "./views")
app.set("view engine", "pug");

app.get("/", (req,res)=>{
    res.render("index", {name:"Ariel"})
})
app.get("/pr", (req,res)=>{
    res.render("products", {data:arr})
})

app.listen(PORT, () => {
  console.log("Server Run on port: " + PORT);
});
