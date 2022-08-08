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
