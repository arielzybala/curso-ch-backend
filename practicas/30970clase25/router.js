const express = require("express");
const { Router } = express;

let users = [];

let router = new Router();

router.get("/loguin", refuseAuth, (req, res) => {
  if(req.session.nameuser) return res 
    res.send();
});

router.post("/loadUser", (req, res) => {
    
    let { name, password, direction } = req.body;
    let userNew = {
      name,
      password,
      direction,
    };
    users.push(userNew);
    res.send({message: `usuario cargado`, result: users});
  });

module.exports = router;