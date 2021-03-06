const express = require('express');
const bodyParser = require('body-parser');
const productsRoutes = require('./routes/products');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use('/static', express.static( __dirname + "./public"));


app.use("/api/products", productsRoutes );

app.get("/", (req, res) =>{
    res.sendFile(__dirname + "/public/index.html")
});



app.listen(PORT, () => {
    console.log(`Server run on ${PORT}`);
});