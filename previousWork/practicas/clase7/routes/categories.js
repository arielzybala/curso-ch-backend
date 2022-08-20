const express= require('express');

const {Router} = express

let router = new Router();

router.get("/getAllCategories", (req, res)=>{
    res.send("Everything Categories")
})

router.post("/createCategories", () =>{
    res.send("Create Categories")
})

module.exports = router