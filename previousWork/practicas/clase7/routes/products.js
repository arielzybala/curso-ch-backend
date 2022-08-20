const { application } = require('express');
const express= require('express');

const {Router} = express

let router = new Router();

router.get("/getAll", (req, res)=>{
    res.send({
        message: "Todo bien",
        data: data,
      });
    });

router.get("/:id", (req, res) => {
    let ident = req.params.id;
    let check = data.some((e) => e.id == ident);
    if (check == true) {
        let unidad = data.find((e) => e.id == ident);
        res.send(`${JSON.stringify(unidad, null, 2)}`);
    } else {
        res.send({ message: "Producto no encontrado" });
    }
});

app.use(function (req, res, next){
    console.log("es un midd, esto corre antes de todo llamado")
})


router.post("/create", () =>{
    res.send("Create")
})

module.exports = router