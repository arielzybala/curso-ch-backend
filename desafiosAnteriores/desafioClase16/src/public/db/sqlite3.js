const knex = require("knex");
const config = require("../../../knexfile");
const db = knex(config.development);

module.exports.addMessage = async (user, email, newMessage) => {
  const [id] = await db("users").insert({
    name: user,
    email: email,
    message: newMessage,
  });
};

module.exports.findAllMessage = () => {
  return db("users");
};



