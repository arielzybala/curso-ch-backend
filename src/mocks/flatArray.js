module.exports.flatArray = (data) => {
  let object = Object.entries(data).flatMap((prev, curr) => [...prev, curr]);
  return object;
};
