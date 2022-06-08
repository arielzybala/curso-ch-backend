module.exports = uuid = () => {
  let timeNow = new Date().getTime();
  let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      let random = (timeNow + Math.random() * 16) % 16 | 0;
      timeNow = Math.floor(timeNow / 16);

      return (c == "x" ? random : (random & 0x3) | 0x8).toString(16);
    }
  );

  return uuid;
};
