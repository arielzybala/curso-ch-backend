const util = require("util");
const print = (data) => {
  console.log(util.inspect(data, false, 12, true));
};

module.exports = print;
