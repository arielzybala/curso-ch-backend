const express = require("express");
const { createMocks } = require("../mocks/dataMock");
const { Router } = express;
const router = new Router();

router.get("/products-test", (_req, res) => {
  let data = [];
  createMocks(5, data);
  res.render("test", { mocks: data });
});

router.get("/login", (req, res) => {
  let user = req.session.user
  if(user){
    res.render("loged", {user: user});
  }else{
    res.render("index")
  }

});

router.post("/login", (req, res)=>{
  req.session.user = req.body.user;
  res.render("index")
})

router.get('/info', (req,res) => {
console.log(req.sessionID)
console.log(req.session)
console.log(req.session.user)
 res.render("index")
})

router.get("/logout", (req, res) => {
  let user = req.session.user
  req.session.destroy((err) => {
    if (!err) {
      res.render("logout", {user: user})
    } else {
      console.log(err)
      res.send({ error: "Error al cerrar la sesión", body: err })
    }
  });
});

module.exports = router;
