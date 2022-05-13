const uuid = () => {
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

const formatDate = () => {
  const today = new Date();
  const format = "dd/mm/yy/ hh:mn:ms";

  const map = {
    dd: today.getDate(),
    mm: today.getMonth() + 1,
    yy: today.getFullYear().toString().slice(-2),
    hh: today.getHours(),
    mn: today.getMinutes(),
    ms: today.getSeconds(),
  };

  return format.replace(/dd|mm|yy|hh|mn|ms/gi, (matched) => map[matched]);
};

const validEmail = (email) => {
  let emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  return emailPattern.test(email);
};
