const bcrypt = require("bcrypt");
module.exports.asPOJO = (obj) => JSON.parse(JSON.stringify(obj));

module.exports.renameField = (record, from, to) => {
  record[to] = record[from];
  delete record[from];
  return record;
};
module.exports.removeField = (record, field) => {
  const value = record[field];
  delete record[field];
  return value;
};
module.exports.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

module.exports.matchPassword = async (password, userPassword) => {
  return await bcrypt.compare(password, userPassword);
};


