const express = require("express");
const app = express();

const timeSent = new Date();

function formatDate(today, format) {
    const map = {
        dd: today.getDate(),
        mm: today.getMonth() + 1,
        yy: today.getFullYear().toString().slice(-2),
        hh: today.getHours(),
        mn: today.getMinutes(),
        ms: today.getSeconds(),
    }

    return format.replace(/dd|mm|yy|hh|mn|ms/gi , matched => map[matched])
}

console.log(formatDate(timeSent, 'dd/mm/yy/ hh:mn:ms'));



app.listen(8081, () => {
  console.log("server port 8081");
});