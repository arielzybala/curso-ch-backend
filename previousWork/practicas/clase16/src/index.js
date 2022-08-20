const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const knex = require("./db/db");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/", (req, res) => {
  const { name, email, password } = req.body;
  let dataNew = {
    name,
    email,
    password,
  };
  knex("users")
    .insert(dataNew)
    .then(() => {
      console.log("Información ingresada a la tabla");
      res.send("La información ha sido ingresada a la base de datos");
    })
    .catch((err) => {
      throw (err, console.log(err));
    });
});

app.get("/all/", (req, res) => {
  knex
  .from("users")
  .select("*")
  .then((allData) => res.send({ data: allData }))
  .catch((err) => {
    throw (err, console.log(err));
  });
});

app.get("/user/:id", (req, res) => {
  knex
    .from("users")
    .select("*")
    .where({ id: req.params.id })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      throw (err, console.log(err));
    });
});

app.put("/updateUser/:id", (req, res) => {
  const { name, email, password } = req.body;
  knex("users")
  .where({ id: req.params.id })
  .update({name, email, password})
  .then(() => res.send({ data: "User Updated" }))
  .catch((err) => {
    throw (err, console.log(err));
  });
});

app.delete("/deleteUser/:id", (req, res) => {
  knex("users")
  .where({ id: req.params.id })
  .del()
  .then(() => res.send({ data: "User Deleted" }))
  .catch((err) => {
    throw (err, console.log(err));
  });
});

app.listen(8080, (err) => {
  !err
    ? console.log("Server Run, listen on Port: " + PORT)
    : console.log("Server not Running");
});
